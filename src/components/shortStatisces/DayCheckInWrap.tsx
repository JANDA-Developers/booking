import React, { useMemo } from "react";
import { Query } from "react-apollo";
import DayCheckIn from "./DayCheckIn";
import { getBookings, getBookingsVariables } from "../../types/api";
import { GET_BOOKINGS } from "../../apollo/queries";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { queryDataFormater } from "../../utils/utils";
import moment from "moment";
import { useDayPicker } from "../../hooks/hook";
import { to4YMMDD } from "../../utils/setMidNight";

interface IProps {
  context: IContext;
}

class GetBookingsQu extends Query<getBookings, getBookingsVariables> {}

const DayCheckInWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  const dayPickerHook = useDayPicker(new Date(), new Date());

  return useMemo(
    () => (
      <div>
        <GetBookingsQu
          skip={!house._id}
          variables={{
            param: {
              filter: {
                stayDate: {
                  checkIn: to4YMMDD(new Date()),
                  checkOut: to4YMMDD(new Date())
                }
              },
              paging: {
                count: 999999,
                selectedPage: 1
              }
            }
          }}
          // GET_CHECKINS 로변경
          query={GET_BOOKINGS}
        >
          {({ data: Data, loading: getGuestsLoading }) => {
            const result = queryDataFormater(
              Data,
              "GetBookings",
              "result",
              undefined
            );
            const bookings = result?.bookings || [];

            const bookingsCheckInToday = bookings.filter(booking =>
              moment(booking.checkIn).isSame(
                dayPickerHook.from || new Date(),
                "day"
              )
            );

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
                loading={getGuestsLoading}
                context={context}
                dayPickerHook={dayPickerHook}
                info={info}
              ></DayCheckIn>
            );
          }}
        </GetBookingsQu>
      </div>
    ),
    []
  );
};

export default DayCheckInWrap;
