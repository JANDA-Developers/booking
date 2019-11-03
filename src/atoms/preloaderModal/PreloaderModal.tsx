import React from "react";
import JDmodal from "../modal/Modal";
import JDpreloader, {IPreloaderConfigProps} from "../preloader/Preloader";

interface Iprops extends IPreloaderConfigProps {}

const PrloaderModal: React.FC<Iprops> = ({loading}) => {
  return (
    <JDmodal
      info={{}}
      closeModal={() => {}}
      openModal={() => {}}
      isOpen={loading || false}
    >
      <JDpreloader size="large" />
    </JDmodal>
  );
};

export default PrloaderModal;
