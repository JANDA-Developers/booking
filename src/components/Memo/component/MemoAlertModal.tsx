import React from "react";
import {IContext} from "../../../pages/MiddleServerRouter";
import JDmodal from "../../../atoms/modal/Modal";
import {IUseModal, LANG} from "../../../hooks/hook";
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
      <h6>{LANG("there_is_an_alarm_set_note")}</h6>
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
          label={LANG("keep_noti")}
        />
        <Button
          size="small"
          onClick={() => {
            setCookie("dontShowMemoToday", "Y", 1);
            modalHook.closeModal();
          }}
          thema="point"
          label={LANG("close_today")}
        />
      </div>
    </JDmodal>
  );
};

export default MemoAlertModal;