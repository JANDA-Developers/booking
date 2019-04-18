// 유틸리티가 더 많이 쌓이면
import ErrProtecter from './ErrProtecter';
import isEmpty from './IsEmpty';
import toast from './Toast';
import { NEUTRAL } from './Enums';
import download from './DownloadFile';
import autoHypen from './AutoHyphen';
import { JDMonthTextChanger, JDWeekChanger } from './TextChanger';
import {
  isEmail, isPhone, isName, isUrl, isMaxOver, isPassword,
} from './InputValidation';
import searchListFormat from './SearchListFormat';
import onError, { showError } from './ApolloError';
import onCompletedMessage from './ApolloOnCompleted';
import QueryDataFormater from './QueryDataFormat';

const JDutils = {
  ErrProtecter,
  NEUTRAL,
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
};

export default JDutils;
export {
  onCompletedMessage,
  JDMonthTextChanger,
  JDWeekChanger,
  isEmpty,
  NEUTRAL,
  toast,
  download,
  ErrProtecter,
  autoHypen,
  onError,
  showError,
  QueryDataFormater,
};
