import JDmodal from "../../atoms/modal/Modal";

import React from "react";
import {IContext} from "../../pages/MiddleServerRouter";
import {IUseModal, LANG} from "../../hooks/hook";
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
    <AdditionConfigPitch context={context} />
    <div className="JDmodal__endSection">
      <Button
        onClick={() => {
          modalHook.closeModal();
        }}
        label={LANG("exit_house_settings")}
        size="long"
        thema="primary"
      />
    </div>
  </JDmodal>
);
