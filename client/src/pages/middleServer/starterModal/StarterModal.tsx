import React from "react";
import JDmultiStep from "../../../atoms/multiStep/MultiStep";
import Steps from "./comonent/steps";
import {IContext} from "../../MiddleServerRouter";
import {HouseStatus} from "../../../types/enum";
import {isEmpty, stepFinder} from "../../../utils/utils";
import JDmodal from "../../../atoms/modal/Modal";
import {useModal} from "../../../actions/hook";
import "./StarterModal.scss";
import {MutationFn} from "react-apollo";
import {updateHouse, updateHouseVariables} from "../../../types/api";

interface IProps {
  context: IContext;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
}

const StarterModal: React.FC<IProps> = ({context, updateHouseMu}) => {
  const modalHook = useModal(true);

  const step = stepFinder(context);

  return (
    <JDmodal
      className="staterModal"
      {...modalHook}
      minWidth="40%"
      isUnderHeader
      onRequestClose={() => {}}
    >
      {step !== "done" && (
        <div className="staterModal__stepsWrap">
          <JDmultiStep
            steps={[
              {
                current: step === "phoneVerification",
                name: "휴대폰인증"
              },
              {
                current: step === "houseMake",
                name: "숙소생성"
              },
              {
                current: step === "makeProduct",
                name: "상품등록"
              },
              {
                current: step === "readyAssign",
                name: "적용대기"
              },
              {
                current: step === "makeRoom",
                name: "방생성"
              }
            ]}
          />
        </div>
      )}
      <div className="dashBoard__stepsWrap">
        <Steps
          stepFinishCallBack={() => {
            modalHook.closeModal();
            location.reload();
          }}
          updateHouseMu={updateHouseMu}
          context={context}
          step={step}
        />
      </div>
    </JDmodal>
  );
};

export default StarterModal;
