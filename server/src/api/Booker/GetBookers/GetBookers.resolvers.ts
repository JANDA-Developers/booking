import { Types } from "mongoose";
import { BookerModel } from "../../../models/Booker";
import { extractBookers } from "../../../models/merge/merge";
import { GetBookersQueryArgs, GetBookersResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBookers: privateResolver(
            async (
                _,
                { houseId, count, page }: GetBookersQueryArgs
            ): Promise<GetBookersResponse> => {
                try {
                    const p = page || 1;
                    const c = count || 1;
                    const bookers = await BookerModel.find({
                        house: new Types.ObjectId(houseId)
                    })
                        .skip((p - 1) * c)
                        .limit(c);

                    console.log({
                        bookers
                    });

                    const totalPage = Math.ceil(
                        (await BookerModel.countDocuments()) / c
                    );
                    // 필터 추가 ㄱㄱ
                    return {
                        ok: true,
                        error: null,
                        bookers: await extractBookers.bind(
                            extractBookers,
                            bookers
                        ),
                        pageInfo: {
                            currentPage: p,
                            rowCount: c,
                            totalPage
                        }
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        bookers: [],
                        pageInfo: null
                    };
                }
            }
        )
    }
};
export default resolvers;
