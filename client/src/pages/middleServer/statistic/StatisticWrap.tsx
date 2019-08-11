import React, {useState} from "react";
import Statistic from "./Statistic";
import moment from "moment";
import {useDayPicker} from "../../../actions/hook";

interface IProps {
  houseId: string;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

export interface IQueryOp {
  selectStatic: string;
}

const StatisticWrap: React.FC<IProps> = ({houseId}) => {
  const [queryOp, setQueryOp] = useState<IQueryOp>({
    selectStatic: "매출통계"
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
      <Statistic
        setQueryOp={setQueryOp}
        queryOp={queryOp}
        outData={data}
        houseId={"as"}
        queryDateHook={queryDateHook}
      />
    </div>
  );
};

export default StatisticWrap;
