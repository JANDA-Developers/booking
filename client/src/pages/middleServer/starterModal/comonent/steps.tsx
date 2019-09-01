import React, {useState, Fragment} from "react";
import classNames from "classnames";
import JDanimation, {Animation} from "../../../../atoms/animation/Animations";
import {IUser, IHouse} from "../../../../types/interface";
import {randomIntFromInterval, insideRedirect} from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import Button from "../../../../atoms/button/Button";
import {NavLink} from "react-router-dom";
import SpecificAtion from "../../../../components/specification/Specification";
import SpecificAtionWrap from "../../../../components/specification/SpecificationWrap";
import $ from "jquery";
import MakeHouse from "../../makeHouse/MakeHouse";
import SelectProductWrap from "../../product/SelectProductWrap";
import Ready from "../../ready/Ready";
import RoomConfigWrap from "../../roomConfig/RoomConfigWrap";
import {IContext} from "../../../MiddleServerRouter";
import {ApolloCache} from "apollo-cache";
import AdditionConfigPitch from "../../../../components/additionConfigPitch/AdditionConfigPitch";
import {IStepsStart} from "../../../../utils/stepFinder";
import {MutationFn} from "react-apollo";
import {updateHouse, updateHouseVariables} from "../../../../types/api";
import HouseCard from "../../super/components/houseCard";

interface IProps {
  step: IStepsStart;
  stepFinishCallBack: () => void;
  houseId?: string;
  context: IContext;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
}

// 스탭 1 : 휴대폰인증
// 스탭 2 : 숙소생성
// 스탭 3 : 상품등록
// 스탭 3.5 : 승인대기
// 스탭 4 : 방타입생성

const Steps: React.FC<IProps> = ({
  step,
  context,
  stepFinishCallBack,
  updateHouseMu
}) => {
  const {house} = context;
  switch (step) {
    case "phoneVerification":
      return (
        <Fragment>
          <h5>
            원활한 서비스진행을 위해 <br /> 핸드폰 인증을 해주세요.
          </h5>
          <div className="JDmodal__endSection">
            <Button
              onClick={() => {
                $("#HeaderPhoneVerificationBtn").click();
              }}
              mode="border"
              thema="primary"
              label="휴대폰 인증하기"
            />
          </div>
        </Fragment>
      );
    case "houseMake":
      return (
        <Fragment>
          <div className="JDsectionDistroy">
            <MakeHouse />
          </div>
        </Fragment>
      );
    case "makeProduct":
      return (
        <Fragment>
          <div className="JDsectionDistroy">
            <SelectProductWrap context={context} />
          </div>
        </Fragment>
      );
    case "readyAssign":
      return (
        <Fragment>
          <div className="JDsectionDistroy">
            <Ready context={context} />
          </div>
        </Fragment>
      );
    case "makeRoom":
      return (
        <Fragment>
          <div className="JDsectionDistroy">
            <RoomConfigWrap context={context} />
          </div>
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <AdditionConfigPitch context={context} />
          <div className="JDmodal__endSection">
            <Button
              onClick={() => {
                updateHouseMu({
                  variables: {
                    houseId: house._id,
                    completeDefaultSetting: true
                  }
                });
                stepFinishCallBack();
              }}
              label="숙소설정을 끝내겠습니다."
              size="long"
              thema="primary"
            />
          </div>
        </Fragment>
      );
  }
};
export default Steps;
