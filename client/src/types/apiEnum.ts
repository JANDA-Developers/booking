//= =============================================================
// START Enums and Input Objects
//= =============================================================

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

export enum PricingTypeKr {
  DOMITORY = '도미토리',
  ROOM = '방 타입',
}

export enum RoomGender {
  FEMALE = 'FEMALE',
  MAKE = 'MAKE',
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
// END Enums and Input Objects
//= =============================================================
