// 빈 문자열이면 중립을 반환합니다.

import { NEUTRAL } from "../types/enum";

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

// 한글이름인지 검사
const isName = string => {
  if (string === "") return NEUTRAL;
  const regExp = /[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 .'_]+$/gi;
  const maxLen = 60;
  const validation = string.length <= maxLen && regExp.test(string);
  return validation;
};

// YYYY-MM-DD 형식 포맷인지 검사
const isYYYYMMDD = string => {
  if (string === "") return NEUTRAL;
  const regExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
  // const regExp2 = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
  let validation = regExp.test(string);
  // if (!validation) validation = regExp2.test(string);
  return validation;
};

// 이메일 형식인지 검사
const isEmail = string => {
  if (string === "") return NEUTRAL;
  const regExp = /^[-$^_=+0-9A-Za-z~]+@[-$%/0-9=?A-Z^_a-z~]+.[0-9A-Za-z~]+\w$/;
  return regExp.test(string);
};

// 숫자가 있는지 검사
const isHaveNumber = string => {
  var regExp = /[0-9]/;
  return regExp.test(string);
};

// max 보다 큰지 검사
const isMaxOver = (string, max) => {
  if (string === "") return NEUTRAL;
  const val = string.length;
  return val <= max;
};

// 비밀번호 패턴에 맞는지 검사
const isPassword = string => {
  if (string === "") return NEUTRAL;
  // 특수문자 1개이상 숫자 0 에서  9  7~15 자리의 숫자
  const regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  return regExp.test(string);
};

// 넘버가 min보다 크고 max 보다 작은지 검사
const isNumberMinMax = (string, min, max) => {
  if (string === "") return NEUTRAL;
  // 특수문자 1개이상 숫자 0 에서  9  7~15 자리의 숫자
  const regExp = new RegExp(`[0-9_-]{${min},${max}}`);
  return regExp.test(string);
};

export {
  isEmail,
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
