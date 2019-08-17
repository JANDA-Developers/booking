import React, {useState} from "react";
import {Query} from "react-apollo";
import {
  getSalesStatistic,
  getSalesStatisticVariables
} from "../../../types/api";
import {SalesStatisticsUnit, Language} from "../../../types/enum";
import {IHouse} from "../../../types/interface";
import HouseMenualConfig from "./HouseMenualConfig";

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

  const data: any[] = [];
  return (
    <div>
      <HouseMenualConfig
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
        house={house}
      />
    </div>
  );
};

export default HouseMenualWrap;
