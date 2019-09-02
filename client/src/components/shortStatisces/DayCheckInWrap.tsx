import React, * as react from "react";
import {Query} from "react-apollo";
import DayCheckIn from "./DayCheckIn";
import {
  getGuests,
  getGuestsVariables,
  getBooking,
  getBookingVariables,
  getBookings,
  getBookingsVariables
} from "../../types/api";
import {GET_GUESTS, GET_BOOKING, GET_BOOKINGS} from "../../queries";
import {IContext} from "../../pages/MiddleServerRouter";
import {queryDataFormater} from "../../utils/utils";
import moment from "moment";
import {useDayPicker} from "../../actions/hook";

interface IProps {
  context: IContext;
}

class GetBookingsQu extends Query<getBookings, getBookingsVariables> {}

const DayCheckInWrap: React.FC<IProps> = ({context}) => {
  const {house} = context;
  const dayPickerHook = useDayPicker(new Date(), new Date());

  return (
    <div>
      <GetBookingsQu
        variables={{
          houseId: house._id,
          filter: {
            stayDate: new Date()
          },
          count: 999999,
          page: 1
        }}
        query={GET_BOOKINGS}
      >
        {({data: Data, loading: getGuestsLoading}) => {
          const bookings =
            queryDataFormater(Data, "GetBookings", "bookings", []) || [];

          const bookingsCheckInToday = bookings.filter(booking =>
            moment(booking.checkIn).isSame(
              dayPickerHook.from || new Date(),
              "day"
            )
          );

          console.log(bookings);
          const bookingsCount = bookingsCheckInToday.length;
          const bookingsCheckInCount = bookingsCheckInToday.filter(
            booking => booking.checkInInfo.isIn
          ).length;

          const info = {
            bookingsCheckInToday,
            bookingsCount,
            bookingsCheckInCount
          };

          return (
            <DayCheckIn
              context={context}
              dayPickerHook={dayPickerHook}
              info={info}
            ></DayCheckIn>
          );
        }}
      </GetBookingsQu>
    </div>
  );
};

export default DayCheckInWrap;
