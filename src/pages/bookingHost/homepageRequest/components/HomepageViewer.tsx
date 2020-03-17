import React from "react";
import PhotoFrame from "../../../../atoms/photoFrame/PhotoFrame";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import Button from "../../../../atoms/button/Button";
import { LANG, IUseModal } from "../../../../hooks/hook";
import "./homepageViewer.scss";
import Align from "../../../../atoms/align/Align";
import { THOMEPAGE } from "../../../../types/interface";
import { IHomepagePrevModalInfo } from "./PrevModal";

interface IProps {
  hp: THOMEPAGE;
  previewModalHook: IUseModal<IHomepagePrevModalInfo>;
}

const HomepageViewer: React.FC<IProps> = ({ hp, previewModalHook }) => {
  return (
    <div className="homepageViewer">
      <PhotoFrame
        className="homepageViewer__photo"
        mb="tiny"
        unStyle
        src={hp.sumnail}
      />
      <Align
        flex={{
          between: true
        }}
      >
        <CheckBox label="#무료템플릿1" checked={true} size="tiny" />
        <Button
          onClick={() => {
            previewModalHook.openModal({
              homepage: hp
            });
          }}
          size="tiny"
          thema="primary"
          mode="flat"
          label={LANG("preview")}
        />
      </Align>
    </div>
  );
};

export default HomepageViewer;
