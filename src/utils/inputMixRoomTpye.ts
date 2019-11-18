import {
  StartBookingRoomGuestInput,
  StartBookingDomitoryGuestInput
} from "../types/api";
import { PricingType } from "../types/enum";
import { IRoomSelectInfo } from "../components/bookingModal/declaration";

// 인원정보  + 룸정보 혼합 하기
// 이함수는 TEMP
export const inputsMixRoomType = (
  countByRoomType: {
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

  // 방타입 게스트들 Map
  tempArr.push(
    ...countByRoomType.countInRooms.map(
      (count): IRoomSelectInfo => {
        const roomType = roomTypes.find(
          roomType => roomType._id === count.roomTypeId
        );

        return {
          roomTypeId: count.roomTypeId,
          count: {
            female: 0,
            male: 0,
            roomCount: count.countRoom
          },
          pricingType: PricingType.ROOM,
          roomTypeName: roomType ? roomType.name : ""
        };
      }
    )
  );

  // 도미토리 게스트들 Map
  tempArr.push(
    ...countByRoomType.countInDomitorys.map(
      (count): IRoomSelectInfo => {
        const roomType = roomTypes.find(
          roomType => roomType._id === count.roomTypeId
        );

        return {
          roomTypeId: count.roomTypeId,
          count: {
            female: count.countFemale,
            male: count.countMale,
            roomCount: 0
          },
          pricingType: PricingType.ROOM,
          roomTypeName: roomType ? roomType.name : ""
        };
      }
    )
  );

  return tempArr;
};
