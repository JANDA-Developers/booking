import { NEUTRAL } from '../types/apiEnum';

const isUrl = (string) => {
  const regExp = /^http(s)?:\/\/(www\.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regExp.test(string);
};

const isPhone = (string) => {
  console.log('string');
  console.log(string);
  if (string === '') return NEUTRAL;
  const result = string.replace(/[\s-]+/g, '');
  const validation = result.length < 14 && /^[0-9+]+\w$/g.test(result);
  return validation;
};

const isName = (string) => {
  if (string === '') return NEUTRAL;
  const regExp = /[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 .'_]+$/gi;
  const maxLen = 60;
  const validation = string.length <= maxLen && regExp.test(string);
  return validation;
};

const isEmail = (string) => {
  if (string === '') return NEUTRAL;
  const regExp = /^[-$^_=+0-9A-Za-z~]+@[-$%/0-9=?A-Z^_a-z~]+.[0-9A-Za-z~]+\w$/;
  return regExp.test(string);
};

const isMaxOver = (string, max) => {
  if (string === '') return NEUTRAL;
  const val = string.length;
  return val <= max;
};

const isPassword = (string) => {
  if (string === '') return NEUTRAL;
  // 특수문자 1개이상 숫자 0 에서  9  7~15 자리의 숫자
  const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  return regExp.test(string);
};

export {
  isEmail, isPhone, isName, isUrl, isMaxOver, isPassword,
};
