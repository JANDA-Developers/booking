import React, { Fragment } from "react";
import { getRoomCountFromHouse } from "../../../../utils/utils";
import Button from "../../../../atoms/button/Button";
import $ from "jquery";
import CreateHouse from "../../createHouse/CreateHouse";
import SelectProductWrap from "../../product/SelectProductWrap";
import Ready from "../../ready/Ready";
import RoomConfigWrap from "../../roomConfig/RoomConfigWrap";
import { IContext } from "../../../bookingHost/BookingHostRouter";
import { IStepsStart } from "../../../../utils/stepFinder";
import { MutationFn } from "react-apollo";
import { updateHouse, updateHouseVariables } from "../../../../types/api";
import { getOperationName } from "apollo-link";
import { GET_USER_INFO } from "../../../../apollo/queries";
import "./StarterSteps.scss";
import { LANG } from "../../../../hooks/hook";

interface IProps {
  step: IStepsStart;
  setStep: React.Dispatch<React.SetStateAction<IStepsStart>>;
  stepFinishCallBack: () => void;
  houseId?: string;
  context: IContext;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
}

const StarterSteps: React.FC<IProps> = ({
  step,
  context,
  stepFinishCallBack,
  updateHouseMu,
  setStep
}) => {
  const { house } = context;
  switch (step) {
    case "phoneVerification":
      return (
        <Fragment>
          <h5 id="phoneVerification">
            {LANG("please_verify_your_mobile_phone_to_ensure_smooth_service")}
          </h5>
          <div className="JDmodal__endSection">
            <Button
              id="StarterHeaderPhoneVerificationBtn"
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
                mode="flat"
                disabled={getRoomCountFromHouse(house) < 1}
                size="long"
                label={LANG("exit_room_settings")}
              />
            </div>
          </div>
        </Fragment>
      );
    default:
      stepFinishCallBack();
      return <div />;
  }
};
export default StarterSteps;
