import { Types } from "mongoose";
import { bookingModel } from "../../../models/Booking";
import { extractbookings } from "../../../models/merge/merge";
import {
    GetBookingsQueryArgs,
    GetBookingsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { removeUndefined } from "../../../utils/objFuncs";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBookings: privateResolver(
            async (
                _,
                { houseId, count, page, filter }: GetBookingsQueryArgs
            ): Promise<GetBookingsResponse> => {
                try {
                    const p = page || 1;
                    const c = count || 1;
                    const filterQuery: {
                        start?: any;
                        end?: any;
                        name?: RegExp;
                        createdAt?: Date;
                        house: Types.ObjectId;
                        phoneNumber?: RegExp;
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
                        filterQuery.phoneNumber =
                            (filter.phoneNumnber &&
                                new RegExp(filter.phoneNumnber, "i")) ||
                            undefined;
                    }

                    console.log(filterQuery);

                    const bookings = await bookingModel
                        .find(removeUndefined(filterQuery))
                        .sort({ createdAt: -1 })
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
