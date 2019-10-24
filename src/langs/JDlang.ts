import {Language, TLanguageShort} from "../types/enum";
import {kr} from "./kr";
import en from "./en";

const JDlangs = {
  kr,
  en
};

// 첫번쨰 lnag
export const JDlang = (lang: TLanguageShort, key: string) => {
  // @ts-ignore
  if (!JDlangs[lang]) return "";
  // @ts-ignore
  if (!JDlangs[lang][key]) return "";
  // @ts-ignore
  return JDlangs[lang][key];
};
