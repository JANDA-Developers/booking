import * as _ from "lodash";
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
                __,
                { bookerId, params }: UpdateBookerMutationArgs
            ): Promise<UpdateBookerResponse> => {
                const existingBooker = await BookerModel.findById(bookerId);
                if (!existingBooker) {
                    return {
                        booker: null,
                        ok: false,
                        error: "존재하지 않는 BookerId"
                    };
                }
                const args = removeUndefined({
                    ...params,
                    dateRange: undefined
                });
                const dateRange = params.dateRange;
                if (dateRange) {
                    const { start, end } = {
                        start: new Date(dateRange.start),
                        end: new Date(dateRange.end)
                    };
                    console.log({
                        start,
                        end
                    });

                    // Booker 안에 있는 모든 Booking, Guest 들의 Start, End 를 수정한다.
                    // 1. 해당 날짜에 들어갈수있는지 다시 검사함.
                    // booker 안에 있는 booking에서 검사하기
                }

                await existingBooker.update(args);
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
