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
import HouseManualConfig from "./HouseManualConfig";
import {GET_HOUSE_MENUAL, UPDATE_HMANUAL} from "../../../queries";
import {queryDataFormater, s4} from "../../../utils/utils";
import {IContext} from "../../MiddleServerRouter";
import Preloader from "../../../atoms/preloader/Preloader";

interface IProps {
  context: IContext;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

export interface IQueryOp {
  selectStatic: string;
  unit: SalesStatisticsUnit;
}

class GetHouseMenuaQu extends Query<getHManual, getHManualVariables> {}
class UpdateHManualMu extends Mutation<updateHManual, updateHManualVariables> {}

const HouseManualWrap: React.FC<IProps> = ({context}) => {
  const {house} = context;
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
        {({data: houseManualData, loading}) => {
          const houseManual = queryDataFormater(
            houseManualData,
            "GetHManual",
            "houseManual",
            undefined
          );

          return (
            <UpdateHManualMu mutation={UPDATE_HMANUAL}>
              {(updateManualMu, {loading: updateHMloading}) => (
                <HouseManualConfig
                  houseManual={houseManual || undefined}
                  updateManualMu={updateManualMu}
                  loading={loading || updateHMloading}
                  currentLanguage={currentLanguage}
                  setCurrentLanguage={setCurrentLanguage}
                  context={context}
                  key={s4()}
                />
              )}
            </UpdateHManualMu>
          );
        }}
      </GetHouseMenuaQu>
    </div>
  );
};

export default HouseManualWrap;
