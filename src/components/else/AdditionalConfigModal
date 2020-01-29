import JDmodal from "../../atoms/modal/Modal";

import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { IUseModal, LANG } from "../../hooks/hook";
import Button from "../../atoms/button/Button";
import AdditionConfigPitch from "./component/additionConfigPitch/AdditionConfigPitch";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

export const AddtionalConfigModal: React.FC<Iprops> = ({
  context,
  modalHook
}) => (
  <JDmodal minWidth={"40%"} {...modalHook}>
    <AdditionConfigPitch
      redirectCallBack={() => {
        modalHook.closeModal();
      }}
      context={context}
    />
  </JDmodal>
);
