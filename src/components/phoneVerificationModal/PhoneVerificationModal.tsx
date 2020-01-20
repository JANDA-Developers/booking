import React, { useEffect, useState } from "react";
import InputText from "../../atoms/forms/inputText/InputText";
import Button from "../../atoms/button/Button";
import { useInput, IUseModal, LANG } from "../../hooks/hook";
import { ErrProtecter } from "../../utils/utils";
import "./PhoneVerification.scss";
import JDmodal from "../../atoms/modal/Modal";
import JDTimer from "../../atoms/timer/Timer";
import { TimePerMs } from "../../types/enum";
import Timer from "react-compound-timer";
import { toast } from "react-toastify";
import PreloaderModal from "../../atoms/preloaderModal/PreloaderModal";
import ModalEndSection from "../../atoms/modal/components/ModalEndSection";

interface IProps {
  modalHook: IUseModal<any>;
  modalOpenCallBackFn: () => void;
  handleCompleteBtnClick: (key: string) => void;
  phoneNumber: string | undefined;
  muLoading: boolean;
}

const PhoneVerification: React.FC<IProps> = ({
  modalHook,
  phoneNumber,
  muLoading,
  handleCompleteBtnClick,
  modalOpenCallBackFn
}) => {
  const keyHook = useInput("");
  const [isTimeOver, setTimeOver] = useState(false);

  useEffect(() => {
    if (phoneNumber && modalHook.isOpen) {
      modalOpenCallBackFn();
    }
  }, [phoneNumber]);

  return (
    <JDmodal
      loading={muLoading}
      {...modalHook}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <h5>{LANG("mobile_phone_verification_number")}</h5>
      <JDTimer initialTime={TimePerMs.M * 3} direction="backward">
        {({ timerState }: any) => {
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
      <InputText
        placeholder={"******"}
        id="verifiKeyInput"
        {...keyHook}
        label={LANG("certification_number")}
      />
      <ModalEndSection>
        <Button
          id="verfiCompleteBtn"
          mode="flat"
          thema={"primary"}
          label={LANG("authenticate")}
          onClick={() => {
            if (muLoading) return;
            if (isTimeOver) {
              toast.warn(LANG("timeout_please_request_again"));
            }
            handleCompleteBtnClick(keyHook.value);
          }}
        />
      </ModalEndSection>
    </JDmodal>
  );
};

export default ErrProtecter(PhoneVerification);
