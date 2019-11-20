import React from "react";
import {IUseDayPicker, LANG} from "../../hooks/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/ArrowDayByDay";
import {autoComma, isEmpty} from "../../utils/utils";
import Preloader from "../../atoms/preloader/Preloader";
import {Doughnut, ChartData} from "react-chartjs-2";
import {getSalesStatistic_GetSalesStatistic_data} from "../../types/api";
import {arraySum} from "../../utils/elses";
import {getStaticColors} from "../../utils/getStaticColors";
import JDgraph from "../../atoms/graph/graph";

export interface IViewConfigProp {
  showDayPicker?: boolean;
  dayPickerHook?: IUseDayPicker;
}

interface Iprops extends IViewConfigProp {
  priceData: getSalesStatistic_GetSalesStatistic_data[];
  loading: boolean;
}

const DaySales: React.FC<Iprops> = ({
  loading,
  priceData,
  dayPickerHook,
  showDayPicker
}) => {
  if (loading) return <Preloader size="medium" loading={loading} />;

  const totalPrice = arraySum(priceData.map(data => data.price));

  const prices = priceData.map(data => data.price);
  const labels = priceData.map(data => data.payMethod || "");

  const datasets: ChartData<Chart.ChartData> = {
    labels,
    datasets: [
      {
        data: prices,
        backgroundColor: getStaticColors(priceData.length),
        hoverBackgroundColor: getStaticColors(priceData.length, {light: true})
      }
    ]
  };

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
      {autoComma(totalPrice)}
      {LANG("money_unit")}
      <JDgraph originalData={priceData} JDtype="doughnut" data={datasets} />
    </div>
  );
};

export default DaySales;
