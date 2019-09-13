import React, {useState} from "react";
import {Query} from "react-apollo";
import {
  getHManualForPublic,
  getHManualForPublicVariables
} from "../../../types/api";
import {SalesStatisticsUnit, Language} from "../../../types/enum";
import HouseManual from "./HouseManual";
import {GET_HOUSE_MENUAL_FOR_PUBLIC} from "../../../queries";
import {queryDataFormater} from "../../../utils/utils";
import {RouteComponentProps} from "react-router";
import {DEFAULT_HM} from "../../../types/defaults";

interface IProps extends RouteComponentProps<any> {}
// refetch 가 Query 컴포넌트 리턴 프로프임

export interface IQueryOp {
  selectStatic: string;
  unit: SalesStatisticsUnit;
}

class GetHouseMenuaQu extends Query<
  getHManualForPublic,
  getHManualForPublicVariables
> {}

const HouseManualWrap: React.FC<IProps> = ({match}) => {
  const [currentLanguage, setCurrentLanguage] = useState(Language.KOREAN);

  if (!match.params.publickey) {
    alert("접근불가");
  }

  return (
    <div>
      <GetHouseMenuaQu
        query={GET_HOUSE_MENUAL_FOR_PUBLIC}
        variables={{
          publicKey: match.params.publickey,
          lang: currentLanguage
        }}
      >
        {({data: houseManualData, loading}) => {
          const houseManual =
            queryDataFormater(
              houseManualData,
              "GetHManualForPublic",
              "houseManual",
              undefined
            ) || DEFAULT_HM;

          return (
            <HouseManual
              loading={loading}
              enableLngList={[]}
              menuData={[]}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
              userInfo={{
                profileImg: houseManual.profileImg,
                phoneNumber: houseManual.phoneNumber,
                location: houseManual.house.location
              }}
              bgData={houseManual.backgroundImg || ""}
              mainTitle={"houseManual.name"}
            />
          );
        }}
      </GetHouseMenuaQu>
    </div>
  );
};

export default HouseManualWrap;
