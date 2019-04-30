//= =============================================================
// START Enums from BackEnd
//= =============================================================

export enum UserRole {
  ADMIN = 'ADMIN',
  GHOST = 'GHOST',
  GUEST = 'GUEST',
  HOST = 'HOST',
}

export enum HouseType {
  GUEST_HOUSE = 'GUEST_HOUSE',
  HOSTEL = 'HOSTEL',
  HOTEL = 'HOTEL',
  MOTEL = 'MOTEL',
  PENSION = 'PENSION',
  YOUTH_HOSTEL = 'YOUTH_HOSTEL',
}

export enum AutoSms {
  READY_TO_PAY = 'READY_TO_PAY',
  COMPELETE = 'COMPELETE',
  CANCEL = 'CANCEL',
  NO_SEND = 'NO_SEND',
}

export enum SmsTarget {
  HOST = 'HOST',
  GUEST = 'GUEST',
  BOTH = 'BOTH',
}

export enum PricingType {
  DOMITORY = 'DOMITORY',
  ROOM = 'ROOM',
}

export enum RoomGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  MIXED = 'MIXED',
  SEPARATELY = 'SEPARATELY',
}

export interface LocationInput {
  address: string;
  addressDetail?: string | null;
  lat: number;
  lng: number;
}

export interface TagInput {
  name: string;
  content: string;
  icon?: string | null;
}

export interface TermsOfBookingInput {
  farthestSelectableDate: number;
  nearestSelectableDate: number;
  selectableDateRange: number;
}

export interface TermsOfRefundInput {
  beforeDays: number;
  rate: number;
  description?: string | null;
}

//= =============================================================
// START Enums from Front End
//= =============================================================

export enum PricingTypeKr {
  DOMITORY = '도미토리',
  ROOM = '방 타입',
}

export enum RoomGenderKr {
  FEMALE = '여성',
  MALE = '남성',
  MIXED = '성별제한없음',
  SEPARATELY = '혼숙금지',
}

export enum TimePerMs {
  DAY = 24 * 60 * 60 * 1000,
}

export enum BookingStatus {
  WAIT_DEPOSIT = 'WAIT_DEPOSIT',
  COMPLETE = 'COMPLETE',
  CANCEL = 'CANCEL',
  REFUND_WAIT = 'REFUND_WAIT',
  PAY_WHEN_CHK_IN = 'PAY_WHEN_CHK_IN',
}

export enum PayMethod {
  ACCOUNT_SEND = 'ACCOUNT_SEND',
  CARD = 'CARD',
  CASH = 'CASH',
  KAKAOPAY = 'KAKAOPAY',
  CHANNEL = 'CHANNEL',
  ELSE = 'ELSE',
}
export enum Product {
  TEST = '상품1',
}

//= =============================================================
// START global options
//= =============================================================

export const SELECT_DUMMY_OP = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const AUTO_SEND_OP = [
  { value: AutoSms.NO_SEND, label: '발신안함' },
  { value: AutoSms.COMPELETE, label: '예약완료시' },
  { value: AutoSms.READY_TO_PAY, label: '예약대기시' },
  { value: AutoSms.CANCEL, label: '예약취소시' },
];

// 💛 대기 랑 입금대기를 나누는게 좋다
// 대기는 뭐가될지 모르는 상태인거임!!
export const BOOKING_STATUS_OP = [
  { value: BookingStatus.COMPLETE, label: '예약완료' },
  { value: BookingStatus.WAIT_DEPOSIT, label: '입금대기' },
  { value: BookingStatus.CANCEL, label: '예약취소' },
  { value: BookingStatus.REFUND_WAIT, label: '환불대기' },
  { value: BookingStatus.PAY_WHEN_CHK_IN, label: '대기' },
];

export const SMS_TARGET_OP = [
  { value: SmsTarget.BOTH, label: '관리자,게스트' },
  { value: SmsTarget.GUEST, label: '게스트' },
  { value: SmsTarget.HOST, label: '관리자' },
];

export const PAYMETHOD_OP = [
  { value: PayMethod.ACCOUNT_SEND, label: '무통장입금' },
  { value: PayMethod.CARD, label: '카드결제' },
  { value: PayMethod.CASH, label: '현금결제' },
  { value: PayMethod.KAKAOPAY, label: '카카오페이' },
  { value: PayMethod.CHANNEL, label: '채널결제' },
  { value: PayMethod.ELSE, label: '기타' },
];

// --필요한것
// 예약상태
// 결제상태

/** 중립 */
export const NEUTRAL = '';

export const EMPTY = '';
