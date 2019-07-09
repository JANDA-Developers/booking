import _ from "lodash";
import { Types } from "mongoose";
import { extractSeason } from "../models/merge/merge";
import { SeasonModel } from "../models/Season";
import { SeasonWithDate } from "../types/graph";
import {
    getSeasonPipeline,
    GetSeasonPipelineParams
} from "./aggregationPipeline/seasonAggregation";

const getSeasonDateList = async ({
    houseId,
    start,
    end
}: GetSeasonPipelineParams): Promise<SeasonWithDate[]> => {
    try {
        const seasonWithDateList: Array<{
            _id: Date;
            season: {
                _id: Types.ObjectId;
                priority: number;
            } | null;
        }> = await SeasonModel.aggregate(
            getSeasonPipeline({ houseId, start, end })
        );
        const seasonIds: string[] = _.uniqWith(
            seasonWithDateList
                .map(data => {
                    return data.season;
                })
                .filter(data => {
                    if (data) {
                        return true;
                    }
                    return false;
                }),
            _.isEqual
        );
        console.log({ seasonIds });

        const seasonInstances = await Promise.all(
            await seasonIds.map(async id => {
                const result = await SeasonModel.findById(id);
                if (!result) {
                    throw new Error("존재하지 않는 SeasonId");
                }
                return result;
            })
        );

        return seasonWithDateList.map(seasonWithDate => {
            return {
                _id: seasonWithDate._id,
                season: extractSeason.bind(
                    extractSeason,
                    seasonInstances.find(seasonInstance => {
                        if (seasonWithDate.season) {
                            if (
                                seasonWithDate.season._id.equals(
                                    seasonInstance._id
                                )
                            ) {
                                return true;
                            }
                        }
                        return false;
                    })
                )
            };
        });
    } catch (error) {
        throw error;
    }
};

export default getSeasonDateList;
