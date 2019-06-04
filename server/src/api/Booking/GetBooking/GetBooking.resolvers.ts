import { bookingModel } from "../../../models/bookingss";
import { extractbooking } from "../../../models/merge/merge";
import { GetbookingQueryArgs, GetbookingResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        Getbooking: privateResolver(
            async (
                _,
                { bookingId }: GetbookingQueryArgs
            ): Promise<GetbookingResponse> => {
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
