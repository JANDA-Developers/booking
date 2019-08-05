// 유틸리티가 더 많이 쌓이면
import ErrProtecter from "./errProtect";
import isEmpty from "./isEmptyData";
import download from "./download";
import {smsMessageFormatter, smsMsgParser, templateOpMaker} from "./smsUtils";
import autoHypen, {autoComma, numberStr, toNumber} from "./autoFormat";
import {
  JDMonthTextChanger,
  JDWeekChanger,
  applyDaysToArr,
  arrToApplyDays,
  dayarrEnToBooleanArr
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
import insideRedirect from "./insideRedirect";
import isDiff from "./isDiff";
import isTestProduct from "./isTestProduct";
import searchListFormat from "./searchListFormater";
import {showError} from "./errorMessage";
import onCompletedMessage from "./apolloCompleteM";
import queryDataFormater from "./queryFormater";
import pageNationFormater from "./paginationFormat";
import setMidNight from "./setMidNight";
import stringToPrice from "./stringToPrice";
import removeNullOfObject from "./removeNullOfObject";
import s4 from "./keyGen";
import randomIntFromInterval from "./randomNumber";
import muResult from "./mutationResultSafty";
import instanceOfA from "./interfaceMatch";
import JDscrollTo from "./scrollTo";
import targetBlink from "./targetBlink";
import mergeObject from "./mergeObject";
import jsonString from "./jsonString";

const JDutils = {
  isTestProduct,
  ErrProtecter,
  targetBlink,
  isEmpty,
  isEmail,
  isPhone,
  isUrl,
  isName,
  isMaxOver,
  isPassword,
  JDscrollTo,
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
  dayarrEnToBooleanArr,
  isYYYYMMDD,
  numberStr,
  toNumber,
  smsMessageFormatter,
  isNumberMinMax,
  muResult,
  removeNullOfObject,
  jsonString,
  insideRedirect,
  instanceOfA,
  mergeObject,
  s4
};

export default JDutils;
export {
  onCompletedMessage,
  JDMonthTextChanger,
  insideRedirect,
  instanceOfA,
  jsonString,
  JDWeekChanger,
  isEmpty,
  smsMessageFormatter,
  download,
  ErrProtecter,
  removeNullOfObject,
  autoHypen,
  dayarrEnToBooleanArr,
  pageNationFormater,
  showError,
  smsMsgParser,
  isTestProduct,
  queryDataFormater,
  mergeObject,
  setMidNight,
  JDscrollTo,
  templateOpMaker,
  applyDaysToArr,
  randomIntFromInterval,
  arrToApplyDays,
  stringToPrice,
  isDiff,
  targetBlink,
  autoComma,
  numberStr,
  muResult,
  toNumber,
  isYYYYMMDD,
  s4
};
