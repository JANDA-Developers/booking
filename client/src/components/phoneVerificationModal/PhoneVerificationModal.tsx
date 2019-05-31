import React from "react";
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
  completePhoneVerificationVariables
} from "../../types/api";

interface IProps {
  modalHook: IUseModal<any>;
  completePhoneVerificationMu: MutationFn<
    completePhoneVerification,
    completePhoneVerificationVariables
  >;
}

const PhoneVerification: React.FC<IProps> = ({
  modalHook,
  completePhoneVerificationMu
}) => {
  const keyHook = useInput("");

  return (
    <JDmodal
      {...modalHook}
      className="Modal"
      overlayClassName="Overlay"
      ariaHideApp={false}
    >
      <h5>핸드폰 인증번호</h5>
      <InputText {...keyHook} label="인증번호" />
      <div className="JDmodal__endSection">
        <Button
          mode="flat"
          label="인증하기"
          onClick={() =>
            completePhoneVerificationMu({
              variables: {
                key: keyHook.value
              }
            })
          }
        />
        <Button mode="flat" label="닫기" onClick={() => setPopPhone(false)} />
      </div>
    </JDmodal>
  );
};

export default ErrProtecter(PhoneVerification);
