import React from "react";
import JDmodal from "../../../../../../atoms/modal/Modal";
import PhotoFrame from "../../../../../../atoms/photoFrame/PhotoFrame";
import { LANG, IUseModal } from "../../../../../../hooks/hook";
import JDlist from "../../../../../../atoms/list/List";
import Button from "../../../../../../atoms/button/Button";
import ModalEndSection from "../../../../../../atoms/modal/components/ModalEndSection";
import "./TerminateModal.scss";

interface IProps {
  onTerminateBtn: () => void;
  modalHook: IUseModal;
}

const TerminateModal: React.FC<IProps> = ({ modalHook, onTerminateBtn }) => {
  return (
    <JDmodal className="terminateModal JDtext-align-center" {...modalHook}>
      <div className="modal__section terminateModal__headWrap">
        <PhotoFrame
          className="terminateModal__photoFrame"
          unStyle
          src="https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/infographic/warn-triangle"
          type=".png"
        />
        <h4>{LANG("do_you_really_want_to_cancel_our_service")}</h4>
        <span className="JDsmall-text">
          {LANG("if_you_cancel_service_please_notice_below_things")}
        </span>
      </div>
      <div className="modal__section terminateModal__headWrap">
        <JDlist
          mr="no"
          mb="no"
          linePoint="―"
          contents={[
            LANG("service_termination_warn1"),
            LANG("service_termination_warn2"),
            LANG("service_termination_warn3"),
            LANG("service_termination_warn4")
          ]}
        />
      </div>
      <ModalEndSection>
        <Button
          thema={"error"}
          mode="flat"
          label={LANG("auto_pay_stop")}
          onClick={onTerminateBtn}
        />
      </ModalEndSection>
    </JDmodal>
  );
};

export default TerminateModal;
