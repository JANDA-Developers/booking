import { BookingModel } from "../../../models/Booking";
import { GuestModel } from "../../../models/Guest";
import { extractbooking } from "../../../models/merge/merge";
import {
    UpdateBlockOptionMutationArgs,
    UpdateBlockOptionResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateBlockOption: privateResolver(
            async (
                __: any,
                {
                    guestId,
                    blockOption,
                    applyWithBooking
                }: UpdateBlockOptionMutationArgs
            ): Promise<UpdateBlockOptionResponse> => {
                const guestInst = await GuestModel.findById(guestId);
                if (!guestInst) {
                    return {
                        ok: false,
                        error: "존재하지 않는 GuestId",
                        booking: null
                    };
                }
                if (applyWithBooking) {
                    const bookingInst = await BookingModel.findById(
                        guestInst.booking
                    );
                    if (!bookingInst) {
                        return {
                            ok: false,
                            error: "존재하지 않는 BookingId",
                            booking: null
                        };
                    }
                    bookingInst.blockOption = {
                        ...bookingInst.blockOption,
                        ...blockOption
                    };
                    await bookingInst.save();
                    await GuestModel.updateMany(
                        {
                            _id: {
                                $in: bookingInst.guests
                            }
                        },
                        {
                            $set: {
                                blockOption: removeUndefined(blockOption)
                            }
                        }
                    );
                    return {
                        ok: true,
                        error: null,
                        booking: await extractbooking.bind(
                            extractbooking,
                            bookingInst
                        )
                    };
                } else {
                    guestInst.blockOption = {
                        ...guestInst.blockOption,
                        ...blockOption
                    };
                    await guestInst.save();
                    return {
                        ok: true,
                        error: null,
                        booking: null
                    };
                }
            }
        )
    }
};
export default resolvers;
