import { Types } from "mongoose";
import { BookerModel } from "../../../models/Booker";
import { extractBooker } from "../../../models/merge/merge";
import {
    convertGenderArrToGuestGender,
    RoomTypeModel
} from "../../../models/RoomType";
import { CreateBookerParams, CreateBookerResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { asyncForEach } from "../../../utils/etc";

const resolvers: Resolvers = {
    Mutation: {
        CreateBooker: async (
            _,
            bookingParams: CreateBookerParams
        ): Promise<CreateBookerResponse> => {
            const { start, end, guestInputs, booker } = {
                ...bookingParams,
                start: new Date(bookingParams.start),
                end: new Date(bookingParams.end)
            };
            try {
                // 1. booker prototype 생성
                // 2. guestInputs 돌면서... roomType 별로 게스트 생성.
                const bookerInstance = new BookerModel({
                    ...booker,
                    house: new Types.ObjectId(booker.house)
                });
                await bookerInstance.hashPassword();

                asyncForEach(
                    guestInputs,
                    async ({
                        countFemaleGuest,
                        countMaleGuest,
                        countRoom,
                        pricingType,
                        roomTypeId
                    }) => {
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
                            throw new Error("수용할 수 없는 인원수");
                        }
                        // 게스트 하나 생성해보자...
                        const roomCapacityList = roomTypeCapacity.roomCapacityList.sort(
                            (a, b) => {
                                const aGender = convertGenderArrToGuestGender(
                                    a.availableGenders
                                );
                                const bGender = convertGenderArrToGuestGender(
                                    b.availableGenders
                                );
                                return aGender === bGender ? 1 : 0;
                            }
                        );
                        console.log({
                            roomCapacityList
                        });

                        // await asyncForEach(roomCapacityList, roomCapacity => {
                        //     await asyncForEach();
                        //     bookerInstance.createGuest(
                        //         { start, end },
                        //         GenderEnum.FEMALE,
                        //         roomTypeInstance
                        //     );
                        // });
                    }
                );
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
