import * as _ from "lodash";
import { Types } from "mongoose";
import { GuestModel } from "../../../models/Guest";
import {
    DeleteGuestsMutationArgs,
    DeleteGuestsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { asyncForEach } from "../../../utils/etc";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteGuests: privateResolver(
            async (
                __,
                { guestIds }: DeleteGuestsMutationArgs
            ): Promise<DeleteGuestsResponse> => {
                try {
                    const guestObjectIds = guestIds.map(
                        guestId => new Types.ObjectId(guestId)
                    );
                    const guestInstances = await GuestModel.find({
                        _id: { $in: guestObjectIds }
                    });
                    asyncForEach(guestInstances, async guestInstance => {
                        await guestInstance.unlinkWithBooker();
                    });
                    await GuestModel.remove({
                        _id: {
                            $in: guestObjectIds
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
