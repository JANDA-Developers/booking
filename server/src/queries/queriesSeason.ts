import { Types } from "mongoose";
import {
    extractSeason,
    transformSeason,
    transformSeasons
} from "../models/merge/merge";
import { SeasonModel } from "../models/Season";
import { Season } from "../types/graph";
import { transformYMDToMD } from "../utils/transformData";

// 2019-03-21 여기까지 완벽
export const includeDateRangeWithOutYear = async (
    start: Date,
    end: Date,
    houseId: string
): Promise<Season[]> => {
    const st = transformYMDToMD(start);
    const ed = transformYMDToMD(end);
    const project = {
        house: "$house",
        sMD: {
            $toInt: {
                $dateToString: {
                    date: "$start",
                    format: "%m%d"
                }
            }
        },
        eMD: {
            $toInt: {
                $dateToString: {
                    date: "$end",
                    format: "%m%d"
                }
            }
        },
        priority: "$priority"
    };
    const matchHouseId = {
        house: {
            $eq: new Types.ObjectId(houseId)
        }
    };
    const matchDateRange = {
        $or: [
            {
                $and: [
                    {
                        $expr: {
                            $gte: ["$eMD", "$sMD"]
                        }
                    },
                    {
                        $or: [
                            {
                                $and: [
                                    {
                                        $expr: {
                                            $lte: [st, ed]
                                        }
                                    },
                                    {
                                        sMD: {
                                            $lte: ed
                                        }
                                    },
                                    {
                                        eMD: {
                                            $gte: st
                                        }
                                    }
                                ]
                            },
                            {
                                $and: [
                                    {
                                        $expr: {
                                            $gt: [st, ed]
                                        }
                                    },
                                    {
                                        $or: [
                                            {
                                                sMD: {
                                                    $lte: ed
                                                }
                                            },
                                            {
                                                eMD: {
                                                    $gt: st
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                $and: [
                    {
                        $expr: {
                            $gt: ["$sMD", "$eMD"]
                        }
                    },
                    {
                        $or: [
                            {
                                $expr: {
                                    $gt: ["$st", "$ed"]
                                }
                            },
                            {
                                eMD: {
                                    $gte: st
                                }
                            },
                            {
                                sMD: {
                                    $lte: ed
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };
    const sort = {
        priority: -1
    };
    const result = await SeasonModel.aggregate()
        .match(matchHouseId)
        .sort(sort)
        .project(project)
        .match(matchDateRange);
    if (result.length) {
        const ids: Types.ObjectId[] = result.map(season => {
            return new Types.ObjectId(season._id);
        });
        return await transformSeasons(ids);
    } else {
        return [];
    }
};

/**
 * 달, 일만 가지고 betweenDate
 * @param date 날짜... isoDate 형태임
 * @param houseId
 */
export const betweenDateWithoutYear = async (
    date: Date,
    houseId: string
): Promise<Season | null> => {
    const md = transformYMDToMD(date);
    const project = {
        house: "$house",
        sMD: {
            $toInt: {
                $dateToString: {
                    date: "$start",
                    format: "%m%d"
                }
            }
        },
        eMD: {
            $toInt: {
                $dateToString: {
                    date: "$end",
                    format: "%m%d"
                }
            }
        },
        priority: "$priority"
    };
    const match = {
        $and: [
            {
                house: new Types.ObjectId(houseId)
            },
            {
                $or: [
                    {
                        $and: [
                            {
                                $expr: {
                                    $gte: ["$eMD", "$sMD"]
                                }
                            },
                            {
                                $or: [
                                    {
                                        sMD: {
                                            $lte: md
                                        }
                                    },
                                    {
                                        eMD: {
                                            $gt: md
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        // TODO: 여기 문제 있다... 그냥 작은걸로 비교해서는 안되네 ㅜㅜ
                        $and: [
                            {
                                $expr: {
                                    $gt: ["$sMD", "$eMD"]
                                }
                            },
                            {
                                $or: [
                                    {
                                        sMD: {
                                            $lte: md
                                        }
                                    },
                                    {
                                        eMD: {
                                            $gt: md
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    const sort = {
        priority: -1
    };
    const result = await SeasonModel.aggregate()
        .sort(sort)
        .project(project)
        .match(match)
        .limit(1);
    if (result.length) {
        return await transformSeason(result[0]._id);
    } else {
        return null;
    }
};

export const getAllSeasons = async (houseId: string): Promise<Season[]> => {
    const seasons = await SeasonModel.find({
        house: new Types.ObjectId(houseId)
    });
    return await Promise.all(
        seasons.map(async season => {
            return await extractSeason(season);
        })
    );
};

export const getMaxPriority = async (
    houseId: string | Types.ObjectId
): Promise<number> => {
    try {
        const maxValue =
            (await SeasonModel.find({
                house: new Types.ObjectId(houseId)
            })).length - 1;
        return maxValue;
    } catch (error) {
        return 0;
    }
};
