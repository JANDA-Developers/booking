import { Types } from "mongoose";
import { bookingModel } from "../../../models/bookingss";
import {
    UpdateDateRangeMutationArgs,
    UpdateDateRangeResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateDateRange: privateResolver(
            async (
                __,
                { bookingId, dateRange }: UpdateDateRangeMutationArgs
            ): Promise<UpdateDateRangeResponse> => {
                try {
                    const bookingInstance = await bookingModel.findById(
                        bookingId
                    );
                    if (!bookingInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 bookingId",
                            booking: null
                        };
                    }
                    const bookingObjId = new Types.ObjectId(
                        bookingInstance._id
                    );
                    const { start, end } = dateRange;
                    console.log({
                        start,
                        end,
                        bookingObjId
                    });

                    // const updateTargetGuest =

                    return {
                        booking: null,
                        error: "",
                        ok: false
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
