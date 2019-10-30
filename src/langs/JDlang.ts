import {Language, TLanguageShort} from "../types/enum";
import {kr} from "./kr";
import en from "./en";

const JDlangs = {
  kr,
  en
};

export const JDlang = (lang: TLanguageShort, key: string, key2?: string) => {
  // @ts-ignore
  if (!JDlangs[lang]) return "";
  // @ts-ignore
  if (!JDlangs[lang][key]) return "";
  // @ts-ignore
  if (key2) {
    // @ts-ignore
    if (!JDlangs[lang][key][key2]) return;
    // @ts-ignore
    return JDlangs[lang][key][key2];
  }
  // @ts-ignore
  return JDlangs[lang][key];
};
