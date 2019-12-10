import React from "react";
import { IUseModal, LANG } from "../../../../../hooks/hook";
import { IContext } from "../../../BookingHostRouter";
import JDmodal from "../../../../../atoms/modal/Modal";
import "./CardModal.scss";
import CardViewer from "./CardViewer";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

const CardModal: React.FC<Iprops> = ({ context, modalHook }) => {
  return (
    <JDmodal minWidth="400px" className="cardModal" {...modalHook}>
      <CardViewer context={context} />
    </JDmodal>
  );
};

export default CardModal;
