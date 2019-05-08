import * as _ from "lodash";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel } from "../../../models/Booker";
import { BookingModel, BookingSchema } from "../../../models/Booking";
import {
    createGuestInstances,
    GuestModel,
    GuestSchema
} from "../../../models/Guest";
import { HouseModel } from "../../../models/House";
import { extractBookings } from "../../../models/merge/merge";
import { RoomTypeModel } from "../../../models/RoomType";
import { GenderEnum } from "../../../types/enums";
import {
    CreateBookingMutationArgs,
    CreateBookingResponse,
    RoomCapacity
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateBooking: async (
            __,
            { bookingParams }: CreateBookingMutationArgs
        ): Promise<CreateBookingResponse> => {
            const { booker, start, end, guestInputs } = bookingParams;

            try {
                // Booker 생성
                const bookerInstance = new BookerModel({
                    ...booker,
                    house: new Types.ObjectId(booker.house)
                });
                await bookerInstance.hashPassword();
                const bookerObjId = new Types.ObjectId(bookerInstance._id);
                // Booker 생성 완료
                const house = await HouseModel.findById(booker.house);
                if (!house) {
                    return {
                        ok: false,
                        error: "존재하지 않는 HouseID",
                        bookings: []
                    };
                }
                const houseObjId = new Types.ObjectId(house._id);
                const bookings: Array<
                    InstanceType<BookingSchema>
                > = await Promise.all(
                    await guestInputs.map(
                        async ({
                            price,
                            discountedPrice,
                            pricingType,
                            roomTypeId,
                            countFemaleGuest,
                            countMaleGuest,
                            countRoom
                        }) => {
                            const booking = await new BookingModel({
                                house: houseObjId,
                                booker: bookerObjId,
                                roomType: new Types.ObjectId(roomTypeId),
                                price,
                                discountedPrice,
                                start,
                                end
                            });
                            const roomType = await RoomTypeModel.findById(
                                roomTypeId
                            );
                            if (!roomType) {
                                throw new Error(
                                    "치명적 오류... roomType이 존재하지 않음"
                                );
                            }
                            const genderCounts: Array<{
                                gender?: GenderEnum;
                                count: number;
                            }> = [
                                {
                                    gender: undefined,
                                    count: countRoom
                                },
                                {
                                    gender: GenderEnum.MALE,
                                    count: countMaleGuest
                                },
                                {
                                    gender: GenderEnum.FEMALE,
                                    count: countFemaleGuest
                                }
                            ].filter(genderCount => genderCount.count !== 0);
                            const isDomitory =
                                roomType.pricingType === "DOMITORY";
                            const gender =
                                countFemaleGuest === 0
                                    ? GenderEnum.MALE
                                    : countMaleGuest === 0
                                    ? GenderEnum.FEMALE
                                    : undefined;
                            const allocatableRooms: RoomCapacity[] = _.orderBy(
                                await roomType.getRoomCapacitiesWithRoomIdForDomitory(
                                    start,
                                    end
                                ),
                                ["guestGender", "availableCount"],
                                ["asc", "asc"]
                            ).filter(capacity => {
                                if (!isDomitory) {
                                    return !(
                                        capacity.roomGender === "FEMALE" ||
                                        capacity.roomGender === "MALE"
                                    );
                                }
                                // 이하 도미토리 방식인 경우.
                                if (!gender) {
                                    return true;
                                }
                                return (
                                    capacity.guestGender === gender ||
                                    !capacity.guestGender
                                );
                            });
                            // TODO: 배정하는거 만들긔... allocatableRooms & genderCounts 콜라보해서...
                            const guestInstances = _.flatMap(
                                genderCounts.map(genderCount => {
                                    const guestInances = createGuestInstances(
                                        bookerObjId,
                                        houseObjId,
                                        roomTypeId,
                                        booking._id,
                                        pricingType,
                                        booker.name,
                                        start,
                                        end,
                                        genderCount.count,
                                        genderCount.gender
                                    );
                                    return guestInances;
                                })
                            ).map(
                                (
                                    guestInstance: InstanceType<GuestSchema>,
                                    index: number
                                ) => {
                                    let i = 0;
                                    allocatableRooms.forEach(roomCapacity => {
                                        if (
                                            i < index + 1 &&
                                            index + 1 <
                                                i + roomCapacity.availableCount
                                        ) {
                                            guestInstance.allocatedRoom = new Types.ObjectId(
                                                roomCapacity.roomId
                                            );
                                        }
                                        i = i + roomCapacity.availableCount;
                                    });
                                    return guestInstance;
                                }
                            );
                            await GuestModel.insertMany(guestInstances);
                            console.log(guestInstances);
                            console.log(allocatableRooms);

                            // booking.guests = guests;
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
                    bookings: await extractBookings(bookings)
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    bookings: []
                };
            }
        }
    }
};
export default resolvers;
