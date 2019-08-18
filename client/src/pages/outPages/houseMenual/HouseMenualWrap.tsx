import React, {useState} from "react";
import {Query} from "react-apollo";
import {
  getSalesStatistic,
  getSalesStatisticVariables,
  getHManual,
  getHManualVariables,
  getHManualForPublic,
  getHManualForPublicVariables
} from "../../../types/api";
import {SalesStatisticsUnit, Language} from "../../../types/enum";
import HouseMenual from "./HouseMenual";
import {IHouse} from "../../../types/interface";
import {useDayPicker} from "../../../actions/hook";
import {GET_HOUSE_MENUAL, GET_HOUSE_MENUAL_FOR_PUBLIC} from "../../../queries";
import {queryDataFormater} from "../../../utils/utils";
import Preloader from "../../../atoms/preloader/Preloader";
import {RouteComponentProps} from "react-router";

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

const HouseMenualWrap: React.FC<IProps> = ({match}) => {
  const [currentLanguage, setCurrentLanguage] = useState(Language.KOREAN);
  localStorage.setItem("hpk", match.params.publickey);

  return (
    <div>
      <GetHouseMenuaQu
        query={GET_HOUSE_MENUAL_FOR_PUBLIC}
        variables={{
          lang: currentLanguage
        }}
      >
        {({data: houseMenualData, loading}) => {
          const houseMenual = queryDataFormater(
            houseMenualData,
            "GetHManualForPublic",
            "houseManual",
            undefined
          );
          return houseMenual ? (
            <HouseMenual
              enableLngList={[]}
              menuData={[]}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
              userInfo={{
                profileImg: houseMenual.profileImg,
                phoneNumber: houseMenual.phoneNumber,
                location: houseMenual.house.location
              }}
              bgData={houseMenual.backgroundImg || ""}
              mainTitle={houseMenual.name}
            />
          ) : (
            <Preloader page loading={true} />
          );
        }}
      </GetHouseMenuaQu>
    </div>
  );
};

export default HouseMenualWrap;
