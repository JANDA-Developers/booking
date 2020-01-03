import React, { useState, Fragment, useEffect } from "react";
import JDmodal from "../../atoms/modal/Modal";
import { IUseModal, useSelect, LANG } from "../../hooks/hook";
import JDbox from "../../atoms/box/JDbox";
import JDselect, {
  IselectedOption
} from "../../atoms/forms/selectBox/SelectBox";
import { GetSmsTarget } from "../../types/enum";
import { GET_SMS_TARGET_OP } from "../../types/const";
import Button from "../../atoms/button/Button";
import "./SendSmsModal.scss";
import { MutationFn } from "react-apollo";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo_GetSmsInfo_smsInfo,
  getBookings,
  getBookingsVariables,
  AutoSendWhen,
  getReplacedMessages,
  getReplacedMessagesVariables
} from "../../types/api";
import InputText from "../../atoms/forms/inputText/InputText";
import {
  smsMsgParser,
  templateOpCreater,
  smsMessageFormatter
} from "../../utils/smsUtils";
import moment from "moment";
import { IModalSMSinfo } from "./SendSmsModalWrap";
import {
  autoComma,
  autoHypen,
  s4,
  queryDataFormater,
  isEmpty
} from "../../utils/utils";
import JDLabel from "../../atoms/label/JDLabel";
import {
  GET_BOOKINGS_PHONE_NUMBERS,
  GET_REPLACE_MESSAGES
} from "../../apollo/queries";
import { useQuery } from "@apollo/react-hooks";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import client from "../../apollo/apolloClient";
import JDpreloader from "../../atoms/preloader/Preloader";

interface IProps {
  context: IContext;
  modalHook: IUseModal<IModalSMSinfo>;
  sendSmsMu: MutationFn<sendSms, sendSmsVariables>;
  loading: boolean;
  bookingIds?: string[];
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
  callBackFn?(flag: boolean, smsSendFn: any): any;
  autoSendWhen?: AutoSendWhen;
  mode?: "Booking" | "Noraml";
}

const SendSmsModal: React.FC<IProps> = ({
  context,
  modalHook,
  sendSmsMu,
  smsInfo,
  callBackFn,
  bookingIds,
  mode = "Noraml",
  autoSendWhen
}) => {
  const {
    house: { _id: houseId }
  } = context;
  const today = new Date();
  const [msg, setMsg] = useState("");
  const templateSelectHook = useSelect(null);
  const smsTargetOpHook = useSelect(GET_SMS_TARGET_OP[0]);

  //
  const { data, loading, refetch } = useQuery<
    getBookings,
    getBookingsVariables
  >(GET_BOOKINGS_PHONE_NUMBERS, {
    client,
    variables: {
      param: {
        paging: {
          count: 0,
          selectedPage: 1
        },
        filter: {
          stayDate: {
            checkIn: moment(today).format("YYYY-MM-DD"),
            checkOut: moment(today).format("YYYY-MM-DD")
          }
        }
      }
    }
  });

  const result = queryDataFormater(data, "GetBookings", "result", undefined);
  const bookings = result?.bookings || [];

  useEffect(() => {
    if (smsInfo && smsInfo.smsTemplates) {
      const targetTemplate = smsTemplates.find(template => {
        if (template.smsSendCase && template.smsSendCase.when) {
          return template.smsSendCase.when === autoSendWhen;
        }
        return false;
      });
      if (targetTemplate) {
        const targetTempOp = smsTemplateOp.find(
          temp => temp.value === targetTemplate._id
        );
        if (targetTempOp) {
          templateSelectHook.onChange(targetTempOp);
          handleSelectTemplate(targetTempOp);
        }
      }
    }
  }, [modalHook.isOpen]);

  const phoneNumbers = bookings?.map(booking => booking.phoneNumber);
  const tempBookingIds = bookings?.map(booking => booking._id) || [];
  const sendTargets =
    smsTargetOpHook.selectedOption!.value === GetSmsTarget.EXSIST_INFO
      ? modalHook.info.receivers
      : phoneNumbers;
  const smsTemplates = (smsInfo && smsInfo.smsTemplates) || [];
  const smsTemplateOp = templateOpCreater(smsTemplates);

  // 문자전송 버튼 클릭시
  const handleSendSmsBtnClick = (flag: boolean) => {
    modalHook.closeModal();
    if (!smsInfo) {
      throw Error("smsInfo is not exist");
    }
    const sendSMSfn = sendSmsMu.bind(sendSmsMu, {
      variables: {
        smsInfoId: smsInfo._id,
        msg: smsMessageFormatter(msg),
        receivers: sendTargets,
        bookingIds: tempBookingIds || bookingIds
      }
    });

    if (callBackFn) {
      callBackFn(flag, sendSMSfn);
    } else {
      sendSMSfn();
    }
  };

  // 전송 타겟 변경시
  // API 해당 타켓들의 전화번호를 요청함
  const handleSmsTargetChange = (v: IselectedOption<any>) => {
    smsTargetOpHook.onChange(v);
    if (v.value === GetSmsTarget.TODAY_STAY) {
      refetch({
        param: {
          paging: {
            count: 99,
            selectedPage: 1
          },
          filter: {
            stayDate: {
              checkIn: moment(today).toDate(),
              checkOut: moment(today).toDate()
            }
          }
        }
      });
    }
  };

  // 예약정보를 기반으로 뷰 변환
  const handleSelectTemplate = async (selectedOp: IselectedOption) => {
    if (smsInfo && smsInfo.smsTemplates) {
      const targetTemplate = smsInfo.smsTemplates.find(
        template => template._id === selectedOp.value
      );

      if (!targetTemplate) return;

      // IF have id then get reaplce message
      if (!isEmpty(bookingIds)) {
        const { data } = await client.query<
          getReplacedMessages,
          getReplacedMessagesVariables
        >({
          query: GET_REPLACE_MESSAGES,
          variables: {
            param: {
              smsTemplateId: targetTemplate._id,
              bookingIds
            }
          }
        });

        const messages =
          queryDataFormater(data, "GetReplacedMessages", "messages", "") || "";

        console.log("data");
        console.log(data);
        console.log(bookingIds);
        let msg = "";
        setMsg(messages[0]);
      } else {
        // Maybe it is not exsist booking show smsFormat
        setMsg(smsMsgParser(targetTemplate.smsFormat));
      }
    }
  };

  return (
    <JDmodal
      className={`sendSmsModal ${loading && "sendSmsModal--loading"}`}
      {...modalHook}
    >
      <JDpreloader size="large" loading={loading} />
      {loading || (
        <Fragment>
          <h5>{LANG("send_sms")}</h5>
          {mode === "Noraml" && (
            <div className="JDz-index-2">
              <JDselect
                {...smsTargetOpHook}
                onChange={handleSmsTargetChange}
                options={GET_SMS_TARGET_OP}
                label={LANG("find_destination")}
              />
            </div>
          )}
          <div>
            <JDLabel txt={LANG("outgoing_destination")} />
            <JDbox className="clear-fix" mode="border">
              {sendTargets?.map(receiver => (
                <JDbox
                  size={sendTargets.length > 4 ? "small" : undefined}
                  float
                  key={s4()}
                >
                  <span>{autoHypen(receiver)}</span>
                </JDbox>
              ))}
            </JDbox>
          </div>
          <div className="JDz-index-1">
            <JDselect
              label={LANG("sms_template")}
              selectedOption={templateSelectHook.selectedOption}
              onChange={(v: any) => {
                templateSelectHook.onChange(v);
                handleSelectTemplate(v);
              }}
              noOptionsMessage={LANG("try_to_create_in_SMS_settings")}
              options={smsTemplateOp}
            />
          </div>
          <div>
            <InputText
              doubleHeight
              onChange={setMsg}
              value={msg}
              label={LANG("msg_content")}
              textarea
            />
          </div>
          <div className="JDmodal__endSection">
            <Button
              mode="flat"
              size={"small"}
              thema="primary"
              disabled={!msg}
              onClick={() => {
                handleSendSmsBtnClick(true);
              }}
              label={LANG("sendSMS")}
            />
            {callBackFn && (
              <Button
                mode="flat"
                size={"small"}
                onClick={() => {
                  handleSendSmsBtnClick(false);
                }}
                label={LANG("dontSMS")}
              />
            )}
          </div>
        </Fragment>
      )}
    </JDmodal>
  );
};

export default SendSmsModal;
