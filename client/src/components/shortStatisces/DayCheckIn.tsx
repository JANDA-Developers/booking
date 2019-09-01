import React from "react";
import {IContext} from "../../pages/MiddleServerRouter";
import {getBookings_GetBookings_bookings} from "../../types/api";
import {IUseDayPicker} from "../../actions/hook";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/arrowDayByDay";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";

interface IViewConfig {
  dayPickerHook?: IUseDayPicker;
  viewDayPicker?: boolean;
}

interface Iprops extends IViewConfig {
  context: IContext;
  info: {
    bookingsCheckInToday: getBookings_GetBookings_bookings[];
    bookingsCount: number;
    bookingsCheckInCount: number;
  };
}

const DayCheckIn: React.FC<Iprops> = ({
  context,
  info,
  dayPickerHook,
  viewDayPicker
}) => {
  return (
    <div>
      {dayPickerHook && viewDayPicker && (
        <JDdayPicker
          isRange={false}
          input
          canSelectBeforeDays={false}
          label="달력날자"
          {...dayPickerHook}
          className="JDwaves-effect JDoverflow-visible"
          inputComponent={<ArrowDayByDay dayPickerHook={dayPickerHook} />}
        />
      )}
      {info.bookingsCheckInCount}/{info.bookingsCount}
    </div>
  );
};

export default DayCheckIn;
