import React from "react";
import MemoWrap, { IMemoWrapProps } from "../MemoWrap";
import { IUseModal } from "../../../hooks/hook";
import JDmodal from "../../../atoms/modal/Modal";
interface Iprops extends IMemoWrapProps {
  modalHook: IUseModal;
}

const MemoModal: React.FC<Iprops> = ({ modalHook, ...props }) => {
  return (
    <JDmodal visibleOverflow {...modalHook}>
      <MemoWrap {...props} />
    </JDmodal>
  );
};

export default MemoModal;
