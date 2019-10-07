import React, {useState} from "react";
import {Query} from "react-apollo";
import {getHMforPublic, getHMforPublicVariables} from "../../../types/api";
import {SalesStatisticsUnit, Language} from "../../../types/enum";
import HMcomponent from "./HM";
import {GET_HOUSE_MENUAL_FOR_PUBLIC} from "../../../queries";
import {queryDataFormater} from "../../../utils/utils";
import {RouteComponentProps} from "react-router";
import {DEFAUT_HM} from "../../../types/defaults";

interface IProps extends RouteComponentProps<any> {}
// refetch 가 Query 컴포넌트 리턴 프로프임

export interface IQueryOp {
  selectStatic: string;
  unit: SalesStatisticsUnit;
}

class GetHouseMenuaQu extends Query<getHMforPublic, getHMforPublicVariables> {}

const HMwrap: React.FC<IProps> = ({match}) => {
  const [currentLang, setCurrentLang] = useState(Language.KOREAN);

  if (!match.params.publickey) {
    alert("접근불가");
  }

  return (
    <div>
      <GetHouseMenuaQu
        query={GET_HOUSE_MENUAL_FOR_PUBLIC}
        variables={{
          publicKey: match.params.publickey
        }}
      >
        {({data: HMData, loading}) => {
          const HM =
            queryDataFormater(HMData, "GetHMforPublic", "HM", DEFAUT_HM) ||
            DEFAUT_HM;

          return (
            <HMcomponent
              loading={loading}
              enableLangs={HM.langList}
              menuData={HM.menus}
              currentLang={currentLang}
              setCurrentLang={setCurrentLang}
              userInfo={{
                profileImg: HM.profileImg,
                phoneNumber: HM.phoneNumber,
                location: HM.location,
                email: HM.email
              }}
              bgData={HM.backgroundImg || ""}
              title={HM.title}
            />
          );
        }}
      </GetHouseMenuaQu>
    </div>
  );
};

export default HMwrap;
