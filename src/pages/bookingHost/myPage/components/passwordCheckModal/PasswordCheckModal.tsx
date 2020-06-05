import React from "react";
import { LANG, IUseModal, useInput } from "../../../../../hooks/hook";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import Button from "../../../../../atoms/button/Button";
import { isPassword } from "../../../../../utils/inputValidations";
import JDmodal from "../../../../../atoms/modal/Modal";
import { toast } from "react-toastify";
import ModalEndSection from "../../../../../atoms/modal/components/ModalEndSection";

interface Iprops {
  modalHook: IUseModal;
  handleCallBackConfirm: (password: string) => void;
}

const PasswordCheckModal: React.FC<Iprops> = ({
  handleCallBackConfirm,
  modalHook
}) => {
  const passwordHook = useInput("");

  const validate = () => {
    return true;
  };

  return (
    <JDmodal head={{
      title: LANG("change_profile")
    }} {...modalHook}>
      <div>
        <InputText
          id="ChangeUserProfilePWInput"
          {...passwordHook}
          type="password"
          label={LANG("password")}
        />
      </div>
      <ModalEndSection>
        <Button
          id="ChangeProfileModalChangeBtn"
          mode="flat"
          thema="primary"
          label={LANG("confirm")}
          onClick={(e: any) => {
            if (validate()) {
              handleCallBackConfirm(passwordHook.value);
            }
          }}
        />
      </ModalEndSection>
    </JDmodal>
  );
};

export default PasswordCheckModal;
