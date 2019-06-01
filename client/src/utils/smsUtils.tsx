import {
  SmsReplaceKeyEnumKeys,
  SmsReplaceKeyEnum,
  SmsReplaceKeyEnumKr
} from "../types/enum";

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
