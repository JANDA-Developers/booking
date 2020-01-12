// 카드 만료일 Get
const cardExpToObj = (period: string = "") => {
  var replaceCard = period.replace(/\//g, "");
  var inputMonth = replaceCard.substring(0, 2); // 선언한 변수 month에 월의 정보값을 담는다.
  var inputYear = replaceCard.substring(2, 4); // 선언한 변수 year에 년의 정보값을 담는다.
  return {
    month: inputMonth,
    year: inputYear
  };
};

// 카드 만료일 MM/YY
const cardExpire = (period: string = "") => {
  // replace 함수를 사용하여 슬래시( / )을 공백으로 치환한다.
  var replaceCard = period.replace(/\//g, "");

  // 텍스트박스의 입력값이 4~5글자 사이가 되는 경우에만 실행한다.
  if (replaceCard.length >= 4 && replaceCard.length < 5) {
    var inputMonth = replaceCard.substring(0, 2); // 선언한 변수 month에 월의 정보값을 담는다.
    var inputYear = replaceCard.substring(2, 4); // 선언한 변수 year에 년의 정보값을 담는다.
    return inputMonth + "/" + inputYear;
  }
  return period;
};
// 카드 번호 스페이스 오토
const card_space = (value: string = "") => {
  var v = value.replace(/\s+/g, "").replace(/[^0-9\*]/gi, "");
  var matches = v.match(/[0-9\*]{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

//  전화번호 형식에 맞추어 - 붙임
const autoHypenPhone = (str: string = ""): string => {
  const inStr = str.replace(/[^0-9]/g, "");
  let tmp = "";
  if (inStr.length < 4) {
    return inStr;
  }
  if (inStr.length < 7) {
    tmp += inStr.substr(0, 3);
    tmp += "-";
    tmp += inStr.substr(3);
    return tmp;
  }
  if (inStr.length < 11) {
    tmp += inStr.substr(0, 3);
    tmp += "-";
    tmp += inStr.substr(3, 3);
    tmp += "-";
    tmp += inStr.substr(6);
    return tmp;
  }
  if (inStr.length >= 11) {
    tmp += inStr.substr(0, 3);
    tmp += "-";
    tmp += inStr.substr(3, 4);
    tmp += "-";
    tmp += inStr.substr(7);
    return tmp;
  }

  return inStr;
};

//  3글자 마다 ,붙여줌
const autoComma = (str: string | number = ""): string => {
  if (typeof str === "number") return autoComma(str.toString());
  let t = `${str}`;
  const comma = /,/g;
  t = t.replace(comma, "");
  const x = t.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : "";
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }

  return x1 + x2;
};

// 숫자로된 string 타입을 반환
const numberStr = (str: string = ""): string => str.replace(/[^0-9.]/g, "");
// 스트링을 숫자로 만듬
const toNumber = (value: string | number = ""): number => {
  if (typeof value === "number") return value;
  return parseInt(value.replace(/[^0-9.]/g, ""));
};

export default autoHypenPhone;
export { cardExpToObj, autoComma, numberStr, cardExpire, toNumber, card_space };
