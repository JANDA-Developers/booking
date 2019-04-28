import { Types } from "mongoose";
import { BookingModel } from "../../../models/Booking";
import { extractBookings } from "../../../models/merge/merge";
import {
    GetBookingsQueryArgs,
    GetBookingsResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetBookings: privateResolver(
            async (
                _,
                { page, count, houseId }: GetBookingsQueryArgs
            ): Promise<GetBookingsResponse> => {
                try {
                    const p = page || 1;
                    const c = count || 1;
                    const bookings = await BookingModel.find({
                        house: new Types.ObjectId(houseId)
                    })
                        .skip(p * c)
                        .limit(c);

                    const totalPage = Math.ceil(
                        (await BookingModel.countDocuments()) / count
                    );
                    return {
                        ok: true,
                        error: null,
                        bookings: await extractBookings.bind(
                            extractBookings,
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
