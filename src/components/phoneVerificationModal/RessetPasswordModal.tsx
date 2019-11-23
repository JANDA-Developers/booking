import React, { useState } from "react";
import JDmodal from "../../atoms/modal/Modal";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { IUseModal, LANG, useInput } from "../../hooks/hook";
import Button from "../../atoms/button/Button";
import InputText from "../../atoms/forms/inputText/InputText";
import { MutationFunctionOptions } from "@apollo/react-common";
import {
  startPasswordReset,
  startPasswordResetVariables,
  completePasswordResetVariables,
  completePasswordReset
} from "../../types/api";
import { ExecutionResult } from "graphql";
import { isPhone, isEmail } from "../../utils/inputValidations";
import { toast } from "react-toastify";
import PhoneVerificationModal from "./PhoneVerificationModal";
import { muResult } from "../../utils/utils";
import copytoClipboard from "../../utils/copyToClipboard";
interface Iprops {
  context: IContext;
  modalHook: IUseModal;
  muLoading: boolean;
  completePasswordResetMu: (
    options?:
      | MutationFunctionOptions<
          completePasswordReset,
          completePasswordResetVariables
        >
      | undefined
  ) => Promise<ExecutionResult<completePasswordReset>>;
  startPasswordResetMu: (
    options?:
      | MutationFunctionOptions<startPasswordReset, startPasswordResetVariables>
      | undefined
  ) => Promise<ExecutionResult<startPasswordReset>>;
}

const RessetPasswordModal: React.FC<Iprops> = ({
  context,
  muLoading,
  modalHook,
  completePasswordResetMu,
  startPasswordResetMu
}) => {
  const [step, setStep] = useState<"input" | "verify" | "complete">("input");
  const [newPassword, setNewPassword] = useState("");
  const phoneNumberHook = useInput("");
  const emailHook = useInput("");

  const mutationVariable = {
    email: emailHook.value,
    phoneNumber: phoneNumberHook.value
  };

  const handleCompleteBtnClick = async (key: string) => {
    const { data } = await completePasswordResetMu({
      variables: { ...mutationVariable, key }
    });

    const result = muResult(data!, "CompletePasswordReset", "newPassword");
    if (result === "error") return;
    setNewPassword(result);
    setStep("complete");
  };

  const validate = () => {
    if (!emailHook.isValid) {
      toast.warn(LANG("not_a_valid_email"));
      return false;
    }
    if (!phoneNumberHook.isValid) {
      toast.warn(LANG("not_a_valid_phoneNumber"));
      return false;
    }
    return true;
  };
  const modalOpenCallBackFn = async () => {
    const tempResult = await startPasswordResetMu({
      variables: mutationVariable
    });
    const result = muResult<boolean>(tempResult, "StartPasswordReset");
    console.log("result");
    console.log(result);
    console.log(tempResult);
    if (!result) {
      setStep("input");
    }
  };

  if (step === "input") {
    return (
      <JDmodal {...modalHook}>
        <h6>{LANG("get_temporary_password")}</h6>
        <div>
          <InputText
            hyphen
            validation={isPhone}
            {...phoneNumberHook}
            label={LANG("phoneNumber")}
          />
        </div>
        <div>
          <InputText
            validation={isEmail}
            {...emailHook}
            label={LANG("eamil")}
          />
        </div>
        <div className="JDmodal__endSection">
          <Button
            thema="primary"
            onClick={() => {
              if (validate()) {
                setStep("verify");
              }
            }}
            label={LANG("get_temporary_password")}
          ></Button>
        </div>
      </JDmodal>
    );
  } else if (step === "verify") {
    return (
      <PhoneVerificationModal
        phoneNumber={phoneNumberHook.value}
        modalOpenCallBackFn={modalOpenCallBackFn}
        handleCompleteBtnClick={handleCompleteBtnClick}
        modalHook={modalHook}
        muLoading={muLoading}
      />
    );
  } else {
    return (
      <JDmodal {...modalHook} onRequestClose={() => {}}>
        <h6>{LANG("password_resset_completed")}</h6>
        <InputText
          label={LANG("temp_password")}
          value={newPassword}
          iconHover
          iconOnClick={() => {
            copytoClipboard(newPassword);
          }}
          icon={"copyFile"}
          readOnly
        />
        <div className="JDmodal__endSection">
          <Button
            thema="primary"
            onClick={() => {
              modalHook.closeModal();
            }}
            label={LANG("close")}
          />
        </div>
      </JDmodal>
    );
  }
};

export default RessetPasswordModal;
