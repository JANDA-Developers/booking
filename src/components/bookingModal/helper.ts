import {
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices,
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices,
  StartBookingRoomGuestInput,
  StartBookingDomitoryGuestInput,
  getBooking_GetBooking_booking_guests_GuestDomitory
} from "../../types/api";
import { arraySum } from "../../utils/math";
import { instanceOfA } from "../../utils/utils";
import { Gender } from "../../types/enum";
import _ from "lodash";

// 날자가격들의 평균 가격을 가져옴
export const totalPriceGetAveragePrice = (
  priceData: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices[]
): number => {
  const averagePrice = arraySum(
    priceData.map(data => getAveragePrice(data.datePrices || []))
  );
  return averagePrice;
};

// 위쪽 함수 종속
// 가격들의 평균가격을 구함
export const getAveragePrice = (
  priceData: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[]
): number => {
  const averagePrice =
    arraySum(priceData.map(priceD => priceD.price)) / priceData.length;

  return averagePrice;
};

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
// 게스트들을 받아서 룸타입별로 정렬해주는 함수
// 게스트S => (부킹/방타입[], 부킹/도미토리[]) 형태
// RoomSelectInfo와 유사
// RoomSelectInfo는 프론트 코드를 위해 존재
// guestsToInput은 API를 위해 존재
export const guestsToInput = (
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
