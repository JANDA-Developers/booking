import {
  STATISTICS_TYPE_OP,
  SMS_TARGET_OP,
  PRODUCT_STATUS_OP,
  PAYMETHOD_FOR_BOOKER_OP,
  PAYMETHOD_FOR_HOST_OP,
  GET_SMS_TARGET_OP,
  PRICING_TYPE_OP,
  PAYMENT_STATUS_OP,
  ROOM_GENDER_OP,
  PRICING_TYPE_OP_EXPEND,
  GENDER_OP,
  EXCEL_EXPRESS_OP,
  BOOKING_STATUS_OP,
  OPTIONAL_APPLY_PAYMETHOD,
  HOUSE_STATUS_OP,
  AUTO_SEND_OP,
  STATISTICS_OP,
  HOUSE_TYPE_OP,
  FUNNELS_OP
} from "../types/const";
import { LANG } from "../hooks/hook";
import { isArray } from "util";

export const globalLanguageSetting = () => {
  const setArrayWithLang = (set: Array<any>, enumKey?: string) => {
    if (!enumKey) {
      set.forEach((setIn: any) => {
        setIn.label = LANG(setIn.value);
      });
    } else {
      set.forEach((setIn: any) => {
        setIn.label = LANG(enumKey)[setIn.value];
      });
    }
  };

  const settings = [
    { value: PAYMENT_STATUS_OP, enumKey: "PaymentStatus" },
    STATISTICS_TYPE_OP,
    STATISTICS_OP,
    { value: HOUSE_STATUS_OP, enumKey: "HouseStatus" },
    { value: EXCEL_EXPRESS_OP, enumKey: "ExcelExpress" },
    { value: SMS_TARGET_OP, enumKey: "SendTarget" },
    OPTIONAL_APPLY_PAYMETHOD,
    PRODUCT_STATUS_OP,
    BOOKING_STATUS_OP,
    PAYMETHOD_FOR_BOOKER_OP,
    OPTIONAL_APPLY_PAYMETHOD,
    PAYMETHOD_FOR_HOST_OP,
    GET_SMS_TARGET_OP,
    PRICING_TYPE_OP,
    { value: FUNNELS_OP, enumKey: "Funnels" },
    { value: ROOM_GENDER_OP, enumKey: "RoomGender" },
    PRICING_TYPE_OP_EXPEND,
    GENDER_OP,
    AUTO_SEND_OP,
    { value: HOUSE_TYPE_OP, enumKey: "HouseType" }
  ];
  settings.forEach((set: any) => {
    if (!isArray(set)) {
      // lang객체에 네임스페이스가 있는 OP 들일경우
      if (set.hasOwnProperty("enumKey")) {
        setArrayWithLang(set.value, set.enumKey);
      }
      // 네임스페이스가 없는 일반 객체일 경우
      for (const key in set) {
        // @ts-ignore
        set[key] = LANG(key);
      }
    } else {
      setArrayWithLang(set);
    }
  });
};
