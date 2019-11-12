import React from "react";
import {Query} from "react-apollo";
import DaySales, {IViewConfigProp} from "./DaySales";
import {GET_SALES_STATISTIC} from "../../apollo/queries";
import {useDayPicker} from "../../hooks/hook";
import {queryDataFormater, isEmpty} from "../../utils/utils";
import {IContext} from "../../pages/bookingServer/MiddleServerRouter";
import {
  getSalesStatisticVariables,
  getSalesStatistic,
  getSalesStatistic_GetSalesStatistic_data
} from "../../types/api";
import {SalesStatisticsUnit} from "../../types/enum";
import moment from "moment";

interface IProps extends IViewConfigProp {
  context: IContext;
}

class GetSalesQu extends Query<getSalesStatistic, getSalesStatisticVariables> {}

const DaySalesWrap: React.FC<IProps> = ({context}) => {
  const {house} = context;

  const dayPickerHook = useDayPicker(new Date(), new Date());

  return (
    <div>
      <GetSalesQu
        variables={{
          houseId: house._id,
          checkOut: moment(dayPickerHook.to || new Date()).add(1, "day"),
          checkIn: dayPickerHook.from,
          unit: SalesStatisticsUnit.BY_DATE,
          groupByPayMethod: true
        }}
        query={GET_SALES_STATISTIC}
      >
        {({data, loading: getSalesLoading}) => {
          const daySalesData =
            queryDataFormater(data, "GetSalesStatistic", "data", []) || [];

          return (
            <DaySales
              loading={getSalesLoading}
              dayPickerHook={dayPickerHook}
              priceData={daySalesData}
            />
          );
        }}
      </GetSalesQu>
    </div>
  );
};

export default DaySalesWrap;
