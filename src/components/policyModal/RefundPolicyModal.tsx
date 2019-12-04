import React from "react";
import JDmodal from "../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../hooks/hook";
import { RefundPolicyNode } from "../../docs/refundPolicy";

interface Iprops {
  modalHook: IUseModal;
}

const RefundPolicyModal: React.FC<Iprops> = ({ modalHook }) => {
  return (
    <JDmodal className="refundModal" {...modalHook}>
      <h6>{LANG("release_service")}</h6>
      <p>
        <RefundPolicyNode />
      </p>
      <h6>{LANG("please_request_through_helpline")}</h6>
    </JDmodal>
  );
};

export default RefundPolicyModal;
