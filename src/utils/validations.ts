import { cardExpToObj, toNumber } from "./autoFormat";
import { LANG } from "../hooks/hook";
import dayjs from "dayjs";
import { TCardRegistInfo } from "../components/cardModal/declare";

export const cardValidate = (
  cardInfo: TCardRegistInfo
): {
  result: boolean;
  msg: string;
} => {
  const { cardNo, idNo, expYear, expMonth, cardPw } = cardInfo;

  // 길이 검사
  if (
    toNumber(expMonth) > 12 ||
    toNumber(expYear) < 1 ||
    expMonth.length + expYear.length !== 4
  ) {
    return {
      result: false,
      msg: LANG("un_validate_card_expire")
    };
  }
  // 기한 검사
  if (
    dayjs(20 + expMonth + expYear + "01", "YYYYMMDD").isBefore(dayjs(), "month")
  ) {
    return {
      result: false,
      msg: LANG("un_validate_card_expire")
    };
  }
  // 카드 넘버
  if (cardNo.length < 12) {
    return {
      result: false,
      msg: LANG("un_validate_card_number")
    };
  }
  // 카드 비밀번호
  if (cardPw.length !== 2) {
    return {
      result: false,
      msg: LANG("not_a_valid_password")
    };
  }

  return {
    result: true,
    msg: ""
  };
};
