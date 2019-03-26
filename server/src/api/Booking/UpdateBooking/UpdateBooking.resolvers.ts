import { BookingModel } from "../../../models/Booking";
import {
    UpdateBookingMutationArgs,
    UpdateBookingResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateBooking: async (
            _,
            {
                bookingId,
                bookingStatus,
                end,
                start,
                price
            }: UpdateBookingMutationArgs
        ): Promise<UpdateBookingResponse> => {
            const booking = await BookingModel.findById(bookingId);
            console.log(booking);
            
            return {
                ok: false,
                error: "개발중",
                booking: []
            }
        }
    }
};

export default resolvers;
