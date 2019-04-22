import { BookerModel } from "../../../models/Booker";
import { extractBooker } from "../../../models/merge/merge";
import {
    CreateBookerMutationArgs,
    CreateBookerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateBooker: async (
            _,
            args: CreateBookerMutationArgs
        ): Promise<CreateBookerResponse> => {
            try {
                if (!args.agreePrivacyPolicy) {
                    return {
                        ok: false,
                        error: "개인정보 활용 정책에 동의해주세요.",
                        booker: null
                    };
                }
                const booker = new BookerModel({
                    ...args
                });
                await booker.save();
                return {
                    ok: true,
                    error: null,
                    booker: extractBooker.bind(extractBooker, booker)
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    booker: null
                };
            }
        }
    }
};

export default resolvers;
