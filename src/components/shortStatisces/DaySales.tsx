import React from "react";
import {IUseDayPicker, LANG} from "../../hooks/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/ArrowDayByDay";
import {autoComma} from "../../utils/utils";
import Preloader from "../../atoms/preloader/Preloader";

export interface IViewConfigProp {
  showDayPicker?: boolean;
  dayPickerHook?: IUseDayPicker;
}

interface Iprops extends IViewConfigProp {
  price: number;
  loading: boolean;
}

const DaySales: React.FC<Iprops> = ({
  loading,
  price,
  dayPickerHook,
  showDayPicker
}) => {
  if (loading) return <Preloader size="medium" loading={loading} />;
  return (
    <div>
      {showDayPicker && dayPickerHook && (
        <JDdayPicker
          isRange={false}
          input
          canSelectBeforeDay={false}
          label={LANG("calender_date")}
          {...dayPickerHook}
          className="JDwaves-effect JDoverflow-visible"
          inputComponent={(prop: any) => (
            <ArrowDayByDay {...prop} dayPickerHook={dayPickerHook} />
          )}
        />
      )}
      {autoComma(price)}
      {LANG("money_unit")}
    </div>
  );
};

export default DaySales;
