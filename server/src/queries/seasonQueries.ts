import { ObjectId } from "bson";
import { transformSeason } from "../models/merge/Merge";
import { SeasonModel } from "../models/Season";
import { Season } from "../types/graph";

/**
 * 달, 일만 가지고 betweenDate
 * @param date 날짜... isoDate 형태임
 * @param houseId
 */
export const betweenDateWithoutYear = async (
    date: Date,
    houseId: string
): Promise<Season | null> => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const dayOfMonth = d.getDate();
    const md = parseInt(month + String(dayOfMonth).padStart(2, "0"), 10);
    console.log({
        md
    });

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
                house: new ObjectId(houseId)
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
        .project(project)
        .match(match)
        .sort(sort)
        .limit(1);
    console.log({
        result
    });

    if (result.length) {
        return await transformSeason(result[0]._id);
    } else {
        return null;
    }
};
