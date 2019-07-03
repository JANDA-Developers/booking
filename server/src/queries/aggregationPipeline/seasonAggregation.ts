import { Types } from "mongoose";
import { Stage } from "../../types/aggregationStage";
import { removeUndefined } from "../../utils/objFuncs";
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
}: GetSeasonPipelineParams): Stage[] => [
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

const getSesaonPricePipeLine = ({
    houseId,
    start,
    end,
    roomTypeId
}: GetSeasonPipelineParams & { roomTypeId?: Types.ObjectId }): Stage[] => {
    const seasonPipeline = getSeasonPipeline({ houseId, start, end });
    seasonPipeline.push({
        $lookup: {
            from: "SeasonPrices",
            let: removeUndefined({
                seasonId: "$seasonId",
                roomTypeId
            }),
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                roomTypeId
                                    ? {
                                          $eq: ["$$roomTypeId", "$roomType"]
                                      }
                                    : {},
                                {
                                    $eq: ["$$seasonId", "$season"]
                                }
                            ]
                        }
                    }
                }
            ],
            as: "seasonPrices"
        }
    });
    return seasonPipeline;
};

export { getSeasonPipeline, getSesaonPricePipeLine };
