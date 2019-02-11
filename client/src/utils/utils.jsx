// 유틸리티가 더 많이 쌓이면
import ErrProtecter from './ErrProtecter';
import isEmpty from './IsEmpty';
import { NEUTRAL } from './Enums';
import { JDMonthTextChanger, JDWeekChanger } from './TextChanger';
import {
  isEmail, isPhone, isName, isUrl, isMaxOver,
} from './InputValidation';

const JDutils = {
  ErrProtecter,
  NEUTRAL,
  isEmpty,
  isEmail,
  isPhone,
  isUrl,
  isName,
  isMaxOver,
  JDMonthTextChanger,
};

export default JDutils;
export {
  JDMonthTextChanger, JDWeekChanger, isEmpty, NEUTRAL,
};
