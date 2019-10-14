import {Language, LanguageShort, TLanguageShort} from "../types/enum";
import {kr} from "./kr";

export type TLangPages =
  | "header"
  | "sideNav"
  | "dashboard"
  | "myPage"
  | "createHouse"
  | "config"
  | "products"
  | "smsHistory"
  | "login"
  | "superAdmin"
  | "qna"
  | "ready"
  | "assigTimeline"
  | "HMconfig"
  | "dailyPrice"
  | "statistic"
  | "roomConfig"
  | "sms"
  | "setPrice"
  | "resvList"
  | "signUp"
  | "toasts";

const JDlangs = {
  kr
};

// 첫번쨰 lnag
export const JDlang = (lang: TLanguageShort, page: TLangPages, key: string) => {
  // @ts-ignore
  if (!JDlangs[lang]) return "";
  // @ts-ignore
  if (!JDlangs[lang][page]) return "";
  // @ts-ignore
  if (!JDlangs[lang][page]) return "";
  // @ts-ignore
  if (!JDlangs[lang][page][key]) return "";
  // @ts-ignore
  return JDlangs[lang][page][key];
};
