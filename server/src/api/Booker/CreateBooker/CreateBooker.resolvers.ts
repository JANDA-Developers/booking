import { Types } from "mongoose";
import { InstanceType } from "typegoose";
import { BookerModel } from "../../../models/Booker";
import { GuestSchema } from "../../../models/Guest";
import { extractBooker } from "../../../models/merge/merge";
import {
    extractGenderRoomCapacity,
    RoomTypeModel
} from "../../../models/RoomType";
import { GenderEnum } from "../../../types/enums";
import {
    CreateBookerMutationArgs,
    CreateBookerResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { asyncForEach } from "../../../utils/etc";

const resolvers: Resolvers = {
    Mutation: {
        CreateBooker: async (
            _,
            { bookingParams }: CreateBookerMutationArgs
        ): Promise<CreateBookerResponse> => {
            const { start, end } = {
                start: new Date(bookingParams.start),
                end: new Date(bookingParams.end)
            };
            const { bookerParams, guestInputs } = bookingParams;

            console.log({
                booker: bookingParams.bookerParams
            });

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
                const roomTypes: Types.ObjectId[] = [];

                const guestList: Array<InstanceType<GuestSchema>> = [];
                let processSuccess = true;
                await asyncForEach(
                    guestInputs,
                    async ({
                        countFemaleGuest,
                        countMaleGuest,
                        countRoom,
                        pricingType,
                        roomTypeId
                    }) => {
                        roomTypes.push(new Types.ObjectId(roomTypeId));
                        const roomTypeInstance = await RoomTypeModel.findById(
                            roomTypeId
                        );
                        if (!roomTypeInstance) {
                            throw new Error(
                                "있을 수 없는 에러임... 방 타입이 존재하지 않음"
                            );
                        }
                        const roomTypeCapacity = await roomTypeInstance.getCapacity(
                            start,
                            end
                        );
                        const counts = roomTypeCapacity.availablePeopleCount;
                        if (
                            counts.countAny < countRoom ||
                            counts.countFemale < countFemaleGuest ||
                            counts.countMale < countMaleGuest
                        ) {
                            processSuccess = false;
                            return;
                        }
                        // 게스트 하나 생성해보자...
                        const femaleCapacity = extractGenderRoomCapacity(
                            roomTypeCapacity,
                            "FEMALE"
                        );
                        console.log({ femaleCapacity });

                        femaleCapacity.forEach(capacity => {
                            if (
                                countFemaleGuest > 0 &&
                                capacity.availableCount > 0
                            ) {
                                const diff =
                                    countFemaleGuest - capacity.availableCount;
                                if (diff < 0) {
                                    countFemaleGuest = 0;
                                    capacity.availableCount = -diff;
                                } else {
                                    countFemaleGuest = diff;
                                    capacity.availableCount = 0;
                                }
                                capacity.emptyBeds.forEach(emptyBed => {
                                    guestList.push(
                                        bookerInstance.createGuest(
                                            {
                                                start,
                                                end
                                            },
                                            GenderEnum.FEMALE,
                                            roomTypeInstance,
                                            new Types.ObjectId(capacity.roomId),
                                            emptyBed
                                        )
                                    );
                                });
                            }
                        });
                        const maleCapacity = extractGenderRoomCapacity(
                            roomTypeCapacity,
                            "MALE"
                        );
                        maleCapacity.forEach(capacity => {
                            if (
                                countMaleGuest > 0 &&
                                capacity.availableCount > 0
                            ) {
                                const diff =
                                    countMaleGuest - capacity.availableCount;
                                if (diff < 0) {
                                    countMaleGuest = 0;
                                    capacity.availableCount = -diff;
                                } else {
                                    countMaleGuest = diff;
                                    capacity.availableCount = 0;
                                }
                                capacity.emptyBeds.forEach(emptyBed => {
                                    guestList.push(
                                        bookerInstance.createGuest(
                                            {
                                                start,
                                                end
                                            },
                                            GenderEnum.MALE,
                                            roomTypeInstance,
                                            new Types.ObjectId(capacity.roomId),
                                            emptyBed
                                        )
                                    );
                                });
                            }
                        });
                        // countFemaleGuest, countMaleGuest => 0인지 확인 ㄱㄱ
                        //
                        if (pricingType === "DOMITORY") {
                            const anyCapacity = extractGenderRoomCapacity(
                                roomTypeCapacity,
                                "ANY"
                            );
                            anyCapacity.forEach(capacity => {
                                if (
                                    countFemaleGuest > 0 &&
                                    capacity.availableCount > 0
                                ) {
                                    const diff =
                                        countFemaleGuest -
                                        capacity.availableCount;
                                    if (diff < 0) {
                                        countFemaleGuest = 0;
                                        capacity.availableCount = -diff;
                                    } else {
                                        countFemaleGuest = diff;
                                        capacity.availableCount = 0;
                                        capacity.emptyBeds.forEach(emptyBed => {
                                            guestList.push(
                                                bookerInstance.createGuest(
                                                    {
                                                        start,
                                                        end
                                                    },
                                                    GenderEnum.MALE,
                                                    roomTypeInstance,
                                                    new Types.ObjectId(
                                                        capacity.roomId
                                                    ),
                                                    emptyBed
                                                )
                                            );
                                        });
                                    }
                                }
                                if (
                                    countMaleGuest > 0 &&
                                    capacity.availableCount > 0
                                ) {
                                    const diff =
                                        countMaleGuest -
                                        capacity.availableCount;
                                    if (diff < 0) {
                                        countMaleGuest = 0;
                                        capacity.availableCount = -diff;
                                    } else {
                                        countMaleGuest = diff;
                                        capacity.availableCount = 0;
                                        capacity.emptyBeds.forEach(emptyBed => {
                                            guestList.push(
                                                bookerInstance.createGuest(
                                                    {
                                                        start,
                                                        end
                                                    },
                                                    GenderEnum.MALE,
                                                    roomTypeInstance,
                                                    new Types.ObjectId(
                                                        capacity.roomId
                                                    ),
                                                    emptyBed
                                                )
                                            );
                                        });
                                    }
                                }
                            });
                        }
                    }
                );
                if (!processSuccess) {
                    return {
                        ok: false,
                        error: "실패",
                        booker: null
                    };
                }
                console.log(guestList);

                await asyncForEach(guestList, async guestInstance => {
                    await guestInstance.save();
                });

                bookerInstance.guests = guestList.map(
                    guest => new Types.ObjectId(guest._id)
                );
                bookerInstance.roomTypes = roomTypes;
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
        }
    }
};

export default resolvers;
