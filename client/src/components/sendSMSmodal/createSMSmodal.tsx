import React, {useState} from "react";
import JDmodal from "../../atoms/modal/Modal";
import {IUseModal, useInput} from "../../actions/hook";
import JDbox from "../../atoms/box/JDbox";
import JDselect, {IselectedOption} from "../../atoms/forms/selectBox/SelectBox";
import {SELECT_DUMMY_OP} from "../../types/enum";
import Button from "../../atoms/button/Button";
import "./sendSMSmodal.scss";
import {MutationFn} from "react-apollo";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo_GetSmsInfo_smsInfo
} from "../../types/api";
import InputText from "../../atoms/forms/inputText/InputText";
import {smsMsgParser, templateOpMaker} from "../../utils/smsUtils";
import {IBooker} from "../../types/interface";
import BookerInfoBox from "../../pages/outPages/components/bookerInfoBox";
import moment from "moment";
import {IModalSMSinfo} from "./sendSMSmodalWrap";
import Preloader from "../../atoms/preloader/Preloader";
import {autoComma, autoHypen} from "../../utils/utils";

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
    sendSmsMu({
      variables: {
        msg: msg,
        receivers: smsInfo && smsInfo.receivers,
        sender: smsInfo && smsInfo.sender
      }
    });
  };

  const smsTemplates = (smsInfo && smsInfo.smsTemplates) || [];

  const smsTemplateOp = templateOpMaker(smsTemplates);

  // 이걸가지고 textArea 를 채워주자고
  const handleSelectTemplate = (selectedOp: IselectedOption) => {
    if (smsInfo && smsInfo.smsTemplates) {
      const targetTemplate = smsInfo.smsTemplates.find(
        template => template._id === selectedOp.value
      );

      if (targetTemplate) {
        const msg = modalHook.info.booker
          ? smsMsgParser(targetTemplate.smsFormat, {
              BOOKERNAME: modalHook.info.booker.name,
              ROOMTYPE_N_COUNT: "",
              STAYDATE: `${moment(modalHook.info.booker.start).format(
                "MM-DD"
              )}~${moment(modalHook.info.booker.end).format("MM-DD")}`,
              STAYDATE_YMD: `${moment(modalHook.info.booker.start).format(
                "YY-MM-DD"
              )}~${moment(modalHook.info.booker.end).format("YY-MM-DD")}`,
              TOTALPRICE: `${autoComma(modalHook.info.booker.price)}`,
              PAYMENTSTATUS: `${modalHook.info.booker.paymentStatus}`,
              PAYMETHOD: `${modalHook.info.booker.payMethod}`
            })
          : targetTemplate.smsFormat;

        setMsg(msg);
      }
    }
  };

  return (
    <JDmodal visibleOverflow className="sendSMSmodal" {...modalHook}>
      <h5>문자발신 {loading && <Preloader />} </h5>
      <div>
        {modalHook.info.receivers &&
          modalHook.info.receivers.map(receiver => (
            <JDbox mode="border" icon="mobile" topLabel="발신대상">
              <span>{autoHypen(receiver)}</span>
            </JDbox>
          ))}
      </div>
      <div className="JDz-index-1">
        <JDselect
          label="문자템플릿"
          onChange={handleSelectTemplate}
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
        <Button thema="primary" onClick={handleSendSmsBtnClick} label="전송" />
      </div>
    </JDmodal>
  );
};

export default CreateSmsModal;
