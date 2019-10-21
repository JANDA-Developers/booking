import {isMobile} from "is-mobile";

export enum PricingType {
  DOMITORY = "DOMITORY",
  ROOM = "ROOM"
}

export enum PricingTypeKr {
  DOMITORY = "도미토리",
  ROOM = "방형태"
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

export enum LanguageKr {
  KOREAN = "한국어",
  ENGLISH = "영어",
  JAPANESE = "일본어",
  CHINESE = "중국어"
}

export enum HouseStatus {
  ENABLE = "ENABLE",
  DISALBE = "DISALBE",
  WAIT = "WAIT"
}

export type TextAlign = "left" | "right" | "center";

export enum HouseStatusKr {
  ENABLE = "정상",
  DISALBE = "정지",
  WAIT = "대기"
}

export enum RoomGender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  ANY = "ANY",
  SEPARATELY = "SEPARATELY"
}

//= =============================================================
// START Enums from Front End
//= =============================================================

export enum RoomGenderKr {
  FEMALE = "여성",
  MALE = "남성",
  ANY = "제한없음(혼숙O)",
  SEPARATELY = "제한없음(혼숙X)"
}

export enum GenderKr {
  FEMALE = "여",
  MALE = "남"
}

export enum TimePerMs {
  DAY = 24 * 60 * 60 * 1000,
  H = 60 * 60 * 1000,
  M = 60 * 1000
}

export enum PaymentStatus {
  PROGRESSING = "PROGRESSING",
  COMPLETE = "COMPLETE"
}

export enum PaymentStatusKr {
  PROGRESSING = "미결제",
  COMPLETE = "결제완료"
}

export enum BookingStatus {
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  FAIL = "FAIL",
  PROGRESSING = "PROGRESSING"
}

export enum BookingStatusKr {
  COMPLETE = "예약완료",
  CANCEL = "예약취소",
  FAIL = "예약실패",
  PROGRESSING = "예약진행중"
}

export enum PayMethod {
  VBANK = "VBANK",
  CASH = "CASH",
  CARD = "CARD",
  CHANNEL_PAY = "CHANNEL_PAY"
}

export enum PayMethodKr {
  VBANK = "무통장입금",
  CARD = "카드결제",
  CASH = "현금결제",
  CHANNEL_PAY = "채널결제"
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

export enum BookingModalModes {
  CREATE = "CREATE",
  READ_ONLY = "READ_ONLY"
}

// export enum
export enum SalesStatisticsUnitKr {
  BY_DAY_OF_WEEK = "요일별",
  BY_DATE = "날자별",
  MONTHLY = "LANG("month")별",
  WEEKLY = "주별",
  YEARLY = "년별"
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

export enum AutoSendWhenKr {
  WEHN_BOOKING_CANCEL = "예약취소시",
  WHEN_BOOKING_CREATED = "예약생성시",
  WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING = "예약생성시(미결제)",
  WHEN_BOOKING_UPDATE = "예약업데이트시"
}

export enum SendTarget {
  BOTH = "BOTH",
  GUEST = "GUEST",
  HOST = "HOST"
}

export enum SendTargetKr {
  BOTH = "게스트,호스트",
  GUEST = "게스트",
  HOST = "호스트"
}

export enum LayoutType {
  Layout_A = "Layout_A",
  Layout_B = "Layout_B"
}

export enum SmsReplaceKeyEnum {
  STAYDATE = "%STAYDATE%",
  STAYDATE_YMD = "$STAYDATE_YMD%",
  ROOMTYPE_N_COUNT = "%ROOMTYPE_N_COUNT%",
  BOOKERNAME = "%BOOKERNAME%",
  TOTALPRICE = "%TOTALPRICE%",
  PAYMETHOD = "%PAYMETHOD%",
  PAYMENTSTATUS = "%PAYMENTSTATUS%",
  HM = "%HM%"
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

export const WeekArrKr = ["일", "LANG("month")", "화", "수", "목", "금", "토"];
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

export enum SmsReplaceKeyEnumKr {
  STAYDATE = "[숙박일자(LANG("month")/일)]",
  STAYDATE_YMD = "[숙박일자(년/LANG("month")/일)]",
  ROOMTYPE_N_COUNT = "[숙박정보(방/인원)]",
  BOOKERNAME = "[예약자명]",
  TOTALPRICE = "[가격]",
  PAYMETHOD = "[결제방법]",
  PAYMENTSTATUS = "[결제상태]",
  HM = "[하우스 메뉴얼 URL]"
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
export const SmsReplaceKeyEnumValues = [
  "%STAYDATE%",
  "$STAYDATEYMD%",
  "%ROOMTYPENCOUNT%",
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

export const KR_SMS_PARSER = {
  BOOKERNAME: SmsReplaceKeyEnumKr.BOOKERNAME,
  ROOMTYPE_N_COUNT: SmsReplaceKeyEnumKr.ROOMTYPE_N_COUNT,
  TOTALPRICE: SmsReplaceKeyEnumKr.TOTALPRICE,
  STAYDATE: SmsReplaceKeyEnumKr.STAYDATE,
  STAYDATE_YMD: SmsReplaceKeyEnumKr.STAYDATE_YMD,
  PAYMENTSTATUS: SmsReplaceKeyEnumKr.PAYMENTSTATUS,
  PAYMETHOD: SmsReplaceKeyEnumKr.PAYMETHOD,
  HM: SmsReplaceKeyEnumKr.HM
};

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

export const BOOKING_STATUS_OP = [
  {
    value: BookingStatus.COMPLETE,
    label: BookingStatusKr[BookingStatus.COMPLETE]
  },
  {value: BookingStatus.CANCEL, label: BookingStatusKr[BookingStatus.CANCEL]},
  {
    value: BookingStatus.FAIL,
    label: BookingStatusKr[BookingStatus.FAIL]
  }
];

export const LAYOUT_TYPE_OP = [
  {value: LayoutType.Layout_A, label: LayoutType.Layout_A},
  {value: LayoutType.Layout_B, label: LayoutType.Layout_B}
];

// [0]가 미결제 이도록
export const PAYMENT_STATUS_OP = [
  {value: PaymentStatus.PROGRESSING, label: "미결제"},
  {value: PaymentStatus.COMPLETE, label: "결제완료"}
];

export const STATISTICS_OP = [{value: "매출통계", label: "매출통계"}];

export const STATISTICS_TYPE_OP = [
  {
    value: SalesStatisticsUnit.BY_DATE,
    label: SalesStatisticsUnitKr[SalesStatisticsUnit.BY_DATE]
  },
  {
    value: SalesStatisticsUnit.BY_DAY_OF_WEEK,
    label: SalesStatisticsUnitKr[SalesStatisticsUnit.BY_DAY_OF_WEEK]
  },
  {
    value: SalesStatisticsUnit.MONTHLY,
    label: SalesStatisticsUnitKr[SalesStatisticsUnit.MONTHLY]
  },
  {
    value: SalesStatisticsUnit.WEEKLY,
    label: SalesStatisticsUnitKr[SalesStatisticsUnit.WEEKLY]
  },
  {
    value: SalesStatisticsUnit.YEARLY,
    label: SalesStatisticsUnitKr[SalesStatisticsUnit.YEARLY]
  }
];

export const SMS_TARGET_OP = [
  {value: SendTarget.GUEST, label: SendTargetKr.GUEST},
  {value: SendTarget.HOST, label: SendTargetKr.HOST}
];

export const NOTI_LEVEL_OP = [
  {value: NotiLevel.NORMAL, label: NotiLevel.NORMAL},
  {value: NotiLevel.WARN, label: NotiLevel.WARN}
];

export const PRODUCT_STATUS_OP = [
  {value: HouseStatus.WAIT, label: HouseStatusKr.WAIT},
  {value: HouseStatus.ENABLE, label: HouseStatusKr.ENABLE},
  {value: HouseStatus.DISALBE, label: HouseStatusKr.DISALBE}
];

export const PAYMETHOD_FOR_BOOKER_OP = [
  {value: PayMethod.VBANK, label: "무통장입금"},
  {value: PayMethod.CARD, label: "카드결제"}
];

export const PAYMETHOD_FOR_HOST_OP = [
  {value: PayMethod.VBANK, label: "무통장입금"},
  {value: PayMethod.CASH, label: PayMethodKr[PayMethod.CASH]},
  {value: PayMethod.CARD, label: "카드결제"},
  {value: PayMethod.CHANNEL_PAY, label: "채널결제"}
  // {value: PayMethod.ELSE, label: "기타"}
];

export const ROOM_GENDER_OP = [
  {value: RoomGender.SEPARATELY, label: RoomGenderKr.SEPARATELY},
  {value: RoomGender.ANY, label: RoomGenderKr.ANY},
  {value: RoomGender.MALE, label: RoomGenderKr.MALE},
  {value: RoomGender.FEMALE, label: RoomGenderKr.FEMALE}
];

export const PRICING_TYPE_OP = [
  {value: PricingType.DOMITORY, label: PricingTypeKr.DOMITORY},
  {value: PricingType.ROOM, label: PricingTypeKr.ROOM}
];

export const PRICING_TYPE_OP_EXPEND = [
  {value: [PricingType.DOMITORY], label: PricingTypeKr.DOMITORY},
  {value: [PricingType.ROOM], label: PricingTypeKr.ROOM},
  {value: [PricingType.ROOM, PricingType.DOMITORY], label: "도미토리 & 방타입"}
];

export enum GetSmsTarget {
  TODAY_STAY = "TODAY_STAY",
  TODAY_CHECKIN = "TODAY_CHECKIN",
  TOMORROW_CHECKIN = "TOMORROW_CHECKIN",
  EXSIST_INFO = "EXSIST_INFO"
}

export const GET_SMS_TARGET_OP = [
  {value: "EXSIST_INFO", label: "선택 인원"},
  {value: "TODAY_STAY", label: "오늘 숙박 인원"},
  {value: "TODAY_CHECKIN", label: "오늘 체크인 인원"},
  {value: "TOMORROW_CHECKIN", label: "내일 체크인할 인원"}
];

export const GENDER_OP = [
  {value: Gender.FEMALE, label: GenderKr.FEMALE},
  {value: Gender.MALE, label: GenderKr.MALE}
];

export const AUTO_SEND_OP = [
  {
    value: AutoSendWhen.WEHN_BOOKING_CANCEL,
    label: AutoSendWhenKr.WEHN_BOOKING_CANCEL
  },
  {
    value: AutoSendWhen.WHEN_BOOKING_CREATED,
    label: AutoSendWhenKr.WHEN_BOOKING_CREATED
  },
  {
    value: AutoSendWhen.WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING,
    label: AutoSendWhenKr.WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING
  },
  {
    value: AutoSendWhen.WHEN_BOOKING_UPDATE,
    label: AutoSendWhenKr.WHEN_BOOKING_UPDATE
  },
  {value: null, label: "선택안함"}
];

export const MAX_PEOPLE_COUNT_OP_FN = () => {
  const maxPeopleCountOption = [];
  for (let i = 0; i < 100; i += 1) {
    maxPeopleCountOption.push({value: i, label: `${i}명`});
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

export const StaticColors = [
  "#E8554E",
  "#F19C65",
  "#FFD265",
  "#2AA876",
  "#0A7B83"
];

export const FLOATING_PRElOADER_SIZE = "small";

export const TEST_PRODUCT_NAME = ProductTypeName.ONE;
