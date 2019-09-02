import React, * as react from "react";
import {Query} from "react-apollo";
import DaySales, {IViewConfigProp} from "./DaySales";
import {GET_SALES_STATISTIC} from "../../queries";
import {useDayPicker} from "../../actions/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/arrowDayByDay";
import {queryDataFormater, isEmpty, autoComma} from "../../utils/utils";
import {IContext} from "../../pages/MiddleServerRouter";
import {
  getSalesStatisticVariables,
  getSalesStatistic,
  getSalesStatistic_GetSalesStatistic_data
} from "../../types/api";
import {SalesStatisticsUnit} from "../../types/enum";

interface IProps extends IViewConfigProp {
  context: IContext;
}

class GetSalesQu extends Query<getSalesStatistic, getSalesStatisticVariables> {}

const DaySalesWrap: React.FC<IProps> = ({context, showDayPicker}) => {
  const {house} = context;

  const dayPickerHook = useDayPicker(new Date(), new Date());

  return (
    <div>
      <GetSalesQu
        variables={{
          houseId: house._id,
          end: dayPickerHook.to,
          start: dayPickerHook.from,
          unit: SalesStatisticsUnit.BY_DATE
        }}
        query={GET_SALES_STATISTIC}
      >
        {({data, loading: getSalesLoading}) => {
          const daySales = queryDataFormater(
            data,
            "GetSalesStatistic",
            "data",
            []
          );

          let price = 0;
          if (daySales) {
            const days: getSalesStatistic_GetSalesStatistic_data[] = daySales;
            if (!isEmpty(days)) {
              price = days[0].price;
            }
          }

          return <DaySales dayPickerHook={dayPickerHook} price={price} />;
        }}
      </GetSalesQu>
    </div>
  );
};

export default DaySalesWrap;
