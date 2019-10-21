import React, {useState, Fragment} from "react";
import JDmodal from "../../../atoms/modal/Modal";
import {IUseModal, useSelect, LANG} from "../../../hooks/hook";
import JDbox from "../../../atoms/box/JDbox";
import JDselect, {
  IselectedOption
} from "../../../atoms/forms/selectBox/SelectBox";
import {
  KR_SMS_PARSER,
  GET_SMS_TARGET_OP,
  GetSmsTarget
} from "../../../types/enum";
import Button from "../../../atoms/button/Button";
import "../SendSmsModal.scss";
import {MutationFn} from "react-apollo";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo_GetSmsInfo_smsInfo,
  getBookings,
  getBookingsVariables
} from "../../../types/api";
import InputText from "../../../atoms/forms/inputText/InputText";
import {
  smsMsgParser,
  templateOpCreater,
  smsMessageFormatter
} from "../../../utils/smsUtils";
import moment from "moment";
import {IModalSMSinfo} from "../SendSmsModalWrap";
import Preloader from "../../../atoms/preloader/Preloader";
import {
  autoComma,
  autoHypen,
  s4,
  queryDataFormater,
  setMidNight
} from "../../../utils/utils";
import JDLabel from "../../../atoms/label/JDLabel";
import {GET_BOOKINGS_PHONE_NUMBERS} from "../../../queries";
import {useQuery} from "@apollo/react-hooks";
import {IContext} from "../../../pages/MiddleServerRouter";
import client from "../../../apolloClient";
import {PortalPreloader} from "../../../utils/portalTo";

interface IProps {
  context: IContext;
  modalHook: IUseModal<IModalSMSinfo>;
  sendSmsMu: MutationFn<sendSms, sendSmsVariables>;
  loading: boolean;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
}

const CreateSmsModal: React.FC<IProps> = ({
  context,
  modalHook,
  sendSmsMu,
  smsInfo
}) => {
  const {
    house: {_id: houseId}
  } = context;

  const today = new Date();

  const smsTargetOpHook = useSelect(GET_SMS_TARGET_OP[0]);

  const {data, loading, refetch} = useQuery<getBookings, getBookingsVariables>(
    GET_BOOKINGS_PHONE_NUMBERS,
    {
      client,
      variables: {
        count: 0,
        page: 0,
        houseId,
        filter: {
          stayDate: moment(today).format("YYYY-MM-DD")
        }
      }
    }
  );

  const bookings = queryDataFormater(
    data,
    "GetBookings",
    "bookings",
    undefined
  );

  const phoneNumbers = bookings
    ? bookings.map(booking => booking.phoneNumber)
    : [];

  const sendTargets =
    smsTargetOpHook.selectedOption!.value === GetSmsTarget.EXSIST_INFO
      ? modalHook.info.receivers
      : phoneNumbers;

  const [msg, setMsg] = useState("");

  const handleSendSmsBtnClick = () => {
    if (!smsInfo) {
      throw Error("smsInfo is not exist");
    }
    sendSmsMu({
      variables: {
        smsInfoId: smsInfo._id,
        msg: smsMessageFormatter(msg),
        receivers: sendTargets,
        sender: process.env.REACT_APP_API_SMS_SENDER_NUMBER
      }
    });
  };

  const smsTemplates = (smsInfo && smsInfo.smsTemplates) || [];

  const smsTemplateOp = templateOpCreater(smsTemplates);

  const handleSmsTargetChange = (v: IselectedOption<any>) => {
    smsTargetOpHook.onChange(v);
    if (v.value === GetSmsTarget.TODAY_STAY) {
      const result = refetch({
        houseId,
        count: 99,
        page: 1,
        filter: {
          stayDate: moment(today).toDate()
        }
      });
    }
  };

  // 현재 선택된 정보들을 SMS 포멧을 대체해 줍니다.
  // TODO HM
  const handleSelectTemplate = (selectedOp: IselectedOption) => {
    if (smsInfo && smsInfo.smsTemplates) {
      const targetTemplate = smsInfo.smsTemplates.find(
        template => template._id === selectedOp.value
      );

      if (targetTemplate) {
        const msg = modalHook.info.booking
          ? smsMsgParser(targetTemplate.smsFormat, {
              BOOKERNAME: modalHook.info.booking.name,
              ROOMTYPE_N_COUNT: "",
              STAYDATE: `${moment(modalHook.info.booking.start).format(
                "MM-DD"
              )}~${moment(modalHook.info.booking.end).format("MM-DD")}`,
              STAYDATE_YMD: `${moment(modalHook.info.booking.start).format(
                "YY-MM-DD"
              )}~${moment(modalHook.info.booking.end).format("YY-MM-DD")}`,
              TOTALPRICE: `${autoComma(modalHook.info.booking.price)}`,
              PAYMENTSTATUS: `${modalHook.info.booking.paymentStatus}`,
              PAYMETHOD: `${modalHook.info.booking.payMethod}`,
              HM: ""
            })
          : smsMsgParser(targetTemplate.smsFormat, KR_SMS_PARSER);

        setMsg(msg);
      }
    }
  };

  return (
    <JDmodal
      className={`sendSmsModal ${loading && "sendSmsModal--loading"}`}
      {...modalHook}
    >
      <PortalPreloader size="small" loading={loading} />
      {loading || (
        <Fragment>
          <h5>{LANG("send_sms")}</h5>
          <div className="JDz-index-2">
            <JDselect
              {...smsTargetOpHook}
              onChange={handleSmsTargetChange}
              options={GET_SMS_TARGET_OP}
              label={LANG("find_destination")}}
            />
          </div>
          <div>
            <JDLabel txt={LANG("outgoing_destination")}} />
            <JDbox className="clear-fix" mode="border">
              {sendTargets.map(receiver => (
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
              onChange={handleSelectTemplate}
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
              size={"small"}
              thema="primary"
              onClick={handleSendSmsBtnClick}
              label={LANG("send")}
            />
          </div>
        </Fragment>
      )}
    </JDmodal>
  );
};

export default CreateSmsModal;
