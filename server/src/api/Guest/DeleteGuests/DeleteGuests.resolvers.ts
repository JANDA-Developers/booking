import _ from "lodash";
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
                __: any,
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
                        await guestInstance.unlinkWithbooking();
                    });
                    await GuestModel.remove({
                        _id: {
                            $in: guestObjectIds
                        }
                    });
                    // 우선은 보류
                    // const bookingInstances = await Promise.all(
                    //     await guestInstances.map(async guestInstance => {
                    //         return await transformbooking(
                    //             guestInstance.booking
                    //         );
                    //     })
                    // );
                    // const trashBooking: Types.ObjectId[] = [];
                    // asyncForEach(bookingInstances, async bookingInstance => {
                    //     if (
                    //         bookingInstance &&
                    //         bookingInstance.guests.length === 0
                    //     ) {
                    //         trashBooking.push(
                    //             new Types.ObjectId(bookingInstance._id)
                    //         );
                    //     }
                    // });
                    // await BookingModel.remove({
                    //     _id: {
                    //         $in: trashBooking
                    //     }
                    // });
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
