import { Types } from "mongoose";
import { Stage } from "../../types/aggregationStage";
import { ONE_DAY } from "../../utils/variables";

export type GetSeasonPipelineParams = {
    houseId: Types.ObjectId;
    start: Date;
    end: Date;
};

const getSeasonPipeline = ({
    houseId,
    start,
    end
}: GetSeasonPipelineParams & { roomTypeId?: Types.ObjectId }): Stage[] => [
    {
        $match: {
            house: {
                $eq: houseId
            }
        }
    },
    {
        $project: {
            priority: 1,
            name: 1,
            minPrice: 1,
            start: 1,
            end: 1,
            selected: {
                $let: {
                    vars: {
                        st: start,
                        ed: end
                    },
                    in: {
                        standard: "$$st",
                        interval: {
                            $add: [
                                {
                                    $divide: [
                                        {
                                            $subtract: ["$$ed", "$$st"]
                                        },
                                        ONE_DAY
                                    ]
                                },
                                1
                            ]
                        }
                    }
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            selected: {
                $let: {
                    vars: {
                        list: {
                            $map: {
                                input: {
                                    $range: [0, "$selected.interval", 1]
                                },
                                as: "idx",
                                in: {
                                    date: {
                                        $add: [
                                            {
                                                $multiply: ["$$idx", ONE_DAY]
                                            },
                                            "$selected.standard"
                                        ]
                                    }
                                }
                            }
                        },
                        endGteStart: {
                            $gte: [
                                {
                                    $dayOfYear: "$end"
                                },
                                {
                                    $dayOfYear: "$start"
                                }
                            ]
                        }
                    },
                    in: {
                        $map: {
                            input: "$$list",
                            as: "dateObj",
                            in: {
                                date: "$$dateObj.date",
                                priority: "$priority",
                                seasonId: "$_id",
                                isInclude: {
                                    $cond: {
                                        if: "$$endGteStart",
                                        then: {
                                            $and: [
                                                {
                                                    $gte: [
                                                        {
                                                            $dayOfYear:
                                                                "$$dateObj.date"
                                                        },
                                                        {
                                                            $dayOfYear: "$start"
                                                        }
                                                    ]
                                                },
                                                {
                                                    $lte: [
                                                        {
                                                            $dayOfYear:
                                                                "$$dateObj.date"
                                                        },
                                                        {
                                                            $dayOfYear: "$end"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        else: {
                                            $or: [
                                                {
                                                    $gte: [
                                                        {
                                                            $dayOfYear:
                                                                "$$dateObj.date"
                                                        },
                                                        {
                                                            $dayOfYear: "$start"
                                                        }
                                                    ]
                                                },
                                                {
                                                    $lte: [
                                                        {
                                                            $dayOfYear:
                                                                "$$dateObj.date"
                                                        },
                                                        {
                                                            $dayOfYear: "$end"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
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
            path: "$selected",
            preserveNullAndEmptyArrays: false
        }
    },
    {
        $group: {
            _id: {
                date: "$selected.date",
                isInclude: "$selected.isInclude"
            },
            seasons: {
                $push: {
                    _id: "$selected.seasonId",
                    priority: "$selected.priority"
                }
            }
        }
    },
    {
        $sort: {
            "_id.date": 1,
            "_id.isInclude": -1
        }
    },
    {
        $project: {
            _id: "$_id",
            seasons: {
                $cond: {
                    if: "$_id.isInclude",
                    then: "$seasons",
                    else: []
                }
            }
        }
    },
    {
        $group: {
            _id: "$_id.date",
            seasons: {
                $first: "$seasons"
            }
        }
    },
    {
        $sort: {
            _id: 1
        }
    },
    {
        $project: {
            day: {
                $arrayElemAt: [
                    ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
                    {
                        $subtract: [
                            {
                                $dayOfWeek: "$_id"
                            },
                            1
                        ]
                    }
                ]
            },
            season: {
                $let: {
                    vars: {
                        priority: {
                            $max: "$seasons.priority"
                        }
                    },
                    in: {
                        $ifNull: [
                            {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$seasons",
                                            as: "season",
                                            cond: {
                                                $eq: [
                                                    "$$season.priority",
                                                    "$$priority"
                                                ]
                                            }
                                        }
                                    },
                                    0
                                ]
                            },
                            null
                        ]
                    }
                }
            }
        }
    }
];

const getPricePipeline = ({
    houseId,
    start,
    end,
    roomTypeIds
}: GetSeasonPipelineParams & { roomTypeIds?: Types.ObjectId[] }): Stage[] => {
    const seasonPipeline = getSeasonPipeline({ houseId, start, end });
    seasonPipeline.push(
        {
            $lookup: {
                from: "SeasonPrices",
                let: {
                    date: "$_id",
                    seasonId: "$season._id",
                    day: "$day"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$season", "$$seasonId"]
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            season: 1,
                            roomType: 1,
                            price: {
                                $let: {
                                    vars: {
                                        dp: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input:
                                                            "$dailyPriceList",
                                                        as: "dp",
                                                        cond: {
                                                            $eq: [
                                                                "$$day",
                                                                "$$dp.day"
                                                            ]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    },
                                    in: {
                                        $ifNull: ["$$dp.price", "$defaultPrice"]
                                    }
                                }
                            }
                        }
                    }
                ],
                as: "prices"
            }
        },
        {
            $lookup: {
                from: "RoomPrices",
                let: {
                    date: "$_id",
                    day: "$day"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$$date", "$date"]
                                    }
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            roomType: "$roomType",
                            price: 1
                        }
                    }
                ],
                as: "roomPrices"
            }
        },
        {
            $project: {
                _id: 1,
                prices: {
                    $map: {
                        input: {
                            $setUnion: [
                                "$roomPrices.roomType",
                                "$prices.roomType"
                            ]
                        },
                        as: "roomType",
                        in: {
                            $switch: {
                                branches: [
                                    {
                                        case: {
                                            $in: [
                                                "$$roomType",
                                                "$roomPrices.roomType"
                                            ]
                                        },
                                        then: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$roomPrices",
                                                        as: "roomPrice",
                                                        cond: {
                                                            $eq: [
                                                                "$$roomPrice.roomType",
                                                                "$$roomType"
                                                            ]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    },
                                    {
                                        case: {
                                            $in: [
                                                "$$roomType",
                                                "$prices.roomType"
                                            ]
                                        },
                                        then: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$prices",
                                                        as: "roomPrice",
                                                        cond: {
                                                            $eq: [
                                                                "$$roomPrice.roomType",
                                                                "$$roomType"
                                                            ]
                                                        }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ],
                                default: "epgpt"
                            }
                        }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "RoomTypes",
                let: {},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$house", houseId]
                                    },
                                    roomTypeIds
                                        ? {
                                              $in: ["$_id", roomTypeIds]
                                          }
                                        : {}
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            defaultPrice: 1
                        }
                    }
                ],
                as: "roomTypes"
            }
        },
        {
            $project: {
                prices: {
                    $map: {
                        input: "$roomTypes",
                        as: "roomType",
                        in: {
                            $cond: {
                                if: {
                                    $in: ["$$roomType._id", "$prices.roomType"]
                                },
                                then: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: "$prices",
                                                as: "price",
                                                cond: {
                                                    $eq: [
                                                        "$$roomType._id",
                                                        "$$price.roomType"
                                                    ]
                                                }
                                            }
                                        },
                                        0
                                    ]
                                },
                                else: {
                                    roomType: "$$roomType._id",
                                    price: "$$roomType.defaultPrice"
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            $unwind: {
                path: "$prices",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $group: {
                _id: "$prices.roomType",
                datePrices: {
                    $push: {
                        date: "$_id",
                        price: "$prices.price"
                    }
                }
            }
        }
    );
    return seasonPipeline;
};

export { getSeasonPipeline, getPricePipeline };
