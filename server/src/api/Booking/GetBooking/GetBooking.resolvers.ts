import { bookingModel } from "../../../models/Booking";
import { extractbooking } from "../../../models/merge/merge";
import { GetBookingQueryArgs, GetBookingResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBooking: privateResolver(
            async (
                _,
                { bookingId }: GetBookingQueryArgs
            ): Promise<GetBookingResponse> => {
                try {
                    const existingbooking = await bookingModel.findById(
                        bookingId
                    );
                    if (!existingbooking) {
                        return {
                            ok: false,
                            error: "존재하지 않는 bookingId 입니다",
                            booking: null
                        };
                    }
                    return {
                        ok: true,
                        error: null,
                        booking: await extractbooking.bind(
                            extractbooking,
                            existingbooking
                        )
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        booking: null
                    };
                }
            }
        )
    }
};

export default resolvers;
