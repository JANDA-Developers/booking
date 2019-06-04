import { bookingModel } from "../../../models/Booking";
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
                { bookingId }: DeleteBookingMutationArgs
            ): Promise<DeleteBookingResponse> => {
                const bookingInstance = await bookingModel.findById(bookingId);
                if (!bookingInstance) {
                    return {
                        ok: false,
                        error: "존재하지 않는 bookingId"
                    };
                }
                await bookingInstance.deleteThis();
                return {
                    ok: true,
                    error: null
                };
            }
        )
    }
};
export default resolvers;
