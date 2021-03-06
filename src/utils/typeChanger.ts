import {
  MakeBookingRoomGuestInput,
  MakeBookingDomitoryGuestInput,
  getBooking_GetBooking_booking_guests_GuestDomitory,
  getBooking_GetBooking_booking_guests_GuestRoom,
  getBooking_GetBooking_booking_guests,
  getBooking_GetBooking_booking_roomTypes
} from "../types/api";
import { PricingType } from "../types/enum";
import { DEFAULT_ROOMTYPE, DEFAULT_GUEST } from "../types/defaults";
import { Gender } from "../types/enum";
import _ from "lodash";
import {
  IRoomSelectInfo,
  IBookingModal_AssigInfo
} from "../components/bookingModal/declaration";
import { isDomitoryGuest } from "./interfaceMatch";
import { LANG } from "../hooks/hook";
import $ from "jquery";

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
// 예약관련 정보 일부로 GetBooking정보로 변환할때 사용중
// 혼합정보[] => 게스트정보(일부)[] + 방타입정보(일부)[]
export const divisionRoomSelectInfo = (
  roomSelectInfoes: IRoomSelectInfo[]
): {
  guests: getBooking_GetBooking_booking_guests[];
  roomTypes: getBooking_GetBooking_booking_roomTypes[];
} => {
  // 게스트정보 일부 + 방선택정보  => 게스트 정보
  const generateGuest = (
    roomSelectInfo: IRoomSelectInfo,
    gender: Gender | null
  ):
    | getBooking_GetBooking_booking_guests_GuestDomitory
    | getBooking_GetBooking_booking_guests_GuestRoom => ({
      ...DEFAULT_GUEST,
      pricingType: gender ? PricingType.DOMITORY : PricingType.ROOM,
      gender,
      roomType: {
        __typename: "RoomType",
        _id: roomSelectInfo.roomTypeId,
        name: roomSelectInfo.roomTypeName || ""
      }
    });

  // 템프
  const guests: getBooking_GetBooking_booking_guests[] = [];
  const roomTypes: getBooking_GetBooking_booking_roomTypes[] = [];

  roomSelectInfoes.forEach(roomSelectInfo => {
    // 템프
    let i_female = 0;
    let i_male = 0;
    let i_roomCount = 0;

    const {
      count: { female, male, roomCount }
    } = roomSelectInfo;

    // 임시로 생성한 룸타입
    const roomType: getBooking_GetBooking_booking_roomTypes = {
      ...DEFAULT_ROOMTYPE,
      _id: roomSelectInfo.roomTypeId,
      name: roomSelectInfo.roomTypeName || "",
      pricingType: roomSelectInfo.pricingType,
      // tags: []
    };

    roomTypes.push(roomType);

    // 전체 카운팅을 다시 샘니다.
    while (i_female + i_male + i_roomCount < female + male + roomCount) {
      if (i_female < female) {
        i_female++;
        guests.push(generateGuest(roomSelectInfo, Gender.FEMALE));
      } else if (i_male < male) {
        i_male++;
        guests.push(generateGuest(roomSelectInfo, Gender.MALE));
      } else if (i_roomCount < roomCount) {
        i_roomCount++;
        guests.push(generateGuest(roomSelectInfo, null));
      }
    }
  });

  return {
    guests,
    roomTypes
  };
};

// 예약자가 변경한 성별사항을 적용한 임시 게스트정보 생성
export const getGenderChangedGuest = (
  guests: getBooking_GetBooking_booking_guests[],
  assigInfo: IBookingModal_AssigInfo[]
): getBooking_GetBooking_booking_guests[] => {
  return guests.map(guest => {
    const copyGuest = $.extend({}, guest);
    assigInfo.forEach(info => {
      if (isDomitoryGuest(copyGuest) && copyGuest._id === info._id)
        copyGuest.gender = info.gender;
    });
    return copyGuest;
  });
};

// 방 선택 정보를 바탕으로 => {방선택 | 인원} String 으로 출력합니다
export const getRoomSelectString = (selectInfoes: IRoomSelectInfo[]): string =>
  selectInfoes
    .map(info => {
      const { count, roomTypeName } = info;
      const { female, male, roomCount } = count;
      let result = roomTypeName;
      if (female) {
        result += " " + female + LANG("FEMALE");
      }
      if (male) {
        result += " " + male + LANG("MALE");
      }
      if (roomCount) {
        result += " " + roomCount + LANG("unit") + LANG("room_count");
      }
      return result;
    })
    .join(" | ");

// 성별 과 룸타입을 중심으로 분류 하는 용도
// GetBooking 정보로 예약창에 룸타입별로 정렬된 뷰를 만들떄 사용중
// (게스트정보(일부)[], 방타입정보(일부)[]) => 방선택정보[]
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
      roomTypes?.find(roomType => roomType._id === guest.roomType._id) ||
      DEFAULT_ROOMTYPE;

    // 중복체크
    if (roomTypesBuffer.includes(guestRoomType._id)) return "duplicate";

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

// 성별 과 룸타입을 중심으로 분류 하는 용도
// 게스트들을 받아서 룸타입별로 정렬해주는 함수
// 게스트 => (부킹/방타입[], 부킹/도미토리[]) 형태
// RoomSelectInfo와 유사
// RoomSelectInfo는 프론트 코드를 위해 존재
// guestsToInput은 API를 위해 존재
const guestsToInput = (
  guests: propGuest[] | null
): {
  countInRooms: MakeBookingRoomGuestInput[];
  countInDomitorys: MakeBookingDomitoryGuestInput[];
} => {
  let countInRooms: MakeBookingRoomGuestInput[] = [];
  let countInDomitorys: MakeBookingDomitoryGuestInput[] = [];
  if (!guests)
    return {
      countInRooms,
      countInDomitorys
    };
  const roomTypeIds = _.uniq(guests.map(guest => guest.roomType._id));

  roomTypeIds.forEach(roomTypeId => {
    const guestsInRoom = guests.filter(
      guest => guest.roomType._id === roomTypeId
    );

    const countInRoom = {
      roomTypeId,
      countRoom: 0
    };

    const countInDomitory = {
      roomTypeId,
      countFemale: 0,
      countMale: 0
    };

    guestsInRoom.forEach(guest => {
      if (isDomitoryGuest(guest)) {
        if (guest.gender === Gender.FEMALE) countInDomitory.countFemale++;
        else countInDomitory.countMale++;
      } else countInRoom.countRoom++;
    });

    const isDomitory = countInRoom.countRoom === 0;
    if (isDomitory) countInDomitorys.push(countInDomitory);
    else countInRooms.push(countInRoom);
  });

  return {
    countInRooms,
    countInDomitorys
  };
};

// FUNC LIST
//  --

export default guestsToInput;
