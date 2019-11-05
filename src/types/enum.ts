import {isMobile} from "is-mobile";
import {LANG} from "../hooks/hook";

export enum PricingType {
  DOMITORY = "DOMITORY",
  ROOM = "ROOM"
}

export enum UserRole {
  ADMIN = "ADMIN",
  GHOST = "GHOST",
  GUEST = "GUEST",
  DEVELOPER = "DEVELOPER",
  HOST = "HOST"
}

export enum DateFormat {
  WITH_TIME = "YY/MM/DD HH:mm",
  YYMMDD = "YY/MM/DD"
}

export enum GuestType {
  BLOCK = "BLOCK",
  GUEST = "GUEST"
}

export enum MemoType {
  HOST = "HOST"
}

export enum PaymentType {
  ONE_TIME = "ONE_TIME",
  SUBSCRIPTION = "SUBSCRIPTION"
}

export enum SalesStatisticsUnit {
  BY_DATE = "BY_DATE",
  BY_DAY_OF_WEEK = "BY_DAY_OF_WEEK",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  YEARLY = "YEARLY"
}

export enum HouseType {
  GUEST_HOUSE = "GUEST_HOUSE",
  HOSTEL = "HOSTEL",
  HOTEL = "HOTEL",
  MOTEL = "MOTEL",
  PENSION = "PENSION",
  YOUTH_HOSTEL = "YOUTH_HOSTEL"
}

export enum Language {
  KOREAN = "KOREAN",
  ENGLISH = "ENGLISH",
  JAPANESE = "JAPANESE",
  CHINESE = "CHINESE"
}

export type TNationalShort = "kr" | "gb" | "jp" | "cn";
export type TLanguageShort = "kr" | "en" | "jp" | "cn";

export enum LanguageShortResverse {
  kr = "KOREAN",
  jp = "JAPANESE",
  cn = "CHINESE",
  en = "ENGLISH"
}

export enum LanguageResverseShort {
  KOREAN = "kr",
  ENGLISH = "en",
  JAPANESE = "jp",
  CHINESE = "cn"
}

export enum LangShortToNational {
  kr = "kr",
  en = "gb",
  jp = "jp",
  cn = "cn"
}

export enum LanguageItSelf {
  KOREAN = "한국어",
  ENGLISH = "English",
  JAPANESE = "日本語",
  CHINESE = "中國語"
}

export const LANGUAGE_LIST: Language[] = [
  Language.CHINESE,
  Language.ENGLISH,
  Language.JAPANESE,
  Language.KOREAN
];

export enum HouseStatus {
  ENABLE = "ENABLE",
  DISALBE = "DISALBE",
  WAIT = "WAIT"
}

export type TextAlign = "left" | "right" | "center";

export enum RoomGender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  ANY = "ANY",
  SEPARATELY = "SEPARATELY"
}

//= =============================================================
// START Enums from Front End
//= =============================================================

export enum TimePerMs {
  DAY = 24 * 60 * 60 * 1000,
  H = 60 * 60 * 1000,
  M = 60 * 1000
}

export enum PaymentStatus {
  CANCEL = "CANCEL",
  PROGRESSING = "PROGRESSING",
  COMPLETE = "COMPLETE"
}

export enum BookingStatus {
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  FAIL = "FAIL",
  PROGRESSING = "PROGRESSING"
}

export enum PayMethod {
  VBANK = "VBANK",
  CASH = "CASH",
  CARD = "CARD",
  CHANNEL_PAY = "CHANNEL_PAY"
}

// css variable 의 breackPoints 와 일치하도록 하세요.
export enum WindowSize {
  MOBILE = 400,
  PHABLET = 550,
  TABLET = 750,
  DESKTOP = 1000,
  DESKTOPHD = 1200
}

// 👿 deprecate
export enum GlobalCSS {
  TIMELINE_HEADER_HEIGHT = 36
}

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE"
}

export enum NotiType {
  ELSE = "ELSE",
  NEW_BOOKING = "NEW_BOOKING",
  PRODUCT_EXPIRE = "PRODUCT_EXPIRE",
  TO_ALL = "TO_ALL"
}

export type JDColor =
  | "primary"
  | "point"
  | "new"
  | "warn"
  | "error"
  | "black"
  | "white"
  | "grey"
  | "normal"
  | "positive";

export enum AutoSendWhen {
  WEHN_BOOKING_CANCEL = "WEHN_BOOKING_CANCEL",
  WHEN_BOOKING_CREATED = "WHEN_BOOKING_CREATED",
  WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING = "WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING",
  WHEN_BOOKING_UPDATE = "WHEN_BOOKING_UPDATE"
}

export enum SendTarget {
  BOTH = "BOTH",
  GUEST = "GUEST",
  HOST = "HOST"
}

export enum LayoutType {
  Layout_A = "Layout_A",
  Layout_B = "Layout_B"
}

export enum Day {
  FRI = "FRI",
  MON = "MON",
  SAT = "SAT",
  SUN = "SUN",
  THU = "THU",
  TUE = "TUE",
  WED = "WED"
}

export enum ProductTypeKey {
  DEMO = "DEMO",
  NEGOTIATION = "NEGOTIATION",
  PREMIUM = "PREMIUM",
  STANDARD = "STANDARD"
}

export const WeekArrKr = ["일", "월", "화", "수", "목", "금", "토"];
export const WeekArrEn = [
  Day.SUN,
  Day.MON,
  Day.TUE,
  Day.WED,
  Day.THU,
  Day.FRI,
  Day.SAT
];

export enum SERVICE_CONTECT {
  SERVICE_MANGER_PHONE = "070-4128-8244",
  SERVICE_MANGER_MAIL = "support@stayjanda.com"
}

export const SmsReplaceKeyEnumKeys = [
  "STAYDATE",
  "STAYDATE_YMD",
  "ROOMTYPE_N_COUNT",
  "BOOKERNAME",
  "TOTALPRICE",
  "PAYMETHOD",
  "PAYMENTSTATUS",
  "HM"
];
// 위아래 인덱스가 맞아야함
export const SmsReplaceKeyEnumValues = [
  "%STAYDATE%",
  "%STAYDATE_YMD%",
  "%ROOMTYPE_N_COUNT%",
  "%BOOKERNAME%",
  "%TOTALPRICE%",
  "%PAYMETHOD%",
  "%PAYMENTSTATUS%",
  "%HM%"
];

export enum NotiLevel {
  NORMAL = "NORMAL",
  WARN = "WARN"
}

//= =============================================================
// START global options
//= =============================================================

export const SELECT_DUMMY_OP = [
  {value: "chocolate", label: "Chocolate"},
  {value: "strawberry", label: "Strawberry"},
  {value: "vanilla", label: "Vanilla"}
];

export enum ProductTypeName {
  ONE = "JANDA-T",
  TOW = "JANDA-G",
  THREE = "JANDA-H",
  FOUR = "JANDA-X"
}

export const SELECT_PRODUCT_TYPE_OP = [
  {value: ProductTypeName.ONE, label: ProductTypeName.ONE},
  {value: ProductTypeName.TOW, label: ProductTypeName.TOW},
  {value: ProductTypeName.THREE, label: ProductTypeName.THREE},
  {value: ProductTypeName.FOUR, label: ProductTypeName.FOUR}
];

export const SELECT_COUNT_DUMMY_OP = [
  {value: 0, label: "0"},
  {value: 1, label: "1"},
  {value: 2, label: "2"},
  {value: 3, label: "3"},
  {value: 4, label: "4"},
  {value: 5, label: "5"},
  {value: 6, label: "6"},
  {value: 7, label: "7"},
  {value: 8, label: "8"},
  {value: 9, label: "9"},
  {value: 10, label: "10"}
];

export let BOOKING_STATUS_OP = [
  {
    value: BookingStatus.COMPLETE,
    label: ""
  },
  {value: BookingStatus.CANCEL, label: ""},
  {
    value: BookingStatus.FAIL,
    label: ""
  }
];

export const LAYOUT_TYPE_OP = [
  {value: LayoutType.Layout_A, label: LayoutType.Layout_A},
  {value: LayoutType.Layout_B, label: LayoutType.Layout_B}
];

// [0]가 진행중이 되도록 고정
export let PAYMENT_STATUS_OP = [
  {value: PaymentStatus.PROGRESSING, label: ""},
  {value: PaymentStatus.CANCEL, label: ""},
  {value: PaymentStatus.COMPLETE, label: ""}
];

// 아직 통계선택들이 작업 안되어있음 View 만 사용중
export let STATISTICS_OP = [{value: "sales_statistics", label: ""}];

export let STATISTICS_TYPE_OP = [
  {
    value: SalesStatisticsUnit.BY_DATE,
    label: ""
  },
  {
    value: SalesStatisticsUnit.BY_DAY_OF_WEEK,
    label: ""
  },
  {
    value: SalesStatisticsUnit.MONTHLY,
    label: ""
  },
  {
    value: SalesStatisticsUnit.WEEKLY,
    label: ""
  },
  {
    value: SalesStatisticsUnit.YEARLY,
    label: ""
  }
];

export let SMS_TARGET_OP = [
  {value: SendTarget.GUEST, label: ""},
  {value: SendTarget.HOST, label: ""},
  {value: SendTarget.BOTH, label: ""}
];

export let NOTI_LEVEL_OP = [
  {value: NotiLevel.NORMAL, label: NotiLevel.NORMAL},
  {value: NotiLevel.WARN, label: NotiLevel.WARN}
];

export let PRODUCT_STATUS_OP = [
  {value: HouseStatus.WAIT, label: ""},
  {value: HouseStatus.ENABLE, label: ""},
  {value: HouseStatus.DISALBE, label: ""}
];

export let PAYMETHOD_FOR_BOOKER_OP = [{value: PayMethod.CARD, label: ""}];

export let PAYMETHOD_FOR_HOST_OP = [
  {value: PayMethod.VBANK, label: ""},
  {value: PayMethod.CASH, label: ""},
  {value: PayMethod.CARD, label: ""},
  {value: PayMethod.CHANNEL_PAY, label: ""}
  // {value: PayMethod.ELSE, label: "기타"}
];

export let ROOM_GENDER_OP = [
  {value: RoomGender.SEPARATELY, label: ""},
  {value: RoomGender.ANY, label: ""},
  {value: RoomGender.MALE, label: ""},
  {value: RoomGender.FEMALE, label: ""}
];

export let PRICING_TYPE_OP = [
  {value: PricingType.DOMITORY, label: ""},
  {value: PricingType.ROOM, label: ""}
];

export let PRICING_TYPE_OP_EXPEND = [
  {value: [PricingType.DOMITORY], label: ""},
  {value: [PricingType.ROOM], label: ""},
  {
    value: [PricingType.ROOM, PricingType.DOMITORY],
    label: ``
  }
];

export enum GetSmsTarget {
  TODAY_STAY = "TODAY_STAY",
  TODAY_CHECKIN = "TODAY_CHECKIN",
  TOMORROW_CHECKIN = "TOMORROW_CHECKIN",
  EXSIST_INFO = "EXSIST_INFO"
}

export let GET_SMS_TARGET_OP = [
  {value: "EXSIST_INFO", label: ""},
  {value: "TODAY_STAY", label: ""}
  // {value: "TODAY_CHECKIN", label: ""},
  // {value: "TOMORROW_CHECKIN", label: ""}
];

export let GENDER_OP = [
  {value: Gender.FEMALE, label: ""},
  {value: Gender.MALE, label: ""}
];

export let AUTO_SEND_OP = [
  {
    value: AutoSendWhen.WEHN_BOOKING_CANCEL,
    label: ""
  },
  {
    value: AutoSendWhen.WHEN_BOOKING_CREATED,
    label: ""
  },
  {
    value: AutoSendWhen.WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING,
    label: ""
  },
  {
    value: AutoSendWhen.WHEN_BOOKING_UPDATE,
    label: ""
  }
];

// 99명의 선택가능한 셀렉트 옵션 생성
export const MAX_PEOPLE_COUNT_OP_FN = () => {
  const maxPeopleCountOption = [];
  for (let i = 0; i < 100; i += 1) {
    maxPeopleCountOption.push({value: i, label: `${i}${LANG("person_unit")}`});
  }
  return maxPeopleCountOption;
};

// --필요한것
// 예약상태
// 결제상태

/** 중립 */
export const NEUTRAL = "";

export const EMPTY = "";

export const MODAL_MIN_WIDTH = isMobile()
  ? `${document.documentElement.clientWidth - 64}px`
  : "360px";

export const STATIC_COLORS = [
  "#4c5b73",
  "#E8554E",
  "#E8554E",
  "#F19C65",
  "#FFD265",
  "#2AA876",
  "#0A7B83"
];

export const FLOATING_PRELOADER_SIZE = "small";
export const MODAL_PRELOADER_SIZE = "large";

export const TEST_PRODUCT_NAME = ProductTypeName.ONE;
