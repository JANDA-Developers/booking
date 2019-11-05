import React from "react";
import {showError, onCompletedMessage} from "../../utils/utils";
import {Mutation} from "react-apollo";
import PhoneVerificationModal from "./PhoneVerificationModal";
import {
  completePhoneVerification,
  startPhoneVerification,
  completePhoneVerificationVariables,
  startPhoneVerificationWithPhoneNumber,
  startPhoneVerificationWithPhoneNumberVariables
} from "../../types/api";
import {
  PHONE_VERIFICATION,
  COMEPLETE_PHONE_VERIFICATION,
  GET_USER_INFO,
  START_PHONE_VERIFICATION_WITH_PHONE_NUMBER
} from "../../queries";
import EerrorProtect from "../../utils/errProtect";
import {IUseModal, LANG} from "../../hooks/hook";
import {RouteComponentProps} from "react-router";

class StartPhoneVerificationMu extends Mutation<
  startPhoneVerificationWithPhoneNumber,
  startPhoneVerificationWithPhoneNumberVariables
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
    variables={{phoneNumber}}
    mutation={START_PHONE_VERIFICATION_WITH_PHONE_NUMBER}
    onCompleted={({StartSenderVerification}) => {
      onCompletedMessage(
        StartSenderVerification,
        LANG("certification_number_sent"),
        LANG("certification_number_sent_fail")
      );
    }}
  >
    {startPhoneVerificationMu => {
      /* 👿 ??? 이걸 바로실행하면 무한반복됨 이유가뭘까? */
      return (
        <CompletePhoneVerification
          mutation={COMEPLETE_PHONE_VERIFICATION}
          onCompleted={({CompletePhoneVerification}) => {
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
          refetchQueries={[{query: GET_USER_INFO}]}
        >
          {(
            completePhoneVerificationMu,
            {loading: completePhoneVerificationLoding}
          ) => (
            // performance.now() ::[https://stackoverflow.com/questions/51524293/new-date-as-react-key-prop]
            <PhoneVerificationModal
              key={`phoneVerification${modalHook.isOpen && "--open"}`}
              startPhoneVerificationMu={startPhoneVerificationMu}
              completePhoneVerificationMu={completePhoneVerificationMu}
              muLoading={completePhoneVerificationLoding}
              phoneNumber={phoneNumber}
              modalHook={modalHook}
            />
          )}
        </CompletePhoneVerification>
      );
    }}
  </StartPhoneVerificationMu>
);

export default EerrorProtect(PhoneVerificationModalWrap);
