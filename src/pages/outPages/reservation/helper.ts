import {
  getBooking_GetBooking_booking_guests,
  getBooking_GetBooking_booking_roomTypes,
  getBooking_GetBooking_booking_guests_GuestRoom,
  getBooking_GetBooking_booking_guests_GuestDomitory
} from "../../../types/api";
import { IRoomSelectInfo } from "../../../components/bookingModal/BookingModal";
import { Gender } from "../../../types/enum";
import { DEFAULT_GUEST, DEFAULT_ROOMTYPE } from "../../../types/defaults";

// 성별 과 룸타입을 중심으로 분류 하는 용도
// 예약관련 정보 일부로 GetBooking정보로 변환할때 사용중
// 혼합정보[] => 게스트정보(일부)[] + 방타입정보(일부)[]
export const divisionRoomSelectInfo = (
  roomSelectInfoes: IRoomSelectInfo[]
): {
  guests: getBooking_GetBooking_booking_guests[];
  roomTypes: getBooking_GetBooking_booking_roomTypes[];
} => {
  const generateGuest = (
    roomSelectInfo: IRoomSelectInfo,
    gender: Gender | null
  ):
    | getBooking_GetBooking_booking_guests_GuestDomitory
    | getBooking_GetBooking_booking_guests_GuestRoom => ({
    ...DEFAULT_GUEST,
    gender,
    roomType: {
      __typename: "RoomType",
      _id: roomSelectInfo.roomTypeId,
      name: roomSelectInfo.roomTypeName || ""
    }
  });

  const guests: getBooking_GetBooking_booking_guests[] = [];
  const roomTypes: getBooking_GetBooking_booking_roomTypes[] = [];

  roomSelectInfoes.forEach(roomSelectInfo => {
    let i_female = 0;
    let i_male = 0;
    let i_roomCount = 0;
    const {
      count: { female, male, roomCount }
    } = roomSelectInfo;

    const roomType: getBooking_GetBooking_booking_roomTypes = {
      ...DEFAULT_ROOMTYPE,
      _id: roomSelectInfo.roomTypeId,
      name: roomSelectInfo.roomTypeName || "",
      pricingType: roomSelectInfo.pricingType
    };

    roomTypes.push(roomType);

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
