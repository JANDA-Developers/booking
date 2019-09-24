import React from "react";
import {IContext} from "../../../pages/MiddleServerRouter";
import JDmodal from "../../../atoms/modal/Modal";
import {IUseModal} from "../../../actions/hook";
import Button from "../../../atoms/button/Button";
import MemoWrap from "../MemoWrap";
import {MemoType} from "../../../types/enum";
import {setCookie} from "../../../utils/cookies";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

const MemoAlertModal: React.FC<Iprops> = ({context, modalHook}) => {
  return (
    <JDmodal visibleOverflow {...modalHook}>
      <h6>알람 설정된 메모가 있습니다.</h6>
      <div className="modal__section">
        <MemoWrap showOnlyAlert memoType={MemoType.HOST} context={context} />
      </div>
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            sessionStorage.setItem("dontShowMemoAlert", "Y");
            modalHook.closeModal();
          }}
          size="small"
          thema="primary"
          label="계속 메모를 뛰우세요."
        />
        <Button
          size="small"
          onClick={() => {
            setCookie("dontShowMemoToday", "Y", 1);
            modalHook.closeModal();
          }}
          thema="point"
          label="하루동안 메모를 뛰우지 마세요."
        />
      </div>
    </JDmodal>
  );
};

export default MemoAlertModal;
