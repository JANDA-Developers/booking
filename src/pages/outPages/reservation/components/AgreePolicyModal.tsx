import React from "react";
import AgreePolicy from "./AgreePolicy";
import JDmodal from "../../../../atoms/modal/Modal";
import {IUseModal} from "../../../../hooks/hook";

interface Iprops {
  modalHook: IUseModal;
}

const AgreePolicyModal: React.FC<Iprops> = ({modalHook}) => {
  return (
    <JDmodal {...modalHook}>
      <AgreePolicy />
    </JDmodal>
  );
};

export default AgreePolicyModal;
