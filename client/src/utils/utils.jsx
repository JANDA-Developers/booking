// 유틸리티가 더 많이 쌓이면
import ErrProtecter from "./errProtect";
import isEmpty from "./isEmptyData";
import download from "./download";
import smsMessageFormatter from "./smsUtils";
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
  isPassword
} from "./inputValidations";
import searchListFormat from "./searchListFormater";
import {showError} from "./errorMessage";
import onCompletedMessage from "./apolloCompleteM";
import queryDataFormater, {copyFindReplace} from "./queryFormater";
import pageNationFormater from "./paginationFormat";
import setMidNight from "./setMidNight";
import stringToPrice from "./stringToPrice";

const JDutils = {
  ErrProtecter,
  isEmpty,
  isEmail,
  isPhone,
  isUrl,
  isName,
  isMaxOver,
  isPassword,
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
  autoComma,
  numberStr,
  stringToNumber,
  smsMessageFormatter
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
  queryDataFormater,
  setMidNight,
  applyDaysToArr,
  arrToApplyDays,
  stringToPrice,
  autoComma,
  numberStr,
  stringToNumber
};
