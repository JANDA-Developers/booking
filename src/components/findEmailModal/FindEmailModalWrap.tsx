import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { IUseModal, LANG } from "../../hooks/hook";
import { useMutation } from "@apollo/react-hooks";
import {
  START_PASSWORD_RESET,
  COMPLETE_PASSWORD_RESET
} from "../../apollo/queries";
import {
  startPasswordResetVariables,
  findMyEmail,
  findMyEmailVariables
} from "../../types/api";
import client from "../../apollo/apolloClient";
import { onCompletedMessage } from "../../utils/utils";
import FindEmailModal from "./FindEmailModal";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

const FindEmailModalWrap: React.FC<Iprops> = ({ context, modalHook }) => {
  const [findMyEmailMu, { loading: findMyEmailLoading }] = useMutation<
    findMyEmail,
    findMyEmailVariables
  >(START_PASSWORD_RESET, {
    client,
    onCompleted: ({ FindMyEmail }) => {
      onCompletedMessage(
        FindMyEmail,
        LANG("certification_number_sent"),
        LANG("certification_number_sent_fail")
      );
    }
  });

  const callBackGetEmailBtn = (phoneNumber: string) => {
    findMyEmailMu({
      variables: {
        phoneNumber
      }
    });
    modalHook.closeModal();
  };

  return (
    <FindEmailModal
      context={context}
      modalHook={modalHook}
      muLoading={findMyEmailLoading}
      callBackGetEmailBtn={callBackGetEmailBtn}
    />
  );
};

export default FindEmailModalWrap;
