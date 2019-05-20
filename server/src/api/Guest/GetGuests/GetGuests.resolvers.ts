import { HouseModel } from "../../../models/House";
import { transformGuests } from "../../../models/merge/merge";
import { GetGuestsQueryArgs, GetGuestsResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetGuests: privateResolver(
            async (
                _,
                { houseId, start, end }: GetGuestsQueryArgs
            ): Promise<GetGuestsResponse> => {
                try {
                    const house = await HouseModel.findById(houseId);
                    if (!house) {
                        return {
                            ok: false,
                            error: "집이 존재하지 않습니다",
                            guests: []
                        };
                    }
                    // const bookings = await BookingModel.find({
                    //     house: new Types.ObjectId(houseId),
                    //     start: {
                    //         $lte: new Date(end)
                    //     },
                    //     end: {
                    //         $gte: new Date(start)
                    //     }
                    // });
                    // if (bookings.length === 0) {
                    //     return {
                    //         ok: true,
                    //         error: null,
                    //         guests: []
                    //     };
                    // }
                    // const guestIds = bookings
                    //     .map(booking => {
                    //         return booking.guests;
                    //     })
                    //     .reduce((guestIds1, guestIds2) =>
                    //         guestIds1.concat(guestIds2)
                    //     );
                    return {
                        ok: true,
                        error: null,
                        guests: await transformGuests.bind(transformGuests, [])
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        guests: []
                    };
                }
            }
        )
    }
};
export default resolvers;
