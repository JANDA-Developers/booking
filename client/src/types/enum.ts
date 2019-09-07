import {assertValidSDL} from "graphql/validation/validate";

//= =============================================================
// START Enums from BackEnd
//= =============================================================

export enum UserRole {
  ADMIN = "ADMIN",
  GHOST = "GHOST",
  GUEST = "GUEST",
  HOST = "HOST"
}

export enum GuestType {
  BLOCK = "BLOCK",
  GUEST = "GUEST"
}

export enum MemoType {
  HOST = "HOST"
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

export enum PricingType {
  DOMITORY = "DOMITORY",
  ROOM = "ROOM"
}

export enum Language {
  KOREAN = "KOREAN",
  ENGLISH = "ENGLISH",
  JAPANESE = "JAPANESE",
  CHINESE = "CHINESE"
}

export enum LanguageShort {
  KOREAN = "kr",
  ENGLISH = "gb",
  JAPANESE = "jp",
  CHINESE = "cn"
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

export enum PayMethodKr {
  VBANK = "무통장입금",
  CARD = "카드결제",
  CASH = "현금결제",
  KAKAOPAY = "카카오페이",
  CHANNEL = "채널결제",
  ELSE = "기타"
}

export enum GenderKr {
  FEMALE = "여",
  MALE = "남"
}

export enum PricingTypeKr {
  DOMITORY = "도미토리",
  ROOM = "방형태"
}

export enum TimePerMs {
  DAY = 24 * 60 * 60 * 1000,
  H = 60 * 60 * 1000,
  M = 60 * 1000
}

export enum PaymentStatus {
  READY = "READY",
  COMPLETE = "COMPLETE"
}

export enum PaymentStatusKr {
  READY = "미결제",
  COMPLETE = "결제완료"
}

export enum BookingStatus {
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  FAIL = "FAIL",
  READY = "READY"
}

export enum BookingStatusKr {
  COMPLETE = "예약완료",
  CANCEL = "예약취소",
  FAIL = "예약실패",
  READY = "예약대기"
}

export enum PayMethod {
  VBANK = "VBANK",
  CASH = "CASH",
  CARD = "CARD",
  CHANNEL_PAY = "CHANNEL_PAY"
}

export enum Product {
  TEST = "상품1"
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
  TIMELINE_HEADER_HEIGHT = 38
}

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE"
}

export enum BookingModalType {
  CREATE = "create",
  CREATE_WITH_ASSIG = "createWithAssig",
  LOOKUP = "lookup"
}

// export enum
export enum SalesStatisticsUnitKr {
  BY_DAY_OF_WEEK = "요일별",
  BY_DATE = "날자별",
  MONTHLY = "월별",
  WEEKLY = "주별",
  YEARLY = "년별"
}

export enum NotificationType {
  ELSE = "ELSE",
  NEW_BOOKING = "NEW_BOOKING",
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
  WHEN_BOOKING_CREATED_PAYMENT_READY = "WHEN_BOOKING_CREATED_PAYMENT_READY",
  WHEN_BOOKING_UPDATE = "WHEN_BOOKING_UPDATE"
}

export enum AutoSendWhenKr {
  WEHN_BOOKING_CANCEL = "예약취소시",
  WHEN_BOOKING_CREATED = "예약생성시",
  WHEN_BOOKING_CREATED_PAYMENT_READY = "예약생성시(미결제)",
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
  PAYMENTSTATUS = "%PAYMENTSTATUS%"
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

export enum SmsReplaceKeyEnumKr {
  STAYDATE = "[숙박일자(월/일)]",
  STAYDATE_YMD = "[숙박일자(년/월/일)]",
  ROOMTYPE_N_COUNT = "[숙박정보(방/인원)]",
  BOOKERNAME = "[예약자명]",
  TOTALPRICE = "[가격]",
  PAYMETHOD = "[결제방법]",
  PAYMENTSTATUS = "[결제상태]"
}
export const SmsReplaceKeyEnumKeys = [
  "STAYDATE",
  "STAYDATE_YMD",
  "ROOMTYPE_N_COUNT",
  "BOOKERNAME",
  "TOTALPRICE",
  "PAYMETHOD",
  "PAYMENTSTATUS"
];
export const SmsReplaceKeyEnumValues = [
  "%STAYDATE%",
  "$STAYDATEYMD%",
  "%ROOMTYPENCOUNT%",
  "%BOOKERNAME%",
  "%TOTALPRICE%",
  "%PAYMETHOD%",
  "%PAYMENTSTATUS%"
];

export enum NotificationLevel {
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
  PAYMETHOD: SmsReplaceKeyEnumKr.PAYMETHOD
};

//= =============================================================
// START global options
//= =============================================================

export const SELECT_DUMMY_OP = [
  {value: "chocolate", label: "Chocolate"},
  {value: "strawberry", label: "Strawberry"},
  {value: "vanilla", label: "Vanilla"}
];

export const SELECT_PRODUCT_TYPE_OP = [
  {value: "상품1", label: "상품1"},
  {value: "상품2", label: "상품2"},
  {value: "상품3", label: "상품3"},
  {value: "상품4", label: "상품4"}
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
  {value: BookingStatus.CANCEL, label: BookingStatusKr[BookingStatus.CANCEL]}
];

export const LAYOUT_TYPE_OP = [
  {value: LayoutType.Layout_A, label: LayoutType.Layout_A},
  {value: LayoutType.Layout_B, label: LayoutType.Layout_B}
];

export const PAYMENT_STATUS_OP = [
  {value: PaymentStatus.COMPLETE, label: "결제완료"},
  {value: PaymentStatus.READY, label: "미결제"}
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
  {value: NotificationLevel.NORMAL, label: NotificationLevel.NORMAL},
  {value: NotificationLevel.WARN, label: NotificationLevel.WARN}
];

export const PRODUCT_STATUS_OP = [
  {value: HouseStatus.WAIT, label: HouseStatusKr.WAIT},
  {value: HouseStatus.ENABLE, label: HouseStatusKr.ENABLE},
  {value: HouseStatus.DISALBE, label: HouseStatusKr.DISALBE}
];

export const PAYMETHOD_FOR_BOOKER_OP = [
  {value: PayMethod.VBANK, label: "무통장입금"}
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
    value: AutoSendWhen.WHEN_BOOKING_CREATED_PAYMENT_READY,
    label: AutoSendWhenKr.WHEN_BOOKING_CREATED_PAYMENT_READY
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
