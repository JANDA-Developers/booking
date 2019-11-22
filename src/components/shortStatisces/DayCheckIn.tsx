import React from "react";
import {IContext} from "../../pages/bookingHost/BookingHostRouter";
import {getBookings_GetBookings_bookings} from "../../types/api";
import {IUseDayPicker, LANG} from "../../hooks/hook";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/ArrowDayByDay";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import Preloader from "../../atoms/preloader/Preloader";
import {ChartData} from "react-chartjs-2";
import JDgraph from "../../atoms/graph/graph";

interface IViewConfig {
  dayPickerHook?: IUseDayPicker;
  viewDayPicker?: boolean;
}

interface Iprops extends IViewConfig {
  context: IContext;
  loading: boolean;
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
  viewDayPicker,
  loading
}) => {
  if (loading) return <Preloader loading={loading} size="medium" />;

  const datasets: ChartData<Chart.ChartData> = {
    labels: [LANG("checkIn"), LANG("un_checkIn")],
    datasets: [
      {
        data: [
          info.bookingsCheckInCount,
          info.bookingsCount - info.bookingsCheckInCount
        ],
        backgroundColor: ["#ffee00b3", "#CFCFCF"]
        // hoverBackgroundColor: getStaticColors(2, {light: true})
      }
    ]
  };

  return (
    <div>
      {dayPickerHook && viewDayPicker && (
        <JDdayPicker
          isRange={false}
          input
          canSelectBeforeDay={false}
          label={LANG("calender_date")}
          {...dayPickerHook}
          className="JDwaves-effect JDoverflow-visible"
          inputComponent={(prop: any) => (
            <ArrowDayByDay
              {...prop}
              format={`MM${LANG("month")} DD${LANG("date")}`}
              dayPickerHook={dayPickerHook}
            />
          )}
        />
      )}
      {info.bookingsCheckInCount}/{info.bookingsCount}
      <JDgraph
        JDtype="doughnut"
        originalData={info.bookingsCount ? [info.bookingsCount] : []}
        data={datasets}
      />
    </div>
  );
};

export default DayCheckIn;
