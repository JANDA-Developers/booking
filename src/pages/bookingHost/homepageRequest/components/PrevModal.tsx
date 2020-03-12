import React, { Fragment } from "react";
import { THOMEPAGE } from "../../../../types/interface";
import { IUseModal, LANG } from "../../../../hooks/hook";
import PhotoFrame from "../../../../atoms/photoFrame/PhotoFrame";
import JDmodal from "../../../../atoms/modal/Modal";
import Button from "../../../../atoms/button/Button";

export interface IHomepagePrevModalInfo {
  homepage: THOMEPAGE;
}

interface IProps {
  modalHook: IUseModal<IHomepagePrevModalInfo>;
}

const PreviewModal: React.FC<IProps> = ({ modalHook }) => {
  const { info } = modalHook;
  if (!info?.homepage?.preview) return <div />;

  const {
    homepage: { preview, price, url }
  } = info;
  return (
    <JDmodal
      head={{
        title: LANG("preview"),
        closeFn: modalHook.closeModal
      }}
      foot={<Fragment>{url && <Button />}</Fragment>}
      {...modalHook}
    >
      <PhotoFrame src={preview} />
    </JDmodal>
  );
};

export default PreviewModal;
