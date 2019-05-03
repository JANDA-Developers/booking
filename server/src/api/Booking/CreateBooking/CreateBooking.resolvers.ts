import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel } from "../../../models/Booker";
import { BookingModel, BookingSchema } from "../../../models/Booking";
import { GuestModel } from "../../../models/Guest";
import { HouseModel } from "../../../models/House";
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
                const bookerInstance = new BookerModel({
                    ...booker,
                    house: new Types.ObjectId(booker.house)
                });
                await bookerInstance.hashPassword();
                const bookerId = new Types.ObjectId(bookerInstance._id);
                // Booker 생성 완료
                const house = await HouseModel.findById(booker.house);
                if (!house) {
                    return {
                        ok: false,
                        error: "존재하지 않는 HouseID",
                        booking: []
                    };
                }
                const houseObjectId = new Types.ObjectId(house._id);
                const bookings: Array<
                    InstanceType<BookingSchema>
                > = await Promise.all(
                    await guest.map(
                        async ({
                            price,
                            discountedPrice,
                            pricingType,
                            genders,
                            roomTypeId,
                            count
                        }) => {
                            const booking = await new BookingModel({
                                house: houseObjectId,
                                booker: new Types.ObjectId(bookerId),
                                roomType: new Types.ObjectId(roomTypeId),
                                price,
                                discountedPrice,
                                start,
                                end
                            });
                            const guests: Types.ObjectId[] = [];
                            for (let i = 0; i < count; i++) {
                                guests.push(
                                    (await new GuestModel({
                                        house: houseObjectId,
                                        booker: bookerId,
                                        roomType: new Types.ObjectId(
                                            roomTypeId
                                        ),
                                        booking: new Types.ObjectId(
                                            booking._id
                                        ),
                                        name: booker.name,
                                        start,
                                        end,
                                        pricingType,
                                        gender: genders && genders[i]
                                    }).save())._id
                                );
                            }
                            booking.guests = guests;
                            return await booking.save();
                        }
                    )
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
