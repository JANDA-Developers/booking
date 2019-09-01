import React from "react";
import {IUseDayPicker} from "../../actions/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/arrowDayByDay";

export interface IViewConfigProp {
  showDayPicker?: boolean;
  dayPickerHook?: IUseDayPicker;
}

interface Iprops extends IViewConfigProp {
  price: number;
}

const DaySales: React.FC<Iprops> = ({price, dayPickerHook, showDayPicker}) => {
  return (
    <div>
      {showDayPicker && dayPickerHook && (
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
      {price}원
    </div>
  );
};

export default DaySales;
