import { IUseModal, LANG } from "../../../hooks/hook";
import { isName, isPhone } from "../../../utils/inputValidations";
import { TCardRegistInfo } from "../../../components/bilingModal/BillingModal";
import { cardExpToObj, toNumber } from "../../../utils/autoFormat";
import moment from "moment";

// 예약전 벨리데이션
export const bookerInfoValidation = ({
    name,
    password,
    phoneNumber,
    agreePrivacyPolicy
}: {
    name: string;
    phoneNumber: string;
    password: string;
    agreePrivacyPolicy: boolean;
}, toastModalHook: IUseModal): boolean => {
    if (isName(name) !== true) {
        toastModalHook.openModal({ txt: LANG("name_is_not_valid") });
        return false;
    }
    if (isPhone(phoneNumber) !== true) {
        toastModalHook.openModal({ txt: LANG("phoneNum_is_not_valid") });
        return false;
    }
    if (password === "") {
        toastModalHook.openModal({ txt: LANG("input_your_password_please") });
        return false;
    }
    if (agreePrivacyPolicy === false) {
        toastModalHook.openModal({
            txt: LANG("please_agree_collect_personal_info")
        });
        return false;
    }
    return true;
};
