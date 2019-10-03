import {BookingStatus, Gender} from "../types/enum";
import {arraySum} from "./elses";
import isEmpty from "./isEmptyData";
import {
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices,
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices
} from "../types/api";
import moment from "moment";
import {IResvCount} from "../types/interface";

// booking들을 받아서 종합 BookingStatu를 반환합니다.
type TProp = {bookingStatus: BookingStatus; [foo: string]: any}[] | null;
export const bookingStatuMerge = (bookings: TProp): BookingStatus | null => {
  if (isEmpty(bookings)) {
    return null;
  }
  bookings &&
    bookings.forEach(booking => {
      if (booking.bookingStatue === BookingStatus.CANCEL)
        return BookingStatus.CANCEL;
    });
  return BookingStatus.COMPLETE;
};

type TProp2 = {
  bookingStatue: BookingStatus;
  price: number;
  [foo: string]: any;
}[];

// 날자들에 대해서 방타입들의 평균 가격을 가져옴
export const totalPriceGetAveragePrice = (
  priceData: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices[]
): number => {
  const averagePrice = arraySum(
    priceData.map(data => getAveragePrice(data.datePrices || []))
  );
  return averagePrice;
};

// 위쪽 함수 종속
export const getAveragePrice = (
  priceData: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[]
): number => {
  const averagePrice =
    arraySum(priceData.map(priceD => priceD.price)) / priceData.length;

  return averagePrice;
};

// 예약들의 가격을 머지함
// 사용하는곳 없음
export const bookingPriceMerge = (bookings: TProp2): number =>
  arraySum(
    bookings.map(booking =>
      booking.bookingStatue === BookingStatus.COMPLETE ? booking.price : 0
    )
  );

interface IGuest {
  gender: Gender | null;
  roomType: any;
  [foo: string]: any;
}

// 예약으로부터 게스트 카운트 찾아주는 함수
export const getCountsFromBooking = (
  guests: IGuest[] | null,
  roomTypeId?: string
): IResvCount => {
  if (!roomTypeId) {
    return {
      female: guests
        ? arraySum(
            guests.map(guest => (guest.gender === Gender.FEMALE ? 1 : 0))
          )
        : 0,
      male: guests
        ? arraySum(guests.map(guest => (guest.gender === Gender.MALE ? 1 : 0)))
        : 0,
      roomCount: guests ? guests.length : 0
    };
  } else {
    if (guests) {
      const roomTypeGuests = guests.filter(
        guest => guest.roomType._id === roomTypeId
      );

      return {
        female: roomTypeGuests
          ? arraySum(
              roomTypeGuests.map(guest =>
                guest.gender === Gender.FEMALE ? 1 : 0
              )
            )
          : 0,
        male: roomTypeGuests
          ? arraySum(
              roomTypeGuests.map(guest =>
                guest.gender === Gender.MALE ? 1 : 0
              )
            )
          : 0,
        roomCount: roomTypeGuests.length
      };
    } else {
      return {
        female: 0,
        male: 0,
        roomCount: 0
      };
    }
  }
};

function getRangeOfDates(
  start: moment.Moment,
  end: any,
  key: "days",
  arr = [start.startOf(key)]
): moment.Moment[] {
  if (start.isAfter(end)) throw new Error("start must precede end");

  const next = moment(start)
    .add(1, "days")
    .startOf(key);

  if (next.isAfter(end, key)) return arr;

  return getRangeOfDates(next, end, key, arr.concat(next));
}
