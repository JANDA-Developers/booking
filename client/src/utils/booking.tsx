import {BookingStatus, Gender} from "../types/enum";
import {arraySum} from "./elses";
import isEmpty from "./isEmptyData";

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
export const bookingPriceMerge = (bookings: TProp2): number =>
  arraySum(
    bookings.map(booking =>
      booking.bookingStatue === BookingStatus.COMPLETE ? booking.price : 0
    )
  );

type RoomType = {
  _id: string;
};
type TReturn = {
  male: number;
  female: number;
  roomType?: RoomType;
};
type TProp3 = {gender: Gender | null; [foo: string]: any}[] | null;
export const bookingGuestsMerge = (
  guests: TProp3,
  roomTypeId?: string
): TReturn => {
  if (!roomTypeId) {
    return {
      female: guests
        ? arraySum(
            guests.map(guest => (guest.gender === Gender.FEMALE ? 1 : 0))
          )
        : 0,
      male: guests
        ? arraySum(guests.map(guest => (guest.gender === Gender.MALE ? 1 : 0)))
        : 0
    };
  } else {
    if (guests.roomType) {
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
          : 0
      };
    }
  }
};
