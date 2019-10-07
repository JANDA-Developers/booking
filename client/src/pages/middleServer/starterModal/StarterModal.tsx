import React, {useState} from "react";
import JDmultiStep from "../../../atoms/multiStep/MultiStep";
import Steps from "./comonent/Steps";
import {IContext} from "../../MiddleServerRouter";
import {HouseStatus, MODAL_MIN_WIDTH} from "../../../types/enum";
import {isEmpty, stepFinder} from "../../../utils/utils";
import JDmodal from "../../../atoms/modal/Modal";
import {useModal} from "../../../hooks/hook";
import "./StarterModal.scss";
import {MutationFn} from "react-apollo";
import {updateHouse, updateHouseVariables} from "../../../types/api";
import Mbr from "../../../atoms/mbr/Mbr";
import {isMobile} from "is-mobile";

interface IProps {
  context: IContext;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
}

const StarterModal: React.FC<IProps> = ({context, updateHouseMu}) => {
  const {history} = context;
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
                name: <span>번호인증</span>
              },
              {
                current: step === "houseCreate",
                name: (
                  <span>
                    숙소
                    <Mbr />
                    생성
                  </span>
                )
              },
              {
                current: step === "createProduct",
                name: (
                  <span>
                    상품
                    <Mbr />
                    등록
                  </span>
                )
              },
              {
                current: step === "createRoom",
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
            history.go(0);
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
