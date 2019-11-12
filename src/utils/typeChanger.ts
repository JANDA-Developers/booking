import { IRoomSelectInfo } from "../components/bookingModal/BookingModal";
import { PricingType } from "../types/enum";
import { DEFAULT_ROOMTYPE } from "../types/defaults";
import { Gender } from "../types/enum";
import _ from "lodash";

interface propRoomType {
  _id: string;
}

interface propRoom {
  _id: string;
  name: string;
}

interface propGuest {
  room?: propRoom | null;
  gender?: Gender | null;
  roomType: propRoomType;
}

// 성별 과 룸타입을 중심으로 분류 하는 용도
// GetBooking 정보로 예약창에 룸타입별로 정렬된 뷰를 만들떄 사용중
// 게스트정보(일부)[] + 방타입정보(일부)[] => 혼합정보(IRoomSelectInfo)[]
export const getRoomSelectInfo = (
  guests: propGuest[] | null,
  roomTypes: {
    _id: string;
    name: string;
    [key: string]: any;
  }[]
): IRoomSelectInfo[] => {
  if (!guests) return [];

  const roomTypesBuffer: string[] = [];
  const tempArr = guests.map((guest): IRoomSelectInfo | "duplicate" => {
    const guestRoomType =
      roomTypes.find(roomType => roomType._id === guest.roomType._id) ||
      DEFAULT_ROOMTYPE;

    // 중복체크
    if (roomTypesBuffer.includes(guestRoomType._id)) {
      return "duplicate";
    }
    // 메모리에 접수
    roomTypesBuffer.push(guestRoomType._id);

    // 같은 방타입의 게스트들
    const sameRoomTypeGuests = guests.filter(
      guest => guest.roomType._id === guestRoomType._id
    );

    const tempRooms = _.uniq(
      guests
        .map(guest => guest.room)
        .filter(room => room)
        .map(room => room!.name)
    );

    return {
      roomTypeId: guest.roomType._id,
      roomTypeName: guestRoomType.name,
      roomNames: tempRooms,
      count: {
        female: sameRoomTypeGuests.filter(
          guest => guest.gender === Gender.FEMALE
        ).length,
        male: sameRoomTypeGuests.filter(guest => guest.gender === Gender.MALE)
          .length,
        roomCount: sameRoomTypeGuests.filter(guest => !guest.gender).length
      },
      pricingType: sameRoomTypeGuests.find(guest => guest.gender)
        ? PricingType.DOMITORY
        : PricingType.ROOM
    };
  });

  // 중복 제거
  // @ts-ignore
  const roomSelectInfo: IRoomSelectInfo[] = tempArr.filter(
    v => v !== "duplicate"
  );

  return roomSelectInfo;
};
