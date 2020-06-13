import React, { useState } from "react";
import TagInput from "../../atoms/tagInput/TagInput";
import {
  JDmodalConfigProps,
  IUseModal,
  JDbutton,
  JDmodal,
  JDlabel
} from "@janda-com/front";
import ModalEndSection from "../../atoms/modal/components/ModalEndSection";
import { LANG } from "@janda-com/lang";
import Button from "../../atoms/button/Button";

export interface TModalInfo {
  defaultTags: string[];
  [key: string]: any;
}

interface IProp {
  modalHook: IUseModal<TModalInfo>;
  modalProp: JDmodalConfigProps;
  callBackTagModify: (tags: string[]) => void;
}

export const TagModal: React.FC<IProp> = ({
  modalProp,
  modalHook,
  callBackTagModify
}) => {
  const { info } = modalHook;
  if (!info) throw Error("TagModal Info was not supplied");
  const { defaultTags } = info;
  const [tags, setTags] = useState<string[]>(defaultTags);

  const handleCallBackTagModify = () => {
    callBackTagModify(tags);
  };

  return (
    <JDmodal {...modalHook} {...modalProp}>
      <div>
        <JDlabel txt={LANG("insert_tag")} />
        <TagInput mb="normal" tags={tags} setTags={setTags} />
      </div>
      <ModalEndSection>
        <Button
          mode="flat"
          label={LANG("confirm")}
          thema="primary"
          onClick={handleCallBackTagModify}
        />
        <Button
          mode="flat"
          label={LANG("close")}
          thema="grey"
          onClick={() => modalHook.closeModal()}
        />
      </ModalEndSection>
    </JDmodal>
  );
};

export default TagModal;
