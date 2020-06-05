export enum PricingType {
  DOMITORY = "DOMITORY",
  ROOM = "ROOM"
}

export enum UserReqeustType {
  HOMEPAGE = "HOMEPAGE"
}

export type HouseInfoTagsKeys = "COMPLETE_MESSAGE" | "CHECK_MESSAGE" | "PAY_PRECAUTION"

export enum UserRequestStatusValue {
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  PROCEEDING = "PROCEEDING",
  REFUSED = "REFUSED"
}

export enum UserRole {
  ADMIN = "ADMIN",
  GHOST = "GHOST",
  GUEST = "GUEST",
  DEVELOPER = "DEVELOPER",
  HOST = "HOST"
}

export enum HomepageOptionKey {
  CS_PAGE = "CS_PAGE",
  CUSTOM_DESIGN = "CUSTOM_DESIGN",
  CUSTOM_DEV = "CUSTOM_DEV",
  INSTA_PAGE = "INSTA_PAGE",
  NOTI_PAGE = "NOTI_PAGE",
  PHOTO_PAGE = "PHOTO_PAGE",
  PRICE_PAGE = "PRICE_PAGE",
  RESV_API = "RESV_API",
  RESV_PAGE = "RESV_PAGE",
  ROOM_INFO_PAGE = "ROOM_INFO_PAGE"
}

export enum CreaditCardTypes {
  //  AMX
  AMX = "AMX",
  // bc
  BC_CARD = "BC_CARD",
  // ch
  CHUKHYUP = "CHUKHYUP",
  // # ct
  CITY = "CITY",
  // # diners
  DINERS = "DINERS",
  // # dn
  DONGNAM = "DONGNAM",
  // # gj
  GWANGJU = "GWANGJU",
  // # hd
  HYUNDAI = "HYUNDAI",
  // # hm
  HANMI = "HANMI",
  // # hn
  KEB_HANA = "KEB_HANA",
  // # jb
  JEONBOOK = "JEONBOOK",
  // # jcb
  JCB = "JCB",
  // # jh
  CHOHUNG = "CHOHUNG",
  // # jj
  JEJU_BANK = "JEJU_BANK",
  // # kakao
  KAKAO_BANK = "KAKAO_BANK",
  // # kbank
  K_BANK = "K_BANK",
  // # kdb
  KDB = "KDB",
  // # km
  KB_CARD = "KB_CARD",
  // # koreapost
  KOREA_POST = "KOREA_POST",
  // # lt
  LOTTE_CARD = "LOTTE_CARD",
  // # master
  MASTER_CARD = "MASTER_CARD",
  // # nh
  NONGHYUP = "NONGHYUP",
  // # okcashbag
  OK_CASH_BAG = "OK_CASH_BAG",
  // # sh
  SUHYUP = "SUHYUP",
  // # shm
  SHINSEGAE = "SHINSEGAE",
  // # sm
  MG_CARD = "MG_CARD",
  // # jc
  JEOCHUK = "JEOCHUK",
  // # ss
  SAMSUNG = "SAMSUNG",
  // # wr
  WOORI = "WOORI",
  // # visa
  VISA = "VISA",
  // # yr
  UNIONPAY = "UNIONPAY"
}

export enum DateFormat {
  WITH_TIME = "YY.MM.DD HH:mm",
  YYMMDD = "YY.MM.DD",
  MMDD = "MM.DD"
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

export enum HouseStatus {
  ENABLE = "ENABLE",
  DISALBE = "DISALBE",
  WAIT = "WAIT"
}
export type TMarginSize =
  | "no"
  | "largest"
  | "huge"
  | "large"
  | "normal"
  | "small"
  | "tiny"
  | "superTiny";
export type TextAlign = "left" | "right" | "center";
export type TextSize =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "normal"
  | "small"
  | "tiny"
  | "superTiny";

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

export enum LayoutDesign {
  BASIC = "BASIC",
  RED = "RED"
}

export enum PaymentStatus {
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  NOT_YET = "NOT_YET"
}

export enum BookingStatus {
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED"
}

export enum PayMethod {
  BILL = "BILL",
  VBANK = "VBANK",
  CASH = "CASH",
  CARD = "CARD",
  CHANNEL_PAY = "CHANNEL_PAY",
  BANK_TRANSFER = "BANK_TRANSFER"
}

// css variable 의 breackPoints 와 일치하도록 하세요.
export enum WindowSize {
  MOBILE = 400,
  PHABLET = 550,
  TABLET = 750,
  DESKTOP = 1000,
  DESKTOPHD = 1200
}
export enum WindowSizeShort {
  MOBILE = "sm",
  PHABLET = "md",
  TABLET = "wmd",
  DESKTOP = "lg",
  DESKTOPHD = "wlg"
}
export enum WindowSizeHeight {
  MOBILE = 560,
  PHABLET = 560,
  TABLET = 560,
  DESKTOP = 668,
  DESKTOPHD = 980
}

// 👿 deprecate
export enum GlobalCSS {
  TIMELINE_HEADER_HEIGHT = 36
}

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE"
}

export enum ExcelExpress {
  SELECT_OP = "SELECT_OP",
  DATE_OP = "DATE_OP",
  COUNT_OP = "COUNT_OP"
}

export enum NotiType {
  ELSE = "ELSE",
  NEW_BOOKING = "NEW_BOOKING",
  PRODUCT_EXPIRE = "PRODUCT_EXPIRE",
  TO_ALL = "TO_ALL"
}

export type IconSize =
  | "tiny"
  | "small"
  | "normal"
  | "large"
  | "huge"
  | "largest"
  | "largest2";

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
  | "blue"
  | "positive";

export enum AutoSendWhen {
  WEHN_BOOKING_CANCEL = "WEHN_BOOKING_CANCEL",
  WHEN_BOOKING_CREATED = "WHEN_BOOKING_CREATED",
  WHEN_BOOKING_CREATED_PAYMENT_NOT_YET = "WHEN_BOOKING_CREATED_PAYMENT_NOT_YET",
  WHEN_BOOKING_UPDATE = "WHEN_BOOKING_UPDATE"
}

export enum Funnels {
  AGODA = "AGODA",
  AIRBNB = "AIRBNB",
  BOOKING_COM = "BOOKING_COM",
  COOPANG = "COOPANG",
  ELSE_CHANNEL = "ELSE_CHANNEL",
  FREINDS = "FREINDS",
  HOMEPAGE = "HOMEPAGE",
  NAVER = "NAVER",
  PHONE_CALL = "PHONE_CALL",
  WALK_IN = "WALK_IN",
  YANOLJA = "YANOLJA",
  YEOGIEOTTAE = "YEOGIEOTTAE"
}

export enum SendTarget {
  BOTH = "BOTH",
  GUEST = "GUEST",
  HOST = "HOST"
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

export enum SERVICE_CONTECT {
  SERVICE_MANGER_PHONE = "070-4128-8244",
  SERVICE_MANGER_MAIL = "support@stayjanda.com"
}

export enum NotiLevel {
  NORMAL = "NORMAL",
  WARN = "WARN"
}

export enum PayTarget {
  USAGE_PLAN = "USAGE_PLAN",
  BOOKING = "BOOKING",
  SMS = "SMS"
}

export enum GetSmsTarget {
  TODAY_STAY = "TODAY_STAY",
  TODAY_CHECKIN = "TODAY_CHECKIN",
  TOMORROW_CHECKIN = "TOMORROW_CHECKIN",
  EXSIST_INFO = "EXSIST_INFO"
}

//= =============================================================
// START 프론트 키정의
//= =============================================================

export enum RoomTypeKey {
  RoomTypeCategory = "RoomTypeCategory"
}

export enum HouseOptionsKey {
  ResvCautionMsg = "ResvCautionMsg",
  ResvCompeleteMsg = "ResvCompeleteMsg",
  PayPrecaution = "PayPrecaution",
  CheckMsg = "CheckMsg",
}

export enum HouseTags {
  LangSet = "LangSet"
}