// 유틸리티가 더 많이 쌓이면
import ErrProtecter from './ErrProtecter';
import isEmpty from './IsEmpty';
import Enums from './Enums';
import {
  isEmail, isPhone, isName, isUrl, isMaxOver,
} from './InputValidation';

const JDutils = {
  ErrProtecter,
  Enums,
  isEmpty,
  isEmail,
  isPhone,
  isUrl,
  isName,
  isMaxOver,
};

export default JDutils;
