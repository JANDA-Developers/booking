import { Types } from "mongoose";
import { deleteBooker } from "../../../queries/queriesBooking";
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
                return deleteBooker(new Types.ObjectId(bookerId));
            }
        )
    }
};
export default resolvers;
