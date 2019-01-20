import { emBol } from './Enums';

const isUrl = (string) => {
  const regExp = /^http(s)?:\/\/(www\.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regExp.test(string);
};

const isPhone = (string) => {
  if (string === '') return emBol.NEUTRAL;
  const result = string.replace(/[\s-]+/g, '');
  const validation = result.length < 14 && /^[0-9+]+\w$/g.test(result);
  return validation;
};

const isName = (string) => {
  if (string === '') return emBol.NEUTRAL;
  const regExp = /[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 .'_]+$/gi;
  const maxLen = 60;
  const validation = string.length <= maxLen && regExp.test(string);
  return validation;
};

const isEmail = (string) => {
  if (string === '') return emBol.NEUTRAL;
  const regExp = /^[-$^_=+0-9A-Za-z~]+@[-$%/0-9=?A-Z^_a-z~]+.[0-9A-Za-z~]+\w$/;
  return !!regExp.test(string);
};

const isMaxOver = (string, max) => {
  if (string === '') return emBol.NEUTRAL;
  const val = string.length;
  return val <= max;
};

export {
  isEmail, isPhone, isName, isUrl, isMaxOver,
};