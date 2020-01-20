import React from "react";
import PhotoFrame from "../../../../atoms/photoFrame/PhotoFrame";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import Button from "../../../../atoms/button/Button";
import { LANG } from "../../../../hooks/hook";
import JDLabel from "../../../../atoms/label/JDLabel";
import "./homepageViewer.scss";

interface IProps {}

const HomepageViewer: React.FC<IProps> = () => {
  return (
    <div className="homepageViewer">
      <PhotoFrame
        mb="tiny"
        src="https://stayjanda.com/img/background/main_doorbg.jpg"
      />
      <div className="JDflex">
        <CheckBox label="#무료템플릿1" checked={true} size="small" />
        <Button size="tiny" mode="border" label={LANG("preview")} />
      </div>
    </div>
  );
};

export default HomepageViewer;
