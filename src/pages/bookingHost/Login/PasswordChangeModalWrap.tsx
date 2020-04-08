import React from "react";
import { IUseModal } from "@janda-com/front";
import { useMutation } from "@apollo/react-hooks";
import {
  completePasswordReset,
  completePasswordResetVariables,
  startPasswordReset,
  startPasswordResetVariables
} from "../../../types/api";
import {
  CHANGE_PASSWORD,
  START_PASSWORD_RESET,
  COMPLETE_PASSWORD_RESETE
} from "../../../apollo/queries";
import client from "../../../apollo/apolloClient";
import { LANG } from "../../../hooks/hook";
import PasswordChangeModal from "./PasswordChangeModal";
import { onCompletedMessage } from "../../../utils/utils";
interface Iprops {
  modalHook: IUseModal;
}

// 로그인 안되어 있을때
const PasswordChangeModalWrap: React.FC<Iprops> = ({ modalHook }) => {
  const [changePasswordMu, { loading: changePasswordLoading }] = useMutation<
    completePasswordReset,
    completePasswordResetVariables
  >(COMPLETE_PASSWORD_RESETE, {
    client,
    onCompleted: ({ CompletePasswordReset }) => {
      onCompletedMessage(
        CompletePasswordReset,
        LANG("change_password_complete"),
        LANG("change_password_failed")
      );
      modalHook.closeModal();
    }
  });

  const [startPasswordRestMu, { loading: startLoading }] = useMutation<
    startPasswordReset,
    startPasswordResetVariables
  >(START_PASSWORD_RESET, {
    client,
    onCompleted: ({ StartPasswordReset }) => {
      onCompletedMessage(
        StartPasswordReset,
        LANG("certification_number_sent"),
        LANG("auth_failed")
      );
    }
  });

  const callBackChangeBtn = (value: completePasswordResetVariables) => {
    changePasswordMu({
      variables: value
    });
  };

  return (
    <PasswordChangeModal
      muLoading={startLoading}
      callBackChangeBtn={callBackChangeBtn}
      modalHook={modalHook}
      startChangeMu={startPasswordRestMu}
    />
  );
};

export default PasswordChangeModalWrap;
