import { BookingStatus, Gender } from "../types/enum";
import { arraySum } from "./elses";
import isEmpty from "./isEmptyData";
import {
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices,
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices
} from "../types/api";
import dayjs from "dayjs";

// booking들을 받아서 종합 BookingStatu를 반환합니다.
type TProp = { bookingStatus: BookingStatus; [foo: string]: any }[] | null;
export const bookingStatuMerge = (bookings: TProp): BookingStatus | null => {
  if (isEmpty(bookings)) {
    return null;
  }
  bookings &&
    bookings.forEach(booking => {
      if (booking.bookingStatus === BookingStatus.CANCELED)
        return BookingStatus.CANCELED;
    });
  return BookingStatus.COMPLETED;
};

type TProp2 = {
  bookingStatus: BookingStatus;
  price: number;
  [foo: string]: any;
}[];

// 날자들에 대해서 방타입들의 평균 가격을 가져옴
export const totalPriceGetAveragePrice = (
  priceData: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices[],
  division?: boolean,
  dataCount?: {
    roomTypeId: string;
    count: number;
  }[]
): number => {
  const averagePrice = arraySum(
    priceData.map(data => {
      let count = 1;
      if (dataCount) {
        const target = dataCount.find(
          dc => dc.roomTypeId === data.roomType._id
        );
        count = target?.count || 1;
      }
      return getAveragePrice(data.datePrices || [], division) * count;
    })
  );
  return averagePrice;
};

// 위쪽 함수 종속
export const getAveragePrice = (
  priceData: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[],
  division: boolean = true
): number => {
  const price = arraySum(priceData.map(priceD => priceD.price));
  return division ? price / priceData.length : price;
};

// 예약들의 가격을 머지함
// 사용하는곳 없음
export const bookingPriceMerge = (bookings: TProp2): number =>
  arraySum(
    bookings.map(booking =>
      booking.bookingStatus === BookingStatus.COMPLETED ? booking.price : 0
    )
  );

function getRangeOfDates(
  start: dayjs.Dayjs,
  end: any,
  key: "days",
  arr = [start.startOf(key)]
): dayjs.Dayjs[] {
  if (start.isAfter(end)) throw new Error("start must precede end");

  const next = dayjs(start)
    .add(1, "days")
    .startOf(key);

  if (next.isAfter(end, key)) return arr;

  return getRangeOfDates(next, end, key, arr.concat(next));
}
