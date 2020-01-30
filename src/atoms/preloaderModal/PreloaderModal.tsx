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
      loading={loading}
      portalClassName={"PreloaderModal"}
      {...modalHook}
      isOpen={loading || false}
    />,
    hightPortalElement()
  );
};

export default PreloaderModal;
