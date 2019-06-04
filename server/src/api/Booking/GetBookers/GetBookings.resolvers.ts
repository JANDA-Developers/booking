import { Types } from "mongoose";
import { bookingModel } from "../../../models/bookingss";
import { extractbookings } from "../../../models/merge/merge";
import {
    GetbookingsQueryArgs,
    GetbookingsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        Getbookings: privateResolver(
            async (
                _,
                { houseId, count, page, filter }: GetbookingsQueryArgs
            ): Promise<GetbookingsResponse> => {
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

                    const bookings = await bookingModel
                        .find(removeUndefined(filterQuery))
                        .skip((p - 1) * c)
                        .limit(c);

                    const totalPage = Math.ceil(
                        (await bookingModel.countDocuments()) / c
                    );
                    // 필터 추가 ㄱㄱ
                    return {
                        ok: true,
                        error: null,
                        bookings: await extractbookings.bind(
                            extractbookings,
                            bookings
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
                        bookings: [],
                        pageInfo: null
                    };
                }
            }
        )
    }
};
export default resolvers;
