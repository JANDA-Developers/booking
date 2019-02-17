export const typeDefs = ["type Booking {\n  _id: ID!\n  house: House!\n  booker: User!\n  roomTypes: [RoomType!]!\n  dateRange: DateRange!\n  price: Float!\n  bookingStatus: BookingStatus!\n  guests: [String!]\n  memo: String!\n}\n\nenum BookingStatus {\n  WAIT_DEPOSIT\n  COMPLETE\n  CANCEL\n  REFUND_WAIT\n  PAY_WHEN_CHK_IN\n}\n\nscalar Date\n\nscalar DateTime\n\nscalar EmailAddress\n\nscalar Name\n\nscalar PhoneNumber\n\nscalar URL\n\n# DB에 저장할 떄는 0101010의 형태로 저장하도록 Resolver에서 처리한다.\nenum Day {\n  SUN\n  MON\n  TUE\n  WED\n  THU\n  FRI\n  SAT\n}\n\ntype Location {\n  address: String!\n  lat: Float!\n  lng: Float!\n}\n\ninput LocationInput {\n  address: String!\n  lat: Float!\n  lng: Float!\n}\n\ntype DateRange {\n  startDate: String!\n  endDate: String!\n  isPast: Boolean!\n}\n\ninput DateRangeInput {\n  startDate: String!\n  endDate: String!\n}\n\ntype Tag {\n  name: String!\n  content: String!\n  icon: String!\n}\n\ninput TagInput {\n  name: String!\n  content: String!\n  icon: String\n}\n\ntype Guest {\n  _id: ID!\n  house: House!\n  booker: User!\n  roomType: String!\n  guestType: String!\n  allocatedRoom: Room!\n  stay: String!\n  price: Int!\n  isChkIn: Boolean!\n  bookingId: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateHouseResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype Mutation {\n  CreateHouse(name: String!, houseType: HouseType!, location: LocationInput!): CreateHouseResponse!\n  CreateRoomType(name: String!, house: String!, pricingType: PricingType!, people_count_std: Int!, people_count_max: Int!, sort: Int!, roomCount: Int!, isEnable: Boolean!, description: String!, tags: [TagInput!]): CreateRoomTypeResponse!\n  CompletePhoneVerification(key: String!): CompletePhoneVerificationResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, phoneNumber: String!): EmailSignUpResponse!\n  GmailConnect(firstName: String!, lastName: String!, gmail: String!): GmailConnectionResponse!\n  StartPhoneVerification: StartPhoneVerificationResponse!\n}\n\ntype House {\n  _id: ID!\n  name: String!\n  houseType: HouseType!\n  user: User!\n  location: Location!\n  # roomCount: Int!\n  bedCount: Int!\n  capacity: Int!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum HouseType {\n  GUEST_HOUSE\n  HOSTEL\n  HOTEL\n  MOTEL\n  PENSION\n  YOUTH_HOSTEL\n}\n\n# 예약 가능한 조건. \ntype BookingCondition {\n  limitSelectStartDate: Int!\n  minSelectStartDate: Int!\n  availableDateRange: Int!\n}\n\ntype RefundPolicy {\n  id: ID!\n  name: String!\n  dateRange: DateRange!\n  rate: Float!\n  description: String!\n}\n\ntype SeasonPrice {\n  _id: ID!\n  house: House!\n  roomType: RoomType!\n  season: Season!\n  price: Float!\n  applyDays: [Day]!\n}\n\ntype Season {\n  _id: ID!\n  house: House!\n  name: String!\n  dateRange: DateRange!\n  color: String!\n  description: String!\n}\n\ninput SeasonPriceInput {\n  price: Float!\n  applyDays: Int!\n}\n\ntype RoomPrice {\n  _id: ID!\n  house: House!\n  roomType: RoomType!\n  price: Float!\n  date: String!\n}\n\ntype CreateRoomTypeResponse {\n  ok: Boolean!\n  error: String!\n}\n\ntype RoomType {\n  _id: ID!\n  name: String!\n  house: House!\n  pricingType: PricingType!\n  people_count_std: Int!\n  people_count_max: Int!\n  sort: Int!\n  roomCount: Int!\n  isEnable: Boolean!\n  description: String!\n  # 예전에 Facilities 랑 같은 아이임...\n  tags: [Tag!]!\n  rooms: [Room!]!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Room {\n  _id: ID!\n  name: String!\n  roomType: RoomType!\n  isEnable: Boolean!\n}\n\nenum PricingType {\n  DOMITORY\n  ROOM\n}\n\ntype Query {\n  getRoomTypes(types: String!): RoomType\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GmailConnectionResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  _id: ID!\n  firstName: String!\n  lastName: String!\n  phoneNumber: String!\n  password: String\n  email: String!\n  verifiedPhone: Boolean!\n  verifiedEmail: Boolean!\n  userRole: UserRole!\n  checkPrivacyPolicy: Boolean!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum UserRole {\n  ADMIN\n  HOST\n  BOOKER\n  GHOST\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  _id: ID!\n  target: VerificationTarget!\n  payload: String!\n  verified: Boolean!\n  key: String!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\nenum VerificationTarget {\n  PHONE\n  EMAIL\n}\n"];
/* tslint:disable */

export interface Query {
  getRoomTypes: RoomType | null;
  EmailSignIn: EmailSignInResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetRoomTypesQueryArgs {
  types: string;
}

export interface EmailSignInQueryArgs {
  email: string;
  password: string;
}

export interface RoomType {
  _id: string;
  name: string;
  house: House;
  pricingType: PricingType;
  people_count_std: number;
  people_count_max: number;
  sort: number;
  roomCount: number;
  isEnable: boolean;
  description: string;
  tags: Array<Tag>;
  rooms: Array<Room>;
  createdAt: string;
  updatedAt: string | null;
}

export interface House {
  _id: string;
  name: string;
  houseType: HouseType;
  user: User;
  location: Location;
  bedCount: number;
  capacity: number;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type HouseType = "GUEST_HOUSE" | "HOSTEL" | "HOTEL" | "MOTEL" | "PENSION" | "YOUTH_HOSTEL";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string | null;
  email: string;
  verifiedPhone: boolean;
  verifiedEmail: boolean;
  userRole: UserRole;
  checkPrivacyPolicy: boolean;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type UserRole = "ADMIN" | "HOST" | "BOOKER" | "GHOST";

export type DateTime = any;

export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export type PricingType = "DOMITORY" | "ROOM";

export interface Tag {
  name: string;
  content: string;
  icon: string;
}

export interface Room {
  _id: string;
  name: string;
  roomType: RoomType;
  isEnable: boolean;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CreateHouse: CreateHouseResponse;
  CreateRoomType: CreateRoomTypeResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignUp: EmailSignUpResponse;
  GmailConnect: GmailConnectionResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
}

export interface CreateHouseMutationArgs {
  name: string;
  houseType: HouseType;
  location: LocationInput;
}

export interface CreateRoomTypeMutationArgs {
  name: string;
  house: string;
  pricingType: PricingType;
  people_count_std: number;
  people_count_max: number;
  sort: number;
  roomCount: number;
  isEnable: boolean;
  description: string;
  tags: Array<TagInput>;
}

export interface CompletePhoneVerificationMutationArgs {
  key: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface GmailConnectMutationArgs {
  firstName: string;
  lastName: string;
  gmail: string;
}

export interface LocationInput {
  address: string;
  lat: number;
  lng: number;
}

export interface CreateHouseResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface TagInput {
  name: string;
  content: string;
  icon: string | null;
}

export interface CreateRoomTypeResponse {
  ok: boolean;
  error: string;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GmailConnectionResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface Booking {
  _id: string;
  house: House;
  booker: User;
  roomTypes: Array<RoomType>;
  dateRange: DateRange;
  price: number;
  bookingStatus: BookingStatus;
  guests: Array<string>;
  memo: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
  isPast: boolean;
}

export type BookingStatus = "WAIT_DEPOSIT" | "COMPLETE" | "CANCEL" | "REFUND_WAIT" | "PAY_WHEN_CHK_IN";

export type Date = any;

export type EmailAddress = any;

export type Name = any;

export type PhoneNumber = any;

export type URL = any;

export type Day = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export interface DateRangeInput {
  startDate: string;
  endDate: string;
}

export interface Guest {
  _id: string;
  house: House;
  booker: User;
  roomType: string;
  guestType: string;
  allocatedRoom: Room;
  stay: string;
  price: number;
  isChkIn: boolean;
  bookingId: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface BookingCondition {
  limitSelectStartDate: number;
  minSelectStartDate: number;
  availableDateRange: number;
}

export interface RefundPolicy {
  id: string;
  name: string;
  dateRange: DateRange;
  rate: number;
  description: string;
}

export interface SeasonPrice {
  _id: string;
  house: House;
  roomType: RoomType;
  season: Season;
  price: number;
  applyDays: Array<Day>;
}

export interface Season {
  _id: string;
  house: House;
  name: string;
  dateRange: DateRange;
  color: string;
  description: string;
}

export interface SeasonPriceInput {
  price: number;
  applyDays: number;
}

export interface RoomPrice {
  _id: string;
  house: House;
  roomType: RoomType;
  price: number;
  date: string;
}

export interface Verification {
  _id: string;
  target: VerificationTarget;
  payload: string;
  verified: boolean;
  key: string;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export type VerificationTarget = "PHONE" | "EMAIL";
