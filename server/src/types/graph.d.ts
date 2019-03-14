export const typeDefs = ["type Booking {\n  _id: ID!\n  house: House!\n  booker: User!\n  roomTypes: [RoomType!]!\n  dateRange: DateRange!\n  price: Float!\n  bookingStatus: BookingStatus!\n  guests: [Guest!]\n  memo: String!\n  createdAt: DateTime!\n  updatedAt: DateTime!\n}\n\nenum BookingStatus {\n  # 입금 대기\n  WAIT_DEPOSIT\n  # 예약 완료\n  COMPLETE\n  # 예약 취소(입금 전에 취소를 신청하여 바로 처리되었거나 환불이 완료되어 취소된 상태를 뜻함)\n  CANCEL\n  # 환불 대기\n  REFUND_WAIT\n  # 체크인 할떄 방값 지불\n  PAY_WHEN_CHK_IN\n}\n\nscalar DateTime\n\nscalar EmailAddress\n\nscalar Name\n\nscalar Password\n\nscalar PhoneNumber\n\nscalar URL\n\n# DB에 저장할 떄는 0101010의 형태로 저장하도록 Resolver에서 처리한다.\nenum Day {\n  SUN\n  MON\n  TUE\n  WED\n  THU\n  FRI\n  SAT\n}\n\ntype Tag {\n  name: String!\n  content: String!\n  icon: String!\n}\n\ninput TagInput {\n  name: String!\n  content: String!\n  icon: String\n}\n\nenum DateRangeStatus {\n  PAST\n  PRESENT\n  FUTURE\n}\n\ntype DateRange {\n  hashCode: Int!\n  startDate: DateTime\n  endDate: DateTime\n}\n\ninput DateRangeInput {\n  startDate: DateTime\n  endDate: DateTime\n}\n\ntype DisableRange {\n  hashCode: Int!\n  startDate: DateTime\n  endDate: DateTime\n  description: String\n}\n\ninput DisableRangeInput {\n  startDate: DateTime\n  endDate: DateTime\n  description: String\n}\n\ntype Location {\n  address: String!\n  addressDetail: String\n  lat: Float!\n  lng: Float!\n}\n\ninput LocationInput {\n  address: String!\n  addressDetail: String\n  lat: Float!\n  lng: Float!\n}\n\ntype Guest {\n  _id: ID!\n  house: House!\n  booking: Booking!\n  room: Room!\n  dateRange: DateRange!\n  guestType: GuestType!\n  price: Float!\n  isChkIn: Boolean!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum GuestType {\n  # 방 막는 용도로 잡은 예약임\n  BLOCK_ROOM\n  # 도미토리 형식의 방을 예약한 게스트\n  DOMITORY\n  # 방 타입 예약\n  ROOM\n}\n\ntype CreateHouseResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype Mutation {\n  CreateHouse(name: String!, houseType: HouseType!, location: LocationInput!): CreateHouseResponse!\n  DeleteHouse(_id: String!): DeleteHouseResponse!\n  UpdateHouse(houseId: ID!, name: String, houseType: HouseType, location: LocationInput, refundPolicy: [TermsOfRefundInput!], termsOfBooking: TermsOfBookingInput): UpdateHouseResponse!\n  BuyProduct(houseId: ID!, productId: ID!): BuyProductResponse!\n  CreateProduct(name: String!, price: Int, discountedPrice: Int, roomCount: Int, roomCountExtraCharge: Int, bookingCount: Int, bookingCountExtraCharge: Int, description: String): CreateProductResponse!\n  RefundProduct(houseId: ID!, productId: ID!): RefundProductResponse!\n  CreateProductType(name: String!, price: Int!, roomCount: Int!, roomCountExtraCharge: Int!, bookingCount: Int!, bookingCountExtraCharge: Int!, description: String): CreateProductTypeResponse!\n  DeleteProductType(productTypeId: ID!): DeleteProductTypeResponse!\n  UpdateProductType(productTypeId: ID!, name: String!, price: Int!, roomCount: Int!, roomCountExtraCharge: Int!, bookingCount: Int!, bookingCountExtraCharge: Int!, description: String): UpdateProductTypeResponse!\n  AddRoomDisableRange(roomId: ID!, disableRange: DisableRangeInput!): AddRoomDisableRangeResponse!\n  AddRoomTypeDisableRange(roomTypeId: ID!, houseId: ID!, disableRange: DisableRangeInput!): AddRoomTypeDisableRangeResponse!\n  CreateRoom(name: String!, roomType: ID!, disableRange: [DisableRangeInput!]): CreateRoomResponse!\n  # 로그인 token 필요함!\n  CreateRoomType(name: String!, house: ID!, pricingType: PricingType!, peopleCount: Int!, peopleCountMax: Int, isEnable: Boolean, description: String, tags: [TagInput!]): CreateRoomTypeResponse!\n  DeleteRoom(roomId: ID!): DeleteRoomResponse!\n  DeleteRoomType(roomTypeId: ID!, houseId: ID!): DeleteRoomTypeResponse!\n  RemoveRoomDisableRange(roomId: ID!, hashCode: Int!): RemoveRoomDisableRangeResponse!\n  RemoveRoomTypeDisableRange(roomTypeId: ID!, houseId: ID!, disableRange: DisableRangeInput!): RemoveRoomTypeDisableRangeResponse!\n  UpdateRoom(roomId: ID!, name: String): UpdateRoomResponse!\n  UpdateRoomDisableRange(roomId: ID!, hashCode: Int!, startDate: DateTime, endDate: DateTime, description: String): UpdateRoomDisableRangeResponse!\n  ChangeIndex(roomTypeId: ID!, houseId: ID!, index: Int!): ChangeIndexResponse!\n  UpdateRoomType(roomTypeId: ID!, houseId: ID!, name: String, peopleCount: Int, peopleCountMax: Int, description: String): UpdateRoomTypeResponse!\n  ChangePriority(seasonId: ID!, houseId: ID!, priority: Int!): ChangePriorityResponse!\n  CreateSeason(name: String!, houseId: ID!, dateRange: DateRangeInput!, color: String, description: String): CreateSeasonResponse!\n  UpdateSeason(seasonId: ID!, houseId: ID!, name: String, dateRange: DateRangeInput, color: String, description: String): UpdateSeasonResponse!\n  CompletePhoneVerification(key: String!): CompletePhoneVerificationResponse!\n  EmailSignUp(name: Name!, email: EmailAddress!, password: Password!, phoneNumber: PhoneNumber!): EmailSignUpResponse!\n  GmailConnect(firstName: String!, lastName: String!, gmail: String!): GmailConnectionResponse!\n  StartPhoneVerification: StartPhoneVerificationResponse!\n  UpdateMyProfile(name: String!, phoneNumber: String!, password: String!): UpdateMyProfileResponse!\n  ChangePassword(currentPassword: String!, newPassword: String!, newPasswordRepeat: String!): ChangePasswordResponse!\n}\n\ntype DeleteHouseResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype House {\n  _id: ID!\n  name: String!\n  houseType: HouseType!\n  product: Product\n  user: User!\n  location: Location!\n  refundPolicy: [TermsOfRefund!]!\n  termsOfBooking: TermsOfBooking!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum HouseType {\n  GUEST_HOUSE\n  HOSTEL\n  HOTEL\n  MOTEL\n  PENSION\n  YOUTH_HOSTEL\n}\n\n# 예약 가능한 조건.\ntype TermsOfBooking {\n  # 선택 가능한 가장 멀리있는 날짜(today 를 기준으로 ~일 뒤)\n  farthestSelectableDate: Int!\n  # 선택 가능한 가장 가까히 있는 날짜(today 를 기준으로 ~일 뒤)\n  nearestSelectableDate: Int!\n  # 선택 가능 날짜 범위\n  selectableDateRange: Int!\n}\n\ntype TermsOfRefund {\n  # 환불 가능 기간: 숙박일로부터 ~일 전\n  beforeDays: Int!\n  rate: Float!\n  description: String\n}\n\ninput TermsOfRefundInput {\n  beforeDays: Int!\n  rate: Float!\n  description: String\n}\n\ninput TermsOfBookingInput {\n  # 선택 가능한 가장 멀리있는 날짜(today 를 기준으로 ~일 뒤)\n  farthestSelectableDate: Int!\n  # 선택 가능한 가장 가까히 있는 날짜(today 를 기준으로 ~일 뒤)\n  nearestSelectableDate: Int!\n  # 선택 가능 날짜 범위\n  selectableDateRange: Int!\n}\n\ntype UpdateHouseResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype BuyProductResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype CreateProductResponse {\n  ok: Boolean!\n  error: String\n  product: Product\n}\n\ntype GetAllProductsResponse {\n  ok: Boolean!\n  error: String\n  products: [Product!]\n}\n\ntype Query {\n  GetAllProducts: GetAllProductsResponse!\n  GetAllRoomType(houseId: ID!): GetAllRoomTypeResponse!\n  EmailSignIn(email: EmailAddress!, password: Password!): EmailSignInResponse!\n  # 로그인 token 필요!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype RefundProductResponse {\n  ok: Boolean!\n  error: String\n  house: House\n}\n\ntype Product {\n  _id: ID!\n  # 제품 이름\n  name: String!\n  # 제품 가격(월)\n  price: Int!\n  # 할인된 가격\n  discountedPrice: Int\n  # 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한\n  roomCount: Int!\n  # 방 수 추가시 추가 가격  => default: 0\n  roomCountExtraCharge: Int!\n  # 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한\n  bookingCount: Int!\n  # 예약 초과시 부과되는 금액 => defualt: 0\n  bookingCountExtraCharge: Int!\n  # 상세 설명\n  description: String\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype CreateProductTypeResponse {\n  ok: Boolean!\n  error: String\n  productType: ProductType\n}\n\ntype DeleteProductTypeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ProductType {\n  _id: ID!\n  # 제품 이름\n  name: String!\n  # 제품 가격(월)\n  price: Int!\n  # 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한\n  roomCount: Int!\n  # 방 수 추가시 추가 가격  => default: 0\n  roomCountExtraCharge: Int!\n  # 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한\n  bookingCount: Int!\n  # 예약 초과시 부과되는 금액 => defualt: 0\n  bookingCountExtraCharge: Int!\n  # 상세 설명\n  description: String\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype UpdateProductTypeResponse {\n  ok: Boolean!\n  error: String\n  productType: ProductType\n}\n\ntype RoomPrice {\n  _id: ID!\n  house: House!\n  roomType: RoomType!\n  price: Float!\n  date: String!\n}\n\ntype SeasonPrice {\n  _id: ID!\n  house: House!\n  roomType: RoomType!\n  season: Season!\n  price: Float!\n  applyDays: [Day]!\n}\n\ninput SeasonPriceInput {\n  price: Float!\n  applyDays: Int!\n}\n\ntype AddRoomDisableRangeResponse {\n  ok: Boolean!\n  error: String\n  disableRange: DisableRange\n}\n\ntype AddRoomTypeDisableRangeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CreateRoomResponse {\n  ok: Boolean\n  error: String\n  room: Room\n}\n\ntype CreateRoomTypeResponse {\n  ok: Boolean!\n  error: String\n  roomType: RoomType\n}\n\ntype DeleteRoomResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeleteRoomTypeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllRoomTypeResponse {\n  ok: Boolean\n  error: String\n  roomTypes: [RoomType!]\n}\n\ntype RemoveRoomDisableRangeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RemoveRoomTypeDisableRangeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Room {\n  _id: ID!\n  name: String!\n  roomType: RoomType!\n  disableRanges: [DisableRange!]!\n  index: Int!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype RoomType {\n  _id: ID!\n  name: String!\n  house: House!\n  pricingType: PricingType!\n  peopleCount: Int!\n  peopleCountMax: Int!\n  index: Int!\n  roomCount: Int!\n  disableRanges: [DisableRange!]\n  description: String\n  # 예전에 Facilities 랑 같은 아이임...\n  tags: [Tag!]!\n  rooms: [Room!]!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum PricingType {\n  DOMITORY\n  ROOM\n}\n\ntype UpdateRoomResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateRoomDisableRangeResponse {\n  ok: Boolean!\n  error: String\n  disableRange: DisableRange\n}\n\ntype ChangeIndexResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateRoomTypeResponse {\n  ok: Boolean!\n  error: String\n  roomType: RoomType\n}\n\ntype ChangePriorityResponse {\n  ok: Boolean!\n  error: String\n  season: Season\n}\n\ntype CreateSeasonResponse {\n  ok: Boolean!\n  error: String\n  season: Season\n}\n\ntype Season {\n  _id: ID!\n  house: House!\n  name: String!\n  dateRange: DateRange!\n  priority: Int!\n  color: String\n  description: String\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\ntype UpdateSeasonResponse {\n  ok: Boolean\n  error: String\n  season: Season\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GmailConnectionResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  _id: ID!\n  name: Name!\n  phoneNumber: PhoneNumber!\n  password: Password\n  email: EmailAddress!\n  isPhoneVerified: Boolean!\n  isEmailVerified: Boolean!\n  userRole: UserRole!\n  checkPrivacyPolicy: Boolean!\n  houses: [House!]!\n  createdAt: DateTime!\n  updatedAt: DateTime\n}\n\nenum UserRole {\n  ADMIN\n  HOST\n  GUEST\n  # 비회원 => name, phoneNumber, password, email, createdAt, updatedAt 데이터 만을 가짐\n  GHOST\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype ChangePasswordResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  _id: ID!\n  target: VerificationTarget!\n  payload: String!\n  verified: Boolean!\n  key: String!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n\nenum VerificationTarget {\n  PHONE\n  EMAIL\n}\n"];
/* tslint:disable */

export interface Query {
  GetAllProducts: GetAllProductsResponse;
  GetAllRoomType: GetAllRoomTypeResponse;
  EmailSignIn: EmailSignInResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetAllRoomTypeQueryArgs {
  houseId: string;
}

export interface EmailSignInQueryArgs {
  email: EmailAddress;
  password: Password;
}

export interface GetAllProductsResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product>;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  discountedPrice: number | null;
  roomCount: number;
  roomCountExtraCharge: number;
  bookingCount: number;
  bookingCountExtraCharge: number;
  description: string | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type DateTime = any;

export interface GetAllRoomTypeResponse {
  ok: boolean | null;
  error: string | null;
  roomTypes: Array<RoomType>;
}

export interface RoomType {
  _id: string;
  name: string;
  house: House;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  disableRanges: Array<DisableRange>;
  description: string | null;
  tags: Array<Tag>;
  rooms: Array<Room>;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface House {
  _id: string;
  name: string;
  houseType: HouseType;
  product: Product | null;
  user: User;
  location: Location;
  refundPolicy: Array<TermsOfRefund>;
  termsOfBooking: TermsOfBooking;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type HouseType = "GUEST_HOUSE" | "HOSTEL" | "HOTEL" | "MOTEL" | "PENSION" | "YOUTH_HOSTEL";

export interface User {
  _id: string;
  name: Name;
  phoneNumber: PhoneNumber;
  password: Password | null;
  email: EmailAddress;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  userRole: UserRole;
  checkPrivacyPolicy: boolean;
  houses: Array<House>;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type Name = any;

export type PhoneNumber = any;

export type Password = any;

export type EmailAddress = any;

export type UserRole = "ADMIN" | "HOST" | "GUEST" | "GHOST";

export interface Location {
  address: string;
  addressDetail: string | null;
  lat: number;
  lng: number;
}

export interface TermsOfRefund {
  beforeDays: number;
  rate: number;
  description: string | null;
}

export interface TermsOfBooking {
  farthestSelectableDate: number;
  nearestSelectableDate: number;
  selectableDateRange: number;
}

export type PricingType = "DOMITORY" | "ROOM";

export interface DisableRange {
  hashCode: number;
  startDate: DateTime | null;
  endDate: DateTime | null;
  description: string | null;
}

export interface Tag {
  name: string;
  content: string;
  icon: string;
}

export interface Room {
  _id: string;
  name: string;
  roomType: RoomType;
  disableRanges: Array<DisableRange>;
  index: number;
  createdAt: DateTime;
  updatedAt: DateTime | null;
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
  DeleteHouse: DeleteHouseResponse;
  UpdateHouse: UpdateHouseResponse;
  BuyProduct: BuyProductResponse;
  CreateProduct: CreateProductResponse;
  RefundProduct: RefundProductResponse;
  CreateProductType: CreateProductTypeResponse;
  DeleteProductType: DeleteProductTypeResponse;
  UpdateProductType: UpdateProductTypeResponse;
  AddRoomDisableRange: AddRoomDisableRangeResponse;
  AddRoomTypeDisableRange: AddRoomTypeDisableRangeResponse;
  CreateRoom: CreateRoomResponse;
  CreateRoomType: CreateRoomTypeResponse;
  DeleteRoom: DeleteRoomResponse;
  DeleteRoomType: DeleteRoomTypeResponse;
  RemoveRoomDisableRange: RemoveRoomDisableRangeResponse;
  RemoveRoomTypeDisableRange: RemoveRoomTypeDisableRangeResponse;
  UpdateRoom: UpdateRoomResponse;
  UpdateRoomDisableRange: UpdateRoomDisableRangeResponse;
  ChangeIndex: ChangeIndexResponse;
  UpdateRoomType: UpdateRoomTypeResponse;
  ChangePriority: ChangePriorityResponse;
  CreateSeason: CreateSeasonResponse;
  UpdateSeason: UpdateSeasonResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignUp: EmailSignUpResponse;
  GmailConnect: GmailConnectionResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
  ChangePassword: ChangePasswordResponse;
}

export interface CreateHouseMutationArgs {
  name: string;
  houseType: HouseType;
  location: LocationInput;
}

export interface DeleteHouseMutationArgs {
  _id: string;
}

export interface UpdateHouseMutationArgs {
  houseId: string;
  name: string | null;
  houseType: HouseType | null;
  location: LocationInput | null;
  refundPolicy: Array<TermsOfRefundInput>;
  termsOfBooking: TermsOfBookingInput | null;
}

export interface BuyProductMutationArgs {
  houseId: string;
  productId: string;
}

export interface CreateProductMutationArgs {
  name: string;
  price: number | null;
  discountedPrice: number | null;
  roomCount: number | null;
  roomCountExtraCharge: number | null;
  bookingCount: number | null;
  bookingCountExtraCharge: number | null;
  description: string | null;
}

export interface RefundProductMutationArgs {
  houseId: string;
  productId: string;
}

export interface CreateProductTypeMutationArgs {
  name: string;
  price: number;
  roomCount: number;
  roomCountExtraCharge: number;
  bookingCount: number;
  bookingCountExtraCharge: number;
  description: string | null;
}

export interface DeleteProductTypeMutationArgs {
  productTypeId: string;
}

export interface UpdateProductTypeMutationArgs {
  productTypeId: string;
  name: string;
  price: number;
  roomCount: number;
  roomCountExtraCharge: number;
  bookingCount: number;
  bookingCountExtraCharge: number;
  description: string | null;
}

export interface AddRoomDisableRangeMutationArgs {
  roomId: string;
  disableRange: DisableRangeInput;
}

export interface AddRoomTypeDisableRangeMutationArgs {
  roomTypeId: string;
  houseId: string;
  disableRange: DisableRangeInput;
}

export interface CreateRoomMutationArgs {
  name: string;
  roomType: string;
  disableRange: Array<DisableRangeInput>;
}

export interface CreateRoomTypeMutationArgs {
  name: string;
  house: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number | null;
  isEnable: boolean | null;
  description: string | null;
  tags: Array<TagInput>;
}

export interface DeleteRoomMutationArgs {
  roomId: string;
}

export interface DeleteRoomTypeMutationArgs {
  roomTypeId: string;
  houseId: string;
}

export interface RemoveRoomDisableRangeMutationArgs {
  roomId: string;
  hashCode: number;
}

export interface RemoveRoomTypeDisableRangeMutationArgs {
  roomTypeId: string;
  houseId: string;
  disableRange: DisableRangeInput;
}

export interface UpdateRoomMutationArgs {
  roomId: string;
  name: string | null;
}

export interface UpdateRoomDisableRangeMutationArgs {
  roomId: string;
  hashCode: number;
  startDate: DateTime | null;
  endDate: DateTime | null;
  description: string | null;
}

export interface ChangeIndexMutationArgs {
  roomTypeId: string;
  houseId: string;
  index: number;
}

export interface UpdateRoomTypeMutationArgs {
  roomTypeId: string;
  houseId: string;
  name: string | null;
  peopleCount: number | null;
  peopleCountMax: number | null;
  description: string | null;
}

export interface ChangePriorityMutationArgs {
  seasonId: string;
  houseId: string;
  priority: number;
}

export interface CreateSeasonMutationArgs {
  name: string;
  houseId: string;
  dateRange: DateRangeInput;
  color: string | null;
  description: string | null;
}

export interface UpdateSeasonMutationArgs {
  seasonId: string;
  houseId: string;
  name: string | null;
  dateRange: DateRangeInput | null;
  color: string | null;
  description: string | null;
}

export interface CompletePhoneVerificationMutationArgs {
  key: string;
}

export interface EmailSignUpMutationArgs {
  name: Name;
  email: EmailAddress;
  password: Password;
  phoneNumber: PhoneNumber;
}

export interface GmailConnectMutationArgs {
  firstName: string;
  lastName: string;
  gmail: string;
}

export interface UpdateMyProfileMutationArgs {
  name: string;
  phoneNumber: string;
  password: string;
}

export interface ChangePasswordMutationArgs {
  currentPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export interface LocationInput {
  address: string;
  addressDetail: string | null;
  lat: number;
  lng: number;
}

export interface CreateHouseResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface DeleteHouseResponse {
  ok: boolean;
  error: string | null;
}

export interface TermsOfRefundInput {
  beforeDays: number;
  rate: number;
  description: string | null;
}

export interface TermsOfBookingInput {
  farthestSelectableDate: number;
  nearestSelectableDate: number;
  selectableDateRange: number;
}

export interface UpdateHouseResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface BuyProductResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface CreateProductResponse {
  ok: boolean;
  error: string | null;
  product: Product | null;
}

export interface RefundProductResponse {
  ok: boolean;
  error: string | null;
  house: House | null;
}

export interface CreateProductTypeResponse {
  ok: boolean;
  error: string | null;
  productType: ProductType | null;
}

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  roomCount: number;
  roomCountExtraCharge: number;
  bookingCount: number;
  bookingCountExtraCharge: number;
  description: string | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface DeleteProductTypeResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateProductTypeResponse {
  ok: boolean;
  error: string | null;
  productType: ProductType | null;
}

export interface DisableRangeInput {
  startDate: DateTime | null;
  endDate: DateTime | null;
  description: string | null;
}

export interface AddRoomDisableRangeResponse {
  ok: boolean;
  error: string | null;
  disableRange: DisableRange | null;
}

export interface AddRoomTypeDisableRangeResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateRoomResponse {
  ok: boolean | null;
  error: string | null;
  room: Room | null;
}

export interface TagInput {
  name: string;
  content: string;
  icon: string | null;
}

export interface CreateRoomTypeResponse {
  ok: boolean;
  error: string | null;
  roomType: RoomType | null;
}

export interface DeleteRoomResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteRoomTypeResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveRoomDisableRangeResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveRoomTypeDisableRangeResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateRoomResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateRoomDisableRangeResponse {
  ok: boolean;
  error: string | null;
  disableRange: DisableRange | null;
}

export interface ChangeIndexResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateRoomTypeResponse {
  ok: boolean;
  error: string | null;
  roomType: RoomType | null;
}

export interface ChangePriorityResponse {
  ok: boolean;
  error: string | null;
  season: Season | null;
}

export interface Season {
  _id: string;
  house: House;
  name: string;
  dateRange: DateRange;
  priority: number;
  color: string | null;
  description: string | null;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface DateRange {
  hashCode: number;
  startDate: DateTime | null;
  endDate: DateTime | null;
}

export interface DateRangeInput {
  startDate: DateTime | null;
  endDate: DateTime | null;
}

export interface CreateSeasonResponse {
  ok: boolean;
  error: string | null;
  season: Season | null;
}

export interface UpdateSeasonResponse {
  ok: boolean | null;
  error: string | null;
  season: Season | null;
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

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface ChangePasswordResponse {
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
  guests: Array<Guest>;
  memo: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export type BookingStatus = "WAIT_DEPOSIT" | "COMPLETE" | "CANCEL" | "REFUND_WAIT" | "PAY_WHEN_CHK_IN";

export interface Guest {
  _id: string;
  house: House;
  booking: Booking;
  room: Room;
  dateRange: DateRange;
  guestType: GuestType;
  price: number;
  isChkIn: boolean;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export type GuestType = "BLOCK_ROOM" | "DOMITORY" | "ROOM";

export type URL = any;

export type Day = "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";

export type DateRangeStatus = "PAST" | "PRESENT" | "FUTURE";

export interface RoomPrice {
  _id: string;
  house: House;
  roomType: RoomType;
  price: number;
  date: string;
}

export interface SeasonPrice {
  _id: string;
  house: House;
  roomType: RoomType;
  season: Season;
  price: number;
  applyDays: Array<Day>;
}

export interface SeasonPriceInput {
  price: number;
  applyDays: number;
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
