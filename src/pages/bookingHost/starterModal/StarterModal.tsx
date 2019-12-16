import React, { useState } from "react";
import JDmultiStep from "../../../atoms/multiStep/MultiStep";
import StarterSteps from "./comonent/StarterSteps";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { stepFinder } from "../../../utils/utils";
import JDmodal from "../../../atoms/modal/Modal";
import { useModal, LANG } from "../../../hooks/hook";
import "./StarterModal.scss";
import { MutationFn } from "react-apollo";
import { updateHouse, updateHouseVariables } from "../../../types/api";
import { isMobile } from "is-mobile";
import { MODAL_MIN_WIDTH } from "../../../types/const";

interface IProps {
  context: IContext;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
  callBackStartStepEnd?: () => void;
}

const StarterModal: React.FC<IProps> = ({
  callBackStartStepEnd,
  context,
  updateHouseMu
}) => {
  const modalHook = useModal(true);

  const defaultStep = stepFinder(context);

  const [step, setStep] = useState(defaultStep);

  return (
    <JDmodal
      className="staterModal"
      {...modalHook}
      minWidth={isMobile() ? MODAL_MIN_WIDTH : "40%"}
      isUnderHeader
      onRequestClose={() => {}}
    >
      {step !== "done" && (
        <div className="staterModal__stepsWrap">
          <JDmultiStep
            steps={[
              {
                current: step === "phoneVerification",
                name: <span>{LANG("auth")}</span>
              },
              {
                current: step === "houseCreate",
                name: <span>{LANG("house_create")}</span>
              },
              {
                current: step === "createProduct",
                name: <span>{LANG("product_registration")}</span>
              },
              {
                current: step === "createRoom",
                name: <span>{LANG("create_room")}</span>
              }
            ]}
          />
        </div>
      )}

      <div className="dashboard__stepsWrap">
        <StarterSteps
          stepFinishCallBack={() => {
            callBackStartStepEnd && callBackStartStepEnd();
            modalHook.closeModal();
          }}
          updateHouseMu={updateHouseMu}
          context={context}
          setStep={setStep}
          step={step}
        />
      </div>
    </JDmodal>
  );
};

export default StarterModal;
