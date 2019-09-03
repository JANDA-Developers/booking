import React, {useState, Fragment} from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDselect, {
  SelectBoxSize
} from "../../../../atoms/forms/selectBox/SelectBox";
import {
  AUTO_SEND_OP,
  SMS_TARGET_OP,
  SmsReplaceKeyEnumKeys,
  SmsReplaceKeyEnumKr,
  SendTarget,
  AutoSendWhen,
  AutoSendWhenKr,
  SendTargetKr,
  KR_SMS_PARSER
} from "../../../../types/enum";
import {useSelect, useInput, useSwitch} from "../../../../actions/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Switch from "../../../../atoms/forms/switch/Switch";
import Button from "../../../../atoms/button/Button";
import {ErrProtecter, smsMessageFormatter} from "../../../../utils/utils";
import {
  getSmsInfo_GetSmsInfo_smsInfo_smsTemplates,
  updateSmsTemplate,
  updateSmsTemplateVariables,
  deleteSmsTemplate,
  deleteSmsTemplateVariables,
  createSmsTemplate,
  createSmsTemplateVariables,
  getSmsInfo_GetSmsInfo_smsInfo
} from "../../../../types/api";
import {MutationFn} from "react-apollo";
import {smsMsgParser} from "../../../../utils/smsUtils";

interface IProps {
  templateData: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates;
  smsTemplateMutationes: {
    updateSmsTemplateMu: MutationFn<
      updateSmsTemplate,
      updateSmsTemplateVariables
    >;
    deleteSmsTemplateMu: MutationFn<
      deleteSmsTemplate,
      deleteSmsTemplateVariables
    >;
    createSmsTemplateMu: MutationFn<
      createSmsTemplate,
      createSmsTemplateVariables
    >;
  };
  houseId: string;
  templateTitle: string;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo;
}

const SmsTemplate: React.SFC<IProps> = ({
  templateData,
  smsTemplateMutationes,
  templateTitle,
  houseId,
  smsInfo
}) => {
  return <div />;
};

export default ErrProtecter(SmsTemplate);
