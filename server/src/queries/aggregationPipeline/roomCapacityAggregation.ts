import { Types } from "mongoose";
import { Stage } from "../../types/aggregationStage";
import { Gender } from "../../types/graph";
import { ONE_DAY } from "../../utils/variables";

interface GetRoomCapacityQueryParams {
    roomId?: Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
    initValue?: {
        gender: Gender;
        count: number;
    };
}
export { pipelineRoomCapacity, GetRoomCapacityQueryParams };

const pipelineRoomCapacity = ({
    roomTypeId,
    roomId,
    checkIn,
    checkOut,
    initValue
}: GetRoomCapacityQueryParams & { roomTypeId?: Types.ObjectId }): Stage[] => {
    const interval =
        Math.floor(checkOut.getTime() / ONE_DAY) -
        Math.floor(checkIn.getTime() / ONE_DAY);

    if (!(roomTypeId || roomId)) {
        throw new Error("roomId, roomTypeId 둘다 undefined");
    }
    const match = (roomTypeId && {
        roomType: roomTypeId
    }) || {
        _id: roomId
    };
    const stages: Stage[] = [
        {
            $match: match
        },
        {
            $addFields: {
                checkIn,
                interval
            }
        },
        {
            $project: {
                date: {
                    $map: {
                        input: {
                            $range: [0, "$interval", 1]
                        },
                        as: "idx",
                        in: {
                            $add: [
                                {
                                    $multiply: ["$$idx", ONE_DAY]
                                },
                                "$checkIn"
                            ]
                        }
                    }
                },
                roomGender: 1,
                peopleCount: 1,
                peopleCountMax: 1,
                pricingType: 1,
                interval: 1,
                initialize: 1
            }
        },
        {
            $unwind: {
                path: "$date",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $lookup: {
                from: "Guests",
                let: {
                    roomId: "$_id",
                    date: "$date"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$allocatedRoom", "$$roomId"]
                                    },
                                    {
                                        $gte: ["$$date", "$start"]
                                    },
                                    {
                                        $lt: ["$$date", "$end"]
                                    }
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            gender: 1,
                            guestType: 1,
                            bedIndex: 1
                        }
                    }
                ],
                as: "guests"
            }
        },
        {
            $project: {
                peopleCount: 1,
                roomGender: 1,
                date: 1,
                guests: 1,
                interval: 1,
                pricingType: 1,
                count: {
                    $subtract: [
                        "$peopleCount",
                        {
                            $size: "$guests"
                        }
                    ]
                },
                bed: {
                    $setDifference: [
                        {
                            $range: [0, "$peopleCount", 1]
                        },
                        "$guests.bedIndex"
                    ]
                },
                gender: {
                    $switch: {
                        branches: [
                            {
                                case: {
                                    $eq: ["$roomGender", "SEPARATELY"]
                                },
                                then: {
                                    $let: {
                                        vars: {
                                            ist: {
                                                $setIntersection: [
                                                    "$guests.gender",
                                                    ["MALE", "FEMALE"]
                                                ]
                                            }
                                        },
                                        in: {
                                            $cond: {
                                                if: {
                                                    $eq: [
                                                        {
                                                            $size: "$$ist"
                                                        },
                                                        1
                                                    ]
                                                },
                                                then: "$$ist",
                                                else: {
                                                    $setDifference: [
                                                        ["MALE", "FEMALE"],
                                                        "$$ist"
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                case: {
                                    $eq: ["$roomGender", "ANY"]
                                },
                                then: ["MALE", "FEMALE"]
                            }
                        ],
                        default: "$roomGender"
                    }
                }
            }
        },
        {
            $unwind: {
                path: "$bed",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $unwind: {
                path: "$gender",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: {
                    room: "$_id",
                    bed: "$bed",
                    gender: "$gender",
                    roomGender: "$roomGender",
                    pricingType: "$pricingType",
                    interval: "$interval"
                },
                date: {
                    $push: "$date"
                },
                count: {
                    $min: "$count"
                }
            }
        },
        {
            $match: {
                $expr: {
                    $eq: [
                        {
                            $size: "$date"
                        },
                        "$_id.interval"
                    ]
                }
            }
        },
        {
            $group: {
                _id: {
                    room: "$_id.room",
                    pricingType: "$_id.pricingType",
                    roomGender: "$_id.roomGender"
                },
                beds: {
                    $addToSet: "$_id.bed"
                },
                genders: {
                    $addToSet: "$_id.gender"
                },
                count: {
                    $min: "$count"
                }
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        {
                            _id: "$_id.room",
                            pricingType: "$_id.pricingType",
                            roomGender: "$_id.roomGender"
                        },
                        {
                            genders: "$genders",
                            count: "$count",
                            beds: {
                                $slice: ["$beds", 0, "$count"]
                            }
                        }
                    ]
                }
            }
        }
    ];
    if (initValue) {
        stages.push(
            {
                $addFields: {
                    allocatable: {
                        $in: [initValue.gender, "$genders"]
                    }
                }
            },
            {
                $sort: {
                    allocatable: -1,
                    count: 1
                }
            },
            {
                $unwind: {
                    path: "$beds",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $facet: {
                    origin: [
                        {
                            $project: {
                                allocatable: 0
                            }
                        }
                    ],
                    remain: [
                        {
                            $skip: initValue.count
                        }
                    ],
                    lastSkipOne: [
                        {
                            $skip: initValue.count - 1
                        },
                        {
                            $limit: 1
                        }
                    ]
                }
            },
            {
                $project: {
                    remain: {
                        $let: {
                            vars: {
                                skippedOne: {
                                    $arrayElemAt: ["$lastSkipOne._id", 0]
                                }
                            },
                            in: {
                                $map: {
                                    input: "$remain",
                                    as: "obj",
                                    in: {
                                        _id: "$$obj._id",
                                        pricingType: "$$obj.pricingType",
                                        roomGender: "$$obj.roomGender",
                                        beds: "$$obj.beds",
                                        genders: {
                                            $switch: {
                                                branches: [
                                                    {
                                                        case: {
                                                            $and: [
                                                                {
                                                                    $eq: [
                                                                        "$$obj.roomGender",
                                                                        "SEPARATELY"
                                                                    ]
                                                                },
                                                                {
                                                                    $eq: [
                                                                        "$$obj._id",
                                                                        "$$skippedOne"
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        then: {
                                                            $setIntersection: [
                                                                [
                                                                    initValue.gender
                                                                ],
                                                                "$$obj.genders"
                                                            ]
                                                        }
                                                    }
                                                ],
                                                default: "$$obj.genders"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $unwind: {
                    path: "$remain",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$remain"
                }
            },
            {
                $group: {
                    _id: {
                        _id: "$_id",
                        genders: "$genders",
                        roomGender: "$roomGender",
                        pricingType: "$pricingType"
                    },
                    beds: {
                        $push: "$beds"
                    }
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            "$_id",
                            {
                                beds: "$beds"
                            }
                        ]
                    }
                }
            }
        );
    }
    return stages;
};
