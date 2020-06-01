import LangModule from '@janda-com/lang';
import { krFn } from "./kr";
import en from "./en";
import { getFromUrl } from '../utils/utils';

export const JDlangsSet = {
  kr: krFn(),
  en
};

export const BookingLang = new LangModule({
  langPack: JDlangsSet,
  lang: getFromUrl("ln") as any || localStorage.getItem("LastLang") as any || "kr"
});

export const { lang, currentLang } = BookingLang;

//글로벌로 change 하는건 왜안될까 ?