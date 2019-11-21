import React, { useMemo } from "react";
import { IUseModal, LANG } from "../../hooks/hook";
import { AutoSendWhen } from "../../types/enum";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo,
  getSmsInfoVariables
} from "../../types/api";
import { Mutation, Query } from "react-apollo";
import { SEND_SMS, GET_SMS_INFO } from "../../apollo/queries";
import { queryDataFormater, onCompletedMessage } from "../../utils/utils";
import SendSmsModal from "./SendSmsModal";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";

class SendSmsMu extends Mutation<sendSms, sendSmsVariables> {}
class SmsInfoQu extends Query<getSmsInfo, getSmsInfoVariables> {}

// BOOKING
export interface IModalSMSinfo {
  smsFormatInfo?: {
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
  bookingIds?: string[];
  autoSendWhen?: AutoSendWhen;
  callBackFn?(flag: boolean, smsSendFn: any): any;
}

interface IProps {
  modalHook: IUseModal<IModalSMSinfo>;
  context: IContext;
  mode?: "Booking" | "Noraml";
}

const SendSMSmodalWrap: React.FC<IProps> = ({ modalHook, context, mode }) => {
  const { house } = context;
  const { _id: houseId } = house;
  const { autoSendWhen, callBackFn, bookingIds } = modalHook.info;

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
                onCompletedMessage(
                  SendSms,
                  LANG("send_sms_complited"),
                  LANG("send_sms_failed")
                );
                modalHook.closeModal();
              }}
              mutation={SEND_SMS}
            >
              {(sendSmsMu, { loading: sendSMSloading }) => (
                <SendSmsModal
                  context={context}
                  loading={loading || sendSMSloading}
                  smsInfo={smsInfo}
                  bookingIds={bookingIds}
                  callBackFn={callBackFn}
                  autoSendWhen={autoSendWhen}
                  sendSmsMu={sendSmsMu}
                  modalHook={modalHook}
                  mode={mode}
                />
              )}
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
