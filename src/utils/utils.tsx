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
import { getCookie, setCookie } from "./cookies";
import insideRedirect from "./insideRedirect";
import searchHoliday from "../pages/bookingServer/assig/helpers/searchHoliday";
import isTestProduct from "./isTestProduct";
import { textAlignClass, colorClass } from "./autoClasses";
import { showError } from "./errorMessage";
import onCompletedMessage from "./onCompletedMessage";
import queryDataFormater from "./queryFormater";
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
  textAlignClass,
  colorClass,
  getCookie,
  JDscrollTo,
  setCookie,
  randomIntFromInterval,
  JDMonthTextChanger,
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
  textAlignClass,
  colorClass,
  ErrProtecter,
  removeNullOfObject,
  autoHypen,
  getRoomCountFromHouse,
  dayarrEnToBooleanArr,
  getGenderIcon,
  showError,
  smsMsgParser,
  isTestProduct,
  queryDataFormater,
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
