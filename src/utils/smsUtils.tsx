import {SmsReplaceKeyEnumKeys, SmsReplaceKeyEnum} from "../types/enum";
import {getSmsInfo_GetSmsInfo_smsInfo_smsTemplates} from "../types/api";
import {IselectedOption} from "../atoms/forms/selectBox/SelectBox";
import {LANG} from "../hooks/hook";

export const smsMessageFormatter = (msg: string): string => {
  let formatMsg = msg;
  SmsReplaceKeyEnumKeys.forEach((key: any) => {
    formatMsg = formatMsg.replace(
      LANG("SmsReplaceKey")[key],
      // @ts-ignore
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
    // @ts-ignore
    formatMsg = formatMsg.replace(SmsReplaceKeyEnum[key], parser[key]);
  });

  return formatMsg;
};

// 템플릿 셀렉트 옵션 만들어주는 함수
export const templateOpCreater = (
  templates: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates[]
): IselectedOption[] =>
  templates.map(template => ({
    value: template._id,
    label: template.formatName
  }));
