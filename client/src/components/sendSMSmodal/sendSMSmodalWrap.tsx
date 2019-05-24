import React from "react";
import JDmodal from "../../atoms/modal/Modal";
import {IUseModal} from "../../actions/hook";
import JDbox from "../../atoms/box/JDbox";
import JDselect from "../../atoms/forms/selectBox/SelectBox";
import {SELECT_DUMMY_OP} from "../../types/enum";
import Button from "../../atoms/button/Button";
import SendSMSmodal from "./sendSMSmodal";

interface SMSinfo {
  phoneNumber: string;
}

interface IProps {
  modalHook: IUseModal<SMSinfo>;
}

const SendSMSmodalWrap: React.FC<IProps> = ({modalHook}) => {
  return <SendSMSmodal modalHook={modalHook} />;
};

export default SendSMSmodalWrap;
