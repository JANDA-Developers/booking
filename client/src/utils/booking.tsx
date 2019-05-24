import {BookingStatus, Gender, PricingType} from "../types/enum";
import {arraySum} from "./elses";
import isEmpty from "./isEmptyData";
import {any, string} from "prop-types";
import {IroomSelectInfoTable} from "../components/bookerInfo/BookerModal";

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

type TReturn = {
  male: number;
  female: number;
  count: number;
};
interface IGuest {
  gender: Gender | null;
  roomType: any;
  [foo: string]: any;
}
export const bookingGuestsMerge = (
  guests: IGuest[] | null,
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
        : 0,
      count: guests ? guests.length : 0
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
        count: roomTypeGuests.length
      };
    } else {
      return {
        female: 0,
        male: 0,
        count: 0
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

export const getRoomTypePerGuests = (
  bookerData: IGetRoomTypePerGuestsParams
): IroomSelectInfoTable[] => {
  const roomTypes = bookerData.roomTypes || [];
  return roomTypes.map(roomType => ({
    roomTypeId: roomType._id,
    roomTypeName: roomType.name,
    count: {
      male: bookingGuestsMerge(
        bookerData.guests,
        roomType ? roomType._id : undefined
      ).male,
      female: bookingGuestsMerge(
        bookerData.guests,
        roomType ? roomType._id : undefined
      ).female,
      roomCount:
        roomType.pricingType === PricingType.DOMITORY
          ? 0
          : bookerData.guests
          ? bookerData.guests.length
          : 0
    },
    pricingType: roomType.pricingType
  }));
};
