import React from "react";
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
import SendSmsModal, {
  ISendSmsModalConfigProps,
  IModalSMSinfo
} from "./SendSmsModal";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { TSendSmsKey } from "../../types/interface";

class SendSmsMu extends Mutation<sendSms, sendSmsVariables> {}
class SmsInfoQu extends Query<getSmsInfo, getSmsInfoVariables> {}

interface IProps extends ISendSmsModalConfigProps {
  modalHook: IUseModal<IModalSMSinfo>;
  context: IContext;
}

const SendSMSmodalWrap: React.FC<IProps> = ({
  modalHook,
  context,
  ...props
}) => {
  const { house } = context;
  const { _id: houseId } = house;
  const { findSendCase, callBackFn, bookingIds } = modalHook.info;

  return (
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
                findSendCase={findSendCase}
                sendSmsMu={sendSmsMu}
                modalHook={modalHook}
                {...props}
              />
            )}
          </SendSmsMu>
        );
      }}
    </SmsInfoQu>
  );
};

export default React.memo(
  SendSMSmodalWrap,
  (prevProp, nextProp) =>
    prevProp.modalHook.isOpen === nextProp.modalHook.isOpen
);
