import {
  SmsReplaceKeyEnumKeys,
  SmsReplaceKeyEnum,
  SmsReplaceKeyEnumKr
} from "../types/enum";
import {string} from "prop-types";
import {getSmsInfo_GetSmsInfo_smsInfo_smsTemplates} from "../types/api";
import {IselectedOption} from "../atoms/forms/selectBox/SelectBox";

export const smsMessageFormatter = (msg: string): string => {
  let formatMsg = msg;
  SmsReplaceKeyEnumKeys.forEach((key: any) => {
    formatMsg = formatMsg.replace(
      SmsReplaceKeyEnumKr[key],
      SmsReplaceKeyEnum[key]
    );
  });

  return formatMsg;
};

type TParser = {[K in keyof typeof SmsReplaceKeyEnum]: string};

// 템플릿 해석
export const smsMsgParser = (msg: string, parser: TParser): string => {
  let formatMsg = msg;
  SmsReplaceKeyEnumKeys.forEach((key: any) => {
    formatMsg = formatMsg.replace(SmsReplaceKeyEnum[key], parser[key]);
  });

  return formatMsg;
};

// 템플릿 셀렉트 옵션 만들어주는 함수
export const templateOpMaker = (
  templates: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates[]
): IselectedOption[] =>
  templates.map(template => ({
    value: template._id,
    label: template.formatName
  }));
