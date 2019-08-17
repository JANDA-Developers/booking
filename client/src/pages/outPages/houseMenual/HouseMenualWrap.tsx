import React, {useState} from "react";
import {Query} from "react-apollo";
import {
  getSalesStatistic,
  getSalesStatisticVariables
} from "../../../types/api";
import {SalesStatisticsUnit, Language} from "../../../types/enum";
import HouseMenual from "./HouseMenual";
import {IHouse} from "../../../types/interface";

interface IProps {
  house: IHouse;
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

const HouseMenualWrap: React.FC<IProps> = ({house}) => {
  const [currentLanguage, setCurrentLanguage] = useState(Language.KOREAN);
  // const queryDateHook = useDayPicker(
  //   moment(new Date())
  //     .add(-1, "day")
  //     .toDate(),
  //   new Date()
  // );

  return (
    <div>
      <HouseMenual
        enableLngList={[]}
        bgData=""
        menuData={[]}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        mainTitle={""}
        house={house}
      />
    </div>
  );
};

export default HouseMenualWrap;
