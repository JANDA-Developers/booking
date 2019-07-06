// 유틸리티가 더 많이 쌓이면
import ErrProtecter from "./errProtect";
import isEmpty from "./isEmptyData";
import download from "./download";
import {smsMessageFormatter, smsMsgParser, templateOpMaker} from "./smsUtils";
import autoHypen, {autoComma, numberStr, stringToNumber} from "./autoFormat";
import {
  JDMonthTextChanger,
  JDWeekChanger,
  applyDaysToArr,
  arrToApplyDays
} from "./dayOfweeks";
import {
  isEmail,
  isPhone,
  isName,
  isUrl,
  isMaxOver,
  isYYYYMMDD,
  isPassword,
  isNumberMinMax
} from "./inputValidations";
import searchListFormat from "./searchListFormater";
import {showError} from "./errorMessage";
import onCompletedMessage from "./apolloCompleteM";
import queryDataFormater from "./queryFormater";
import pageNationFormater from "./paginationFormat";
import setMidNight from "./setMidNight";
import stringToPrice from "./stringToPrice";
import s4 from "./keyGen";
import randomIntFromInterval from "./randomNumber";
import muResult from "./mutationResultSafty";

const JDutils = {
  ErrProtecter,
  isEmpty,
  isEmail,
  isPhone,
  isUrl,
  isName,
  isMaxOver,
  isPassword,
  randomIntFromInterval,
  JDMonthTextChanger,
  searchListFormat,
  download,
  autoHypen,
  onCompletedMessage,
  queryDataFormater,
  pageNationFormater,
  setMidNight,
  applyDaysToArr,
  arrToApplyDays,
  stringToPrice,
  templateOpMaker,
  smsMsgParser,
  autoComma,
  isYYYYMMDD,
  numberStr,
  stringToNumber,
  smsMessageFormatter,
  isNumberMinMax,
  muResult,
  s4
};

export default JDutils;
export {
  onCompletedMessage,
  JDMonthTextChanger,
  JDWeekChanger,
  isEmpty,
  smsMessageFormatter,
  download,
  ErrProtecter,
  autoHypen,
  pageNationFormater,
  showError,
  smsMsgParser,
  queryDataFormater,
  setMidNight,
  templateOpMaker,
  applyDaysToArr,
  randomIntFromInterval,
  arrToApplyDays,
  stringToPrice,
  autoComma,
  numberStr,
  muResult,
  stringToNumber,
  isYYYYMMDD,
  s4
};
