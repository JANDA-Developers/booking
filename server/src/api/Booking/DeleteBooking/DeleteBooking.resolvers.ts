import { bookingModel } from "../../../models/bookingss";
import {
    DeletebookingMutationArgs,
    DeletebookingResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        Deletebooking: privateResolver(
            async (
                _,
                { bookingId }: DeletebookingMutationArgs
            ): Promise<DeletebookingResponse> => {
                const bookingInstance = await bookingModel.findById(bookingId);
                if (!bookingInstance) {
                    return {
                        ok: false,
                        error: "존재하지 않는 bookingId"
                    };
                }
                bookingInstance.deleteThis();
                return {
                    ok: true,
                    error: null
                };
            }
        )
    }
};
export default resolvers;
