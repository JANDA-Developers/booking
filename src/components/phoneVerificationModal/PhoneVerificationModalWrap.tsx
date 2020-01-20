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
  callBackPhoneVerified?(): void;
  [foo: string]: any;
}

interface IProps {
  modalHook: IUseModal<IPhoneVerifModalInfo>;
  phoneNumber?: string;
  callBackPhoneVerified?(): void;
}

const PhoneVerificationModalWrap: React.FC<IProps> = ({
  modalHook,
  callBackPhoneVerified = modalHook.info?.onPhoneVerified,
  phoneNumber = modalHook.info?.phoneNumber
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
            if (CompletePhoneVerification.ok) {
              callBackPhoneVerified && callBackPhoneVerified();
            }
          }}
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
                  phoneNumber
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
