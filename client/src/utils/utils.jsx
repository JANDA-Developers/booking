// 유틸리티가 더 많이 쌓이면
import ErrProtecter from './ErrProtecter';
import isEmpty from './IsEmpty';
import toast from './Toast';
import download from './DownloadFile';
import autoHypen, { autoComma, numberStr, stringToNumber } from './AutoHyphen';
import {
  JDMonthTextChanger, JDWeekChanger, applyDaysToArr, arrToApplyDays,
} from './dayOfweeks';
import {
  isEmail, isPhone, isName, isUrl, isMaxOver, isPassword,
} from './InputValidation';
import searchListFormat from './SearchListFormat';
import onError, { showError } from './ApolloError';
import onCompletedMessage from './ApolloOnCompleted';
import QueryDataFormater, { copyFindReplace } from './QueryDataFormat';
import pageNationFormater from './paginationFormat';
import { encodeB64, decodeB64 } from './BtoA';
import setMidNight from './setMidNight';
import stringToPrice from './stringToPrice';

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
  toast,
  download,
  autoHypen,
  onCompletedMessage,
  QueryDataFormater,
  pageNationFormater,
  encodeB64,
  decodeB64,
  setMidNight,
  applyDaysToArr,
  arrToApplyDays,
  stringToPrice,
  copyFindReplace,
  autoComma,
  numberStr,
  stringToNumber,
};

export default JDutils;
export {
  onCompletedMessage,
  JDMonthTextChanger,
  JDWeekChanger,
  isEmpty,
  toast,
  download,
  ErrProtecter,
  autoHypen,
  onError,
  pageNationFormater,
  showError,
  QueryDataFormater,
  encodeB64,
  decodeB64,
  setMidNight,
  applyDaysToArr,
  arrToApplyDays,
  stringToPrice,
  copyFindReplace,
  autoComma,
  numberStr,
  stringToNumber,
};
