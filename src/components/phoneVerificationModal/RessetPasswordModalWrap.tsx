import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { IUseModal, LANG } from "../../hooks/hook";
import { useMutation, resetApolloContext } from "@apollo/react-hooks";
import {
  START_PASSWORD_RESET,
  COMPLETE_PASSWORD_RESETE
} from "../../apollo/queries";
import {
  startPasswordReset,
  startPasswordResetVariables,
  completePasswordReset,
  completePasswordResetVariables
} from "../../types/api";
import client from "../../apollo/apolloClient";
import RessetPasswordModal from "./RessetPasswordModal";
import { onCompletedMessage } from "../../utils/utils";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

const RessetPasswordWrap: React.FC<Iprops> = ({ context, modalHook }) => {
  const [
    startPasswordResetMu,
    { loading: startPasswordResetLoading }
  ] = useMutation<startPasswordReset, startPasswordResetVariables>(
    START_PASSWORD_RESET,
    {
      client,
      onCompleted: ({ StartPasswordReset }) => {
        onCompletedMessage(
          StartPasswordReset,
          LANG("certification_number_sent"),
          LANG("certification_number_sent_fail")
        );
        sessionStorage.setItem("tempPassword", "true");
      }
    }
  );
  const [
    completePasswordResetMu,
    { loading: completePasswordResetLoading }
  ] = useMutation<completePasswordReset, completePasswordResetVariables>(
    COMPLETE_PASSWORD_RESETE,
    {
      client,
      onCompleted: ({ CompletePasswordReset }) => {
        onCompletedMessage(
          CompletePasswordReset,
          LANG("password_resset_completed"),
          LANG("password_resset_failed")
        );
      }
    }
  );
  const muLoading = completePasswordResetLoading || startPasswordResetLoading;

  return (
    <RessetPasswordModal
      completePasswordResetMu={completePasswordResetMu}
      startPasswordResetMu={startPasswordResetMu}
      context={context}
      modalHook={modalHook}
      muLoading={muLoading}
    />
  );
};

export default RessetPasswordWrap;
