import React, {useEffect, useState} from "react";
import InputText from "../../atoms/forms/inputText/InputText";
import Modal from "../../atoms/modal/Modal";
import Button from "../../atoms/button/Button";
import {useInput, IUseModal} from "../../actions/hook";
import {ErrProtecter} from "../../utils/utils";
import "./PhoneVerification.scss";
import JDmodal from "../../atoms/modal/Modal";
import {MutationFn} from "react-apollo";
import {
  completePhoneVerification,
  completePhoneVerificationVariables,
  startPhoneVerification
} from "../../types/api";
import JDTimer, {TimerStateType} from "../../atoms/timer/Timer";
import {TimePerMs} from "../../types/enum";
import Timer from "react-compound-timer";
import {toast} from "react-toastify";

interface IProps {
  modalHook: IUseModal<any>;
  startPhoneVerificationMu: MutationFn<startPhoneVerification>;
  completePhoneVerificationMu: MutationFn<
    completePhoneVerification,
    completePhoneVerificationVariables
  >;
}

const PhoneVerification: React.FC<IProps> = ({
  modalHook,
  completePhoneVerificationMu,
  startPhoneVerificationMu
}) => {
  const keyHook = useInput("");
  const [isTimeOver, setTimeOver] = useState(false);

  useEffect(() => {
    if (modalHook.isOpen) {
      startPhoneVerificationMu();
    }
  }, [modalHook.isOpen]);

  return (
    <JDmodal
      {...modalHook}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <h5>핸드폰 인증번호</h5>
      <JDTimer initialTime={TimePerMs.M * 0.1} direction="backward">
        {({timerState}: any) => {
          if (timerState === "STOPPED") {
            setTimeOver(true);
          }
          return (
            <React.Fragment>
              <Timer.Minutes />분
              <Timer.Seconds />초
            </React.Fragment>
          );
        }}
      </JDTimer>
      <InputText {...keyHook} label="인증번호" />
      <div className="JDmodal__endSection">
        <Button
          mode="flat"
          thema={"primary"}
          label="인증하기"
          onClick={() => {
            if (isTimeOver) {
              toast.warn("시간초과 다시 요청하세요.");
            }
            completePhoneVerificationMu({
              variables: {
                key: keyHook.value
              }
            });
          }}
        />
      </div>
    </JDmodal>
  );
};

export default ErrProtecter(PhoneVerification);
