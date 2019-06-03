import { Types } from "mongoose";
import { BookerModel } from "../../../models/Booker";
import { extractBookers } from "../../../models/merge/merge";
import { GetBookersQueryArgs, GetBookersResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBookers: privateResolver(
            async (
                _,
                { houseId, count, page, filter }: GetBookersQueryArgs
            ): Promise<GetBookersResponse> => {
                try {
                    const p = page || 1;
                    const c = count || 1;
                    const filterQuery: {
                        start?: any;
                        end?: any;
                        name?: RegExp;
                        createdAt?: Date;
                        house: Types.ObjectId;
                    } = { house: new Types.ObjectId(houseId) };

                    if (filter) {
                        filterQuery.start =
                            (filter.stayDate && {
                                $lte: new Date(filter.stayDate)
                            }) ||
                            undefined;
                        filterQuery.end =
                            (filter.stayDate && {
                                $gte: new Date(filter.stayDate)
                            }) ||
                            undefined;
                        filterQuery.name =
                            (filter.name && new RegExp(filter.name, "i")) ||
                            undefined;
                        filterQuery.createdAt =
                            (filter.createdAt && new Date(filter.createdAt)) ||
                            undefined;
                    }

                    console.log(filterQuery);

                    const bookers = await BookerModel.find(
                        removeUndefined(filterQuery)
                    )
                        .skip((p - 1) * c)
                        .limit(c);

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
