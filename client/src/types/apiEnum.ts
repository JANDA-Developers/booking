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
  HOUR = 24 * 60 * 60 * 1000;
}