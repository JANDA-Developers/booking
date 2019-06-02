import React, {useState} from "react";
import JDmodal from "../../atoms/modal/Modal";
import {IUseModal, useInput} from "../../actions/hook";
import JDbox from "../../atoms/box/JDbox";
import JDselect, {IselectedOption} from "../../atoms/forms/selectBox/SelectBox";
import {SELECT_DUMMY_OP, AutoSendCase} from "../../types/enum";
import Button from "../../atoms/button/Button";
import "./sendSMSmodal.scss";
import {MutationFn} from "react-apollo";
import {
  sendSms,
  sendSmsVariables,
  getSmsInfo_GetSmsInfo_smsInfo
} from "../../types/api";
import InputText from "../../atoms/forms/inputText/InputText";
import {smsMsgParser} from "../../utils/smsUtils";
import {IBooker} from "../../types/interface";
import BookerInfoBox from "../../pages/outPages/components/bookerInfoBox";
import moment from "moment";
import {IModalSMSinfo} from "./sendSMSmodalWrap";
import Preloader from "../../atoms/preloader/Preloader";

interface IProps {
  modalHook: IUseModal<IModalSMSinfo>;
  loading: boolean;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
  receivers: string[];
  sendCase?: AutoSendCase;
  callBackFn?(flag: boolean): any;
}

const SendSmsModal: React.FC<IProps> = ({
  modalHook,
  loading,
  receivers,
  sendCase,
  callBackFn
}) => (
  <JDmodal
    flaseMessage="전송하지 않습니다."
    isAlert
    visibleOverflow
    confirmCallBackFn={callBackFn}
    className="sendSMSmodal"
    {...modalHook}
  >
    <div>
      {receivers &&
        receivers.map(receiver => (
          <JDbox mode="border" icon="mobile" topLabel="발신대상">
            <span>{receiver}</span>
          </JDbox>
        ))}
      자동 발신문자 ""가 적용 되어있습니다. 문자를 전송하시겠습니까?
    </div>
  </JDmodal>
);

export default SendSmsModal;
