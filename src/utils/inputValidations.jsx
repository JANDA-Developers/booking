// 빈 문자열이면 중립을 반환합니다.

import { NEUTRAL } from "../types/const";

const checkBizID = (
  bizID //사업자등록번호 체크
) => {
  // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
  var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
  var tmpBizID,
    i,
    chkSum = 0,
    c2,
    remander;
  bizID = bizID.replace(/-/gi, "");

  for (i = 0; i <= 7; i++) chkSum += checkID[i] * bizID.charAt(i);
  c2 = "0" + checkID[8] * bizID.charAt(8);
  c2 = c2.substring(c2.length - 2, c2.length);
  chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
  remander = (10 - (chkSum % 10)) % 10;

  if (Math.floor(bizID.charAt(9)) == remander) return true; // OK!
  return false;
};

const isUrl = string => {
  if (string === "") return NEUTRAL;
  const regExp = /^http(s)?:\/\/(www\.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return regExp.test(string);
};

const isPhone = string => {
  if (string === "") return NEUTRAL;
  const result = string.replace(/[\s-]+/g, "");
  const validation =
    result.length >= 10 && result.length < 14 && /^[0-9+]+\w$/g.test(result);
  return validation;
};

const isHaveScharacter = string => {
  var regExp = /[~!@#$%^&*()_+|<>?:{}]/;
  return regExp.test(string);
};

const isLengthIn = (string, max, min) => {
  return string.length <= max && min < string.length;
};

const isName = string => {
  if (string === "") return NEUTRAL;
  const regExp = /[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 .'_]+$/gi;
  const maxLen = 60;
  const validation = string.length <= maxLen && regExp.test(string);
  return validation;
};

const isYYYYMMDD = string => {
  const regExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
  // const regExp2 = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
  let validation = regExp.test(string);
  // if (!validation) validation = regExp2.test(string);
  return validation;
};

const isEmail = string => {
  if (string === "") return NEUTRAL;
  const regExp = /^[-$.^_=+0-9A-Za-z~]+@[-$%/0-9=?A-Z^_a-z~]+.[0-9A-Za-z~]+\w$/;
  return regExp.test(string);
};

const isHaveNumber = string => {
  var regExp = /[0-9]/;
  return regExp.test(string);
};

const isMaxOver = (string, max) => {
  if (string === "") return NEUTRAL;
  const val = string.length;
  return val <= max;
};

const isPassword = string => {
  if (string === "") return NEUTRAL;
  // 특수문자 1개이상 숫자 0 에서  9  7~15 자리의 숫자
  const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*_\-~;?/])[a-zA-Z0-9!@#$%^&*_\-~;?/]{7,15}$/gi;
  return regExp.test(string);
};

const isNumberMinMax = (string, min, max) => {
  if (string === "") return NEUTRAL;
  // 특수문자 1개이상 숫자 0 에서  9  7~15 자리의 숫자
  const regExp = new RegExp(`[0-9_-]{${min},${max}}`);
  return regExp.test(string);
};

const isNumber = value => {
  return /^\d*$/.test(value);
};

export {
  isEmail,
  isNumber,
  isYYYYMMDD,
  isPhone,
  isName,
  isUrl,
  isMaxOver,
  isPassword,
  isNumberMinMax,
  isLengthIn,
  isHaveScharacter,
  isHaveNumber
};
