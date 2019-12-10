import React from "react";
import { onCompletedMessage } from "../../utils/utils";
import { Mutation } from "react-apollo";
import PhoneVerificationModal from "./PhoneVerificationModal";
import {
  completePhoneVerification,
  completePhoneVerificationVariables,
  startPhoneVerificationWithPhoneNumber
} from "../../types/api";
import {
  COMEPLETE_PHONE_VERIFICATION,
  GET_USER_INFO,
  START_PHONE_VERIFICATION_WITH_PHONE_NUMBER
} from "../../apollo/queries";
import EerrorProtect from "../../utils/errProtect";
import { IUseModal, LANG } from "../../hooks/hook";

class StartPhoneVerificationMu extends Mutation<
  startPhoneVerificationWithPhoneNumber
> {}
class CompletePhoneVerification extends Mutation<
  completePhoneVerification,
  completePhoneVerificationVariables
> {}

interface IPhoneVerifModalInfo {
  phoneNumber?: string;
  onPhoneVerified?(): void;
  [foo: string]: any;
}

interface IProps {
  modalHook: IUseModal<IPhoneVerifModalInfo>;
  phoneNumber?: string;
  onPhoneVerified?(): void;
}

const PhoneVerificationModalWrap: React.FC<IProps> = ({
  modalHook,
  onPhoneVerified = modalHook.info ? modalHook.info.onPhoneVerified : undefined,
  phoneNumber = modalHook.info ? modalHook.info.phoneNumber : undefined
}) => (
  <StartPhoneVerificationMu
    variables={{ phoneNumber }}
    mutation={START_PHONE_VERIFICATION_WITH_PHONE_NUMBER}
    onCompleted={({ StartPhoneVerification }) => {
      onCompletedMessage(
        StartPhoneVerification,
        LANG("certification_number_sent"),
        LANG("certification_number_sent_fail")
      );
    }}
  >
    {(startPhoneVerificationMu, { loading: startVerifiLoading }) => {
      return (
        <CompletePhoneVerification
          mutation={COMEPLETE_PHONE_VERIFICATION}
          onCompleted={({ CompletePhoneVerification }) => {
            onCompletedMessage(
              CompletePhoneVerification,
              LANG("mobile_phone_verification_completed"),
              LANG("mobile_phone_verification_failed")
            );
            modalHook.closeModal();
            if (CompletePhoneVerification.ok) {
              // window.location.reload();
              // onPhoneVerified && onPhoneVerified();
            }
          }}
          awaitRefetchQueries
          refetchQueries={[{ query: GET_USER_INFO }]}
        >
          {(
            completePhoneVerificationMu,
            { loading: completePhoneVerificationLoding }
          ) => {
            const handleCompleteBtnClick = (key: string) => {
              completePhoneVerificationMu({
                variables: {
                  key
                }
              });
            };
            const modalOpenCallBackFn = () => {
              startPhoneVerificationMu({
                variables: {
                  phoneNumber: phoneNumber
                }
              });
            };
            return (
              <PhoneVerificationModal
                key={`phoneVerification${modalHook.isOpen && "--open"}`}
                modalOpenCallBackFn={modalOpenCallBackFn}
                handleCompleteBtnClick={handleCompleteBtnClick}
                muLoading={
                  completePhoneVerificationLoding || startVerifiLoading
                }
                phoneNumber={phoneNumber}
                modalHook={modalHook}
              />
            );
          }}
        </CompletePhoneVerification>
      );
    }}
  </StartPhoneVerificationMu>
);

export default EerrorProtect(PhoneVerificationModalWrap);
