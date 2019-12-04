import React from "react";
import PrivacyPolicy from "../../docs/privacyPolicy";
import { IUseModal } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";

interface Iprops {
  modalHook: IUseModal;
}

const PrivacyPolicyModal: React.FC<Iprops> = ({ modalHook }) => {
  return (
    <JDmodal {...modalHook}>
      <PrivacyPolicy />
    </JDmodal>
  );
};

export default PrivacyPolicyModal;
