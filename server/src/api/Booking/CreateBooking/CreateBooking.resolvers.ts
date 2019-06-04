import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { bookingModel, BookingSchema } from "../../../models/Booking";
import { GuestModel, GuestSchema } from "../../../models/Guest";
import { extractbooking } from "../../../models/merge/merge";
import {
    convertGenderArrToGuestGender,
    RoomTypeModel,
    RoomTypeSchema
} from "../../../models/RoomType";
import {
    CreateBookingMutationArgs,
    CreateBookingResponse,
    Gender,
    RoomCapacity
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { asyncForEach } from "../../../utils/etc";

import { Context } from "graphql-yoga/dist/types";
import * as _ from "lodash";
import { HouseSchema } from "../../../models/House";
import { removeUndefined } from "../../../utils/objFuncs";
import {
    privateResolver,
    privateResolverForPublicAccess
} from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateBooking: privateResolver(
            async (
                __,
                params: CreateBookingMutationArgs
            ): Promise<CreateBookingResponse> => {
                return await createbooking(params);
            }
        ),
        CreateBookingForBooker: privateResolverForPublicAccess(
            async (
                __,
                params: CreateBookingMutationArgs,
                ctx: Context
            ): Promise<CreateBookingResponse> => {
                return await createbooking(params, ctx);
            }
        )
    }
};

export default resolvers;

const createbooking = async (
    { bookingParams, sendSmsFlag }: CreateBookingMutationArgs,
    ctx?
): Promise<CreateBookingResponse> => {
    const { start, end } = {
        start: new Date(bookingParams.start),
        end: new Date(bookingParams.end)
    };
    const { bookerParams, guestInputs } = bookingParams;
    let houseId = bookerParams.house;
    if (ctx) {
        const { house }: { house: InstanceType<HouseSchema> } = ctx.req;
        houseId = house._id;
    }
    if (!houseId) {
        return {
            ok: false,
            error: "House 정보 에러",
            booking: null
        };
    }
    try {
        // 1. booking prototype 생성
        // 2. guestInputs 돌면서... roomType 별로 게스트 생성.
        const bookingInstance = new bookingModel({
            ...bookingParams,
            start,
            end,
            house: new Types.ObjectId(houseId)
        });
        await bookingInstance.hashPassword();
        bookingInstance.guests = [];
        let flag = true;
        const guests: Array<InstanceType<GuestSchema>> = [];
        await asyncForEach(
            guestInputs,
            async ({
                countFemaleGuest,
                countMaleGuest,
                countRoom,
                ...guestInput
            }) => {
                const roomTypeInstance = await RoomTypeModel.findById(
                    guestInput.roomTypeId
                );
                if (!roomTypeInstance) {
                    throw new Error("방타입이 없을리가 없다.");
                }
                const roomTypeCapacity = await roomTypeInstance.getCapacity(
                    start,
                    end
                );
                const roomCapacityList = roomTypeCapacity.roomCapacityList;

                const {
                    countAny,
                    countFemale,
                    countMale
                } = roomTypeCapacity.availablePeopleCount;
                if (
                    countFemaleGuest > countFemale ||
                    countMaleGuest > countMale ||
                    countRoom > countAny
                ) {
                    flag = false;
                    return;
                }

                // Female, Male, Female&Male 순으로 정렬함.
                const sortedCapacity = _.sortBy(roomCapacityList, [
                    o => {
                        const gender = convertGenderArrToGuestGender(
                            o.availableGenders
                        );
                        return gender === "FEMALE"
                            ? -1
                            : gender === "MALE"
                            ? 0
                            : 1;
                    },
                    "availableCount"
                ]);
                const female: { gender: Gender; count: number } = {
                    gender: "FEMALE",
                    count: countFemaleGuest
                };
                const male: { gender: Gender; count: number } = {
                    gender: "MALE",
                    count: countMaleGuest
                };
                const room: { gender: Gender | null; count: number } = {
                    gender: null,
                    count: countRoom
                };
                const femaleGuest = _.flatMap(
                    sortedCapacity.map(capacity => {
                        return createGuestWithbookingAndAllocateHere(
                            bookingInstance,
                            female,
                            roomTypeInstance,
                            capacity
                        );
                    })
                );
                const maleGuest = _.flatMap(
                    sortedCapacity.map(capacity => {
                        return createGuestWithbookingAndAllocateHere(
                            bookingInstance,
                            male,
                            roomTypeInstance,
                            capacity
                        );
                    })
                );

                const roomGuest = _.flatMap(
                    sortedCapacity.map(capacity => {
                        return createGuestWithbookingAndAllocateHere(
                            bookingInstance,
                            room,
                            roomTypeInstance,
                            capacity
                        );
                    })
                );
                const tempGuests = [...femaleGuest, ...maleGuest, ...roomGuest];
                guests.push(...tempGuests);
                // const dailyPrices: DailyPrice[] = [];
                // await asyncForEach(tempGuests, async g => {
                //     // 여기서 가격을 불러오는걸로
                // });
            }
        );
        bookingInstance.guests = guests.map(
            guest => new Types.ObjectId(guest._id)
        );
        bookingInstance.roomTypes = [
            ..._.uniq(guests.map(guest => guest.roomType))
        ];

        await GuestModel.insertMany(guests);
        if (!flag) {
            return {
                ok: false,
                error: "인원 에러",
                booking: null
            };
        }
        await bookingInstance.save();

        // TODO: 여기서 SMS 보내긔!!

        return {
            ok: true,
            error: null,
            booking: await extractbooking(bookingInstance)
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message,
            booking: null
        };
    }
};

// --------------------------------------------------------------------------------------------------------------------------------------

const createGuestWithbookingAndAllocateHere = (
    bookingInstance: InstanceType<BookingSchema>,
    genderData: { gender: Gender | null; count: number },
    roomTypeInstance: InstanceType<RoomTypeSchema>,
    roomCapacity: RoomCapacity,
    isUnsettled: boolean = false
): Array<InstanceType<GuestSchema>> => {
    const dateRange: { start: Date; end: Date } = bookingInstance;
    // 1. 현재 이방 예약 가능한지 확인...
    const bedCount = roomCapacity.emptyBeds.length;
    if (bedCount === 0 || roomCapacity.availableCount <= 0) {
        return [];
    }
    if (
        genderData.gender !== null &&
        !roomCapacity.availableGenders.includes(genderData.gender)
    ) {
        return [];
    }
    if (
        genderData.gender === null &&
        convertGenderArrToGuestGender(roomCapacity.availableGenders) !== "ANY"
    ) {
        return [];
    }
    const guestInstances: Array<InstanceType<GuestSchema>> = [];
    while (roomCapacity.availableCount > 0 && genderData.count > 0) {
        const guest = new GuestModel(
            removeUndefined({
                house: new Types.ObjectId(bookingInstance.house),
                booking: new Types.ObjectId(bookingInstance._id),
                name: bookingInstance.name,
                roomType: new Types.ObjectId(roomTypeInstance._id),
                pricingType: roomTypeInstance.pricingType,
                gender: genderData.gender,
                allocatedRoom: new Types.ObjectId(roomCapacity.roomId),
                bedIndex: roomCapacity.emptyBeds.shift(),
                isUnsettled,
                start: dateRange.start,
                end: dateRange.end
            })
        );
        guestInstances.push(guest);
        roomCapacity.availableCount--;
        genderData.count--;
    }

    if (
        roomCapacity.roomGender === "SEPARATELY" &&
        guestInstances.length !== 0 &&
        genderData.gender !== null
    ) {
        roomCapacity.availableGenders = [genderData.gender];
    }
    return guestInstances;
};
