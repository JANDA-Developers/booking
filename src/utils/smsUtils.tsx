import { SmsReplaceKeyEnumKeys, SmsReplaceKeyEnumValues } from "../types/const";
import { getSmsInfo_GetSmsInfo_smsInfo_smsTemplates } from "../types/api";
import { IselectedOption } from "../atoms/forms/selectBox/SelectBox";
import { LANG } from "../hooks/hook";
import { TSendSmsKey } from "../types/interface";

// 메세지를 [언어] => %템플릿% 으로 변경
export const smsMessageFormatter = (msg: string): string => {
  let formatMsg = msg;
  SmsReplaceKeyEnumKeys.forEach((key: any, index) => {
    formatMsg = formatMsg.replace(
      LANG("SmsReplaceKey")[key],
      SmsReplaceKeyEnumValues[index]
    );
  });

  return formatMsg;
};

// 메세지를 %템플릿% => [언어] 로 변경
// 파서에 키값에 해당하는 값을 직접적으로 넣어서 화면에 표시할수도 있음
export const smsMsgParser = (msg: string, parser?: TSendSmsKey): string => {
  let formatMsg = msg;

  SmsReplaceKeyEnumValues.forEach((key: any) => {
    const replacedKey: keyof TSendSmsKey = key.replace(/%/gi, "");
    if (!parser) {
      formatMsg = formatMsg.replace(key, LANG("SmsReplaceKey")[replacedKey]);
    } else {
      formatMsg = formatMsg.replace(key, parser[replacedKey]);
    }
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
