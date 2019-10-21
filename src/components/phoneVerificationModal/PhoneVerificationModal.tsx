import React, {useEffect, useState} from "react";
import InputText from "../../atoms/forms/inputText/InputText";
import Modal from "../../atoms/modal/Modal";
import Button from "../../atoms/button/Button";
import {useInput, IUseModal, LANG} from "../../hooks/hook";
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
      <h5>{LANG("mobile_phone_verification_number")}</h5>
      <JDTimer initialTime={TimePerMs.M * 3} direction="backward">
        {({timerState}: any) => {
          if (timerState === "STOPPED") {
            setTimeOver(true);
          }
          return (
            <span className="JDtimer">
              <span className="JDtimer__minute">
                <Timer.Minutes />
                {LANG("minute")}
              </span>
              <span className="JDtimer__second">
                <Timer.Seconds />
                {LANG("second")}
              </span>
            </span>
          );
        }}
      </JDTimer>
      <InputText {...keyHook} label={LANG("certification_number")} />
      <div className="JDmodal__endSection">
        <Button
          thema={"primary"}
          label={LANG("authenticate")}
          onClick={() => {
            if (isTimeOver) {
              toast.warn(LANG("timeout_please_request_again"));
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
