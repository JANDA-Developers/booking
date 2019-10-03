import {
  StartBookingRoomGuestInput,
  StartBookingDomitoryGuestInput,
  getBooking_GetBooking_booking_guests,
  getBooking_GetBooking_booking_guests_GuestDomitory
} from "../types/api";
import {instanceOfA} from "./utils";
import {Gender} from "../types/enum";
import _ from "lodash";

const guestsCountByRoomType = (
  guests: getBooking_GetBooking_booking_guests[]
): {
  countInRooms: StartBookingRoomGuestInput[];
  countInDomitorys: StartBookingDomitoryGuestInput[];
} => {
  const roomTypeIds = _.uniq(guests.map(guest => guest.roomType._id));

  let countInRooms: StartBookingRoomGuestInput[] = [];
  let countInDomitorys: StartBookingDomitoryGuestInput[] = [];

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
    countInRooms.push(countInRoom);
    countInDomitorys.push(countInDomitory);
  });

  return {
    countInRooms,
    countInDomitorys
  };
};
export default guestsCountByRoomType;
