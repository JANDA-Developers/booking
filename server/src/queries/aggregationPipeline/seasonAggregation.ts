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
                standard: start,
                interval: {
                    $add: [
                        {
                            $divide: [
                                {
                                    $subtract: [end, start]
                                },
                                ONE_DAY
                            ]
                        },
                        1
                    ]
                }
            }
        }
    },
    {
        $addFields: {
            endGteStart: {
                $gte: [
                    {
                        $dayOfYear: "$end"
                    },
                    {
                        $dayOfYear: "$start"
                    }
                ]
            },
            selected: {
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
                        },
                        DOY: {
                            $add: [
                                {
                                    $dayOfYear: "$selected.standard"
                                },
                                "$$idx"
                            ]
                        }
                    }
                }
            }
        }
    },
    {
        $project: {
            name: 1,
            priority: 1,
            minPrice: 1,
            selected: {
                $filter: {
                    input: {
                        $map: {
                            input: "$selected",
                            as: "dateObj",
                            in: {
                                date: "$$dateObj.date",
                                isInclude: {
                                    $cond: {
                                        if: "$endGteStart",
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
                    },
                    as: "dateObj",
                    cond: "$$dateObj.isInclude"
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
        $project: {
            _id: 0,
            date: "$selected.date",
            season: {
                _id: "$_id",
                priority: "$priority"
            }
        }
    },
    {
        $sort: {
            date: 1,
            "season.priority": -1
        }
    },
    {
        $group: {
            _id: "$date",
            seasonId: {
                $first: "$season._id"
            }
        }
    },
    {
        $sort: {
            _id: 1
        }
    }
];

export const getPricePipeline = ({
    houseId,
    start,
    end,
    roomTypeId
}: GetSeasonPipelineParams & { roomTypeId?: Types.ObjectId }): Stage[] => {
    const seasonPipeline = getSeasonPipeline({ houseId, start, end });
    seasonPipeline.push(
        {
            $lookup: {
                from: "SeasonPrices",
                let: { seasonId: "$seasonId" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$season", "$$seasonId"]
                                    },
                                    roomTypeId
                                        ? {
                                              $eq: ["$roomType", roomTypeId]
                                          }
                                        : {}
                                ]
                            }
                        }
                    }
                ],
                as: "seasonPrices"
            }
        },
        {
            $addFields: {
                seasonPrices: {
                    $map: {
                        input: "$seasonPrices",
                        as: "sp",
                        in: {
                            roomTypeId: "$$sp.roomType",
                            defaultPrice: "$$sp.defaultPrice",
                            price: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$$sp.dailyPriceList",
                                            as: "list",
                                            cond: {
                                                $eq: [
                                                    "$$list.day",
                                                    {
                                                        $arrayElemAt: [
                                                            [
                                                                "SUN",
                                                                "MON",
                                                                "TUE",
                                                                "WED",
                                                                "THU",
                                                                "FRI",
                                                                "SAT"
                                                            ],
                                                            {
                                                                $subtract: [
                                                                    {
                                                                        $dayOfWeek:
                                                                            "$_id"
                                                                    },
                                                                    1
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    }
                }
            }
        },
        {
            $project: {
                season: "$seasonId",
                prices: {
                    $map: {
                        input: "$seasonPrices",
                        as: "list",
                        in: {
                            roomType: "$$list.roomTypeId",
                            price: {
                                $cond: {
                                    if: {
                                        $ifNull: ["$$list.price", false]
                                    },
                                    then: "$$list.price.price",
                                    else: "$$list.defaultPrice"
                                }
                            }
                        }
                    }
                }
            }
        },
        {
            $lookup: {
                from: "RoomPrices",
                let: {
                    date: "$_id",
                    prices: "$prices",
                    roomTypes: "$prices.roomType"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $in: ["$roomType", "$$roomTypes"]
                                    },
                                    {
                                        $eq: ["$date", "$$date"]
                                    }
                                ]
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            roomType: "$roomType",
                            price: "$price"
                        }
                    }
                ],
                as: "roomPrice"
            }
        },
        {
            $project: {
                prices: {
                    $let: {
                        vars: {
                            ist: {
                                $setIntersection: [
                                    "$prices.roomType",
                                    "$roomPrice.roomType"
                                ]
                            },
                            onlyPrices: {
                                $setDifference: [
                                    "$prices.roomType",
                                    "$roomPrice.roomType"
                                ]
                            }
                        },
                        in: {
                            $concatArrays: [
                                {
                                    $filter: {
                                        input: "$prices",
                                        as: "price",
                                        cond: {
                                            $in: [
                                                "$$price.roomType",
                                                "$$onlyPrices"
                                            ]
                                        }
                                    }
                                },
                                {
                                    $filter: {
                                        input: "$roomPrice",
                                        as: "roomPrice",
                                        cond: {
                                            $in: [
                                                "$$roomPrice.roomType",
                                                "$$ist"
                                            ]
                                        }
                                    }
                                }
                            ]
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

export { getSeasonPipeline, getPricePipeline as getSesaonPricePipeLine };
