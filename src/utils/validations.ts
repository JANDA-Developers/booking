import { cardExpToObj, toNumber } from "./autoFormat";
import { LANG } from "../hooks/hook";
import moment from "moment";
import { TCardRegistInfo } from "../components/bilingModal/BillingModal";

export const cardValidate = (cardInfo: TCardRegistInfo): {
    result: boolean,
    msg: string
} => {
    const { exp: expTemp, cardNumber, idNumber, cardPassword } = cardInfo;
    const expObj = cardExpToObj(expTemp);

    // 길이 검사
    if (
        toNumber(expObj.month) > 12 ||
        toNumber(expObj.month) < 1 ||
        expTemp.length !== 5
    ) {
        return {
            result: false,
            msg: LANG("un_validate_card_expire")
        };
    }
    // 기한 검사
    if (
        moment(20 + expObj.month + expObj.year + "01", "YYYYMMDD").isBefore(
            moment(),
            "month"
        )
    ) {
        return {
            result: false,
            msg: LANG("un_validate_card_expire")
        };;
    }
    // 카드 넘버 
    if (cardNumber.length !== 16) {
        return {
            result: false,
            msg: LANG("un_validate_card_number")
        };
    }
    // 카드 비밀번호
    if (cardPassword.length !== 2) {
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