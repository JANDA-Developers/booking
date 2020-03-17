// 유틸리티가 더 많이 쌓이면
import ErrProtecter from "./errProtect";
import isEmpty from "./isEmptyData";
import download from "./download";
import {
  smsMessageFormatter,
  smsMsgParser,
  templateOpCreater
} from "./smsUtils";
import autoHypen, { autoComma, numberStr, toNumber } from "./autoFormat";
import stepFinder from "./stepFinder";
import {
  JDMonthTextChanger,
  JDWeekChanger,
  applyDaysToArr,
  arrToApplyDays,
  dayarrEnToBooleanArr
} from "./dayOfweeks";
import { cardValidate } from "./validations";
import {
  isEmail,
  isPhone,
  isName,
  isUrl,
  isMaxOver,
  isYYYYMMDD,
  isPassword,
  isNumberMinMax,
  isIncludeSpecialChar
} from "./inputValidations";
import insideRedirect from "./insideRedirect";
import searchHoliday from "./searchHoliday";
import isTestProduct from "./isTestProduct";
import { textAlignClass, colorClass } from "./autoClasses";
import searchListFormat from "./searchListFormater";
import { showError } from "./errorMessage";
import onCompletedMessage from "./onCompletedMessage";
import queryDataFormater, { getFromResult } from "./queryFormater";
import setMidNight from "./setMidNight";
import removeNullOfObject from "./removeNullOfObject";
import s4 from "./keyGen";
import randomIntFromInterval from "./randomNumber";
import muResult from "./mutationResultSafty";
import instanceOfA from "./interfaceMatch";
import JDscrollTo from "./scrollTo";
import targetBlink from "./targetBlink";
import mergeObject from "./mergeObject";
import jsonString from "./jsonString";
import getGenderIcon from "./getGenderIcon";
import isLast from "./isLast";
import getRoomCountFromHouse from "./getRoomCountFromHouse";
import { getFromUrl } from "./getFromUrl";

const JDutils = {
  isTestProduct,
  getFromUrl,
  ErrProtecter,
  isIncludeSpecialChar,
  targetBlink,
  isEmpty,
  isEmail,
  isPhone,
  isUrl,
  isName,
  isMaxOver,
  isPassword,
  textAlignClass,
  stepFinder,
  colorClass,
  JDscrollTo,
  randomIntFromInterval,
  JDMonthTextChanger,
  searchListFormat,
  download,
  autoHypen,
  onCompletedMessage,
  queryDataFormater,
  setMidNight,
  getRoomCountFromHouse,
  applyDaysToArr,
  arrToApplyDays,
  templateOpCreater,
  smsMsgParser,
  autoComma,
  dayarrEnToBooleanArr,
  isLast,
  isYYYYMMDD,
  getGenderIcon,
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
  s4,
  getFromResult
};

export default JDutils;
export {
  isIncludeSpecialChar,
  onCompletedMessage,
  JDMonthTextChanger,
  insideRedirect,
  instanceOfA,
  jsonString,
  getFromResult,
  JDWeekChanger,
  isEmpty,
  smsMessageFormatter,
  download,
  stepFinder,
  textAlignClass,
  colorClass,
  ErrProtecter,
  removeNullOfObject,
  autoHypen,
  getRoomCountFromHouse,
  dayarrEnToBooleanArr,
  getGenderIcon,
  showError,
  getFromUrl,
  smsMsgParser,
  isTestProduct,
  queryDataFormater,
  cardValidate,
  mergeObject,
  setMidNight,
  JDscrollTo,
  templateOpCreater,
  searchHoliday,
  applyDaysToArr,
  randomIntFromInterval,
  arrToApplyDays,
  targetBlink,
  autoComma,
  numberStr,
  muResult,
  toNumber,
  isYYYYMMDD,
  s4
};
