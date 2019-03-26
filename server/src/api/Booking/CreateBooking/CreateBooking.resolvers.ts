import { ObjectId } from "bson";
import { InstanceType } from "typegoose";
import { BookerModel } from "../../../models/Booker";
import { BookingModel, BookingSchema } from "../../../models/Booking";
import { GuestModel } from "../../../models/Guest";
import { extractBookings } from "../../../models/merge/merge";
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
                const bookings: Array<
                    InstanceType<BookingSchema>
                > = await Promise.all(
                    await guest.map(async gst => {
                        const booking = await new BookingModel({
                            house: new ObjectId(booker.house),
                            booker: new ObjectId(bookerId),
                            roomType: new ObjectId(gst.roomTypeId),
                            price: gst.price,
                            discountedPrice: gst.discountedPrice,
                            start,
                            end
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
                        return await booking.save();
                    })
                );
                bookerInstance.bookings = bookings.map(
                    b => new ObjectId(b._id.toString())
                );
                await bookerInstance.save();
                return {
                    ok: true,
                    error: null,
                    booking: await extractBookings(bookings)
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    booking: []
                };
            }
        }
    }
};
export default resolvers;
