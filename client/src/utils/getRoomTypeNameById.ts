import {IRoomSelectInfo} from "../components/bookingModal/BookingModal";
import {
  StartBookingRoomGuestInput,
  StartBookingDomitoryGuestInput
} from "../types/api";
import {PricingType} from "../types/enum";

// 아래함수는 인원수만 있는 정보에서 프론트에서 필요로하는 룹타입 정보를 혼합해줍니다.
export const guestsCountByRoomTypeToTable = (
  guestsCountByRoomType: {
    countInRooms: StartBookingRoomGuestInput[];
    countInDomitorys: StartBookingDomitoryGuestInput[];
  },
  roomTypes: {
    _id: string;
    name: string;
    [key: string]: any;
  }[]
): IRoomSelectInfo[] => {
  let tempArr: IRoomSelectInfo[] = [];
  tempArr.push(
    ...guestsCountByRoomType.countInRooms.map(
      (count): IRoomSelectInfo => ({
        roomTypeId: count.roomTypeId,
        count: {
          female: 0,
          male: 0,
          roomCount: count.countRoom
        },
        pricingType: PricingType.ROOM,
        roomTypeName: guestRoomTypeNameByRoomTypeId(count.roomTypeId, roomTypes)
      })
    )
  );
  tempArr.push(
    ...guestsCountByRoomType.countInDomitorys.map(
      (count): IRoomSelectInfo => ({
        roomTypeId: count.roomTypeId,
        count: {
          female: count.countFemale,
          male: count.countMale,
          roomCount: 0
        },
        pricingType: PricingType.ROOM,
        roomTypeName: guestRoomTypeNameByRoomTypeId(count.roomTypeId, roomTypes)
      })
    )
  );

  return tempArr;
};

// 룸타입 아이디로 룸타입 이름을 찾는 함수
export const guestRoomTypeNameByRoomTypeId = (
  roomTypeId: string,
  roomTypes: {
    _id: string;
    name: string;
    [key: string]: any;
  }[]
): string => {
  const theRoomType = roomTypes.find(roomType => roomType._id === roomTypeId);
  if (!theRoomType) throw Error("존재하지 않는 룸타입");

  return theRoomType.name;
};

export default guestRoomTypeNameByRoomTypeId;
