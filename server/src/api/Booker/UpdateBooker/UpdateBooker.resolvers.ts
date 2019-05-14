import { BookerModel } from "../../../models/Booker";
import { transformBooker } from "../../../models/merge/merge";
import {
    UpdateBookerMutationArgs,
    UpdateBookerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        UpdateBooker: privateResolver(
            async (
                _,
                { bookerId, ...args }: UpdateBookerMutationArgs
            ): Promise<UpdateBookerResponse> => {
                const existingBooker = await BookerModel.findById(bookerId);
                if (!existingBooker) {
                    return {
                        booker: null,
                        ok: false,
                        error: "존재하지 않는 BookerId"
                    };
                }
                await existingBooker.update(removeUndefined(args));
                return {
                    ok: true,
                    error: null,
                    booker: await transformBooker.bind(
                        transformBooker,
                        existingBooker._id
                    )
                };
            }
        )
    }
};
export default resolvers;
