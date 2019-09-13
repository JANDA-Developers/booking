import {BookingStatus, Gender, PricingType} from "../types/enum";
import {arraySum} from "./elses";
import isEmpty from "./isEmptyData";
import {any, string, number} from "prop-types";
import {IRoomSelectInfoTable} from "../components/bookingModal/BookingModal";
import {
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices,
  getRoomTypeDatePrices_GetRoomTypeDatePrices,
  getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices
} from "../types/api";
import {applyDaysToArr} from "./utils";
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

// 모든 예약중 방타입에 대해서
export const totalPriceGetAveragePrice = (
  priceData: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices[]
): number => {
  const averagePrice = arraySum(
    priceData.map(data => getAveragePrice(data.datePrices || []))
  );
  return averagePrice;
};

// 하나의 방타입에 대해서만
export const getAveragePrice = (
  priceData: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[]
): number => {
  const averagePrice =
    arraySum(priceData.map(priceD => priceD.price)) / priceData.length;

  return averagePrice;
};

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

interface IGetRoomTypePerGuestsParams {
  roomTypes:
    | {
        _id: string;
        name: string;
        [foo: string]: any;
      }[]
    | null;
  guests: IGuest[] | null;
  [foo: string]: any;
}

// 소위 중간계 만들어주는 함수 RoomType 별로 적용된 인원을 나타남
export const getRoomTypePerGuests = (
  bookingData: IGetRoomTypePerGuestsParams
): IRoomSelectInfoTable[] => {
  const roomTypes = bookingData.roomTypes || [];
  return roomTypes.map(roomType => {
    return {
      roomTypeId: roomType._id,
      roomTypeName: roomType.name,
      count: {
        male: getCountsFromBooking(
          bookingData.guests,
          roomType ? roomType._id : undefined
        ).male,
        female: getCountsFromBooking(
          bookingData.guests,
          roomType ? roomType._id : undefined
        ).female,
        roomCount:
          roomType.pricingType === PricingType.DOMITORY
            ? 0
            : bookingData.guests
            ? bookingData.guests.filter(guest => !guest.gender).length
            : 0
      },
      pricingType: roomType.pricingType
    };
  });
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

// export const truePriceFinder = (
//   defaultPrice: number | null,
//   seasonData: ISeasonPrices[] | null | undefined,
//   dailyPrices: IDailyPrices[] | null | undefined,
//   start: Date | string | null,
//   end: Date | string | null
// ): number => {
//   // 시즌과 특정가격이 없으면 기본가격 리턴

//   if (!defaultPrice || !start || !end) return 0;
//   if (!seasonData) return defaultPrice;
//   if (isEmpty(seasonData)) return defaultPrice;

//   const mStart = moment(start);
//   const mEnd = moment(end);
//   const length = mEnd.diff(mStart, "day");

//   const dateArray = Array(length).fill(null);

//   // 곂치는 날자를 찾아서 배열로반환
//   const overlapDateFinder = (
//     start: Date | string,
//     end: Date | string
//   ): moment.Moment[] => {
//     let overlapStart: moment.Moment | string = "";
//     let overlapEnd: moment.Moment | string = "";
//     if (moment(start).isSameOrAfter(mStart)) {
//       overlapStart = moment(start);
//     } else {
//       overlapStart = mStart;
//     }

//     if (moment(end).isSameOrBefore(mEnd)) {
//       overlapEnd = moment(end);
//     } else {
//       overlapEnd = mEnd;
//     }

//     return getRangeOfDates(overlapStart, overlapEnd, "days");
//   };

//   // 해당 날자에 합당한 시즌가격을 찾습니다.
//   // const getSeasonPrice = (
//   //   seasonData: ISeasonPrices,
//   //   day: moment.Moment
//   // ): number => {
//   //   const findDayOfWeek = day.day();
//   //   // 요일별 가격에 일치하는것이 있다면 요일별가격을 반환

//   //   if (seasonData.dayOfWeekPrices) {
//   //     const dayOfWeekPrice = seasonData.dayOfWeekPrices.find(dayOfWeek => {
//   //       return applyDaysToArr(dayOfWeek.applyDays).includes(
//   //         Math.pow(2, findDayOfWeek)
//   //       );
//   //     });

//   //     if (dayOfWeekPrice) return dayOfWeekPrice.price;
//   //   }

//   //   return seasonData.defaultPrice;
//   // };

//   // 각시날자에 해당하는 가격을 배열에 넣습니다.. || 없으면 defaultPrice
// //   seasonData.forEach(season => {
// //     // 시즌과 찾는 날자의 곂칠 날자들을 배열로 찾아냄
// //     const overlapArr = overlapDateFinder(
// //       season.season.start,
// //       season.season.end
// //     );

// //     //  각날자에 맞는 시즌 가격을 찾음
// //     // 👿 While 문이 더 좋을듯?
// //     overlapArr.forEach(day => {
// //       if (dateArray.includes(null)) {
// //         const index = day.diff(mStart, "day");
// //         if (index < 0) throw Error("date Array Overlap is not overlaped");

// //         dateArray[index] = getSeasonPrice(season, day);
// //       }
// //     });

// //     // 시즌을 전부돌았는데도 가격배열이 가득차지 않았다면
// //     dateArray.forEach((price, index) => {
// //       if (price === null) dateArray[index] = defaultPrice;
// //     });
// //   });

// //   // 특정날자 가격이 있다면 바꾸어줍니다.
// //   if (dailyPrices) {
// //     dailyPrices.forEach(dailyPrice => {
// //       const index = mStart.diff(dailyPrice.date, "day");
// //       dateArray[index] = dailyPrice.price;
// //     });
// //   }

// //   return arraySum(dateArray) / dateArray.length;
// // };
