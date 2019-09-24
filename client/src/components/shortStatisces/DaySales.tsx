import React from "react";
import {IUseDayPicker} from "../../actions/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/arrowDayByDay";
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
          label="달력날자"
          {...dayPickerHook}
          className="JDwaves-effect JDoverflow-visible"
          inputComponent={(prop: any) => (
            <ArrowDayByDay {...prop} dayPickerHook={dayPickerHook} />
          )}
        />
      )}
      {autoComma(price)}원
    </div>
  );
};

export default DaySales;
