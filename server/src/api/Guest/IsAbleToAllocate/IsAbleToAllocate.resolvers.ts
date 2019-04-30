import { InstanceType } from "typegoose";
import { GuestModel, GuestSchema } from "../../../models/Guest";
import {
    extractGuest,
    transformBooking,
    transformRoomType
} from "../../../models/merge/merge";
import { RoomModel, RoomSchema } from "../../../models/Room";
import {
    IsAbleToAllocateQueryArgs,
    IsAbleToAllocateResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { privateResolver } from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        IsAbleToAllocate: privateResolver(
            async (
                _,
                { guestId, roomId }: IsAbleToAllocateQueryArgs
            ): Promise<IsAbleToAllocateResponse> => {
                try {
                    const existingGuest = await GuestModel.findById(guestId);
                    if (!existingGuest) {
                        return {
                            ok: false,
                            error: "게스트가 존재하지 않습니다.",
                            guest: null
                        };
                    }
                    const existingRoom = await RoomModel.findById(roomId);
                    if (!existingRoom) {
                        return {
                            ok: false,
                            error: "방이 존재하지 않습니다.",
                            guest: null
                        };
                    }
                    // 게스트, 룸 존재여부 체크 끝.
                    // TODO 여기서부터 구현하긔 ㅎㅎㅎ
                    // 필요한 것이 무엇인가
                    // 우선은 true 로 반환하기

                    /*
                    - 배드 타입인 경우
                        1. 방이 해당 가간 동안 비어있는지 확인(Guest Schema 확인) => 비어있지 않다면 false, 비어있다면 2번으로
                        2. 방이 비어있는 경우 
                     */

                    // 1. 비어있는 방 확인.
                    //  - PricingType === "DOMITORY" 인 경우
                    //      - Guest.Gender 확인
                    const guestPricingType = existingGuest.pricingType;
                    const roomsRoomType = await transformRoomType(
                        existingRoom.roomType
                    );
                    const roomPricingType = roomsRoomType.pricingType;
                    if (guestPricingType !== roomPricingType) {
                        return {
                            ok: false,
                            error: "PricingType 불일치",
                            guest: null
                        };
                    }
                    // pricingType 일치
                    let result = true;
                    if (guestPricingType === "DOMITORY") {
                        result = await domitoryCheck(
                            existingRoom,
                            existingGuest
                        );
                    } else {
                        result = await roomCheck(existingRoom, existingGuest);
                    }
                    return {
                        ok: true,
                        error: "개발 중",
                        guest:
                            (result &&
                                (await extractGuest.bind(
                                    extractGuest,
                                    existingGuest
                                ))) ||
                            null
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message,
                        guest: null
                    };
                }
            }
        )
    }
};

export default resolvers;

const domitoryCheck = async (
    room: InstanceType<RoomSchema>,
    guest: InstanceType<GuestSchema>
): Promise<boolean> => {
    // 도미토리 형식의 방 배정 가능여부 확인
    const booking = await transformBooking(guest.booking);
    if (!booking) {
        return false;
    }
    // const start = booking.start;
    // const end = booking.end;
    // const roomType = guest.roomType;
    // // start, end, roomType에 해당하는 게스트들 다 구해야함...
    // // date[]...
    // const dateArr: Date[] = transformDateRangeToArr(start, end);
    // const checkFunc = (dateArr: Date[], r: InstanceType<RoomSchema>) => {};
    // // 하루하루씩 검사

    return false;
};

const roomCheck = async (
    room: InstanceType<RoomSchema>,
    guest: InstanceType<GuestSchema>
): Promise<boolean> => {
    // 룸 형식 방 배정 가능여부 확인

    return false;
};
