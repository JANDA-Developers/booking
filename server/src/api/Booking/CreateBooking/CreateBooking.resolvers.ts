import { ObjectId } from "bson";
import { BookerModel } from "../../../models/Booker";
import { BookingModel } from "../../../models/Booking";
import { GuestModel } from "../../../models/Guest";
import {
    CreateBookingMutationArgs,
    CreateBookingResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateBooking: async (
            _,
            { bookingParams }: CreateBookingMutationArgs
        ): Promise<CreateBookingResponse> => {
            const { booker, start, end, guest } = bookingParams;
            try {
                // Booker 생성
                const bookerInstance = new BookerModel(booker);
                await bookerInstance.hashPassword();
                const bookerId = new ObjectId(bookerInstance._id);
                // Booker 생성 완료
                const bookingIds: ObjectId[] = await Promise.all(await guest.map(async gst => {
                    const booking = await new BookingModel({
                        house: new ObjectId(booker.house),
                        booker: new ObjectId(bookerId),
                        roomType: new ObjectId(gst.roomTypeId),
                        price: gst.price,
                        discountedPrice: gst.discountedPrice
                    });
                    const guests: ObjectId[] = [];
                    for (let i = 0; i < gst.count; i++) {
                        guests.push(
                            (await new GuestModel({
                                house: new ObjectId(booker.house),
                                booker: bookerId,
                                roomType: new ObjectId(gst.roomTypeId),
                                booking: new ObjectId(booking._id),
                                start,
                                end,
                                guestType: gst.guestType,
                                gender: gst.genders && gst.genders[i]
                            }).save())._id
                        );
                    }
                    booking.guests = guests;
                    return new ObjectId((await booking.save())._id);
                }));
                bookerInstance.bookings = bookingIds;
                await bookerInstance.save();
                return {
                    ok: true,
                    error: "개발중 ㅜ",
                    booking: null
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    booking: null
                };
            }
        }
    }
};
export default resolvers;
