import { BookingStatus, Gender } from "../types/enum";
import { arraySum } from "./elses";
import isEmpty from "./isEmptyData";
import {
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices,
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices
} from "../types/api";
import moment from "moment";

// booking들을 받아서 종합 BookingStatu를 반환합니다.
type TProp = { bookingStatus: BookingStatus; [foo: string]: any }[] | null;
export const bookingStatuMerge = (bookings: TProp): BookingStatus | null => {
  if (isEmpty(bookings)) {
    return null;
  }
  bookings &&
    bookings.forEach(booking => {
      if (booking.bookingStatus === BookingStatus.CANCEL)
        return BookingStatus.CANCEL;
    });
  return BookingStatus.COMPLETE;
};

type TProp2 = {
  bookingStatus: BookingStatus;
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
      booking.bookingStatus === BookingStatus.COMPLETE ? booking.price : 0
    )
  );

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
