import {
  SmsReplaceKeyEnumKeys,
  SmsReplaceKeyEnum,
  SmsReplaceKeyEnumKr
} from "../types/enum";
import {string} from "prop-types";

const smsMessageFormatter = (msg: string): string => {
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

export const smsMsgParser = (msg: string, parser: TParser): string => {
  let formatMsg = msg;
  SmsReplaceKeyEnumKeys.forEach((key: any) => {
    formatMsg = formatMsg.replace(SmsReplaceKeyEnum[key], parser[key]);
  });

  return formatMsg;
};

export default smsMessageFormatter;
