import { Types } from "mongoose";
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
                const bookerId = new Types.ObjectId(bookerInstance._id);
                // Booker 생성 완료
                const bookings: Array<
                    InstanceType<BookingSchema>
                > = await Promise.all(
                    await guest.map(async gst => {
                        const booking = await new BookingModel({
                            house: new Types.ObjectId(booker.house),
                            booker: new Types.ObjectId(bookerId),
                            roomType: new Types.ObjectId(gst.roomTypeId),
                            price: gst.price,
                            discountedPrice: gst.discountedPrice,
                            start,
                            end
                        });
                        const guests: Types.ObjectId[] = [];
                        for (let i = 0; i < gst.count; i++) {
                            guests.push(
                                (await new GuestModel({
                                    house: new Types.ObjectId(booker.house),
                                    booker: bookerId,
                                    roomType: new Types.ObjectId(
                                        gst.roomTypeId
                                    ),
                                    booking: new Types.ObjectId(booking._id),
                                    pricingType: gst.pricingType,
                                    gender: gst.genders && gst.genders[i]
                                }).save())._id
                            );
                        }
                        booking.guests = guests;
                        return await booking.save();
                    })
                );
                bookerInstance.bookings = bookings.map(
                    b => new Types.ObjectId(b._id.toString())
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
