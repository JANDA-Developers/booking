import { ObjectId } from "bson";
import { SeasonModel } from "../../../models/Season";
import { selectNumberRange } from "../../../queries/queries";
import {
    ChangePriorityMutationArgs,
    ChangePriorityResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        ChangePriority: privateResolver(
            async (
                _,
                { houseId, seasonId, priority }: ChangePriorityMutationArgs
            ): Promise<ChangePriorityResponse> => {
                const existingSeasons = await SeasonModel.find(
                    {
                        house: new ObjectId(houseId)
                    },
                    {
                        priority: 1
                    }
                );
                if (existingSeasons.length) {
                    const originalPriority = existingSeasons.filter(
                        season => season._id === seasonId
                    )[0].priority;
                    const conditions = selectNumberRange(
                        originalPriority,
                        priority
                    );
                    await SeasonModel.updateMany(
                        {
                            _id: { $ne: new ObjectId(seasonId) },
                            priority: conditions.condition
                        },
                        { $inc: { priority: conditions.increment } },
                        { new: true }
                    );
                } else {
                    return {
                        ok: false,
                        error: "Other Season is not Exist",
                        season: null
                    };
                }
                return {
                    ok: false,
                    error: "UnderDevelop",
                    season: null
                };
            }
        )
    }
};

export default resolvers;
