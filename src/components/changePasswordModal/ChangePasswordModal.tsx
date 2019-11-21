import React, { useState } from "react";
import InputText from "../../atoms/forms/inputText/InputText";
import { useInput, LANG, IUseModal } from "../../hooks/hook";
import Button from "../../atoms/button/Button";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { toast } from "react-toastify";
import { isPassword } from "../../utils/inputValidations";
import { string } from "prop-types";
import JDmodal from "../../atoms/modal/Modal";
import PreloaderModal from "../../atoms/preloaderModal/PreloaderModal";
import JDpreloader from "../../atoms/preloader/Preloader";
import PasswordChecker from "../passwordChecker/PasswordCheck";

interface Iprops {
  modalHook: IUseModal;
  mode?: "tempCover";
  callBackChangeBtn: (old: string, newP: string, newConfim: string) => void;
  muLoading: boolean;
}

const ChangePasswordModal: React.FC<Iprops> = ({
  modalHook,
  callBackChangeBtn,
  mode,
  muLoading
}) => {
  const oldPasswordHook = useInput("");
  const newPasswordHook = useInput("");
  const newConfimPasswordHook = useInput("");

  const validate = () => {
    if (!oldPasswordHook.value) {
      toast.warn(LANG("input_your_password_please"));
      return false;
    }
    if (!newPasswordHook.isValid) {
      toast.warn(LANG("invalid_password"));
      return false;
    }
    if (newPasswordHook.value !== newConfimPasswordHook.value) {
      toast.warn("password_is_not_matched");
      return false;
    }
    return true;
  };

  return (
    <JDmodal {...modalHook}>
      <h6>
        {mode === "tempCover"
          ? LANG("please_rewrite_your_new_password")
          : LANG("password_rewrite")}
      </h6>
      <InputText label={LANG("")} {...oldPasswordHook} />
      <InputText
        validation={isPassword}
        label={LANG("new_password")}
        type="password"
        {...newPasswordHook}
      />
      <JDpreloader loading={muLoading} floating />
      <PasswordChecker txt={newPasswordHook.value} />
      <InputText
        validation={isPassword}
        label={LANG("check_password")}
        type="password"
        {...newConfimPasswordHook}
      />
      <Button
        onClick={() => {
          if (validate()) {
            callBackChangeBtn(
              oldPasswordHook.value,
              newPasswordHook.value,
              newConfimPasswordHook.value
            );
          }
        }}
        thema="primary"
        label={LANG("change")}
      />
    </JDmodal>
  );
};

export default ChangePasswordModal;