import React from "react";
import { changePassword, changePasswordVariables } from "../../types/api";
import { CHANGE_PASSWORD } from "../../apollo/queries";
import client from "../../apollo/apolloClient";
import { useMutation } from "@apollo/react-hooks";
import { onCompletedMessage } from "../../utils/utils";
import { LANG, IUseModal } from "../../hooks/hook";
import ChangePasswordModal from "./ChangePasswordModal";

interface Iprops {
  modalHook: IUseModal;
}

// 로그인 되어있을떄
const ChangePasswordModalWrap: React.FC<Iprops> = ({ modalHook }) => {
  const [changePasswordMu, { loading: changePasswordLoading }] = useMutation<
    changePassword,
    changePasswordVariables
  >(CHANGE_PASSWORD, {
    client,
    onCompleted: ({ ChangePassword }) => {
      onCompletedMessage(
        ChangePassword,
        LANG("change_password_complete"),
        LANG("change_password_failed")
      );
      modalHook.closeModal();
    }
  });

  const callBackChangeBtn = (
    currentPassword: string,
    newPassword: string,
    newPasswordRepeat: string
  ) => {
    changePasswordMu({
      variables: {
        currentPassword,
        newPassword,
        newPasswordRepeat
      }
    });
  };

  return (
    <ChangePasswordModal
      muLoading={changePasswordLoading}
      callBackChangeBtn={callBackChangeBtn}
      modalHook={modalHook}
    />
  );
};

export default ChangePasswordModalWrap;
