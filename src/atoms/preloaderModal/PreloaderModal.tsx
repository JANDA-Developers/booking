import React from "react";
import JDmodal from "../modal/Modal";
import JDpreloader, {IPreloaderConfigProps} from "../preloader/Preloader";
import portalTo from "../../utils/portalTo";
import {createPortal} from "react-dom";
import {useModal} from "../../hooks/hook";

interface Iprops extends IPreloaderConfigProps {}

const PreloaderModal: React.FC<Iprops> = ({loading}) => {
  const modalHook = useModal();
  return createPortal(
    <JDmodal {...modalHook} isOpen={loading || false}>
      <JDpreloader loading={true} size="large" />
    </JDmodal>,
    portalTo()
  );
};

export default PreloaderModal;
