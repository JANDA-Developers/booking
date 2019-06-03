import React from "react";
import JDmodal from "../../atoms/modal/Modal";
import {IUseModal} from "../../actions/hook";
import JDbox from "../../atoms/box/JDbox";
import JDselect from "../../atoms/forms/selectBox/SelectBox";
import {
  SELECT_DUMMY_OP,
  PaymentStatus,
  PayMethod,
  AutoSendWhen
} from "../../types/enum";
import Button from "../../atoms/button/Button";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo,
  getSmsInfoVariables
} from "../../types/api";
import {Mutation, Query} from "react-apollo";
import {SEND_SMS, GET_SMS_INFO} from "../../queries";
import {queryDataFormater} from "../../utils/utils";
import CreateSmsModal from "./createSMSmodal";
import SendSmsModal from "./sendSmsModal";

class SendSmsMu extends Mutation<sendSms, sendSmsVariables> {}
class SmsInfoQu extends Query<getSmsInfo, getSmsInfoVariables> {}

export interface IModalSMSinfo {
  booker?: {
    name: string;
    phoneNumber: string;
    start: string | Date;
    end: string | Date;
    paymentStatus: PaymentStatus;
    payMethod: PayMethod;
    price: number;
  };
  receivers: string[];
  createMode?: boolean;
  sendCase?: AutoSendWhen;
  callBackFn?(flag: boolean): any;
}

interface IProps {
  modalHook: IUseModal<IModalSMSinfo>;
  houseId: string;
}

const SendSMSmodalWrap: React.FC<IProps> = ({modalHook, houseId}) => {
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
          <SendSmsMu mutation={SEND_SMS}>
            {sendSmsMu =>
              modalHook.info.createMode ? (
                // SMS 만들기 모달
                <CreateSmsModal
                  loading={loading}
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
                  receivers={modalHook.info.receivers}
                  sendCase={modalHook.info.sendCase}
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
