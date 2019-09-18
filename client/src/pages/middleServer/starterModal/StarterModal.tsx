import React, {useState} from "react";
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
import Mbr from "../../../atoms/mbr/Mbr";

interface IProps {
  context: IContext;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
}

const StarterModal: React.FC<IProps> = ({context, updateHouseMu}) => {
  const modalHook = useModal(true);

  const defaultStep = stepFinder(context);

  const [step, setStep] = useState(defaultStep);

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
                name: <span>휴대폰인증</span>
              },
              {
                current: step === "houseMake",
                name: (
                  <span>
                    숙소
                    <Mbr />
                    생성
                  </span>
                )
              },
              {
                current: step === "makeProduct",
                name: (
                  <span>
                    상품
                    <Mbr />
                    등록
                  </span>
                )
              },
              {
                current: step === "readyAssign",
                name: (
                  <span>
                    적용
                    <Mbr />
                    대기
                  </span>
                )
              },
              {
                current: step === "makeRoom",
                name: <span>방생성</span>
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
          setStep={setStep}
          step={step}
        />
      </div>
    </JDmodal>
  );
};

export default StarterModal;
