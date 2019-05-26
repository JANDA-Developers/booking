import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel, BookerSchema } from "../../../models/Booker";
import { GuestModel, GuestSchema } from "../../../models/Guest";
import { extractBooker } from "../../../models/merge/merge";
import {
    convertGenderArrToGuestGender,
    RoomTypeModel,
    RoomTypeSchema
} from "../../../models/RoomType";
import {
    CreateBookerMutationArgs,
    CreateBookerResponse,
    Gender,
    RoomCapacity
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { asyncForEach } from "../../../utils/etc";

import { Context } from "graphql-yoga/dist/types";
import * as _ from "lodash";
import { HouseSchema } from "../../../models/House";
import { DailyPrice } from "../../../types/dailyPrice";
import { privateResolverForPublicAccess } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Mutation: {
        CreateBooker: async (
            __,
            params: CreateBookerMutationArgs
        ): Promise<CreateBookerResponse> => {
            return await createBooker(params);
        },
        CreateBookerForBooker: privateResolverForPublicAccess(
            async (
                __,
                params: CreateBookerMutationArgs,
                ctx: Context
            ): Promise<CreateBookerResponse> => {
                return await createBooker(params, ctx);
            }
        )
    }
};

export default resolvers;

const createBooker = async (
    { bookingParams }: CreateBookerMutationArgs,
    ctx?
): Promise<CreateBookerResponse> => {
    const { start, end } = {
        start: new Date(bookingParams.start),
        end: new Date(bookingParams.end)
    };
    const { bookerParams, guestInputs } = bookingParams;
    if (ctx) {
        const { house }: { house: InstanceType<HouseSchema> } = ctx.req;
        if (!new Types.ObjectId(house._id).equals(bookerParams.house)) {
            return {
                ok: false,
                error: "House 정보 에러",
                booker: null
            };
        }
    }
    try {
        // 1. booker prototype 생성
        // 2. guestInputs 돌면서... roomType 별로 게스트 생성.
        const bookerInstance = new BookerModel({
            ...bookerParams,
            start,
            end,
            house: new Types.ObjectId(bookerParams.house)
        });
        await bookerInstance.hashPassword();
        bookerInstance.guests = [];
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
                console.log(roomTypeCapacity);

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
                        return createGuestWithBookerAndAllocateHere(
                            bookerInstance,
                            female,
                            roomTypeInstance,
                            capacity
                        );
                    })
                );

                const maleGuest = _.flatMap(
                    sortedCapacity.map(capacity => {
                        return createGuestWithBookerAndAllocateHere(
                            bookerInstance,
                            male,
                            roomTypeInstance,
                            capacity
                        );
                    })
                );
                const roomGuest = _.flatMap(
                    sortedCapacity.map(capacity => {
                        return createGuestWithBookerAndAllocateHere(
                            bookerInstance,
                            room,
                            roomTypeInstance,
                            capacity
                        );
                    })
                );
                const tempGuests = [...femaleGuest, ...maleGuest, ...roomGuest];
                guests.push(...tempGuests);
                const dailyPrices: DailyPrice[] = [];
                await asyncForEach(tempGuests, async g => {
                    // 여기서 가격을 불러오는걸로
                });
                console.log({
                    dailyPrices
                });

                countFemaleGuest--;
            }
        );
        bookerInstance.guests = guests.map(
            guest => new Types.ObjectId(guest._id)
        );
        bookerInstance.roomTypes = [
            ..._.uniq(guests.map(guest => guest.roomType))
        ];
        console.log(guests);

        await GuestModel.insertMany(guests);
        if (!flag) {
            return {
                ok: false,
                error: "인원 에러",
                booker: null
            };
        }
        await bookerInstance.save();
        return {
            ok: true,
            error: null,
            booker: await extractBooker(bookerInstance)
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message,
            booker: null
        };
    }
};

// --------------------------------------------------------------------------------------------------------------------------------------

export const createGuest = (
    bookerInstance: InstanceType<BookerSchema>,
    gender: Gender,
    roomTypeInstance: InstanceType<RoomTypeSchema>
): InstanceType<GuestSchema> =>
    new GuestModel({
        house: new Types.ObjectId(bookerInstance.house),
        booker: new Types.ObjectId(bookerInstance._id),
        name: bookerInstance.name,
        roomType: new Types.ObjectId(roomTypeInstance._id),
        pricingType: roomTypeInstance.pricingType,
        gender,
        start: bookerInstance.start,
        end: bookerInstance.end
    });

const createGuestWithBookerAndAllocateHere = (
    bookerInstance: InstanceType<BookerSchema>,
    genderData: { gender: Gender | null; count: number },
    roomTypeInstance: InstanceType<RoomTypeSchema>,
    roomCapacity: RoomCapacity,
    isUnsettled: boolean = false
): Array<InstanceType<GuestSchema>> => {
    const dateRange: { start: Date; end: Date } = bookerInstance;
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
    let index = 0;
    while (roomCapacity.availableCount > 0 && genderData.count > 0) {
        const guest = new GuestModel({
            house: new Types.ObjectId(bookerInstance.house),
            booker: new Types.ObjectId(bookerInstance._id),
            name: bookerInstance.name,
            roomType: new Types.ObjectId(roomTypeInstance._id),
            pricingType: roomTypeInstance.pricingType,
            gender: genderData.gender || null,
            allocatedRoom: new Types.ObjectId(roomCapacity.roomId),
            bedIndex: roomCapacity.emptyBeds[index],
            isUnsettled,
            start: dateRange.start,
            end: dateRange.end
        });
        guestInstances.push(guest);
        roomCapacity.availableCount--;
        _.pull(roomCapacity.emptyBeds, index++);
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
