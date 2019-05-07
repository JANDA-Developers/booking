import { GuestModel } from "../../../models/Guest";
import { extractGuest } from "../../../models/merge/merge";
import {
    ToggleIsTempAllocatedMutationArgs,
    ToggleIsTempAllocatedResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        ToggleIsTempAllocated: privateResolver(
            async (
                _,
                { guestId, isTempAllocation }: ToggleIsTempAllocatedMutationArgs
            ): Promise<ToggleIsTempAllocatedResponse> => {
                try {
                    const existingGuest = await GuestModel.findById(guestId);
                    if (!existingGuest) {
                        return {
                            ok: false,
                            error: "존재하지 않는 guestId",
                            guest: null
                        };
                    }
                    existingGuest.isTempAllocation = isTempAllocation;
                    existingGuest.save();
                    return {
                        ok: true,
                        error: null,
                        guest: await extractGuest.bind(
                            extractGuest,
                            existingGuest
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        guest: null
                    };
                }
            }
        )
    }
};
export default resolvers;
