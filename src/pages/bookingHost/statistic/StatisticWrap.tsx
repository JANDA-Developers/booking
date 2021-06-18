import React, { useState } from "react";
import Statistic, { IStaticsWrapProps } from "./Statistic";
import dayjs from "dayjs";
import { useDayPicker, LANG } from "../../../hooks/hook";
import { Query } from "react-apollo";
import {
  getSalesStatistic,
  getSalesStatisticVariables,
  SalesStatisticsCalculationType,
  getSalesStatistic_GetSalesStatistic_data
} from "../../../types/api";
import { PayMethod } from "../../../types/enum";
import { GET_SALES_STATISTIC } from "../../../apollo/queries";
import { SalesStatisticsUnit } from "../../../types/enum";
import { queryDataFormater } from "../../../utils/utils";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { useSelect, IUseSelect, IUseDayPicker } from "@janda-com/front";
import { enumToOption } from "@janda-com/front";
import { IselectedOption } from "../../../atoms/forms/selectBox/SelectBox";
import { ISet } from "@janda-com/front/build/types/interface";

export const StatisticContext = React.createContext<ISatisticConetxt | null>(
  null
);

interface IProps {
  context: IContext;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

export interface IQueryOp {
  selectStatic: string;
  unit: SalesStatisticsUnit;
}

class GetSalesStatistic extends Query<
  getSalesStatistic,
  getSalesStatisticVariables
> {}

interface ISatisticConetxt {
  dateTypeHook: IUseSelect<SalesStatisticsCalculationType>;
  payMethodHook: IUseSelect<PayMethod>;
  loading: boolean;
  queryOp: IQueryOp;
  setQueryOp: ISet<IQueryOp>;
  staticData: getSalesStatistic_GetSalesStatistic_data[];
  queryDateHook: IUseDayPicker;
}

const StatisticWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;

  const [queryOp, setQueryOp] = useState<IQueryOp>({
    selectStatic: LANG("sales_statistics"),
    unit: SalesStatisticsUnit.BY_DAY_OF_WEEK
  });

  const SALES_STATIC_OPS: IselectedOption<
    SalesStatisticsCalculationType
  >[] = enumToOption(
    LANG,
    "SalesStatisticsCalculationType",
    SalesStatisticsCalculationType
  );

  const PAY_METHOD_OPS: IselectedOption<PayMethod>[] = enumToOption(
    LANG,
    "PayMethod",
    PayMethod,
    true
  );

  const payMethodHook = useSelect(PAY_METHOD_OPS[0], PAY_METHOD_OPS);

  const { selectedOption } = payMethodHook;
  const filterByPaymethod = selectedOption?.value
    ? [selectedOption.value]
    : undefined;

  const dateTypeHook = useSelect<SalesStatisticsCalculationType>(
    SALES_STATIC_OPS[0],
    SALES_STATIC_OPS
  );

  const queryDateHook = useDayPicker(
    new Date(),
    dayjs(new Date())
      .add(1, "day")
      .toDate()
  );
  const data: any[] = [];

  return (
    <div>
      <GetSalesStatistic
        skip={!queryDateHook.to || !queryDateHook.from}
        variables={{
          unit: queryOp.unit,
          checkOut: queryDateHook.to,
          checkIn: queryDateHook.from,
          houseId: house._id,
          type: dateTypeHook.selectedOption?.value,
          filterByPaymethod
        }}
        query={GET_SALES_STATISTIC}
      >
        {({ data: statisticData, loading, error, networkStatus }) => {
          const statistic = queryDataFormater(
            statisticData,
            "GetSalesStatistic",
            "data",
            []
          );
          const STATISTIC_CONTEXT = {
            dateTypeHook,
            payMethodHook,
            queryOp,
            setQueryOp,
            staticData: statistic || [],
            queryDateHook,
            loading
          };

          return (
            <StatisticContext.Provider value={STATISTIC_CONTEXT}>
              <Statistic context={context} />
            </StatisticContext.Provider>
          );
        }}
      </GetSalesStatistic>
    </div>
  );
};

export default StatisticWrap;
