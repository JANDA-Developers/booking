import React, {useEffect, useState} from "react";
import InputText from "../../atoms/forms/inputText/InputText";
import Modal from "../../atoms/modal/Modal";
import Button from "../../atoms/button/Button";
import {useInput, IUseModal} from "../../hooks/hook";
import {ErrProtecter} from "../../utils/utils";
import "./PhoneVerification.scss";
import JDmodal from "../../atoms/modal/Modal";
import {MutationFn} from "react-apollo";
import {
  completePhoneVerification,
  completePhoneVerificationVariables,
  startPhoneVerification,
  startPhoneVerificationWithPhoneNumber,
  startPhoneVerificationWithPhoneNumberVariables
} from "../../types/api";
import JDTimer, {TimerStateType} from "../../atoms/timer/Timer";
import {TimePerMs} from "../../types/enum";
import Timer from "react-compound-timer";
import {toast} from "react-toastify";

interface IProps {
  modalHook: IUseModal<any>;
  startPhoneVerificationMu: MutationFn<
    startPhoneVerificationWithPhoneNumber,
    startPhoneVerificationWithPhoneNumberVariables
  >;
  completePhoneVerificationMu: MutationFn<
    completePhoneVerification,
    completePhoneVerificationVariables
  >;
  phoneNumber: string | undefined;
}

const PhoneVerification: React.FC<IProps> = ({
  modalHook,
  completePhoneVerificationMu,
  startPhoneVerificationMu,
  phoneNumber
}) => {
  const keyHook = useInput("");
  const [isTimeOver, setTimeOver] = useState(false);

  useEffect(() => {
    if (phoneNumber && modalHook.isOpen) {
      startPhoneVerificationMu({
        variables: {
          phoneNumber: phoneNumber
        }
      });
    }
  }, [phoneNumber]);

  return (
    <JDmodal
      {...modalHook}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <h5>휴대폰 인증번호</h5>
      <JDTimer initialTime={TimePerMs.M * 3} direction="backward">
        {({timerState}: any) => {
          if (timerState === "STOPPED") {
            setTimeOver(true);
          }
          return (
            <span className="JDtimer">
              <span className="JDtimer__minute">
                <Timer.Minutes />분
              </span>
              <span className="JDtimer__second">
                <Timer.Seconds />초
              </span>
            </span>
          );
        }}
      </JDTimer>
      <InputText {...keyHook} label="인증번호" />
      <div className="JDmodal__endSection">
        <Button
          
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
