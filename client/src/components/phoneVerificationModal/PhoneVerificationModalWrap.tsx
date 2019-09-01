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
import {IUseModal} from "../../actions/hook";
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
        "인증번호 발송완료",
        "인증번호 발송실패"
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
              "휴대폰 인증완료",
              "휴대폰 인증실패"
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
          {completePhoneVerificationMu => (
            // performance.now() ::[https://stackoverflow.com/questions/51524293/new-date-as-react-key-prop]
            <PhoneVerificationModal
              key={`phoneVerification${modalHook.isOpen && "--open"}`}
              startPhoneVerificationMu={startPhoneVerificationMu}
              completePhoneVerificationMu={completePhoneVerificationMu}
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
