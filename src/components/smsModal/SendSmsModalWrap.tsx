import React, { useEffect, useState, useMemo } from "react";
import { IUseModal, LANG } from "../../hooks/hook";
import { AutoSendWhen } from "../../types/enum";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo,
  getSmsInfoVariables
} from "../../types/api";
import client from "../../apolloClient";
import { Mutation, Query } from "react-apollo";
import {
  SEND_SMS,
  GET_SMS_INFO,
  GET_BOOKINGS_PHONE_NUMBERS
} from "../../queries";
import { queryDataFormater, onCompletedMessage } from "../../utils/utils";
import CreateSmsModal from "./components/CreateSmsModal";
import SendSmsModal from "./SendSmsModal";
import { IContext } from "../../pages/MiddleServerRouter";
import { useQuery } from "@apollo/react-hooks";

class SendSmsMu extends Mutation<sendSms, sendSmsVariables> { }
class SmsInfoQu extends Query<getSmsInfo, getSmsInfoVariables> { }

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

const SendSMSmodalWrap: React.FC<IProps> = ({ modalHook, context }) => {
  const { house } = context;
  const { _id: houseId } = house;

  const memoResult = useMemo(
    () => (
      <SmsInfoQu
        query={GET_SMS_INFO}
        variables={{
          houseId
        }}
      >
        {({ data: smsData, loading }) => {
          const smsInfo = queryDataFormater(
            smsData,
            "GetSmsInfo",
            "smsInfo",
            undefined
          );

          return (
            <SendSmsMu
              onCompleted={({ SendSms }) => {
                onCompletedMessage(SendSms, LANG("send_sms_complited"), LANG("send_sms_failed"));
                modalHook.closeModal();
              }}
              mutation={SEND_SMS}
            >
              {(sendSmsMu, { loading: sendSMSloading }) =>
                modalHook.info.createMode ? (
                  // SMS 만들기 모달
                  <CreateSmsModal
                    context={context}
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
    ),
    [modalHook.isOpen]
  );
  return memoResult;
};

export default SendSMSmodalWrap;
