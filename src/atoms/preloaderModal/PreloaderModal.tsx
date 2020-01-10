import React from "react";
import JDmodal from "../modal/Modal";
import JDpreloader, { IPreloaderConfigProps } from "../preloader/Preloader";
import portalElement, { hightPortalElement } from "../../utils/portalElement";
import { createPortal } from "react-dom";
import { useModal } from "../../hooks/hook";

interface Iprops extends IPreloaderConfigProps {}

const PreloaderModal: React.FC<Iprops> = ({ loading }) => {
  const modalHook = useModal();
  return createPortal(
    <JDmodal
      portalClassName={"PreloaderModal"}
      {...modalHook}
      isOpen={loading || false}
    >
      <JDpreloader loading={true} size="large" />
    </JDmodal>,
    hightPortalElement()
  );
};

export default PreloaderModal;
