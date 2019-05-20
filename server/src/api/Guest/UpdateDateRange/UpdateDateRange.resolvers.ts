import { Types } from "mongoose";
import { BookerModel } from "../../../models/Booker";
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
                    const bookerInstance = await BookerModel.findById(
                        bookingId
                    );
                    if (!bookerInstance) {
                        return {
                            ok: false,
                            error: "존재하지 않는 BookerId",
                            booker: null
                        };
                    }
                    const bookerObjId = new Types.ObjectId(bookerInstance._id);
                    const { start, end } = dateRange;
                    console.log({
                        start,
                        end,
                        bookerObjId
                    });

                    // const updateTargetGuest =

                    return {
                        booker: null,
                        error: "",
                        ok: false
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        booker: null
                    };
                }
            }
        )
    }
};
export default resolvers;
