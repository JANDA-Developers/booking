import {
  StartBookingRoomGuestInput,
  StartBookingDomitoryGuestInput,
  getBooking_GetBooking_booking_guests_GuestDomitory
} from "../types/api";
import {IRoomSelectInfo} from "../components/bookingModal/BookingModal";
import {PricingType} from "../types/enum";
import {DEFAUT_ROOMTYPE} from "../types/defaults";
import {instanceOfA} from "./utils";
import {Gender} from "../types/enum";
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

// 게스트정보 + 방타입정보 => 혼합정보
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
      DEFAUT_ROOMTYPE;

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

  // @ts-ignore
  const roomSelectInfo: IRoomSelectInfo[] = tempArr.filter(
    v => v !== "duplicate"
  );

  return roomSelectInfo;
};

// 게스트들을) 받아서 룸타입별로 정렬해주는 함수
const guestsToInput = (
  guests: propGuest[] | null
): {
  countInRooms: StartBookingRoomGuestInput[];
  countInDomitorys: StartBookingDomitoryGuestInput[];
} => {
  let countInRooms: StartBookingRoomGuestInput[] = [];
  let countInDomitorys: StartBookingDomitoryGuestInput[] = [];
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
      if (
        instanceOfA<getBooking_GetBooking_booking_guests_GuestDomitory>(
          guest,
          "gender"
        )
      ) {
        if (guest.gender === Gender.FEMALE) {
          countInDomitory.countFemale++;
        } else {
          countInDomitory.countMale++;
        }
      } else if (
        !instanceOfA<getBooking_GetBooking_booking_guests_GuestDomitory>(
          guest,
          "gender"
        )
      ) {
        countInRoom.countRoom++;
      }
    });
    if (countInRoom.countRoom) {
      countInRooms.push(countInRoom);
    }
    if (countInDomitory.countFemale + countInDomitory.countMale) {
      countInDomitorys.push(countInDomitory);
    }
  });

  return {
    countInRooms,
    countInDomitorys
  };
};

export default guestsToInput;
