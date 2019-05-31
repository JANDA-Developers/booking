import React from "react";
import {showError, onCompletedMessage} from "../../utils/utils";
import {Mutation} from "react-apollo";
import PhoneVerificationModal from "./PhoneVerificationModal";
import {
  completePhoneVerification,
  startPhoneVerification,
  completePhoneVerificationVariables
} from "../../types/api";
import {
  PHONE_VERIFICATION,
  COMEPLETE_PHONE_VERIFICATION,
  GET_USER_INFO
} from "../../queries";
import EerrorProtect from "../../utils/errProtect";
import {IUseModal} from "../../actions/hook";
import {RouteComponentProps} from "react-router";

class StartPhoneVerificationMu extends Mutation<startPhoneVerification> {}
class CompletePhoneVerification extends Mutation<
  completePhoneVerification,
  completePhoneVerificationVariables
> {}

interface Iprops {
  modalHook: IUseModal;
  phoneNumber: string;
}

const PhoneVerificationModalWrap: React.FC<Iprops> = ({
  modalHook,
  phoneNumber
}) => {
  <StartPhoneVerificationMu
    mutation={PHONE_VERIFICATION}
    onCompleted={({StartPhoneVerification}) => {
      onCompletedMessage(
        StartPhoneVerification,
        "인증번호 발송완료",
        "인증번호 발송실패"
      );
    }}
  >
    {StartPhoneVerificationMu => {
      StartPhoneVerificationMu();
      return (
        <CompletePhoneVerification
          mutation={COMEPLETE_PHONE_VERIFICATION}
          onCompleted={({CompletePhoneVerification}) => {
            onCompletedMessage(
              CompletePhoneVerification,
              "핸드폰 인증완료",
              "핸드폰 인증실패"
            );
          }}
          onError={showError}
          awaitRefetchQueries
          refetchQueries={[{query: GET_USER_INFO}]}
        >
          {completePhoneVerificationMu => (
            <PhoneVerificationModal
              completePhoneVerificationMu={completePhoneVerificationMu}
              modalHook={modalHook}
            />
          )}
        </CompletePhoneVerification>
      );
    }}
  </StartPhoneVerificationMu>;
};

export default EerrorProtect(PhoneVerificationModalWrap);
