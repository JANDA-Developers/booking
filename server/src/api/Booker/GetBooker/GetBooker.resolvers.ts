import { BookerModel } from "../../../models/Booker";
import { extractBooker } from "../../../models/merge/merge";
import { GetBookerQueryArgs, GetBookerResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBooker: privateResolver(
            async (
                _,
                { bookerId }: GetBookerQueryArgs
            ): Promise<GetBookerResponse> => {
                try {
                    const existingBooker = await BookerModel.findById(bookerId);
                    if (!existingBooker) {
                        return {
                            ok: false,
                            error: "존재하지 않는 BookerId 입니다",
                            booker: null
                        };
                    }
                    return {
                        ok: true,
                        error: null,
                        booker: await extractBooker.bind(
                            extractBooker,
                            existingBooker
                        )
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
