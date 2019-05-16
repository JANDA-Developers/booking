import * as _ from "lodash";
import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel } from "../../../models/Booker";
import { BookingSchema } from "../../../models/Booking";
import { GuestModel, GuestSchema } from "../../../models/Guest";
import { extractBookings } from "../../../models/merge/merge";
import { RoomModel } from "../../../models/Room";
import { RoomTypeModel } from "../../../models/RoomType";
import { GenderEnum } from "../../../types/enums";
import {
    CreateBookingMutationArgs,
    CreateBookingResponse,
    Gender,
    RoomGender
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateBooking: async (
            __,
            { bookingParams }: CreateBookingMutationArgs
        ): Promise<CreateBookingResponse> => {
            const {
                booker: bookerArgs,
                start,
                end,
                guestInputs
            } = bookingParams;

            try {
                // Booker 생성
                const bookerInstance = new BookerModel({
                    ...bookerArgs,
                    house: new Types.ObjectId(bookerArgs.house)
                });
                await bookerInstance.hashPassword();
                // Booker 생성 완료
                const bookings: Array<
                    InstanceType<BookingSchema>
                > = await Promise.all(
                    await guestInputs.map(
                        async ({
                            pricingType,
                            roomTypeId,
                            countFemaleGuest,
                            countMaleGuest,
                            countRoom,
                            ...args
                        }) => {
                            const roomTypeInstance = await RoomTypeModel.findById(
                                roomTypeId
                            );
                            if (!roomTypeInstance) {
                                throw new Error(
                                    "치명적 오류... roomType이 존재하지 않음"
                                );
                            }
                            // TODO: roomType 에서 총 사람수 count 해서 예약 가능한지 확인해야함...
                            const booking = await bookerInstance.createBookingInstance(
                                {
                                    start,
                                    end,
                                    roomTypeInstance,
                                    ...args
                                }
                            );

                            const roomInstances = _.orderBy(
                                await Promise.all(
                                    await RoomModel.find({
                                        _id: {
                                            $in: roomTypeInstance.rooms.map(
                                                roomId =>
                                                    new Types.ObjectId(roomId)
                                            )
                                        }
                                    })
                                ),
                                ["guestGender", "availableCount"],
                                ["asc", "asc"]
                            );

                            const genderCounts: Array<{
                                gender?: GenderEnum;
                                count: number;
                            }> = [
                                {
                                    gender: GenderEnum.MALE,
                                    count: countMaleGuest
                                },
                                {
                                    gender: GenderEnum.FEMALE,
                                    count: countFemaleGuest
                                },
                                {
                                    gender: undefined,
                                    count: countRoom
                                }
                            ].filter(genderCount => genderCount.count !== 0);
                            const guestInstances = _.flatMap(
                                await Promise.all(
                                    genderCounts.map(async genderCount => {
                                        return await booking.createGuestInstances(
                                            {
                                                bookerName: bookerArgs.name,
                                                pricingType,
                                                genderCount
                                            }
                                        );
                                    })
                                )
                            ).sort((g1, g2) => {
                                return g1.gender === g2.gender ? 1 : 0;
                            });

                            const availableGenderBeds = await Promise.all(
                                roomInstances.map(async instance => {
                                    return await instance.getAvailableGenderAndBed(
                                        start,
                                        end
                                    );
                                })
                            );
                            const totalAvailableCount = availableGenderBeds
                                .map(v => {
                                    return v.availableCount;
                                })
                                .reduce((count1, count2) => count1 + count2);

                            if (guestInstances.length > totalAvailableCount) {
                                throw new Error("사람수 안맞음... ");
                            }

                            guestInstances.forEach(guest => {
                                let isSuccess = false;
                                availableGenderBeds.forEach(
                                    availableGenderBed => {
                                        if (!isSuccess) {
                                            isSuccess = allocateFunc(
                                                availableGenderBed,
                                                guest
                                            );
                                        }
                                    }
                                );
                            });
                            await GuestModel.insertMany(guestInstances);
                            booking.guests = guestInstances.map(
                                guest => new Types.ObjectId(guest._id)
                            );
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
const allocateFunc = (
    {
        availableBeds,
        availableGenders,
        availableCount,
        roomGender,
        roomId
    }: {
        availableGenders: Gender[];
        availableCount: number;
        availableBeds: number[];
        roomGender: RoomGender;
        roomId: Types.ObjectId;
    },
    guestInstance: InstanceType<GuestSchema>
): boolean => {
    if (availableBeds.length === 0) {
        return false;
    }
    const guestGender = guestInstance.gender;
    if (guestGender === null) {
        return false;
    }
    if (!availableGenders.includes(guestGender)) {
        return false;
    }
    guestInstance.allocatedRoom = roomId;
    guestInstance.bedIndex = availableBeds[0];
    if (roomGender !== "MIXED") {
        _.pull(availableGenders, guestGender !== "FEMALE" ? "FEMALE" : "MALE");
    }
    _.pull(availableBeds, guestInstance.bedIndex);
    availableCount = availableCount - 1;
    return true;
};
