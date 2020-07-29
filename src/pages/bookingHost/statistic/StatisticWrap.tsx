import React, { useState } from "react";
import Statistic, { IStaticsWrapProps } from "./Statistic";
import moment from "moment";
import { useDayPicker, LANG } from "../../../hooks/hook";
import { Query } from "react-apollo";
import {
  getSalesStatistic,
  getSalesStatisticVariables,
  SalesStatisticsCalculationType
} from "../../../types/api";
import { GET_SALES_STATISTIC } from "../../../apollo/queries";
import { SalesStatisticsUnit } from "../../../types/enum";
import { queryDataFormater } from "../../../utils/utils";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { useSelect } from "@janda-com/front/build/hooks/hook";
import { enumToOption } from "@janda-com/front/build/utils/selectOptionCreater";
import { IselectedOption } from "../../../atoms/forms/selectBox/SelectBox";
import { PAYMENT_STATUS_OP2 } from "../../../types/const";

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


  const PAY_METHOD_OPS: IselectedOption<> = enumToOption()

  const paymentStatusHook = useSelect();

  const payMethodHook = useSelect()

  const dateTypeHook = useSelect<SalesStatisticsCalculationType>(
    SALES_STATIC_OPS[0],
    SALES_STATIC_OPS
  );

  const queryDateHook = useDayPicker(
    new Date(),
    moment(new Date())
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
          groupByPayMethod:
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

          const staticsWrapProps: IStaticsWrapProps = {
            queryOp,
            setQueryOp,
            staticData: statistic || [],
            queryDateHook
          };

          return (
            <Statistic
              staticsWrapProps={staticsWrapProps}
              context={context}
              loading={loading}
            />
          );
        }}
      </GetSalesStatistic>
    </div>
  );
};

export default StatisticWrap;
