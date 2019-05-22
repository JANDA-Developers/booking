import { Types } from "mongoose";
import { GuestModel } from "../../../models/Guest";
import {
    DeleteGuestsMutationArgs,
    DeleteGuestsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteGuests: privateResolver(
            async (
                _,
                { guestIds }: DeleteGuestsMutationArgs
            ): Promise<DeleteGuestsResponse> => {
                try {
                    await GuestModel.remove({
                        _id: {
                            $in: guestIds.map(
                                guestId => new Types.ObjectId(guestId)
                            )
                        }
                    });
                    return {
                        ok: true,
                        error: null
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
            }
        )
    }
};
export default resolvers;
