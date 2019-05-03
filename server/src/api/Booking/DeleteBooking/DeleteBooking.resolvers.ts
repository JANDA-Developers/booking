import { Types } from "mongoose";
import { BookerModel } from "../../../models/Booker";
import { deleteBooking } from "../../../queries/queriesBooking";
import {
    DeleteBookingMutationArgs,
    DeleteBookingResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteBooking: privateResolver(
            async (
                _,
                { bookerId, bookingId }: DeleteBookingMutationArgs
            ): Promise<DeleteBookingResponse> => {
                try {
                    const result = deleteBooking(new Types.ObjectId(bookingId));
                    const bookerInstance = await BookerModel.findByIdAndUpdate(
                        bookerId,
                        {
                            $pull: {
                                bookings: new Types.ObjectId(bookingId)
                            }
                        },
                        {
                            new: true
                        }
                    );
                    if (!bookerInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 BookerID"
                        };
                    }
                    if (bookerInstance.bookings.length === 0) {
                        await bookerInstance.remove();
                    }
                    return result;
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
