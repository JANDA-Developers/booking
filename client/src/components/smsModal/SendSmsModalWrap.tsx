import React, {useEffect, useState} from "react";
import {IUseModal} from "../../actions/hook";
import {AutoSendWhen} from "../../types/enum";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo,
  getSmsInfoVariables
} from "../../types/api";
import {Mutation, Query} from "react-apollo";
import {SEND_SMS, GET_SMS_INFO} from "../../queries";
import {queryDataFormater, onCompletedMessage} from "../../utils/utils";
import CreateSmsModal from "./components/createSmsModal";
import SendSmsModal from "./SendSmsModal";
import {IContext} from "../../pages/MiddleServerRouter";

class SendSmsMu extends Mutation<sendSms, sendSmsVariables> {}
class SmsInfoQu extends Query<getSmsInfo, getSmsInfoVariables> {}

// BOOKING
export interface IModalSMSinfo {
  booking?: {
    name: string;
    phoneNumber: string;
    start: string | Date;
    end: string | Date;
    paymentStatus: string;
    payMethod: string;
    price: number;
    email: any;
  };
  receivers: string[];
  createMode?: boolean;
  autoSendWhen?: AutoSendWhen;
  callBackFn?(flag: boolean): any;
}

interface IProps {
  modalHook: IUseModal<IModalSMSinfo>;
  context: IContext;
}

const SendSMSmodalWrap: React.FC<IProps> = ({modalHook, context}) => {
  const {house} = context;
  const {_id: houseId} = house;

  return (
    <SmsInfoQu
      query={GET_SMS_INFO}
      variables={{
        houseId
      }}
    >
      {({data: smsData, loading}) => {
        const smsInfo = queryDataFormater(
          smsData,
          "GetSmsInfo",
          "smsInfo",
          undefined
        );

        return (
          <SendSmsMu
            onCompleted={({SendSms}) => {
              onCompletedMessage(SendSms, "SMS 발송완료", "SMS 발송실패");
              modalHook.closeModal();
            }}
            mutation={SEND_SMS}
          >
            {(sendSmsMu, {loading: sendSMSloading}) =>
              modalHook.info.createMode ? (
                // SMS 만들기 모달
                <CreateSmsModal
                  loading={loading || sendSMSloading}
                  smsInfo={smsInfo}
                  sendSmsMu={sendSmsMu}
                  modalHook={modalHook}
                />
              ) : (
                // 전송 confirm
                <SendSmsModal
                  smsInfo={smsInfo}
                  loading={loading}
                  modalHook={modalHook}
                  callBackFn={modalHook.info.callBackFn}
                />
              )
            }
          </SendSmsMu>
        );
      }}
    </SmsInfoQu>
  );
};

export default SendSMSmodalWrap;
