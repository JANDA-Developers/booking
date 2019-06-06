import React, {useState, useEffect, Fragment} from "react";
import JDmodal from "../../atoms/modal/Modal";
import {IUseModal, useInput} from "../../actions/hook";
import JDbox from "../../atoms/box/JDbox";
import JDselect, {IselectedOption} from "../../atoms/forms/selectBox/SelectBox";
import {SELECT_DUMMY_OP, AutoSendWhen} from "../../types/enum";
import Button from "../../atoms/button/Button";
import "./SendSmsModal.scss";
import {MutationFn} from "react-apollo";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo_GetSmsInfo_smsInfo
} from "../../types/api";
import InputText from "../../atoms/forms/inputText/InputText";
import {smsMsgParser} from "../../utils/smsUtils";
import {IBooking} from "../../types/interface";
import BookingInfoBox from "../../pages/outPages/components/bookerInfoBox";
import moment from "moment";
import {IModalSMSinfo} from "./SendSmsModalWrap";
import Preloader from "../../atoms/preloader/Preloader";
import JDLabel from "../../atoms/label/JDLabel";
import {isEmpty} from "../../utils/utils";

interface IProps {
  modalHook: IUseModal<IModalSMSinfo>;
  loading: boolean;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
  receivers: string[];
  autoSendWhen?: AutoSendWhen;
  callBackFn?(flag: boolean): any;
  templateMessage: string;
}

const SendSmsModal: React.FC<IProps> = ({
  modalHook,
  loading,
  receivers,
  autoSendWhen,
  callBackFn,
  smsInfo,
  templateMessage
}) => {
  useEffect(() => {
    if (templateMessage === "") {
      modalHook.info.callBackFn && modalHook.info.callBackFn(false);
    }
  }, [modalHook.info.callBackFn]);
  if (templateMessage === "") {
    modalHook.closeModal();
  }

  return (
    <JDmodal
      tureMessage={`${templateMessage !== "" ? "SMS 전송합니다." : "확인"}`}
      flaseMessage={`${templateMessage !== "" ? "전송하지 않습니다." : "취소"}`}
      confirm
      confirmCallBackFn={callBackFn}
      className="sendSmsModal"
      {...modalHook}
    >
      {/* 👿 */}
      <div>
        {templateMessage !== "" ? (
          <Fragment>
            <JDLabel txt="발신대상" />
            {receivers &&
              receivers.map(receiver => (
                <JDbox mode="border" icon="mobile">
                  <span>{receiver}</span>
                </JDbox>
              ))}{" "}
          </Fragment>
        ) : (
          ""
        )}
      </div>
    </JDmodal>
  );
};

export default SendSmsModal;
