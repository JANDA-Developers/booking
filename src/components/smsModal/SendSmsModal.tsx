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
import ModalEndSection from "../../atoms/modal/components/ModalEndSection";
import { TSendSmsKey } from "../../types/interface";
import { getByteLength } from "../../utils/elses";
import optionFineder from "../../utils/optionFinder";

export interface ISendSmsModalConfigProps {
  findSendCase?: AutoSendWhen;
  bookingIds?: string[];
  isInBookingModal?: boolean;
}

export interface IModalSMSinfo extends ISendSmsModalConfigProps {
  mode?: "CreateBooking" | "Booking" | "Noraml";
  receivers: string[];
  smsParser?: TSendSmsKey;
  callBackFn?(flag: boolean, smsSendFn: any): any;
}

interface IProps extends ISendSmsModalConfigProps {
  context: IContext;
  modalHook: IUseModal<IModalSMSinfo>;
  sendSmsMu: MutationFn<sendSms, sendSmsVariables>;
  loading: boolean;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
  callBackFn?(flag: boolean, smsSendFn: any): any;
}

const SendSmsModal: React.FC<IProps> = ({
  context,
  modalHook,
  sendSmsMu,
  smsInfo,
  callBackFn = modalHook.info.callBackFn,
  bookingIds = modalHook.info.bookingIds,
  findSendCase = modalHook.info.findSendCase,
  isInBookingModal
}) => {
  const {
    house: { _id: houseId }
  } = context;
  const { mode, smsParser, receivers } = modalHook.info;
  const today = new Date();
  const [msg, setMsg] = useState("");
  const templateSelectHook = useSelect(null);
  const smsTargetOpHook = useSelect(GET_SMS_TARGET_OP[0]);
  const msgLength = getByteLength(msg);

  console.log("msgLength");
  console.log(msgLength);

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
          houseId: houseId,
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
  const phoneNumbers = bookings?.map(booking => booking.phoneNumber);
  const queryBookingIds = bookings?.map(booking => booking._id) || [];
  const tartgetIsFromList =
    smsTargetOpHook.selectedOption!.value === GetSmsTarget.EXSIST_INFO;
  const sendTargets = tartgetIsFromList ? receivers : phoneNumbers;
  const smsTemplates = (smsInfo && smsInfo.smsTemplates) || [];
  const smsTemplateOp = templateOpCreater(smsTemplates);

  // 문자전송 버튼 클릭시
  const handleSendSmsBtnClick = (flag: boolean) => {
    modalHook.closeModal();
    if (!smsInfo) throw Error("smsInfo is not exist");

    const tempBookingIds: string[] | undefined =
      mode === "CreateBooking"
        ? undefined
        : isEmpty(queryBookingIds)
        ? bookingIds
        : queryBookingIds;

    const sendSMSfn = sendSmsMu.bind(sendSmsMu, {
      variables: {
        smsInfoId: smsInfo._id,
        msg: smsMessageFormatter(msg),
        receivers: sendTargets,
        bookingIds: tempBookingIds
      }
    });

    if (callBackFn) callBackFn(flag, sendSMSfn);
    else sendSMSfn();
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
            houseId,
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
    if (!smsInfo?.smsTemplates) return;

    const targetTemplate = smsInfo.smsTemplates.find(
      template => template._id === selectedOp.value
    );

    if (!targetTemplate) return;

    // 아직 존재하지않는 대상이면
    if (mode === "CreateBooking") {
      setMsg(smsMsgParser(targetTemplate.smsFormat, smsParser));
      return;
    }

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

    setMsg(messages[0]);
  };

  useEffect(() => {
    if (!modalHook.isOpen || !smsInfo?.smsTemplates) return;
    const targetTemplate = smsTemplates.find(template => {
      if (!template.smsSendCase?.when) return false;
      return template.smsSendCase.when === findSendCase;
    });

    if (!targetTemplate) return;
    const targetTempOp = optionFineder(smsTemplateOp, targetTemplate._id);
    if (!targetTempOp) return;

    templateSelectHook.onChange(targetTempOp);
    handleSelectTemplate(targetTempOp);
  }, [modalHook.isOpen]);

  return (
    <JDmodal
      className={`sendSmsModal ${loading && "sendSmsModal--loading"}`}
      {...modalHook}
    >
      <JDpreloader size="large" loading={loading} />
      {loading || (
        <Fragment>
          <h5>{LANG("send_sms")}</h5>
          {!isInBookingModal && (
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
            <JDbox mode="border">
              <div className="clear-fix sendSmsModal__receiverWrap">
                {sendTargets?.map(receiver => (
                  <JDbox
                    size={sendTargets.length > 4 ? "small" : undefined}
                    float
                    key={s4()}
                  >
                    <span>{autoHypen(receiver)}</span>
                  </JDbox>
                ))}
              </div>
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
          <div className="JDstandard-margin-bottom">
            <InputText
              doubleHeight
              onChange={setMsg}
              value={msg}
              label={LANG("msg_content")}
              textarea
              mb="superTiny"
            />
            <span className="JDsmall-text JDtextColor--placeHolder">
              {msgLength < 90 ? (
                msgLength + "Byte"
              ) : (
                <span>
                  {`${msgLength} Byte`}
                  <b className="JDtextColor--error">{` LMS`}</b>
                  {receivers} <b></b>
                </span>
              )}
            </span>
          </div>
          <ModalEndSection>
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
                id="UnSendSmsBtn"
                mode="flat"
                size={"small"}
                onClick={() => {
                  handleSendSmsBtnClick(false);
                }}
                label={LANG("dontSMS")}
              />
            )}
          </ModalEndSection>
        </Fragment>
      )}
    </JDmodal>
  );
};

export default SendSmsModal;
