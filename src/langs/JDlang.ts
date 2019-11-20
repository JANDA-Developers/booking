import { Language, TLanguageShort } from "../types/enum";
import { kr } from "./kr";
import en from "./en";

export const JDlangsSet = {
  kr,
  en
};

export const JDlang = (lang: TLanguageShort, key: string, key2?: string) => {
  // @ts-ignore
  if (!JDlangsSet[lang]) return "";
  // @ts-ignore
  if (!JDlangsSet[lang][key]) return "";
  // @ts-ignore
  if (key2) {
    // @ts-ignore
    if (!JDlangsSet[lang][key][key2]) return;
    // @ts-ignore
    return JDlangsSet[lang][key][key2];
  }
  // @ts-ignore
  return JDlangsSet[lang][key];
};
