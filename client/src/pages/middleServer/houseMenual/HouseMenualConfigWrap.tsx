import React, {useState} from "react";
import {Query, Mutation} from "react-apollo";
import {
  getSalesStatistic,
  getSalesStatisticVariables,
  getHManual,
  getHManualVariables,
  updateHManual,
  updateHManualVariables
} from "../../../types/api";
import {SalesStatisticsUnit, Language} from "../../../types/enum";
import {IHouse} from "../../../types/interface";
import HouseMenualConfig from "./HouseMenualConfig";
import {GET_HOUSE_MENUAL, UPDATE_HMANUAL} from "../../../queries";
import {queryDataFormater} from "../../../utils/utils";

interface IProps {
  house: IHouse;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

export interface IQueryOp {
  selectStatic: string;
  unit: SalesStatisticsUnit;
}

class GetHouseMenuaQu extends Query<getHManual, getHManualVariables> {}
class UpdateHManualMu extends Mutation<updateHManual, updateHManualVariables> {}

const HouseMenualWrap: React.FC<IProps> = ({house}) => {
  const [currentLanguage, setCurrentLanguage] = useState(Language.KOREAN);

  return (
    <div>
      <GetHouseMenuaQu
        query={GET_HOUSE_MENUAL}
        variables={{
          lang: currentLanguage,
          houseId: house._id
        }}
      >
        {({data: houseMenualData, loading}) => {
          const houseMenual = queryDataFormater(
            houseMenualData,
            "GetHManual",
            "houseManual",
            undefined
          );

          return (
            <UpdateHManualMu mutation={UPDATE_HMANUAL}>
              {(updateManualMu, {loading: updateHMloading}) => (
                <HouseMenualConfig
                  key={`houseMenual${currentLanguage}`}
                  houseMenual={houseMenual || undefined}
                  updateManualMu={updateManualMu}
                  loading={loading || updateHMloading}
                  currentLanguage={currentLanguage}
                  setCurrentLanguage={setCurrentLanguage}
                  house={house}
                />
              )}
            </UpdateHManualMu>
          );
        }}
      </GetHouseMenuaQu>
    </div>
  );
};

export default HouseMenualWrap;
