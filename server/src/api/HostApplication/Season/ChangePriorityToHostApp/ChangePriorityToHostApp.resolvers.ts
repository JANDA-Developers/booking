import { Types } from "mongoose";
import { extractSeason } from "../../../../models/merge/merge";
import { SeasonModel } from "../../../../models/Season";
import { selectNumberRangeQuery } from "../../../../queries/queries";
import { getMaxPriority } from "../../../../queries/queriesSeason";
import {
    ChangePriorityToHostAppMutationArgs,
    ChangePriorityToHostAppResponse
} from "../../../../types/graph";
import { Resolvers } from "../../../../types/resolvers";
import { privateResolver } from "../../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        ChangePriorityToHostApp: privateResolver(
            async (
                _,
                {
                    houseId,
                    seasonId,
                    priority
                }: ChangePriorityToHostAppMutationArgs
            ): Promise<ChangePriorityToHostAppResponse> => {
                const existingSeason = await SeasonModel.findById(seasonId);
                if (!existingSeason) {
                    return {
                        ok: false,
                        error: "존재하지 않는 SeasonId",
                        season: null
                    };
                }
                const priorityMax = await getMaxPriority(houseId);
                const priorityUpdateTarget =
                    priorityMax < priority
                        ? priorityMax
                        : priority < 0
                        ? 0
                        : priority;
                await existingSeason.update({
                    priority: priorityUpdateTarget
                });
                const conditions = selectNumberRangeQuery(
                    priorityUpdateTarget,
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
