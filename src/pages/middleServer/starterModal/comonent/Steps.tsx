import React, {useState, Fragment} from "react";
import classNames from "classnames";
import JDanimation, {Animation} from "../../../../atoms/animation/Animations";
import {IUser, IHouse} from "../../../../types/interface";
import {
  randomIntFromInterval,
  insideRedirect,
  getRoomCountFromHouse
} from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import Button from "../../../../atoms/button/Button";
import {NavLink} from "react-router-dom";
import SpecificAtion from "../../../../components/specification/Specification";
import SpecificAtionWrap from "../../../../components/specification/SpecificationWrap";
import $ from "jquery";
import CreateHouse from "../../createHouse/CreateHouse";
import SelectProductWrap from "../../product/SelectProductWrap";
import Ready from "../../ready/Ready";
import RoomConfigWrap from "../../roomConfig/RoomConfigWrap";
import {IContext} from "../../../MiddleServerRouter";
import AdditionConfigPitch from "../../../../components/additionConfigPitch/AdditionConfigPitch";
import {IStepsStart} from "../../../../utils/stepFinder";
import {MutationFn} from "react-apollo";
import {updateHouse, updateHouseVariables} from "../../../../types/api";
import {getOperationName} from "apollo-link";
import {GET_USER_INFO} from "../../../../queries";
import "./Steps.scss";
import {LANG} from "../../../../hooks/hook";

interface IProps {
  step: IStepsStart;
  setStep: React.Dispatch<React.SetStateAction<IStepsStart>>;
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
  updateHouseMu,
  setStep
}) => {
  const {house} = context;
  switch (step) {
    case "phoneVerification":
      return (
        <Fragment>
          <h5>
            {LANG("please_verify_your_mobile_phone_to_ensure_smooth_service")}
          </h5>
          <div className="JDmodal__endSection">
            <Button
              onClick={() => {
                $("#HeaderPhoneVerificationBtn").click();
              }}
              mode="border"
              thema="primary"
              label={LANG("phone_authenticate")}
            />
          </div>
        </Fragment>
      );
    case "houseCreate":
      return (
        <Fragment>
          <div className="JDsectionDistroy steps__createHouseWrap">
            <CreateHouse context={context} />
          </div>
        </Fragment>
      );
    case "createProduct":
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
    case "createRoom":
      return (
        <Fragment>
          <div className="staterModal__createRoom JDsectionDistroy">
            <div className="modal__section">
              <RoomConfigWrap
                refetchQueries={[getOperationName(GET_USER_INFO)!]}
                context={context}
              />
            </div>
            <div className="staterModal__createRoom_finish_Btn JDmodal__endSection">
              <Button
                thema="primary"
                onClick={() => {
                  updateHouseMu({
                    variables: {
                      houseId: house._id,
                      completeDefaultSetting: true
                    }
                  });
                  setStep("done");
                }}
                disabled={getRoomCountFromHouse(house) < 1}
                size="long"
                label={LANG("exit_room_settings")}
              />
            </div>
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
                stepFinishCallBack();
              }}
              label={LANG("exit_house_settings")}
              size="long"
              thema="primary"
            />
          </div>
        </Fragment>
      );
  }
};
export default Steps;
