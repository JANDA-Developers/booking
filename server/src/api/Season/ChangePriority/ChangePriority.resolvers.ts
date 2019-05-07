import { Types } from "mongoose";
import { extractSeason } from "../../../models/merge/merge";
import { SeasonModel } from "../../../models/Season";
import { selectNumberRangeQuery } from "../../../queries/queries";
import {
    ChangePriorityMutationArgs,
    ChangePriorityResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        ChangePriority: privateResolver(
            async (
                _,
                { houseId, seasonId, priority }: ChangePriorityMutationArgs
            ): Promise<ChangePriorityResponse> => {
                const existingSeason = await SeasonModel.findById(seasonId);
                if (!existingSeason) {
                    return {
                        ok: false,
                        error: "존재하지 않는 SeasonId",
                        season: null
                    };
                }
                await existingSeason.update({
                    priority
                });
                const conditions = selectNumberRangeQuery(
                    priority,
                    existingSeason.priority
                );

                await SeasonModel.updateMany(
                    {
                        _id: {
                            $ne: new Types.ObjectId(seasonId)
                        },
                        priority: conditions.condition
                    },
                    {
                        $inc: {
                            priority: conditions.increment
                        }
                    },
                    {
                        new: true
                    }
                );
                return {
                    ok: true,
                    error: null,
                    season: await extractSeason.bind(
                        extractSeason,
                        existingSeason
                    )
                };
            }
        )
    }
};

export default resolvers;
