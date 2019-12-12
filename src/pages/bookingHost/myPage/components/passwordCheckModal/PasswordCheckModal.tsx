import React from "react";
import { LANG, IUseModal, useInput } from "../../../../../hooks/hook";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import Button from "../../../../../atoms/button/Button";
import { isPassword } from "../../../../../utils/inputValidations";
import JDmodal from "../../../../../atoms/modal/Modal";
import { toast } from "react-toastify";

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
    if (!passwordHook.isValid) {
      toast.warn(LANG("not_a_valid_password"));
      return false;
    }
    return true;
  };

  return (
    <JDmodal {...modalHook}>
      <h6>{LANG("change_profile")}</h6>
      <div>
        <InputText
          {...passwordHook}
          type="password"
          validation={isPassword}
          label={LANG("password")}
        />
      </div>
      <div className="JDmodal__endSection">
        <Button
          mode="flat"
          thema="primary"
          label={LANG("confirm")}
          onClick={(e: any) => {
            if (validate()) {
              handleCallBackConfirm(passwordHook.value);
            }
          }}
        />
      </div>
    </JDmodal>
  );
};

export default PasswordCheckModal;
