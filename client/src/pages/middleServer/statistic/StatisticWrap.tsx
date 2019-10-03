import React, {useState} from "react";
import Statistic, {IStaticsWrapProps} from "./Statistic";
import moment from "moment";
import {useDayPicker} from "../../../hooks/hook";
import {Query} from "react-apollo";
import {
  getSalesStatistic,
  getAllRoomTypeWithGuestVariables,
  getSalesStatisticVariables
} from "../../../types/api";
import {GET_SALES_STATISTIC} from "../../../queries";
import {SalesStatisticsUnit} from "../../../types/enum";
import {queryDataFormater} from "../../../utils/utils";
import {IContext} from "../../MiddleServerRouter";

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

const StatisticWrap: React.FC<IProps> = ({context}) => {
  const {house} = context;
  const [queryOp, setQueryOp] = useState<IQueryOp>({
    selectStatic: "매출통계",
    unit: SalesStatisticsUnit.BY_DAY_OF_WEEK
  });

  const queryDateHook = useDayPicker(
    moment(new Date())
      .add(-1, "day")
      .toDate(),
    new Date()
  );

  const data: any[] = [];
  return (
    <div>
      <GetSalesStatistic
        skip={!queryDateHook.to || !queryDateHook.from}
        variables={{
          unit: queryOp.unit,
          end: queryDateHook.to,
          start: queryDateHook.from,
          houseId: house._id
        }}
        query={GET_SALES_STATISTIC}
      >
        {({data: statisticData, loading, error, networkStatus}) => {
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
