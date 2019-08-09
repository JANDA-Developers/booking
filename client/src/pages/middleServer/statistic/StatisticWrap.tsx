import React from "react";
import Statistic from "./Statistic";

interface IProps {
  houseId: string;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

const StatisticWrap: React.FC<IProps> = ({houseId}) => {
  const data: any[] = [];
  return (
    <div>
      <Statistic outData={data} houseId={"as"} />
    </div>
  );
};

export default StatisticWrap;
