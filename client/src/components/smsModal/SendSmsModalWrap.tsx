import React, {useEffect} from "react";
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
import {queryDataFormater, onCompletedMessage} from "../../utils/utils";
import CreateSmsModal from "./components/createSmsModal";
import SendSmsModal from "./SendSmsModal";

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
  };
  receivers: string[];
  createMode?: boolean;
  autoSendWhen?: AutoSendWhen;
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

        const sendTemplateFinder = (): string => {
          if (!smsInfo) return "";
          if (!smsInfo.smsTemplates) return "";
          if (!modalHook.info.autoSendWhen) return "";
          let message = "";
          smsInfo.smsTemplates
            .filter(template => {
              if (template.smsSendCase === null) return false;
              else if (
                template.smsSendCase.when === modalHook.info.autoSendWhen
              )
                return true;
            })
            .map(template => template.formatName)
            .forEach(name => {
              message += name + " ";
            });
          if (!message) return "";
          if (message === " ") return "";
          return message;
        };

        const templateMessage = sendTemplateFinder();

        return (
          <SendSmsMu
            onCompleted={({SendSms}) => {
              onCompletedMessage(SendSms, "예약 생성 완료", "예약자 생성 실패");
              modalHook.closeModal();
            }}
            mutation={SEND_SMS}
          >
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
                  autoSendWhen={modalHook.info.autoSendWhen}
                  callBackFn={modalHook.info.callBackFn}
                  templateMessage={templateMessage}
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
