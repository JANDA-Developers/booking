import {Language, LanguageShort, TLanguageShort} from "../types/enum";
import {kr} from "./kr";
import {en} from "./en";

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
  | "components"
  | "ready"
  | "assigTimeline"
  | "HMconfig"
  | "dailyPrice"
  | "statistic"
  | "roomConfig"
  | "sms"
  | "setPrice"
  | "resvList"
  | "common"
  | "signUp"
  | "toasts";

const JDlangs = {
  kr,
  en
};

// 첫번쨰 lnag
export const JDlang = (lang: TLanguageShort, page: TLangPages, key: string) => {
  console.log("🌟lang");
  console.log(lang);
  console.log(page);
  console.log(key);
  let lang2;
  if (lang === "gb") {
    lang2 = "en";
  } else {
    lang2 = lang;
  }
  // @ts-ignore
  if (!JDlangs[lang2]) return "";
  // @ts-ignore
  if (!JDlangs[lang2][page]) return "";
  // @ts-ignore
  if (!JDlangs[lang2][page]) return "";
  // @ts-ignore
  if (!JDlangs[lang2][page][key]) return "";
  // @ts-ignore
  return JDlangs[lang2][page][key];
};
