import React, {useEffect, Fragment} from "react";
import JDmodal from "../../atoms/modal/Modal";
import {IUseModal} from "../../hooks/hook";
import {AutoSendWhen} from "../../types/enum";
import "./SendSmsModal.scss";
import {getSmsInfo_GetSmsInfo_smsInfo} from "../../types/api";
import {IModalSMSinfo} from "./SendSmsModalWrap";
import Preloader from "../../atoms/preloader/Preloader";

interface IProps {
  modalHook: IUseModal<IModalSMSinfo>;
  loading: boolean;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
  callBackFn?(flag: boolean): any;
}

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
          AutoSendWhen.WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING
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
