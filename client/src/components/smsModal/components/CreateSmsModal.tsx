import React, {useState, Fragment} from "react";
import JDmodal from "../../../atoms/modal/Modal";
import {IUseModal, useInput} from "../../../hooks/hook";
import JDbox from "../../../atoms/box/JDbox";
import JDselect, {
  IselectedOption
} from "../../../atoms/forms/selectBox/SelectBox";
import {KR_SMS_PARSER} from "../../../types/enum";
import Button from "../../../atoms/button/Button";
import "../SendSmsModal.scss";
import {MutationFn} from "react-apollo";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo_GetSmsInfo_smsInfo
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
import {autoComma, autoHypen, s4} from "../../../utils/utils";
import JDLabel from "../../../atoms/label/JDLabel";

interface IProps {
  modalHook: IUseModal<IModalSMSinfo>;
  sendSmsMu: MutationFn<sendSms, sendSmsVariables>;
  loading: boolean;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
}

const CreateSmsModal: React.FC<IProps> = ({
  modalHook,
  sendSmsMu,
  smsInfo,
  loading
}) => {
  const [msg, setMsg] = useState("");
  const handleSendSmsBtnClick = () => {
    if (!smsInfo) {
      throw Error("smsInfo is not exist");
    }
    sendSmsMu({
      variables: {
        smsInfoId: smsInfo._id,
        msg: smsMessageFormatter(msg),
        receivers: modalHook.info.receivers,
        sender: process.env.REACT_APP_API_SMS_SENDER_NUMBER
      }
    });
  };

  const smsTemplates = (smsInfo && smsInfo.smsTemplates) || [];

  const smsTemplateOp = templateOpCreater(smsTemplates);

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
      <Preloader size="large" loading={loading} />
      {loading || (
        <Fragment>
          <h5>문자발신</h5>
          <div>
            <JDLabel txt="발신대상" />
            <JDbox className="clear-fix" mode="border">
              {modalHook.info.receivers &&
                modalHook.info.receivers.map(receiver => (
                  <JDbox
                    size={
                      modalHook.info.receivers.length > 4 ? "small" : undefined
                    }
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
              label="문자템플릿"
              onChange={handleSelectTemplate}
              noOptionsMessage="SMS 설정에서 생성 해보세요."
              options={smsTemplateOp}
            />
          </div>
          <div>
            <InputText
              doubleHeight
              onChange={setMsg}
              value={msg}
              label="전송문자"
              textarea
            />
          </div>
          <div className="JDmodal__endSection">
            <Button
              size={"small"}
              thema="primary"
              onClick={handleSendSmsBtnClick}
              label="전송"
            />
          </div>
        </Fragment>
      )}
    </JDmodal>
  );
};

export default CreateSmsModal;
