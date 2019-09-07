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
  callBackFn?(flag: boolean): any;
}

let SENDED_CALLBACK = false;

const SendSmsModal: React.FC<IProps> = ({
  modalHook,
  loading,
  callBackFn,
  smsInfo
}) => {
  // 완성때 자동발신이 있는지 체크
  const autoSendCheck = (): boolean => {
    if (smsInfo && smsInfo.smsTemplates) {
      const result = smsInfo.smsTemplates.find(smsT => {
        if (!smsT.smsSendCase) return false;
        return (
          smsT.smsSendCase.when === AutoSendWhen.WHEN_BOOKING_CREATED ||
          AutoSendWhen.WHEN_BOOKING_CREATED_PAYMENT_READY
        );
      });
      if (result) return true;
    }
    return false;
  };

  const checkResult = !autoSendCheck() && !loading;

  useEffect(() => {
    if (checkResult && callBackFn) {
      modalHook.closeModal();
      callBackFn && callBackFn(false);
    }
  }, [callBackFn]);

  return (
    <JDmodal
      trueMessage={"SMS 전송합니다."}
      falseMessage={"SMS를 전송하지 않습니다."}
      confirm
      confirmCallBackFn={callBackFn}
      className="sendSmsModal"
      {...modalHook}
    >
      {loading ? (
        <Preloader loading={loading} />
      ) : (
        <div>
          <Fragment>예약생성을 완료합니다.</Fragment>
        </div>
      )}
    </JDmodal>
  );
};

export default SendSmsModal;
