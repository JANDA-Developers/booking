import React, { useState } from "react";
import { toast } from "react-toastify";
import { LANG, IUseModal } from "../../../hooks/hook";
import JDmodal from "../../../atoms/modal/Modal";
import { JDpreloader, useInput } from "@janda-com/front";
import SecurityLevelViewer, { TCheck } from "../signUp/SecurityLevelViewer";
import ModalEndSection from "../../../atoms/modal/components/ModalEndSection";
import Button from "../../../atoms/button/Button";
import {
  completePasswordResetVariables,
  startPasswordReset,
  startPasswordResetVariables
} from "../../../types/api";
import Align from "../../../atoms/align/Align";
import InputText from "../../../atoms/forms/inputText/InputText";
import { IMu } from "../../../types/interface";
import { isPhone, isEmail } from "../../../utils/inputValidations";
import $ from "jquery";

interface Iprops {
  modalHook: IUseModal;
  mode?: "tempCover";
  startChangeMu: IMu<startPasswordReset, startPasswordResetVariables>;
  callBackChangeBtn: (value: completePasswordResetVariables) => void;
  muLoading: boolean;
}

const PasswordChangeModal: React.FC<Iprops> = ({
  modalHook,
  startChangeMu,
  callBackChangeBtn,
  mode,
  muLoading
}) => {
  const emailHook = useInput("");
  const phoneNumberHook = useInput("");
  const keyHook = useInput("");
  const newPasswordHook = useInput("");
  const newConfimPasswordHook = useInput("");
  const [passwordLevelViewer, setPasswordLevelViewer] = useState<TCheck>({
    enAndNumber: false,
    length: false,
    special: false,
    checkedCount: 0
  });

  const verifyValidate = () => {
    if (!isPhone(phoneNumberHook.value)) {
      toast.warn(LANG("not_a_valid_phoneNumber"));
      $("#veriEmialInput").focus();
      return false;
    }
    if (!isEmail(emailHook.value)) {
      toast.warn(LANG("not_a_valid_email"));
      $("#veriPhoneInput").focus();
      return false;
    }
    return true;
  };

  const validate = () => {
    if (newPasswordHook.value !== newConfimPasswordHook.value) {
      toast.warn(LANG("password_is_not_matched"));
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
      <div>
        <InputText id="veriEmialInput" label={LANG("eamil")} {...emailHook} />
      </div>
      <Align flex={{}}>
        <InputText
          id="veriPhoneInput"
          hyphen
          label={LANG("phoneNumber")}
          {...phoneNumberHook}
        />
        <Button
          style={{
            alignSelf: "flex-end"
          }}
          onClick={() => {
            if (verifyValidate()) {
              startChangeMu({
                variables: {
                  email: emailHook.value,
                  phoneNumber: phoneNumberHook.value
                }
              });
            }
          }}
          mode="border"
          thema="primary"
          label={LANG("authenticate")}
        />
      </Align>
      <div>
        <InputText label={LANG("certification_number")} {...keyHook} />
      </div>

      <div>
        <InputText
          label={LANG("new_password")}
          type="password"
          {...newPasswordHook}
        />
      </div>
      <SecurityLevelViewer
        passwordCondition={passwordLevelViewer}
        setPasswordCondition={setPasswordLevelViewer}
        password={newPasswordHook.value}
      />
      <div className="JDsmall-text JDstandard-margin-bottom"></div>
      <div>
        <InputText
          label={LANG("check_new_password")}
          type="password"
          {...newConfimPasswordHook}
        />
      </div>
      <ModalEndSection>
        <Button
          mode="flat"
          onClick={() => {
            if (validate()) {
              callBackChangeBtn({
                email: emailHook.value,
                key: keyHook.value,
                newPassword: newPasswordHook.value,
                newPasswordRe: newConfimPasswordHook.value,
                phoneNumber: phoneNumberHook.value
              });
            }
          }}
          thema="primary"
          label={LANG("change")}
        />
      </ModalEndSection>
    </JDmodal>
  );
};

export default PasswordChangeModal;
