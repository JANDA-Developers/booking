import { BookerModel } from "../../../models/Booker";
import {
    DeleteBookerMutationArgs,
    DeleteBookerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        DeleteBooker: privateResolver(
            async (
                _,
                { bookerId }: DeleteBookerMutationArgs
            ): Promise<DeleteBookerResponse> => {
                const bookerInstance = await BookerModel.findById(bookerId);
                if (!bookerInstance) {
                    return {
                        ok: false,
                        error: "존재하지 않는 BookerId"
                    };
                }
                bookerInstance.deleteThis();
                return {
                    ok: true,
                    error: null
                };
            }
        )
    }
};
export default resolvers;
