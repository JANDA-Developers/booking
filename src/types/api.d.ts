/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSpecification
// ====================================================

export interface getSpecification_GetHouse_house_appInfo {
  __typename: "AppInfo";
  url: any;
}

export interface getSpecification_GetHouse_house_product_appInfoRequested {
  __typename: "AppInfoRequest";
  url: string;
  layoutType: LayoutType;
  requestedDate: any;
  isDone: boolean;
  useHostApp: boolean;
}

export interface getSpecification_GetHouse_house_product_productType {
  __typename: "ProductType";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
}

export interface getSpecification_GetHouse_house_product {
  __typename: "Product";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  /**
   * 제품 가격(월)
   */
  price: number | null;
  /**
   * 할인된 가격
   */
  discountedPrice: number | null;
  /**
   * 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한
   */
  roomCount: number | null;
  /**
   * 방 수 추가시 추가 가격  => default: 0
   */
  roomCountExtraCharge: number | null;
  /**
   * 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한
   */
  bookingCount: number | null;
  /**
   * 예약 초과시 부과되는 금액 => defualt: 0
   */
  bookingCountExtraCharge: number | null;
  layoutType: LayoutType | null;
  layoutPrice: number | null;
  layoutPricePaid: boolean | null;
  appliedUrl: string | null;
  expireDate: any;
  /**
   * 상품 만료까지 남은 일수
   */
  daysLeftToExpire: number;
  /**
   * 상품이 만료된 여부
   */
  isExpired: boolean;
  canHaveHostApp: boolean;
  existingHostApp: boolean;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  appInfoRequested: getSpecification_GetHouse_house_product_appInfoRequested[] | null;
  productType: getSpecification_GetHouse_house_product_productType;
}

export interface getSpecification_GetHouse_house_user {
  __typename: "User";
  _id: string;
  name: any;
  phoneNumber: any;
  /**
   * 주요 관리 수단임.. 잘 관리하도록 ㅎ
   */
  email: any;
  isPhoneVerified: boolean;
  userRole: UserRole;
  userRoles: UserRole[] | null;
}

export interface getSpecification_GetHouse_house_HM {
  __typename: "HM";
  publicKey: string;
}

export interface getSpecification_GetHouse_house {
  __typename: "House";
  _id: string;
  name: string;
  houseType: HouseType;
  status: HouseStatus | null;
  appInfo: getSpecification_GetHouse_house_appInfo | null;
  product: getSpecification_GetHouse_house_product | null;
  createdAt: any;
  updatedAt: any | null;
  user: getSpecification_GetHouse_house_user;
  HM: getSpecification_GetHouse_house_HM | null;
}

export interface getSpecification_GetHouse {
  __typename: "GetHouseResponse";
  ok: boolean;
  error: string | null;
  house: getSpecification_GetHouse_house | null;
}

export interface getSpecification {
  GetHouse: getSpecification_GetHouse;
}

export interface getSpecificationVariables {
  houseId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSmsHistory
// ====================================================

export interface getSmsHistory_GetSmsHistory_smsHistories {
  __typename: "SmsHistory";
  _id: string;
  msg: string;
  sender: string;
  receivers: string[] | null;
  sendResult: boolean;
  autoSend: boolean;
  msgType: MsgType;
  createdAt: any;
  updatedAt: any;
}

export interface getSmsHistory_GetSmsHistory_pageInfo {
  __typename: "PageInfoOffsetBase";
  currentPage: number;
  totalPage: number;
  rowCount: number;
}

export interface getSmsHistory_GetSmsHistory {
  __typename: "GetSmsHistoryResponse";
  ok: boolean;
  error: string | null;
  smsHistories: getSmsHistory_GetSmsHistory_smsHistories[] | null;
  pageInfo: getSmsHistory_GetSmsHistory_pageInfo;
}

export interface getSmsHistory {
  GetSmsHistory: getSmsHistory_GetSmsHistory;
}

export interface getSmsHistoryVariables {
  smsInfoId: string;
  page: number;
  count: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRoomTypeById
// ====================================================

export interface getRoomTypeById_GetRoomTypeById_roomType_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getRoomTypeById_GetRoomTypeById_roomType_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getRoomTypeById_GetRoomTypeById_roomType_img_tags[] | null;
}

export interface getRoomTypeById_GetRoomTypeById_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomGender: RoomGender;
  img: getRoomTypeById_GetRoomTypeById_roomType_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface getRoomTypeById_GetRoomTypeById {
  __typename: "GetRoomTypeByIdResponse";
  ok: boolean;
  error: string | null;
  roomType: getRoomTypeById_GetRoomTypeById_roomType | null;
}

export interface getRoomTypeById {
  GetRoomTypeById: getRoomTypeById_GetRoomTypeById;
}

export interface getRoomTypeByIdVariables {
  roomTypeId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSeasonPrices
// ====================================================

export interface updateSeasonPrices_UpdateSeasonPrices {
  __typename: "UpdateSeasonPricesResponse";
  ok: boolean;
  error: string | null;
}

export interface updateSeasonPrices {
  UpdateSeasonPrices: updateSeasonPrices_UpdateSeasonPrices;
}

export interface updateSeasonPricesVariables {
  seasonPricesInputs?: UpdateSeasonPriceInput[] | null;
  defaultRoomTypePriceInputs?: RoomTypePriceInput[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllProductTypes
// ====================================================

export interface getAllProductTypes_GetAllProductTypes_productTypes {
  __typename: "ProductType";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  /**
   * 제품 가격(월)
   */
  price: number;
  /**
   * 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한
   */
  roomCount: number;
  /**
   * ProductTypeKey
   */
  key: ProductTypeKey;
  /**
   * 방 수 추가시 추가 가격  => default: 0
   */
  roomCountExtraCharge: number;
  /**
   * 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한
   */
  bookingCount: number;
  /**
   * 예약 초과시 부과되는 금액 => defualt: 0
   */
  bookingCountExtraCharge: number;
  /**
   * 상세 설명
   */
  description: string | null;
  canHaveHostApp: boolean;
  createdAt: any;
  updatedAt: any | null;
}

export interface getAllProductTypes_GetAllProductTypes {
  __typename: "GetAllProductTypesResponse";
  ok: boolean;
  error: string | null;
  productTypes: getAllProductTypes_GetAllProductTypes_productTypes[] | null;
}

export interface getAllProductTypes {
  GetAllProductTypes: getAllProductTypes_GetAllProductTypes;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyProfile
// ====================================================

export interface getMyProfile_GetMyProfile_user_profileImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getMyProfile_GetMyProfile_user_profileImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getMyProfile_GetMyProfile_user_profileImg_tags[] | null;
}

export interface getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline_itemBlockOp {
  __typename: "ItemBlockOp";
  itemBlockOpEnable: boolean;
  useColor: boolean;
}

export interface getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline {
  __typename: "AssigTimeline";
  roomTypeTabEnable: boolean;
  itemBlockOp: getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline_itemBlockOp | null;
}

export interface getMyProfile_GetMyProfile_user_houses_houseConfig_pollingPeriod {
  __typename: "PollingPeriod";
  enable: boolean;
  period: number;
}

export interface getMyProfile_GetMyProfile_user_houses_houseConfig_bookingConfig_newBookingMark {
  __typename: "NewBookingMark";
  enable: boolean | null;
  newGuestTime: number;
}

export interface getMyProfile_GetMyProfile_user_houses_houseConfig_bookingConfig_collectingInfoFromGuest {
  __typename: "CollectingInfoFromGuest";
  email: boolean | null;
  country: boolean | null;
}

export interface getMyProfile_GetMyProfile_user_houses_houseConfig_bookingConfig {
  __typename: "BookingConfig";
  newBookingMark: getMyProfile_GetMyProfile_user_houses_houseConfig_bookingConfig_newBookingMark | null;
  collectingInfoFromGuest: getMyProfile_GetMyProfile_user_houses_houseConfig_bookingConfig_collectingInfoFromGuest | null;
}

export interface getMyProfile_GetMyProfile_user_houses_houseConfig_baseConfig {
  __typename: "BaseConfig";
  pricingTypes: PricingType[];
}

export interface getMyProfile_GetMyProfile_user_houses_houseConfig {
  __typename: "HouseConfig";
  assigTimeline: getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline;
  pollingPeriod: getMyProfile_GetMyProfile_user_houses_houseConfig_pollingPeriod;
  bookingConfig: getMyProfile_GetMyProfile_user_houses_houseConfig_bookingConfig;
  baseConfig: getMyProfile_GetMyProfile_user_houses_houseConfig_baseConfig;
}

export interface getMyProfile_GetMyProfile_user_houses_smsInfo {
  __typename: "SmsInfo";
  _id: string;
}

export interface getMyProfile_GetMyProfile_user_houses_roomTypes {
  __typename: "RoomType";
  _id: string;
  roomCount: number;
}

export interface getMyProfile_GetMyProfile_user_houses_appInfo {
  __typename: "AppInfo";
  url: any;
}

export interface getMyProfile_GetMyProfile_user_houses_product_productType {
  __typename: "ProductType";
  _id: string;
}

export interface getMyProfile_GetMyProfile_user_houses_product_appInfoRequested {
  __typename: "AppInfoRequest";
  url: string;
  layoutType: LayoutType;
  requestedDate: any;
  isDone: boolean;
  useHostApp: boolean;
}

export interface getMyProfile_GetMyProfile_user_houses_product {
  __typename: "Product";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  /**
   * 제품 가격(월)
   */
  price: number | null;
  /**
   * 할인된 가격
   */
  discountedPrice: number | null;
  /**
   * 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한
   */
  roomCount: number | null;
  /**
   * 방 수 추가시 추가 가격  => default: 0
   */
  roomCountExtraCharge: number | null;
  /**
   * 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한
   */
  bookingCount: number | null;
  /**
   * 예약 초과시 부과되는 금액 => defualt: 0
   */
  bookingCountExtraCharge: number | null;
  layoutType: LayoutType | null;
  layoutPrice: number | null;
  layoutPricePaid: boolean | null;
  appliedUrl: string | null;
  expireDate: any;
  /**
   * 상품 만료까지 남은 일수
   */
  daysLeftToExpire: number;
  /**
   * 상품이 만료된 여부
   */
  isExpired: boolean;
  canHaveHostApp: boolean;
  existingHostApp: boolean;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  productType: getMyProfile_GetMyProfile_user_houses_product_productType;
  appInfoRequested: getMyProfile_GetMyProfile_user_houses_product_appInfoRequested[] | null;
}

export interface getMyProfile_GetMyProfile_user_houses_location {
  __typename: "Location";
  address: string;
  addressDetail: string | null;
}

export interface getMyProfile_GetMyProfile_user_houses {
  __typename: "House";
  houseConfig: getMyProfile_GetMyProfile_user_houses_houseConfig;
  smsInfo: getMyProfile_GetMyProfile_user_houses_smsInfo;
  roomTypes: getMyProfile_GetMyProfile_user_houses_roomTypes[] | null;
  appInfo: getMyProfile_GetMyProfile_user_houses_appInfo | null;
  product: getMyProfile_GetMyProfile_user_houses_product | null;
  _id: string;
  name: string;
  houseType: HouseType;
  status: HouseStatus | null;
  publicKey: string | null;
  createdAt: any;
  updatedAt: any | null;
  completeDefaultSetting: boolean;
  location: getMyProfile_GetMyProfile_user_houses_location;
}

export interface getMyProfile_GetMyProfile_user {
  __typename: "User";
  _id: string;
  name: any;
  phoneNumber: any;
  password: any | null;
  /**
   * 주요 관리 수단임.. 잘 관리하도록 ㅎ
   */
  email: any;
  profileImg: getMyProfile_GetMyProfile_user_profileImg | null;
  isPhoneVerified: boolean;
  checkPrivacyPolicy: boolean;
  userRole: UserRole;
  userRoles: UserRole[] | null;
  createdAt: any;
  updatedAt: any | null;
  houses: getMyProfile_GetMyProfile_user_houses[];
}

export interface getMyProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  user: getMyProfile_GetMyProfile_user | null;
}

export interface getMyProfile {
  /**
   * 로그인 token 필요!
   */
  GetMyProfile: getMyProfile_GetMyProfile;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHousesForSU
// ====================================================

export interface getHousesForSU_GetHousesForSU_houses_user_profileImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHousesForSU_GetHousesForSU_houses_user_profileImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHousesForSU_GetHousesForSU_houses_user_profileImg_tags[] | null;
}

export interface getHousesForSU_GetHousesForSU_houses_user {
  __typename: "User";
  _id: string;
  phoneNumber: any;
  profileImg: getHousesForSU_GetHousesForSU_houses_user_profileImg | null;
}

export interface getHousesForSU_GetHousesForSU_houses_location {
  __typename: "Location";
  address: string;
  addressDetail: string | null;
}

export interface getHousesForSU_GetHousesForSU_houses_product_productType {
  __typename: "ProductType";
  _id: string;
}

export interface getHousesForSU_GetHousesForSU_houses_product {
  __typename: "Product";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  productType: getHousesForSU_GetHousesForSU_houses_product_productType;
}

export interface getHousesForSU_GetHousesForSU_houses {
  __typename: "House";
  _id: string;
  name: string;
  houseType: HouseType;
  user: getHousesForSU_GetHousesForSU_houses_user;
  location: getHousesForSU_GetHousesForSU_houses_location;
  createdAt: any;
  updatedAt: any | null;
  product: getHousesForSU_GetHousesForSU_houses_product | null;
}

export interface getHousesForSU_GetHousesForSU_pageInfo {
  __typename: "PageInfoOffsetBase";
  currentPage: number;
  totalPage: number;
  rowCount: number;
}

export interface getHousesForSU_GetHousesForSU {
  __typename: "GetHousesForSUResponse";
  ok: boolean;
  error: string | null;
  houses: getHousesForSU_GetHousesForSU_houses[] | null;
  pageInfo: getHousesForSU_GetHousesForSU_pageInfo | null;
}

export interface getHousesForSU {
  /**
   * 슈퍼계정으로 모든 집들을 가져옴.
   */
  GetHousesForSU: getHousesForSU_GetHousesForSU;
}

export interface getHousesForSUVariables {
  page: number;
  count: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: emailSignIn
// ====================================================

export interface emailSignIn_EmailSignIn {
  __typename: "EmailSignInResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface emailSignIn {
  EmailSignIn: emailSignIn_EmailSignIn;
}

export interface emailSignInVariables {
  email: any;
  password: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHouse
// ====================================================

export interface getHouse_GetHouse_house_smsInfo {
  __typename: "SmsInfo";
  _id: string;
}

export interface getHouse_GetHouse_house_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHouse_GetHouse_house_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHouse_GetHouse_house_roomTypes_img_tags[] | null;
}

export interface getHouse_GetHouse_house_roomTypes_rooms {
  __typename: "Room";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomSrl: number | null;
}

export interface getHouse_GetHouse_house_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getHouse_GetHouse_house_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
  rooms: getHouse_GetHouse_house_roomTypes_rooms[];
}

export interface getHouse_GetHouse_house_appInfo {
  __typename: "AppInfo";
  url: any;
}

export interface getHouse_GetHouse_house_product_productType {
  __typename: "ProductType";
  _id: string;
}

export interface getHouse_GetHouse_house_product {
  __typename: "Product";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  productType: getHouse_GetHouse_house_product_productType;
}

export interface getHouse_GetHouse_house_location {
  __typename: "Location";
  address: string;
  addressDetail: string | null;
}

export interface getHouse_GetHouse_house_HM {
  __typename: "HM";
  publicKey: string;
}

export interface getHouse_GetHouse_house {
  __typename: "House";
  _id: string;
  name: string;
  houseType: HouseType;
  smsInfo: getHouse_GetHouse_house_smsInfo;
  roomTypes: getHouse_GetHouse_house_roomTypes[] | null;
  appInfo: getHouse_GetHouse_house_appInfo | null;
  product: getHouse_GetHouse_house_product | null;
  location: getHouse_GetHouse_house_location;
  HM: getHouse_GetHouse_house_HM | null;
  publicKey: string | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface getHouse_GetHouse {
  __typename: "GetHouseResponse";
  ok: boolean;
  error: string | null;
  house: getHouse_GetHouse_house | null;
}

export interface getHouse {
  GetHouse: getHouse_GetHouse;
}

export interface getHouseVariables {
  houseId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: dailyPriceGetPrice
// ====================================================

export interface dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img_tags[] | null;
}

export interface dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices {
  __typename: "DatePrice";
  date: any;
  price: number;
}

export interface dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices {
  __typename: "RoomTypeDatePrice";
  roomType: dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices_roomType;
  datePrices: dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[] | null;
}

export interface dailyPriceGetPrice_GetRoomTypeDatePrices {
  __typename: "GetRoomTypeDatePricesResponse";
  ok: boolean;
  error: string | null;
  roomTypeDatePrices: dailyPriceGetPrice_GetRoomTypeDatePrices_roomTypeDatePrices[] | null;
}

export interface dailyPriceGetPrice_GetAllRoomType_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
}

export interface dailyPriceGetPrice_GetAllRoomType {
  __typename: "GetAllRoomTypeResponse";
  ok: boolean | null;
  error: string | null;
  roomTypes: dailyPriceGetPrice_GetAllRoomType_roomTypes[] | null;
}

export interface dailyPriceGetPrice_GetAllDailyPrice_dailyPrices_roomType {
  __typename: "RoomType";
  _id: string;
}

export interface dailyPriceGetPrice_GetAllDailyPrice_dailyPrices {
  __typename: "DailyPrice";
  _id: string;
  price: number;
  date: any;
  roomType: dailyPriceGetPrice_GetAllDailyPrice_dailyPrices_roomType;
}

export interface dailyPriceGetPrice_GetAllDailyPrice {
  __typename: "GetAllDailyPriceResponse";
  ok: boolean;
  error: string | null;
  dailyPrices: dailyPriceGetPrice_GetAllDailyPrice_dailyPrices[] | null;
}

export interface dailyPriceGetPrice {
  GetRoomTypeDatePrices: dailyPriceGetPrice_GetRoomTypeDatePrices;
  /**
   * admin 에서 사용하는 함수임.
   */
  GetAllRoomType: dailyPriceGetPrice_GetAllRoomType;
  GetAllDailyPrice: dailyPriceGetPrice_GetAllDailyPrice;
}

export interface dailyPriceGetPriceVariables {
  houseId: string;
  checkIn: any;
  checkOut: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCapacityToRoomType
// ====================================================

export interface getCapacityToRoomType_GetCapacityToRoomType_capacityRoomType_CapacityRoomType {
  __typename: "CapacityRoomType";
  count: number;
}

export interface getCapacityToRoomType_GetCapacityToRoomType_capacityRoomType_CapacityRoomTypeDomitory_availableCount {
  __typename: "AvailableGenderCount";
  male: number;
  female: number;
  total: number;
}

export interface getCapacityToRoomType_GetCapacityToRoomType_capacityRoomType_CapacityRoomTypeDomitory {
  __typename: "CapacityRoomTypeDomitory";
  availableCount: getCapacityToRoomType_GetCapacityToRoomType_capacityRoomType_CapacityRoomTypeDomitory_availableCount;
}

export type getCapacityToRoomType_GetCapacityToRoomType_capacityRoomType = getCapacityToRoomType_GetCapacityToRoomType_capacityRoomType_CapacityRoomType | getCapacityToRoomType_GetCapacityToRoomType_capacityRoomType_CapacityRoomTypeDomitory;

export interface getCapacityToRoomType_GetCapacityToRoomType {
  __typename: "GetCapacityToRoomTypeResponse";
  ok: boolean;
  error: string | null;
  capacityRoomType: getCapacityToRoomType_GetCapacityToRoomType_capacityRoomType | null;
}

export interface getCapacityToRoomType {
  GetCapacityToRoomType: getCapacityToRoomType_GetCapacityToRoomType;
}

export interface getCapacityToRoomTypeVariables {
  roomTypeId: string;
  checkIn: any;
  checkOut: any;
  initValue?: InitValueGetCapacityToRoomInput | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCapacityToRoomTypeForBooker
// ====================================================

export interface getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker_capacityRoomType_CapacityRoomType {
  __typename: "CapacityRoomType";
  count: number;
}

export interface getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker_capacityRoomType_CapacityRoomTypeDomitory_availableCount {
  __typename: "AvailableGenderCount";
  male: number;
  female: number;
  total: number;
}

export interface getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker_capacityRoomType_CapacityRoomTypeDomitory {
  __typename: "CapacityRoomTypeDomitory";
  availableCount: getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker_capacityRoomType_CapacityRoomTypeDomitory_availableCount;
}

export type getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker_capacityRoomType = getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker_capacityRoomType_CapacityRoomType | getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker_capacityRoomType_CapacityRoomTypeDomitory;

export interface getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker {
  __typename: "GetCapacityToRoomTypeResponse";
  ok: boolean;
  error: string | null;
  capacityRoomType: getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker_capacityRoomType | null;
}

export interface getCapacityToRoomTypeForBooker {
  GetCapacityToRoomTypeForBooker: getCapacityToRoomTypeForBooker_GetCapacityToRoomTypeForBooker;
}

export interface getCapacityToRoomTypeForBookerVariables {
  roomTypeId: string;
  checkIn: any;
  checkOut: any;
  initValue?: InitValueGetCapacityToRoomInput | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllRoomTypeForBooker
// ====================================================

export interface getAllRoomTypeForBooker_GetAllRoomTypeForBooker_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getAllRoomTypeForBooker_GetAllRoomTypeForBooker_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getAllRoomTypeForBooker_GetAllRoomTypeForBooker_roomTypes_img_tags[] | null;
}

export interface getAllRoomTypeForBooker_GetAllRoomTypeForBooker_roomTypes_rooms {
  __typename: "Room";
  _id: string;
  name: string;
  index: number;
  createdAt: any;
  updatedAt: any | null;
}

export interface getAllRoomTypeForBooker_GetAllRoomTypeForBooker_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  roomGender: RoomGender;
  roomCount: number;
  createdAt: any;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  updatedAt: any | null;
  img: getAllRoomTypeForBooker_GetAllRoomTypeForBooker_roomTypes_img | null;
  rooms: getAllRoomTypeForBooker_GetAllRoomTypeForBooker_roomTypes_rooms[];
}

export interface getAllRoomTypeForBooker_GetAllRoomTypeForBooker {
  __typename: "GetAllRoomTypeResponse";
  ok: boolean | null;
  error: string | null;
  roomTypes: getAllRoomTypeForBooker_GetAllRoomTypeForBooker_roomTypes[] | null;
}

export interface getAllRoomTypeForBooker {
  /**
   * HA-Key 에서 accessKey 받아옴.
   */
  GetAllRoomTypeForBooker: getAllRoomTypeForBooker_GetAllRoomTypeForBooker;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllRoomType
// ====================================================

export interface getAllRoomType_GetAllRoomType_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getAllRoomType_GetAllRoomType_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getAllRoomType_GetAllRoomType_roomTypes_img_tags[] | null;
}

export interface getAllRoomType_GetAllRoomType_roomTypes_rooms {
  __typename: "Room";
  _id: string;
  name: string;
  index: number;
  createdAt: any;
  updatedAt: any | null;
}

export interface getAllRoomType_GetAllRoomType_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  roomGender: RoomGender;
  roomCount: number;
  createdAt: any;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  updatedAt: any | null;
  img: getAllRoomType_GetAllRoomType_roomTypes_img | null;
  rooms: getAllRoomType_GetAllRoomType_roomTypes_rooms[];
}

export interface getAllRoomType_GetAllRoomType {
  __typename: "GetAllRoomTypeResponse";
  ok: boolean | null;
  error: string | null;
  roomTypes: getAllRoomType_GetAllRoomType_roomTypes[] | null;
}

export interface getAllRoomType {
  /**
   * admin 에서 사용하는 함수임.
   */
  GetAllRoomType: getAllRoomType_GetAllRoomType;
}

export interface getAllRoomTypeVariables {
  houseId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findBooking
// ====================================================

export interface findBooking_FindBooking_bookings_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface findBooking_FindBooking_bookings_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: findBooking_FindBooking_bookings_roomTypes_img_tags[] | null;
}

export interface findBooking_FindBooking_bookings_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: findBooking_FindBooking_bookings_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface findBooking_FindBooking_bookings_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface findBooking_FindBooking_bookings_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

export interface findBooking_FindBooking_bookings_guests_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
}

export interface findBooking_FindBooking_bookings_guests {
  __typename: "GuestDomitory" | "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: findBooking_FindBooking_bookings_guests_roomType;
}

export interface findBooking_FindBooking_bookings {
  __typename: "Booking";
  _id: string;
  roomTypes: findBooking_FindBooking_bookings_roomTypes[] | null;
  isNew: boolean;
  name: any;
  password: string | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: findBooking_FindBooking_bookings_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: findBooking_FindBooking_bookings_payment;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
  guests: findBooking_FindBooking_bookings_guests[] | null;
}

export interface findBooking_FindBooking {
  __typename: "FindBookingResponse";
  ok: boolean;
  error: string | null;
  bookings: findBooking_FindBooking_bookings[] | null;
}

export interface findBooking {
  FindBooking: findBooking_FindBooking;
}

export interface findBookingVariables {
  name: any;
  phoneNumber: any;
  password: string;
  houseId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findBookingForBooker
// ====================================================

export interface findBookingForBooker_FindBookingForBooker_bookings_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface findBookingForBooker_FindBookingForBooker_bookings_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: findBookingForBooker_FindBookingForBooker_bookings_roomTypes_img_tags[] | null;
}

export interface findBookingForBooker_FindBookingForBooker_bookings_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: findBookingForBooker_FindBookingForBooker_bookings_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface findBookingForBooker_FindBookingForBooker_bookings_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface findBookingForBooker_FindBookingForBooker_bookings_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

export interface findBookingForBooker_FindBookingForBooker_bookings_guests_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
}

export interface findBookingForBooker_FindBookingForBooker_bookings_guests {
  __typename: "GuestDomitory" | "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: findBookingForBooker_FindBookingForBooker_bookings_guests_roomType;
}

export interface findBookingForBooker_FindBookingForBooker_bookings {
  __typename: "Booking";
  _id: string;
  roomTypes: findBookingForBooker_FindBookingForBooker_bookings_roomTypes[] | null;
  isNew: boolean;
  name: any;
  password: string | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: findBookingForBooker_FindBookingForBooker_bookings_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: findBookingForBooker_FindBookingForBooker_bookings_payment;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
  guests: findBookingForBooker_FindBookingForBooker_bookings_guests[] | null;
}

export interface findBookingForBooker_FindBookingForBooker {
  __typename: "FindBookingResponse";
  ok: boolean;
  error: string | null;
  bookings: findBookingForBooker_FindBookingForBooker_bookings[] | null;
}

export interface findBookingForBooker {
  FindBookingForBooker: findBookingForBooker_FindBookingForBooker;
}

export interface findBookingForBookerVariables {
  name: any;
  phoneNumber: any;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRoomTypeDatePrices
// ====================================================

export interface getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img_tags[] | null;
}

export interface getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices {
  __typename: "DatePrice";
  date: any;
  price: number;
}

export interface getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices {
  __typename: "RoomTypeDatePrice";
  roomType: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_roomType;
  datePrices: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[] | null;
}

export interface getRoomTypeDatePrices_GetRoomTypeDatePrices {
  __typename: "GetRoomTypeDatePricesResponse";
  ok: boolean;
  error: string | null;
  roomTypeDatePrices: getRoomTypeDatePrices_GetRoomTypeDatePrices_roomTypeDatePrices[] | null;
}

export interface getRoomTypeDatePrices {
  GetRoomTypeDatePrices: getRoomTypeDatePrices_GetRoomTypeDatePrices;
}

export interface getRoomTypeDatePricesVariables {
  checkIn: any;
  checkOut: any;
  roomTypeIds?: string[] | null;
  houseId?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllRoomTypeWithGuest
// ====================================================

export interface getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_img_tags[] | null;
}

export interface getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms {
  __typename: "Room";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomSrl: number | null;
}

export interface getAllRoomTypeWithGuest_GetAllRoomType_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
  rooms: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms[];
}

export interface getAllRoomTypeWithGuest_GetAllRoomType {
  __typename: "GetAllRoomTypeResponse";
  ok: boolean | null;
  error: string | null;
  roomTypes: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes[] | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_room {
  __typename: "Room";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomSrl: number | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_roomType {
  __typename: "RoomType";
  _id: string;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_roomTypes_img_tags[] | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking {
  __typename: "Booking";
  _id: string;
  roomTypes: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_roomTypes[] | null;
  isNew: boolean;
  name: any;
  password: string | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking_payment;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_blockOption {
  __typename: "BlockOption";
  color: string | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory {
  __typename: "GuestDomitory";
  _id: string;
  gender: Gender | null;
  bedIndex: number;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * 현재 묵는 방으로 변경될수 있음.
   */
  room: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_room | null;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_roomType;
  booking: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_booking;
  /**
   * 도미토리, 룸, 블록 구분
   */
  blockOption: getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory_blockOption | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_roomType {
  __typename: "RoomType";
  _id: string;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_room {
  __typename: "Room";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomSrl: number | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_roomTypes_img_tags[] | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking {
  __typename: "Booking";
  _id: string;
  roomTypes: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_roomTypes[] | null;
  isNew: boolean;
  name: any;
  password: string | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking_payment;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_blockOption {
  __typename: "BlockOption";
  color: string | null;
}

export interface getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom {
  __typename: "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_roomType;
  /**
   * 현재 묵는 방으로 변경될수 있음.
   */
  room: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_room | null;
  booking: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_booking;
  /**
   * 도미토리, 룸, 블록 구분
   */
  blockOption: getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_blockOption | null;
}

export type getAllRoomTypeWithGuest_GetGuests_guests = getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory | getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom;

export interface getAllRoomTypeWithGuest_GetGuests {
  __typename: "GetGuestsResponse";
  ok: boolean;
  error: string | null;
  guests: getAllRoomTypeWithGuest_GetGuests_guests[] | null;
}

export interface getAllRoomTypeWithGuest_GetBlocks_blocks_room {
  __typename: "Room";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomSrl: number | null;
}

export interface getAllRoomTypeWithGuest_GetBlocks_blocks {
  __typename: "Block";
  _id: string;
  bedIndex: number;
  checkIn: any;
  checkOut: any;
  createdAt: any;
  updatedAt: any | null;
  room: getAllRoomTypeWithGuest_GetBlocks_blocks_room;
}

export interface getAllRoomTypeWithGuest_GetBlocks {
  __typename: "GetBlocksResponse";
  ok: boolean;
  error: string | null;
  blocks: getAllRoomTypeWithGuest_GetBlocks_blocks[] | null;
}

export interface getAllRoomTypeWithGuest {
  /**
   * admin 에서 사용하는 함수임.
   */
  GetAllRoomType: getAllRoomTypeWithGuest_GetAllRoomType;
  GetGuests: getAllRoomTypeWithGuest_GetGuests;
  GetBlocks: getAllRoomTypeWithGuest_GetBlocks;
}

export interface getAllRoomTypeWithGuestVariables {
  houseId: string;
  checkIn: any;
  checkOut: any;
  bookingStatuses?: (BookingStatus | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllRoomTypePrice
// ====================================================

export interface getAllRoomTypePrice_GetAllRoomType_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
}

export interface getAllRoomTypePrice_GetAllRoomType {
  __typename: "GetAllRoomTypeResponse";
  ok: boolean | null;
  error: string | null;
  roomTypes: getAllRoomTypePrice_GetAllRoomType_roomTypes[] | null;
}

export interface getAllRoomTypePrice_GetAllDailyPrice_dailyPrices_roomType {
  __typename: "RoomType";
  _id: string;
}

export interface getAllRoomTypePrice_GetAllDailyPrice_dailyPrices {
  __typename: "DailyPrice";
  _id: string;
  price: number;
  date: any;
  roomType: getAllRoomTypePrice_GetAllDailyPrice_dailyPrices_roomType;
}

export interface getAllRoomTypePrice_GetAllDailyPrice {
  __typename: "GetAllDailyPriceResponse";
  ok: boolean;
  error: string | null;
  dailyPrices: getAllRoomTypePrice_GetAllDailyPrice_dailyPrices[] | null;
}

export interface getAllRoomTypePrice {
  /**
   * admin 에서 사용하는 함수임.
   */
  GetAllRoomType: getAllRoomTypePrice_GetAllRoomType;
  GetAllDailyPrice: getAllRoomTypePrice_GetAllDailyPrice;
}

export interface getAllRoomTypePriceVariables {
  houseId: string;
  checkIn: any;
  checkOut: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserForSU
// ====================================================

export interface getUserForSU_GetUserForSU_user_profileImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getUserForSU_GetUserForSU_user_profileImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getUserForSU_GetUserForSU_user_profileImg_tags[] | null;
}

export interface getUserForSU_GetUserForSU_user_houses_houseConfig_assigTimeline_itemBlockOp {
  __typename: "ItemBlockOp";
  itemBlockOpEnable: boolean;
  useColor: boolean;
}

export interface getUserForSU_GetUserForSU_user_houses_houseConfig_assigTimeline {
  __typename: "AssigTimeline";
  roomTypeTabEnable: boolean;
  itemBlockOp: getUserForSU_GetUserForSU_user_houses_houseConfig_assigTimeline_itemBlockOp | null;
}

export interface getUserForSU_GetUserForSU_user_houses_houseConfig_pollingPeriod {
  __typename: "PollingPeriod";
  enable: boolean;
  period: number;
}

export interface getUserForSU_GetUserForSU_user_houses_houseConfig_bookingConfig_newBookingMark {
  __typename: "NewBookingMark";
  enable: boolean | null;
  newGuestTime: number;
}

export interface getUserForSU_GetUserForSU_user_houses_houseConfig_bookingConfig_collectingInfoFromGuest {
  __typename: "CollectingInfoFromGuest";
  email: boolean | null;
  country: boolean | null;
}

export interface getUserForSU_GetUserForSU_user_houses_houseConfig_bookingConfig {
  __typename: "BookingConfig";
  newBookingMark: getUserForSU_GetUserForSU_user_houses_houseConfig_bookingConfig_newBookingMark | null;
  collectingInfoFromGuest: getUserForSU_GetUserForSU_user_houses_houseConfig_bookingConfig_collectingInfoFromGuest | null;
}

export interface getUserForSU_GetUserForSU_user_houses_houseConfig_baseConfig {
  __typename: "BaseConfig";
  pricingTypes: PricingType[];
}

export interface getUserForSU_GetUserForSU_user_houses_houseConfig {
  __typename: "HouseConfig";
  assigTimeline: getUserForSU_GetUserForSU_user_houses_houseConfig_assigTimeline;
  pollingPeriod: getUserForSU_GetUserForSU_user_houses_houseConfig_pollingPeriod;
  bookingConfig: getUserForSU_GetUserForSU_user_houses_houseConfig_bookingConfig;
  baseConfig: getUserForSU_GetUserForSU_user_houses_houseConfig_baseConfig;
}

export interface getUserForSU_GetUserForSU_user_houses_smsInfo {
  __typename: "SmsInfo";
  _id: string;
}

export interface getUserForSU_GetUserForSU_user_houses_roomTypes {
  __typename: "RoomType";
  _id: string;
}

export interface getUserForSU_GetUserForSU_user_houses_appInfo {
  __typename: "AppInfo";
  url: any;
}

export interface getUserForSU_GetUserForSU_user_houses_product_productType {
  __typename: "ProductType";
  _id: string;
}

export interface getUserForSU_GetUserForSU_user_houses_product_appInfoRequested {
  __typename: "AppInfoRequest";
  url: string;
  layoutType: LayoutType;
  requestedDate: any;
  isDone: boolean;
  useHostApp: boolean;
}

export interface getUserForSU_GetUserForSU_user_houses_product {
  __typename: "Product";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  /**
   * 제품 가격(월)
   */
  price: number | null;
  /**
   * 할인된 가격
   */
  discountedPrice: number | null;
  /**
   * 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한
   */
  roomCount: number | null;
  /**
   * 방 수 추가시 추가 가격  => default: 0
   */
  roomCountExtraCharge: number | null;
  /**
   * 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한
   */
  bookingCount: number | null;
  /**
   * 예약 초과시 부과되는 금액 => defualt: 0
   */
  bookingCountExtraCharge: number | null;
  layoutType: LayoutType | null;
  layoutPrice: number | null;
  layoutPricePaid: boolean | null;
  appliedUrl: string | null;
  expireDate: any;
  /**
   * 상품 만료까지 남은 일수
   */
  daysLeftToExpire: number;
  /**
   * 상품이 만료된 여부
   */
  isExpired: boolean;
  canHaveHostApp: boolean;
  existingHostApp: boolean;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  productType: getUserForSU_GetUserForSU_user_houses_product_productType;
  appInfoRequested: getUserForSU_GetUserForSU_user_houses_product_appInfoRequested[] | null;
}

export interface getUserForSU_GetUserForSU_user_houses_location {
  __typename: "Location";
  address: string;
  addressDetail: string | null;
}

export interface getUserForSU_GetUserForSU_user_houses {
  __typename: "House";
  houseConfig: getUserForSU_GetUserForSU_user_houses_houseConfig;
  smsInfo: getUserForSU_GetUserForSU_user_houses_smsInfo;
  roomTypes: getUserForSU_GetUserForSU_user_houses_roomTypes[] | null;
  appInfo: getUserForSU_GetUserForSU_user_houses_appInfo | null;
  product: getUserForSU_GetUserForSU_user_houses_product | null;
  _id: string;
  name: string;
  houseType: HouseType;
  location: getUserForSU_GetUserForSU_user_houses_location;
  createdAt: any;
  updatedAt: any | null;
}

export interface getUserForSU_GetUserForSU_user {
  __typename: "User";
  _id: string;
  name: any;
  phoneNumber: any;
  password: any | null;
  /**
   * 주요 관리 수단임.. 잘 관리하도록 ㅎ
   */
  email: any;
  profileImg: getUserForSU_GetUserForSU_user_profileImg | null;
  isPhoneVerified: boolean;
  checkPrivacyPolicy: boolean;
  userRole: UserRole;
  userRoles: UserRole[] | null;
  createdAt: any;
  updatedAt: any | null;
  houses: getUserForSU_GetUserForSU_user_houses[];
}

export interface getUserForSU_GetUserForSU {
  __typename: "GetUserForSUResponse";
  ok: boolean;
  error: string | null;
  user: getUserForSU_GetUserForSU_user | null;
}

export interface getUserForSU {
  GetUserForSU: getUserForSU_GetUserForSU;
}

export interface getUserForSUVariables {
  userId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateBlockOption
// ====================================================

export interface updateBlockOption_UpdateBlockOption {
  __typename: "UpdateBlockOptionResponse";
  ok: boolean;
  error: string | null;
}

export interface updateBlockOption {
  UpdateBlockOption: updateBlockOption_UpdateBlockOption;
}

export interface updateBlockOptionVariables {
  guestId: string;
  blockOption: BlockOptionInput;
  applyWithBooking: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllReadMe
// ====================================================

export interface getAllReadMe_GetAllReadMe {
  __typename: "GetAllReadMeResponse";
  ok: boolean;
  error: string | null;
  paths: string[];
}

export interface getAllReadMe {
  GetAllReadMe: getAllReadMe_GetAllReadMe;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getFileTxt
// ====================================================

export interface getFileTxt_GetFileTxt {
  __typename: "GetFileTxtResponse";
  ok: boolean;
  error: string | null;
  fileTxt: string | null;
}

export interface getFileTxt {
  GetFileTxt: getFileTxt_GetFileTxt;
}

export interface getFileTxtVariables {
  path: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBookingForPublic
// ====================================================

export interface getBookingForPublic_GetBookingForPublic_booking_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getBookingForPublic_GetBookingForPublic_booking_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getBookingForPublic_GetBookingForPublic_booking_roomTypes_img_tags[] | null;
}

export interface getBookingForPublic_GetBookingForPublic_booking_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getBookingForPublic_GetBookingForPublic_booking_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface getBookingForPublic_GetBookingForPublic_booking_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface getBookingForPublic_GetBookingForPublic_booking_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

export interface getBookingForPublic_GetBookingForPublic_booking_guests_roomType {
  __typename: "RoomType";
  _id: string;
}

export interface getBookingForPublic_GetBookingForPublic_booking_guests {
  __typename: "GuestDomitory" | "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: getBookingForPublic_GetBookingForPublic_booking_guests_roomType;
}

export interface getBookingForPublic_GetBookingForPublic_booking {
  __typename: "Booking";
  _id: string;
  roomTypes: getBookingForPublic_GetBookingForPublic_booking_roomTypes[] | null;
  isNew: boolean;
  name: any;
  password: string | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: getBookingForPublic_GetBookingForPublic_booking_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: getBookingForPublic_GetBookingForPublic_booking_payment;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
  guests: getBookingForPublic_GetBookingForPublic_booking_guests[] | null;
}

export interface getBookingForPublic_GetBookingForPublic {
  __typename: "GetBookingResponse";
  ok: boolean;
  error: string | null;
  booking: getBookingForPublic_GetBookingForPublic_booking | null;
}

export interface getBookingForPublic {
  GetBookingForPublic: getBookingForPublic_GetBookingForPublic;
}

export interface getBookingForPublicVariables {
  transactionId?: string | null;
  getBookingParam?: GetBookingParams | null;
  skip: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPhoneNumbers
// ====================================================

export interface getPhoneNumbers_GetBookings_bookings {
  __typename: "Booking";
  phoneNumber: any;
}

export interface getPhoneNumbers_GetBookings {
  __typename: "GetBookingsResponse";
  ok: boolean;
  error: string | null;
  bookings: getPhoneNumbers_GetBookings_bookings[] | null;
}

export interface getPhoneNumbers {
  GetBookings: getPhoneNumbers_GetBookings;
}

export interface getPhoneNumbersVariables {
  houseId: string;
  page: number;
  count: number;
  filter?: GetBookingsFilter | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCheckIns
// ====================================================

export interface getCheckIns_GetBookings_bookings_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface getCheckIns_GetBookings_bookings {
  __typename: "Booking";
  checkInInfo: getCheckIns_GetBookings_bookings_checkInInfo;
}

export interface getCheckIns_GetBookings {
  __typename: "GetBookingsResponse";
  ok: boolean;
  error: string | null;
  bookings: getCheckIns_GetBookings_bookings[] | null;
}

export interface getCheckIns {
  GetBookings: getCheckIns_GetBookings;
}

export interface getCheckInsVariables {
  houseId: string;
  page: number;
  count: number;
  filter?: GetBookingsFilter | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBookings
// ====================================================

export interface getBookings_GetBookings_bookings_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getBookings_GetBookings_bookings_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getBookings_GetBookings_bookings_roomTypes_img_tags[] | null;
}

export interface getBookings_GetBookings_bookings_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getBookings_GetBookings_bookings_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface getBookings_GetBookings_bookings_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface getBookings_GetBookings_bookings_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

export interface getBookings_GetBookings_bookings_guests_GuestDomitory_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
}

export interface getBookings_GetBookings_bookings_guests_GuestDomitory {
  __typename: "GuestDomitory";
  _id: string;
  gender: Gender | null;
  bedIndex: number;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: getBookings_GetBookings_bookings_guests_GuestDomitory_roomType;
}

export interface getBookings_GetBookings_bookings_guests_GuestRoom_roomType {
  __typename: "RoomType";
  _id: string;
}

export interface getBookings_GetBookings_bookings_guests_GuestRoom {
  __typename: "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: getBookings_GetBookings_bookings_guests_GuestRoom_roomType;
}

export type getBookings_GetBookings_bookings_guests = getBookings_GetBookings_bookings_guests_GuestDomitory | getBookings_GetBookings_bookings_guests_GuestRoom;

export interface getBookings_GetBookings_bookings {
  __typename: "Booking";
  _id: string;
  roomTypes: getBookings_GetBookings_bookings_roomTypes[] | null;
  isNew: boolean;
  name: any;
  password: string | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: getBookings_GetBookings_bookings_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: getBookings_GetBookings_bookings_payment;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
  guests: getBookings_GetBookings_bookings_guests[] | null;
}

export interface getBookings_GetBookings_pageInfo {
  __typename: "PageInfoOffsetBase";
  currentPage: number;
  totalPage: number;
  rowCount: number;
}

export interface getBookings_GetBookings {
  __typename: "GetBookingsResponse";
  ok: boolean;
  error: string | null;
  bookings: getBookings_GetBookings_bookings[] | null;
  pageInfo: getBookings_GetBookings_pageInfo | null;
}

export interface getBookings {
  GetBookings: getBookings_GetBookings;
}

export interface getBookingsVariables {
  houseId: string;
  page: number;
  count: number;
  filter?: GetBookingsFilter | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBooking
// ====================================================

export interface getBooking_GetBooking_booking_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getBooking_GetBooking_booking_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getBooking_GetBooking_booking_roomTypes_img_tags[] | null;
}

export interface getBooking_GetBooking_booking_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getBooking_GetBooking_booking_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface getBooking_GetBooking_booking_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface getBooking_GetBooking_booking_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

export interface getBooking_GetBooking_booking_guests_GuestDomitory_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
}

export interface getBooking_GetBooking_booking_guests_GuestDomitory_room {
  __typename: "Room";
  _id: string;
  name: string;
}

export interface getBooking_GetBooking_booking_guests_GuestDomitory {
  __typename: "GuestDomitory";
  _id: string;
  gender: Gender | null;
  bedIndex: number;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: getBooking_GetBooking_booking_guests_GuestDomitory_roomType;
  /**
   * 현재 묵는 방으로 변경될수 있음.
   */
  room: getBooking_GetBooking_booking_guests_GuestDomitory_room | null;
}

export interface getBooking_GetBooking_booking_guests_GuestRoom_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
}

export interface getBooking_GetBooking_booking_guests_GuestRoom_room {
  __typename: "Room";
  _id: string;
  name: string;
}

export interface getBooking_GetBooking_booking_guests_GuestRoom {
  __typename: "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: getBooking_GetBooking_booking_guests_GuestRoom_roomType;
  /**
   * 현재 묵는 방으로 변경될수 있음.
   */
  room: getBooking_GetBooking_booking_guests_GuestRoom_room | null;
}

export type getBooking_GetBooking_booking_guests = getBooking_GetBooking_booking_guests_GuestDomitory | getBooking_GetBooking_booking_guests_GuestRoom;

export interface getBooking_GetBooking_booking {
  __typename: "Booking";
  _id: string;
  roomTypes: getBooking_GetBooking_booking_roomTypes[] | null;
  isNew: boolean;
  name: any;
  password: string | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: getBooking_GetBooking_booking_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: getBooking_GetBooking_booking_payment;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
  guests: getBooking_GetBooking_booking_guests[] | null;
}

export interface getBooking_GetBooking {
  __typename: "GetBookingResponse";
  ok: boolean;
  error: string | null;
  booking: getBooking_GetBooking_booking | null;
}

export interface getBooking {
  GetBooking: getBooking_GetBooking;
}

export interface getBookingVariables {
  bookingId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSalesStatistic
// ====================================================

export interface getSalesStatistic_GetSalesStatistic_data_dateInfo {
  __typename: "DateInfo";
  year: number | null;
  month: number | null;
  /**
   * 주(1년 중 몇째주)
   */
  week: number | null;
  date: number | null;
  /**
   * 요일
   */
  dayOfWeek: Day | null;
}

export interface getSalesStatistic_GetSalesStatistic_data {
  __typename: "SalesStatistic";
  /**
   * ex- year=2019, month=8, week=32, date: 14, dayOfWeek="WED"
   */
  dateInfo: getSalesStatistic_GetSalesStatistic_data_dateInfo;
  price: number;
  payMethod: PayMethod | null;
}

export interface getSalesStatistic_GetSalesStatistic {
  __typename: "GetSalesStatisticResponse";
  ok: boolean;
  error: string | null;
  data: getSalesStatistic_GetSalesStatistic_data[] | null;
}

export interface getSalesStatistic {
  GetSalesStatistic: getSalesStatistic_GetSalesStatistic;
}

export interface getSalesStatisticVariables {
  houseId: string;
  checkIn: any;
  checkOut: any;
  unit: SalesStatisticsUnit;
  groupByPayMethod?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changeIndexForRoomType
// ====================================================

export interface changeIndexForRoomType_ChangeIndexForRoomType {
  __typename: "ChangeIndexForRoomTypeResponse";
  ok: boolean;
  error: string | null;
}

export interface changeIndexForRoomType {
  ChangeIndexForRoomType: changeIndexForRoomType_ChangeIndexForRoomType;
}

export interface changeIndexForRoomTypeVariables {
  roomTypeId: string;
  houseId: string;
  index: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllSeasonTable
// ====================================================

export interface getAllSeasonTable_GetAllSeason_seasons {
  __typename: "Season";
  _id: string;
  name: string;
  start: any;
  end: any;
  priority: number;
  color: string | null;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface getAllSeasonTable_GetAllSeason {
  __typename: "GetAllSeasonResponse";
  ok: boolean;
  error: string | null;
  seasons: getAllSeasonTable_GetAllSeason_seasons[] | null;
}

export interface getAllSeasonTable_GetAllRoomType_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
}

export interface getAllSeasonTable_GetAllRoomType {
  __typename: "GetAllRoomTypeResponse";
  ok: boolean | null;
  error: string | null;
  roomTypes: getAllSeasonTable_GetAllRoomType_roomTypes[] | null;
}

export interface getAllSeasonTable_GetSeasonPrice_seasonPrices_roomType {
  __typename: "RoomType";
  _id: string;
}

export interface getAllSeasonTable_GetSeasonPrice_seasonPrices_season {
  __typename: "Season";
  _id: string;
}

export interface getAllSeasonTable_GetSeasonPrice_seasonPrices_dayOfWeekPriceList {
  __typename: "DayOfWeekPrice";
  /**
   * 요일. SUN, MON, TUE, WED, THU, FRI, SAT 순서임
   */
  day: Day;
  price: number;
  additionalPrice: number | null;
}

export interface getAllSeasonTable_GetSeasonPrice_seasonPrices {
  __typename: "SeasonPrice";
  _id: string;
  roomType: getAllSeasonTable_GetSeasonPrice_seasonPrices_roomType;
  season: getAllSeasonTable_GetSeasonPrice_seasonPrices_season;
  defaultPrice: number;
  /**
   * 요일별 가격 배열. day는 uniq값
   */
  dayOfWeekPriceList: getAllSeasonTable_GetSeasonPrice_seasonPrices_dayOfWeekPriceList[] | null;
}

export interface getAllSeasonTable_GetSeasonPrice {
  __typename: "GetSeasonPriceResponse";
  ok: boolean;
  error: string | null;
  seasonPrices: getAllSeasonTable_GetSeasonPrice_seasonPrices[] | null;
}

export interface getAllSeasonTable {
  GetAllSeason: getAllSeasonTable_GetAllSeason;
  /**
   * admin 에서 사용하는 함수임.
   */
  GetAllRoomType: getAllSeasonTable_GetAllRoomType;
  /**
   * houseId에 해당하는 전체 방 타입 시즌 가격 가져오기
   */
  GetSeasonPrice: getAllSeasonTable_GetSeasonPrice;
}

export interface getAllSeasonTableVariables {
  houseId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateBooking
// ====================================================

export interface updateBooking_UpdateBooking {
  __typename: "UpdateBookingResponse";
  ok: boolean;
  error: string | null;
}

export interface updateBooking {
  UpdateBooking: updateBooking_UpdateBooking;
}

export interface updateBookingVariables {
  bookingId: string;
  params: UpdateBookingMutationParamsInput;
  sendSmsFlag?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteGuests
// ====================================================

export interface deleteGuests_DeleteGuests {
  __typename: "DeleteGuestsResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteGuests {
  DeleteGuests: deleteGuests_DeleteGuests;
}

export interface deleteGuestsVariables {
  guestIds?: string[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startBookingForPublic
// ====================================================

export interface startBookingForPublic_StartBookingForPublic_bookingTransaction {
  __typename: "BookingTransaction";
  _id: string;
  transactionId: string;
  createdAt: any;
  updatedAt: any | null;
}

export interface startBookingForPublic_StartBookingForPublic {
  __typename: "StartBookingResponse";
  ok: boolean;
  error: string | null;
  /**
   * Booking 말고... 트랜잭션 ID를 넘겨주자
   */
  bookingTransaction: startBookingForPublic_StartBookingForPublic_bookingTransaction | null;
}

export interface startBookingForPublic {
  StartBookingForPublic: startBookingForPublic_StartBookingForPublic;
}

export interface startBookingForPublicVariables {
  bookerParams: StartBookingBookerInput;
  checkInOut: CheckInOutInput;
  guestDomitoryParams?: StartBookingDomitoryGuestInput[] | null;
  guestRoomParams?: StartBookingRoomGuestInput[] | null;
  paymentParams: StartBookingPaymentInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startBooking
// ====================================================

export interface startBooking_StartBooking_bookingTransaction_booking {
  __typename: "Booking";
  _id: string;
}

export interface startBooking_StartBooking_bookingTransaction {
  __typename: "BookingTransaction";
  _id: string;
  transactionId: string;
  createdAt: any;
  updatedAt: any | null;
  booking: startBooking_StartBooking_bookingTransaction_booking;
}

export interface startBooking_StartBooking {
  __typename: "StartBookingResponse";
  ok: boolean;
  error: string | null;
  /**
   * Booking 말고... 트랜잭션 ID를 넘겨주자
   */
  bookingTransaction: startBooking_StartBooking_bookingTransaction | null;
}

export interface startBooking {
  StartBooking: startBooking_StartBooking;
}

export interface startBookingVariables {
  houseId: string;
  bookerParams: StartBookingBookerInput;
  checkInOut: CheckInOutInput;
  guestDomitoryParams?: StartBookingDomitoryGuestInput[] | null;
  guestRoomParams?: StartBookingRoomGuestInput[] | null;
  paymentParams: StartBookingPaymentInput;
  allocationParams?: AllocationInput[] | null;
  forceToAllocate?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: allocateGuestToRoom
// ====================================================

export interface allocateGuestToRoom_AllocateGuestToRoom_guest {
  __typename: "GuestDomitory" | "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
}

export interface allocateGuestToRoom_AllocateGuestToRoom {
  __typename: "AllocateGuestToRoomResponse";
  ok: boolean;
  error: string | null;
  guest: allocateGuestToRoom_AllocateGuestToRoom_guest | null;
}

export interface allocateGuestToRoom {
  AllocateGuestToRoom: allocateGuestToRoom_AllocateGuestToRoom;
}

export interface allocateGuestToRoomVariables {
  guestId: string;
  allocateInfo: AllocateInfoInput;
  options?: AllocateOptions | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPaymentAuth
// ====================================================

export interface getPaymentAuth_GetPaymentAuth_auth {
  __typename: "PaymentAuthObject";
  merchantId: string;
  mid: string;
  hash: string;
}

export interface getPaymentAuth_GetPaymentAuth {
  __typename: "GetPaymentAuthResponse";
  ok: boolean;
  error: string | null;
  auth: getPaymentAuth_GetPaymentAuth_auth | null;
  houseName: string | null;
  date: string | null;
}

export interface getPaymentAuth {
  GetPaymentAuth: getPaymentAuth_GetPaymentAuth;
}

export interface getPaymentAuthVariables {
  price: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRoomType
// ====================================================

export interface createRoomType_CreateRoomType {
  __typename: "CreateRoomTypeResponse";
  ok: boolean;
  error: string | null;
}

export interface createRoomType {
  /**
   * 로그인 token 필요함!
   */
  CreateRoomType: createRoomType_CreateRoomType;
}

export interface createRoomTypeVariables {
  params: CreateRoomTypeInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRoom
// ====================================================

export interface createRoom_CreateRoom {
  __typename: "CreateRoomResponse";
  ok: boolean | null;
  error: string | null;
}

export interface createRoom {
  CreateRoom: createRoom_CreateRoom;
}

export interface createRoomVariables {
  name: string;
  roomType: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteBlock
// ====================================================

export interface deleteBlock_DeleteBlock {
  __typename: "Response";
  ok: boolean;
  error: string | null;
}

export interface deleteBlock {
  DeleteBlock: deleteBlock_DeleteBlock;
}

export interface deleteBlockVariables {
  blockId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBlock
// ====================================================

export interface createBlock_CreateBlock_block_room {
  __typename: "Room";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomSrl: number | null;
}

export interface createBlock_CreateBlock_block {
  __typename: "Block";
  _id: string;
  bedIndex: number;
  checkIn: any;
  checkOut: any;
  createdAt: any;
  updatedAt: any | null;
  room: createBlock_CreateBlock_block_room;
}

export interface createBlock_CreateBlock {
  __typename: "CreateBlockResponse";
  ok: boolean;
  error: string | null;
  block: createBlock_CreateBlock_block | null;
}

export interface createBlock {
  CreateBlock: createBlock_CreateBlock;
}

export interface createBlockVariables {
  checkIn: any;
  checkOut: any;
  houseId: string;
  roomId: string;
  bedIndex: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createDailyPrice
// ====================================================

export interface createDailyPrice_CreateDailyPrice {
  __typename: "CreateDailyPriceResponse";
  ok: boolean;
  error: string | null;
}

export interface createDailyPrice {
  /**
   * 만약 RoomTypeId로 조회한 방타입이 해당 날짜에 DailyPrice가 존재한다면 가격 덮어 씌움
   */
  CreateDailyPrice: createDailyPrice_CreateDailyPrice;
}

export interface createDailyPriceVariables {
  price: number;
  roomTypeId: string;
  houseId: string;
  date: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteBooking
// ====================================================

export interface deleteBooking_DeleteBooking {
  __typename: "DeleteBookingResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteBooking {
  DeleteBooking: deleteBooking_DeleteBooking;
}

export interface deleteBookingVariables {
  bookingId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteDailyPrice
// ====================================================

export interface deleteDailyPrice_DeleteDailyPrice {
  __typename: "DeleteDailyPriceResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteDailyPrice {
  DeleteDailyPrice: deleteDailyPrice_DeleteDailyPrice;
}

export interface deleteDailyPriceVariables {
  roomTypeId: string;
  date: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteRoomType
// ====================================================

export interface deleteRoomType_DeleteRoomType {
  __typename: "DeleteRoomTypeResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteRoomType {
  DeleteRoomType: deleteRoomType_DeleteRoomType;
}

export interface deleteRoomTypeVariables {
  houseId: string;
  roomTypeId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteRoom
// ====================================================

export interface deleteRoom_DeleteRoom {
  __typename: "DeleteRoomResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteRoom {
  DeleteRoom: deleteRoom_DeleteRoom;
}

export interface deleteRoomVariables {
  roomId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRoom
// ====================================================

export interface updateRoom_UpdateRoom {
  __typename: "UpdateRoomResponse";
  ok: boolean;
  error: string | null;
}

export interface updateRoom {
  UpdateRoom: updateRoom_UpdateRoom;
}

export interface updateRoomVariables {
  roomId: string;
  name?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRoomType
// ====================================================

export interface updateRoomType_UpdateRoomType {
  __typename: "UpdateRoomTypeResponse";
  ok: boolean;
  error: string | null;
}

export interface updateRoomType {
  UpdateRoomType: updateRoomType_UpdateRoomType;
}

export interface updateRoomTypeVariables {
  roomTypeId: string;
  params: UpdateRoomTypeInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createSeasonPrice
// ====================================================

export interface createSeasonPrice_CreateSeasonPrice {
  __typename: "CreateSeasonPriceResponse";
  ok: boolean;
  error: string | null;
}

export interface createSeasonPrice {
  CreateSeasonPrice: createSeasonPrice_CreateSeasonPrice;
}

export interface createSeasonPriceVariables {
  roomTypeId: string;
  seasonId: string;
  defaultPrice: number;
  dayOfWeekPriceList?: DayOfWeekPriceInput[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createSeason
// ====================================================

export interface createSeason_CreateSeason_season {
  __typename: "Season";
  _id: string;
}

export interface createSeason_CreateSeason {
  __typename: "CreateSeasonResponse";
  ok: boolean;
  error: string | null;
  season: createSeason_CreateSeason_season | null;
}

export interface createSeason {
  CreateSeason: createSeason_CreateSeason;
}

export interface createSeasonVariables {
  name: string;
  start: any;
  end: any;
  houseId: string;
  color?: string | null;
  description?: string | null;
  seasonPrices?: SeasonPriceInput[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changePriority
// ====================================================

export interface changePriority_ChangePriority_season {
  __typename: "Season";
  _id: string;
}

export interface changePriority_ChangePriority {
  __typename: "ChangePriorityResponse";
  ok: boolean;
  error: string | null;
  season: changePriority_ChangePriority_season | null;
}

export interface changePriority {
  ChangePriority: changePriority_ChangePriority;
}

export interface changePriorityVariables {
  seasonId: string;
  houseId: string;
  priority: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteSeason
// ====================================================

export interface deleteSeason_DeleteSeason {
  __typename: "DeleteSeasonResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteSeason {
  DeleteSeason: deleteSeason_DeleteSeason;
}

export interface deleteSeasonVariables {
  seasonId: string;
  houseId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSeason
// ====================================================

export interface updateSeason_UpdateSeason {
  __typename: "UpdateSeasonResponse";
  ok: boolean | null;
  error: string | null;
}

export interface updateSeason {
  UpdateSeason: updateSeason_UpdateSeason;
}

export interface updateSeasonVariables {
  name?: string | null;
  start?: any | null;
  end?: any | null;
  seasonId: string;
  color?: string | null;
  description?: string | null;
  seasonPrices?: SeasonPriceInput[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateMyProfile
// ====================================================

export interface updateMyProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateMyProfile {
  UpdateMyProfile: updateMyProfile_UpdateMyProfile;
}

export interface updateMyProfileVariables {
  name: any;
  phoneNumber: any;
  email: any;
  password: any;
  profileImg?: JdFileInput | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startPhoneVerification
// ====================================================

export interface startPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface startPhoneVerification {
  StartPhoneVerification: startPhoneVerification_StartPhoneVerification;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startPhoneVerificationWithPhoneNumber
// ====================================================

export interface startPhoneVerificationWithPhoneNumber_StartSenderVerification {
  __typename: "StartSenderVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface startPhoneVerificationWithPhoneNumber {
  StartSenderVerification: startPhoneVerificationWithPhoneNumber_StartSenderVerification;
}

export interface startPhoneVerificationWithPhoneNumberVariables {
  phoneNumber: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: completePhoneVerification
// ====================================================

export interface completePhoneVerification_CompletePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface completePhoneVerification {
  CompletePhoneVerification: completePhoneVerification_CompletePhoneVerification;
}

export interface completePhoneVerificationVariables {
  key: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: emailSignUp
// ====================================================

export interface emailSignUp_EmailSignUp {
  __typename: "EmailSignUpResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface emailSignUp {
  EmailSignUp: emailSignUp_EmailSignUp;
}

export interface emailSignUpVariables {
  name: any;
  email: any;
  phoneNumber: any;
  password: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateHouse
// ====================================================

export interface updateHouse_UpdateHouse {
  __typename: "UpdateHouseResponse";
  ok: boolean;
  error: string | null;
}

export interface updateHouse {
  UpdateHouse: updateHouse_UpdateHouse;
}

export interface updateHouseVariables {
  houseId: string;
  name?: string | null;
  houseType?: HouseType | null;
  location?: LocationInput | null;
  completeDefaultSetting?: boolean | null;
  refundPolicy?: TermsOfRefundInput[] | null;
  termsOfBooking?: TermsOfBookingInput | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateHouseConfig
// ====================================================

export interface updateHouseConfig_UpdateHouseConfig {
  __typename: "UpdateHouseConfigResponse";
  ok: boolean;
  error: string | null;
}

export interface updateHouseConfig {
  UpdateHouseConfig: updateHouseConfig_UpdateHouseConfig;
}

export interface updateHouseConfigVariables {
  houseId: string;
  UpdateHouseConfigParams?: UpdateHouseConfigParams | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createHouse
// ====================================================

export interface createHouse_CreateHouse_house {
  __typename: "House";
  _id: string;
  name: string;
}

export interface createHouse_CreateHouse {
  __typename: "CreateHouseResponse";
  ok: boolean;
  error: string | null;
  house: createHouse_CreateHouse_house | null;
}

export interface createHouse {
  CreateHouse: createHouse_CreateHouse;
}

export interface createHouseVariables {
  name: string;
  houseType: HouseType;
  location: LocationInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteHouse
// ====================================================

export interface deleteHouse_DeleteHouse {
  __typename: "DeleteHouseResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteHouse {
  DeleteHouse: deleteHouse_DeleteHouse;
}

export interface deleteHouseVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: buyProduct
// ====================================================

export interface buyProduct_BuyProduct {
  __typename: "BuyProductResponse";
  ok: boolean;
  error: string | null;
}

export interface buyProduct {
  BuyProduct: buyProduct_BuyProduct;
}

export interface buyProductVariables {
  houseId: string;
  productTypeId: string;
  appInfoRequest: AppInfoRequestInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: refundProduct
// ====================================================

export interface refundProduct_RefundProduct {
  __typename: "RefundProductResponse";
  ok: boolean;
  error: string | null;
}

export interface refundProduct {
  RefundProduct: refundProduct_RefundProduct;
}

export interface refundProductVariables {
  houseId: string;
  productId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createSmsTemplate
// ====================================================

export interface createSmsTemplate_CreateSmsTemplate_smsTemplate_smsSendCase {
  __typename: "SmsAutoSend";
  enable: boolean;
  when: AutoSendWhen;
  who: SendTarget;
}

export interface createSmsTemplate_CreateSmsTemplate_smsTemplate {
  __typename: "SmsTemplate";
  _id: string;
  /**
   * 문자 포멧 이름.
   */
  formatName: string;
  /**
   * 문자 포멧: 변수를 포함하며 자동발송 시 변수가 치환되어 전송됨.
   */
  smsFormat: string;
  /**
   * 자동발송 설정
   */
  smsSendCase: createSmsTemplate_CreateSmsTemplate_smsTemplate_smsSendCase | null;
}

export interface createSmsTemplate_CreateSmsTemplate {
  __typename: "CreateSmsTemplateResponse";
  ok: boolean;
  error: string | null;
  smsTemplate: createSmsTemplate_CreateSmsTemplate_smsTemplate | null;
}

export interface createSmsTemplate {
  CreateSmsTemplate: createSmsTemplate_CreateSmsTemplate;
}

export interface createSmsTemplateVariables {
  houseId: string;
  params: SmsTemplateInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteSmsTemplate
// ====================================================

export interface deleteSmsTemplate_DeleteSmsTemplate {
  __typename: "DeleteSmsTemplateResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteSmsTemplate {
  DeleteSmsTemplate: deleteSmsTemplate_DeleteSmsTemplate;
}

export interface deleteSmsTemplateVariables {
  smsInfoId: string;
  smsTemplateId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSmsInfo
// ====================================================

export interface getSmsInfo_GetSmsInfo_smsInfo_sender {
  __typename: "SmsSender";
  phoneNumber: any;
  verified: boolean;
  registered: boolean;
}

export interface getSmsInfo_GetSmsInfo_smsInfo_smsTemplates_smsSendCase {
  __typename: "SmsAutoSend";
  enable: boolean;
  when: AutoSendWhen;
  who: SendTarget;
}

export interface getSmsInfo_GetSmsInfo_smsInfo_smsTemplates {
  __typename: "SmsTemplate";
  _id: string;
  /**
   * 문자 포멧 이름.
   */
  formatName: string;
  /**
   * 문자 포멧: 변수를 포함하며 자동발송 시 변수가 치환되어 전송됨.
   */
  smsFormat: string;
  /**
   * 자동발송 설정
   */
  smsSendCase: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates_smsSendCase | null;
}

export interface getSmsInfo_GetSmsInfo_smsInfo {
  __typename: "SmsInfo";
  _id: string;
  sender: getSmsInfo_GetSmsInfo_smsInfo_sender | null;
  receivers: any[] | null;
  smsTemplates: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates[] | null;
}

export interface getSmsInfo_GetSmsInfo {
  __typename: "GetSmsInfoResponse";
  ok: boolean;
  error: string | null;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null;
}

export interface getSmsInfo {
  GetSmsInfo: getSmsInfo_GetSmsInfo;
}

export interface getSmsInfoVariables {
  houseId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSmsTemplate
// ====================================================

export interface updateSmsTemplate_UpdateSmsTemplate_smsTemplate_smsSendCase {
  __typename: "SmsAutoSend";
  enable: boolean;
  when: AutoSendWhen;
  who: SendTarget;
}

export interface updateSmsTemplate_UpdateSmsTemplate_smsTemplate {
  __typename: "SmsTemplate";
  _id: string;
  /**
   * 문자 포멧 이름.
   */
  formatName: string;
  /**
   * 문자 포멧: 변수를 포함하며 자동발송 시 변수가 치환되어 전송됨.
   */
  smsFormat: string;
  /**
   * 자동발송 설정
   */
  smsSendCase: updateSmsTemplate_UpdateSmsTemplate_smsTemplate_smsSendCase | null;
}

export interface updateSmsTemplate_UpdateSmsTemplate {
  __typename: "UpdateSmsTemplateResponse";
  ok: boolean;
  error: string | null;
  smsTemplate: updateSmsTemplate_UpdateSmsTemplate_smsTemplate | null;
}

export interface updateSmsTemplate {
  UpdateSmsTemplate: updateSmsTemplate_UpdateSmsTemplate;
}

export interface updateSmsTemplateVariables {
  smsTemplateId: string;
  houseId: string;
  params: UpdateSmsTemplateInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendSms
// ====================================================

export interface sendSms_SendSms_result {
  __typename: "SendSmsResult";
  /**
   * 알리고 메시지 전송 결과 코드
   */
  resultCode: string;
  /**
   * 보낸 메시지. 실패시 에러메시지 나옴
   */
  message: string;
  /**
   * 1.SMS, 2.LMS, 3.MMS
   */
  msgType: string | null;
  /**
   * 알리고 메시지 id
   */
  msgId: number | null;
  successCnt: number | null;
  errorCnt: number | null;
}

export interface sendSms_SendSms {
  __typename: "SendSmsResponse";
  ok: boolean;
  error: string | null;
  result: sendSms_SendSms_result | null;
}

export interface sendSms {
  SendSms: sendSms_SendSms;
}

export interface sendSmsVariables {
  receivers?: any[] | null;
  msg: string;
  smsInfoId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateUserForSU
// ====================================================

export interface updateUserForSU_UpdateProductForSU {
  __typename: "UpdateProductForSUResponse";
  ok: boolean;
  error: string | null;
}

export interface updateUserForSU_UpdateHouse {
  __typename: "UpdateHouseResponse";
  ok: boolean;
  error: string | null;
}

export interface updateUserForSU {
  UpdateProductForSU: updateUserForSU_UpdateProductForSU;
  UpdateHouse: updateUserForSU_UpdateHouse;
}

export interface updateUserForSUVariables {
  productId: string;
  productParams: UpdateProductParams;
  houseId: string;
  status: HouseStatus;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirmBooking
// ====================================================

export interface confirmBooking_ConfirmBooking {
  __typename: "ConfirmBookingResponse";
  ok: boolean;
  error: string | null;
}

export interface confirmBooking {
  ConfirmBooking: confirmBooking_ConfirmBooking;
}

export interface confirmBookingVariables {
  bookingId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSender
// ====================================================

export interface updateSender_UpdateSender_sender {
  __typename: "SmsSender";
  phoneNumber: any;
  verified: boolean;
  registered: boolean;
}

export interface updateSender_UpdateSender {
  __typename: "UpdateSenderResponse";
  ok: boolean;
  error: string | null;
  sender: updateSender_UpdateSender_sender | null;
  verified: boolean | null;
}

export interface updateSender {
  UpdateSender: updateSender_UpdateSender;
}

export interface updateSenderVariables {
  houseId: string;
  sender: SmsSenderInput;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHM
// ====================================================

export interface getHM_GetHM_HM_backgroundImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHM_GetHM_HM_backgroundImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHM_GetHM_HM_backgroundImg_tags[] | null;
}

export interface getHM_GetHM_HM_profileImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHM_GetHM_HM_profileImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHM_GetHM_HM_profileImg_tags[] | null;
}

export interface getHM_GetHM_HM_menus_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHM_GetHM_HM_menus_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHM_GetHM_HM_menus_img_tags[] | null;
}

export interface getHM_GetHM_HM_menus {
  __typename: "HMmenu";
  /**
   * _id 대신 사용할것
   */
  id: number;
  name: any | null;
  type: HMmenuType;
  /**
   * 메뉴 아이콘
   */
  icon: string | null;
  img: getHM_GetHM_HM_menus_img | null;
  content: any;
  isEnable: boolean;
}

export interface getHM_GetHM_HM_location {
  __typename: "Location";
  address: string;
  addressDetail: string | null;
  lat: number;
  lng: number;
}

export interface getHM_GetHM_HM {
  __typename: "HM";
  _id: string;
  /**
   * 선택 가능한 언어 목록
   */
  langList: Language[];
  backgroundImg: getHM_GetHM_HM_backgroundImg | null;
  profileImg: getHM_GetHM_HM_profileImg | null;
  phoneNumber: string | null;
  createdAt: any;
  email: string;
  updatedAt: any | null;
  title: any | null;
  menus: getHM_GetHM_HM_menus[];
  location: getHM_GetHM_HM_location;
}

export interface getHM_GetHM {
  __typename: "GetHMresponse";
  ok: boolean;
  error: string | null;
  HM: getHM_GetHM_HM | null;
}

export interface getHM {
  /**
   * 호스트가 수정하려고 접속할 때
   */
  GetHM: getHM_GetHM;
}

export interface getHMVariables {
  houseId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHMforPublic
// ====================================================

export interface getHMforPublic_GetHMforPublic_HM_backgroundImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHMforPublic_GetHMforPublic_HM_backgroundImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHMforPublic_GetHMforPublic_HM_backgroundImg_tags[] | null;
}

export interface getHMforPublic_GetHMforPublic_HM_profileImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHMforPublic_GetHMforPublic_HM_profileImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHMforPublic_GetHMforPublic_HM_profileImg_tags[] | null;
}

export interface getHMforPublic_GetHMforPublic_HM_menus_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHMforPublic_GetHMforPublic_HM_menus_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHMforPublic_GetHMforPublic_HM_menus_img_tags[] | null;
}

export interface getHMforPublic_GetHMforPublic_HM_menus {
  __typename: "HMmenu";
  /**
   * _id 대신 사용할것
   */
  id: number;
  name: any | null;
  type: HMmenuType;
  /**
   * 메뉴 아이콘
   */
  icon: string | null;
  img: getHMforPublic_GetHMforPublic_HM_menus_img | null;
  content: any;
  isEnable: boolean;
}

export interface getHMforPublic_GetHMforPublic_HM_location {
  __typename: "Location";
  address: string;
  addressDetail: string | null;
  lat: number;
  lng: number;
}

export interface getHMforPublic_GetHMforPublic_HM {
  __typename: "HM";
  _id: string;
  /**
   * 선택 가능한 언어 목록
   */
  langList: Language[];
  backgroundImg: getHMforPublic_GetHMforPublic_HM_backgroundImg | null;
  profileImg: getHMforPublic_GetHMforPublic_HM_profileImg | null;
  phoneNumber: string | null;
  createdAt: any;
  email: string;
  updatedAt: any | null;
  title: any | null;
  menus: getHMforPublic_GetHMforPublic_HM_menus[];
  location: getHMforPublic_GetHMforPublic_HM_location;
}

export interface getHMforPublic_GetHMforPublic {
  __typename: "GetHMresponse";
  ok: boolean;
  error: string | null;
  HM: getHMforPublic_GetHMforPublic_HM | null;
}

export interface getHMforPublic {
  /**
   * 외부에서 접속할때(guest가 접속)
   */
  GetHMforPublic: getHMforPublic_GetHMforPublic;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateHM
// ====================================================

export interface updateHM_UpdateHM {
  __typename: "UpdateHMResponse";
  ok: boolean;
  error: string | null;
}

export interface updateHM {
  UpdateHM: updateHM_UpdateHM;
}

export interface updateHMVariables {
  houseId: string;
  updateParams: UpdateHMparams;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMemos
// ====================================================

export interface getMemos_GetMemos_memos {
  __typename: "Memo";
  _id: string;
  title: string | null;
  text: string;
  memoType: MemoType;
  enableAlert: boolean | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface getMemos_GetMemos {
  __typename: "GetMemosResponse";
  ok: boolean;
  error: string | null;
  memos: getMemos_GetMemos_memos[] | null;
}

export interface getMemos {
  GetMemos: getMemos_GetMemos;
}

export interface getMemosVariables {
  houseId: string;
  memoType?: MemoType | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateMemo
// ====================================================

export interface updateMemo_UpdateMemo {
  __typename: "UpdateMemoResponse";
  ok: boolean;
  error: string | null;
}

export interface updateMemo {
  UpdateMemo: updateMemo_UpdateMemo;
}

export interface updateMemoVariables {
  memoId: string;
  updateMemoParams: UpdateMemoParams;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createMemo
// ====================================================

export interface createMemo_CreateMemo {
  __typename: "CreateMemoResponse";
  ok: boolean;
  error: string | null;
}

export interface createMemo {
  /**
   * 로그인 token 필요함!
   */
  CreateMemo: createMemo_CreateMemo;
}

export interface createMemoVariables {
  houseId: string;
  createMemoParams: CreateMemoParams;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteMemo
// ====================================================

export interface deleteMemo_DeleteMemo {
  __typename: "DeleteMemoResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteMemo {
  DeleteMemo: deleteMemo_DeleteMemo;
}

export interface deleteMemoVariables {
  memoId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNotis
// ====================================================

export interface getNotis_GetNotis_notis {
  __typename: "Noti";
  _id: string;
  msg: string;
  validPeriod: any | null;
  title: string | null;
  notiType: NotiType | null;
  notiLevel: NotiLevel | null;
  createdAt: any;
  isConfirm: boolean;
  updatedAt: any | null;
}

export interface getNotis_GetNotis {
  __typename: "GetNotisResponse";
  ok: boolean;
  error: string | null;
  notis: getNotis_GetNotis_notis[] | null;
}

export interface getNotis {
  GetNotis: getNotis_GetNotis;
}

export interface getNotisVariables {
  houseId: string;
  count: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: singleUpload
// ====================================================

export interface singleUpload_SingleUpload_jdFile_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface singleUpload_SingleUpload_jdFile {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: singleUpload_SingleUpload_jdFile_tags[] | null;
}

export interface singleUpload_SingleUpload {
  __typename: "SingleUploadResponse";
  ok: boolean;
  error: string | null;
  jdFile: singleUpload_SingleUpload_jdFile | null;
}

export interface singleUpload {
  SingleUpload: singleUpload_SingleUpload;
}

export interface singleUploadVariables {
  file: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: confirmNoti
// ====================================================

export interface confirmNoti_ConfirmNoti {
  __typename: "ConfirmNotiResponse";
  ok: boolean;
  error: string | null;
}

export interface confirmNoti {
  ConfirmNoti: confirmNoti_ConfirmNoti;
}

export interface confirmNotiVariables {
  houseId: string;
  notiIds: string[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createNoti
// ====================================================

export interface createNoti_CreateNoti {
  __typename: "CreateNotiResponse";
  ok: boolean;
  error: string | null;
}

export interface createNoti {
  /**
   * houseId는
   */
  CreateNoti: createNoti_CreateNoti;
}

export interface createNotiVariables {
  houseIds: (string | null)[];
  createNotiParams: CreateNotiParams;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FieldsLocation
// ====================================================

export interface FieldsLocation_location {
  __typename: "Location";
  address: string;
  addressDetail: string | null;
}

export interface FieldsLocation {
  __typename: "House";
  location: FieldsLocation_location;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fimg
// ====================================================

export interface Fimg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface Fimg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: Fimg_tags[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fmemo
// ====================================================

export interface Fmemo {
  __typename: "Memo";
  _id: string;
  title: string | null;
  text: string;
  memoType: MemoType;
  enableAlert: boolean | null;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FNoti
// ====================================================

export interface FNoti {
  __typename: "Noti";
  _id: string;
  msg: string;
  validPeriod: any | null;
  title: string | null;
  notiType: NotiType | null;
  notiLevel: NotiLevel | null;
  createdAt: any;
  isConfirm: boolean;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fhouse
// ====================================================

export interface Fhouse {
  __typename: "House";
  _id: string;
  name: string;
  houseType: HouseType;
  status: HouseStatus | null;
  publicKey: string | null;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FHM
// ====================================================

export interface FHM_backgroundImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FHM_backgroundImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FHM_backgroundImg_tags[] | null;
}

export interface FHM_profileImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FHM_profileImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FHM_profileImg_tags[] | null;
}

export interface FHM {
  __typename: "HM";
  _id: string;
  /**
   * 선택 가능한 언어 목록
   */
  langList: Language[];
  backgroundImg: FHM_backgroundImg | null;
  profileImg: FHM_profileImg | null;
  phoneNumber: string | null;
  createdAt: any;
  email: string;
  updatedAt: any | null;
  title: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FHMmenu
// ====================================================

export interface FHMmenu_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FHMmenu_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FHMmenu_img_tags[] | null;
}

export interface FHMmenu {
  __typename: "HMmenu";
  /**
   * _id 대신 사용할것
   */
  id: number;
  name: any | null;
  type: HMmenuType;
  /**
   * 메뉴 아이콘
   */
  icon: string | null;
  img: FHMmenu_img | null;
  content: any;
  isEnable: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FhouseConfig
// ====================================================

export interface FhouseConfig_assigTimeline_itemBlockOp {
  __typename: "ItemBlockOp";
  itemBlockOpEnable: boolean;
  useColor: boolean;
}

export interface FhouseConfig_assigTimeline {
  __typename: "AssigTimeline";
  roomTypeTabEnable: boolean;
  itemBlockOp: FhouseConfig_assigTimeline_itemBlockOp | null;
}

export interface FhouseConfig_pollingPeriod {
  __typename: "PollingPeriod";
  enable: boolean;
  period: number;
}

export interface FhouseConfig_bookingConfig_newBookingMark {
  __typename: "NewBookingMark";
  enable: boolean | null;
  newGuestTime: number;
}

export interface FhouseConfig_bookingConfig_collectingInfoFromGuest {
  __typename: "CollectingInfoFromGuest";
  email: boolean | null;
  country: boolean | null;
}

export interface FhouseConfig_bookingConfig {
  __typename: "BookingConfig";
  newBookingMark: FhouseConfig_bookingConfig_newBookingMark | null;
  collectingInfoFromGuest: FhouseConfig_bookingConfig_collectingInfoFromGuest | null;
}

export interface FhouseConfig_baseConfig {
  __typename: "BaseConfig";
  pricingTypes: PricingType[];
}

export interface FhouseConfig {
  __typename: "HouseConfig";
  assigTimeline: FhouseConfig_assigTimeline;
  pollingPeriod: FhouseConfig_pollingPeriod;
  bookingConfig: FhouseConfig_bookingConfig;
  baseConfig: FhouseConfig_baseConfig;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FproductType
// ====================================================

export interface FproductType {
  __typename: "ProductType";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  /**
   * 제품 가격(월)
   */
  price: number;
  /**
   * 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한
   */
  roomCount: number;
  /**
   * ProductTypeKey
   */
  key: ProductTypeKey;
  /**
   * 방 수 추가시 추가 가격  => default: 0
   */
  roomCountExtraCharge: number;
  /**
   * 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한
   */
  bookingCount: number;
  /**
   * 예약 초과시 부과되는 금액 => defualt: 0
   */
  bookingCountExtraCharge: number;
  /**
   * 상세 설명
   */
  description: string | null;
  canHaveHostApp: boolean;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FappInfoRequest
// ====================================================

export interface FappInfoRequest {
  __typename: "AppInfoRequest";
  url: string;
  layoutType: LayoutType;
  requestedDate: any;
  isDone: boolean;
  useHostApp: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fproduct
// ====================================================

export interface Fproduct {
  __typename: "Product";
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  /**
   * 제품 가격(월)
   */
  price: number | null;
  /**
   * 할인된 가격
   */
  discountedPrice: number | null;
  /**
   * 만들 수 있는 최대 방 / 배드 수 => -1 일때 무제한
   */
  roomCount: number | null;
  /**
   * 방 수 추가시 추가 가격  => default: 0
   */
  roomCountExtraCharge: number | null;
  /**
   * 한달간 받을 수 있는 최대 예약 수 => -1 일 떄 무제한
   */
  bookingCount: number | null;
  /**
   * 예약 초과시 부과되는 금액 => defualt: 0
   */
  bookingCountExtraCharge: number | null;
  layoutType: LayoutType | null;
  layoutPrice: number | null;
  layoutPricePaid: boolean | null;
  appliedUrl: string | null;
  expireDate: any;
  /**
   * 상품 만료까지 남은 일수
   */
  daysLeftToExpire: number;
  /**
   * 상품이 만료된 여부
   */
  isExpired: boolean;
  canHaveHostApp: boolean;
  existingHostApp: boolean;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FsmsTemplate
// ====================================================

export interface FsmsTemplate_smsSendCase {
  __typename: "SmsAutoSend";
  enable: boolean;
  when: AutoSendWhen;
  who: SendTarget;
}

export interface FsmsTemplate {
  __typename: "SmsTemplate";
  _id: string;
  /**
   * 문자 포멧 이름.
   */
  formatName: string;
  /**
   * 문자 포멧: 변수를 포함하며 자동발송 시 변수가 치환되어 전송됨.
   */
  smsFormat: string;
  /**
   * 자동발송 설정
   */
  smsSendCase: FsmsTemplate_smsSendCase | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FallSeason
// ====================================================

export interface FallSeason {
  __typename: "Season";
  _id: string;
  name: string;
  start: any;
  end: any;
  priority: number;
  color: string | null;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fpayment
// ====================================================

export interface Fpayment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FpageInfo
// ====================================================

export interface FpageInfo {
  __typename: "PageInfoOffsetBase";
  currentPage: number;
  totalPage: number;
  rowCount: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FsmsSender
// ====================================================

export interface FsmsSender {
  __typename: "SmsSender";
  phoneNumber: any;
  verified: boolean;
  registered: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FsmsHistory
// ====================================================

export interface FsmsHistory {
  __typename: "SmsHistory";
  _id: string;
  msg: string;
  sender: string;
  receivers: string[] | null;
  sendResult: boolean;
  autoSend: boolean;
  msgType: MsgType;
  createdAt: any;
  updatedAt: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FroomType
// ====================================================

export interface FroomType_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FroomType_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FroomType_img_tags[] | null;
}

export interface FroomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: FroomType_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FavailablePeopleCount
// ====================================================

export interface FavailablePeopleCount {
  __typename: "AvailablePeopleCount";
  /**
   * 방 타입에서만 사용하는 인원수
   */
  countAny: number;
  /**
   * 배정 가능 게스트: 여
   */
  countFemale: number;
  /**
   * 배정 가능 게스트: 남
   */
  countMale: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fbooking
// ====================================================

export interface Fbooking_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface Fbooking_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: Fbooking_roomTypes_img_tags[] | null;
}

export interface Fbooking_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: Fbooking_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface Fbooking_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface Fbooking_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  status: PaymentStatus;
  paymentResultParam: any | null;
}

export interface Fbooking {
  __typename: "Booking";
  _id: string;
  roomTypes: Fbooking_roomTypes[] | null;
  isNew: boolean;
  name: any;
  password: string | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: Fbooking_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: Fbooking_payment;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Froom
// ====================================================

export interface Froom {
  __typename: "Room";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomSrl: number | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FblockOp
// ====================================================

export interface FblockOp {
  __typename: "BlockOption";
  color: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FbookingTransaction
// ====================================================

export interface FbookingTransaction {
  __typename: "BookingTransaction";
  _id: string;
  transactionId: string;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FbookingTransactionProgress
// ====================================================

export interface FbookingTransactionProgress_startBooking {
  __typename: "TransactionProgress";
  status: TransactionStatus;
  updatedAt: any | null;
}

export interface FbookingTransactionProgress_payment {
  __typename: "TransactionProgress";
  status: TransactionStatus;
  updatedAt: any | null;
}

export interface FbookingTransactionProgress_completeBooking {
  __typename: "TransactionProgress";
  status: TransactionStatus;
  updatedAt: any | null;
}

export interface FbookingTransactionProgress {
  __typename: "BookingTransactionProgress";
  startBooking: FbookingTransactionProgress_startBooking;
  payment: FbookingTransactionProgress_payment;
  completeBooking: FbookingTransactionProgress_completeBooking;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fblock
// ====================================================

export interface Fblock {
  __typename: "Block";
  _id: string;
  bedIndex: number;
  checkIn: any;
  checkOut: any;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fguest
// ====================================================

export interface Fguest {
  __typename: "GuestDomitory" | "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FguestDomitory
// ====================================================

export interface FguestDomitory {
  __typename: "GuestDomitory";
  _id: string;
  gender: Gender | null;
  bedIndex: number;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FguestRoom
// ====================================================

export interface FguestRoom {
  __typename: "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FroomTypeCapacity
// ====================================================

export interface FroomTypeCapacity_availablePeopleCount {
  __typename: "AvailablePeopleCount";
  /**
   * 방 타입에서만 사용하는 인원수
   */
  countAny: number;
  /**
   * 배정 가능 게스트: 여
   */
  countFemale: number;
  /**
   * 배정 가능 게스트: 남
   */
  countMale: number;
}

export interface FroomTypeCapacity_roomCapacityList {
  __typename: "RoomCapacity";
  /**
   * 방 타입 ID
   */
  roomId: string;
  /**
   * 방 성별
   */
  roomGender: RoomGender;
  /**
   * 배정할 수 있는 게스트 Gender 배열
   */
  availableGenders: Gender[] | null;
  /**
   * 배정 가능 인원 수
   */
  availableCount: number;
  /**
   * 설정된 배정 기준인원
   */
  peopleCount: number;
  /**
   * 빈 배드 목록 배열
   */
  emptyBeds: number[];
}

export interface FroomTypeCapacity {
  __typename: "RoomTypeCapacity";
  /**
   * 방 타입 ID
   */
  roomTypeId: string;
  /**
   * 도미토리? 룸?
   */
  pricingType: PricingType;
  /**
   * 배정 가능 인원 수
   */
  availablePeopleCount: FroomTypeCapacity_availablePeopleCount;
  /**
   * room들의 Capacity 목록 배열
   */
  roomCapacityList: FroomTypeCapacity_roomCapacityList[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FieldsUser
// ====================================================

export interface FieldsUser_profileImg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FieldsUser_profileImg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FieldsUser_profileImg_tags[] | null;
}

export interface FieldsUser {
  __typename: "User";
  _id: string;
  name: any;
  phoneNumber: any;
  password: any | null;
  /**
   * 주요 관리 수단임.. 잘 관리하도록 ㅎ
   */
  email: any;
  profileImg: FieldsUser_profileImg | null;
  isPhoneVerified: boolean;
  checkPrivacyPolicy: boolean;
  userRole: UserRole;
  userRoles: UserRole[] | null;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FsharedGetAllRoomType
// ====================================================

export interface FsharedGetAllRoomType_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FsharedGetAllRoomType_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FsharedGetAllRoomType_roomTypes_img_tags[] | null;
}

export interface FsharedGetAllRoomType_roomTypes_rooms {
  __typename: "Room";
  _id: string;
  name: string;
  index: number;
  createdAt: any;
  updatedAt: any | null;
}

export interface FsharedGetAllRoomType_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  roomGender: RoomGender;
  roomCount: number;
  createdAt: any;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  updatedAt: any | null;
  img: FsharedGetAllRoomType_roomTypes_img | null;
  rooms: FsharedGetAllRoomType_roomTypes_rooms[];
}

export interface FsharedGetAllRoomType {
  __typename: "GetAllRoomTypeResponse";
  ok: boolean | null;
  error: string | null;
  roomTypes: FsharedGetAllRoomType_roomTypes[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FroomTypePriceResult
// ====================================================

export interface FroomTypePriceResult_roomTypeDatePrices_roomType_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FroomTypePriceResult_roomTypeDatePrices_roomType_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FroomTypePriceResult_roomTypeDatePrices_roomType_img_tags[] | null;
}

export interface FroomTypePriceResult_roomTypeDatePrices_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  /**
   * deprecated
   */
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: FroomTypePriceResult_roomTypeDatePrices_roomType_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  roomTemplateSrl: number | null;
}

export interface FroomTypePriceResult_roomTypeDatePrices_datePrices {
  __typename: "DatePrice";
  date: any;
  price: number;
}

export interface FroomTypePriceResult_roomTypeDatePrices {
  __typename: "RoomTypeDatePrice";
  roomType: FroomTypePriceResult_roomTypeDatePrices_roomType;
  datePrices: FroomTypePriceResult_roomTypeDatePrices_datePrices[] | null;
}

export interface FroomTypePriceResult {
  __typename: "GetRoomTypeDatePricesResponse";
  ok: boolean;
  error: string | null;
  roomTypeDatePrices: FroomTypePriceResult_roomTypeDatePrices[] | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 보내야 할 상황을 먼저 정해야 할듯 하다.. ㅎㅎ
 */
export enum AutoSendWhen {
  WEHN_BOOKING_CANCEL = "WEHN_BOOKING_CANCEL",
  WHEN_BOOKING_CREATED = "WHEN_BOOKING_CREATED",
  WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING = "WHEN_BOOKING_CREATED_PAYMENT_PROGRESSING",
  WHEN_BOOKING_UPDATE = "WHEN_BOOKING_UPDATE",
}

export enum BookingStatus {
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  FAIL = "FAIL",
  PROGRESSING = "PROGRESSING",
}

/**
 * DB에 저장할 떄는 0101010의 형태로 저장하도록 Resolver에서 처리한다.
 */
export enum Day {
  FRI = "FRI",
  MON = "MON",
  SAT = "SAT",
  SUN = "SUN",
  THU = "THU",
  TUE = "TUE",
  WED = "WED",
}

/**
 * 도미토리 방식으로 예약한 게스트만 적용됨
 */
export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

export enum HMmenuType {
  CUSTOM = "CUSTOM",
  FACILITIES = "FACILITIES",
  HOUSE_RULES = "HOUSE_RULES",
  HOW_TO_CHECKIN = "HOW_TO_CHECKIN",
  HOW_TO_CHECKOUT = "HOW_TO_CHECKOUT",
  HOW_TO_USE_WIFI = "HOW_TO_USE_WIFI",
  LOCATION = "LOCATION",
  NEARBY_ATTRACTIONS = "NEARBY_ATTRACTIONS",
  RECYCLING = "RECYCLING",
  SAFETY = "SAFETY",
}

export enum HouseStatus {
  DISALBE = "DISALBE",
  ENABLE = "ENABLE",
  WAIT = "WAIT",
}

export enum HouseType {
  GUEST_HOUSE = "GUEST_HOUSE",
  HOSTEL = "HOSTEL",
  HOTEL = "HOTEL",
  MOTEL = "MOTEL",
  PENSION = "PENSION",
  YOUTH_HOSTEL = "YOUTH_HOSTEL",
}

export enum Language {
  CHINESE = "CHINESE",
  ENGLISH = "ENGLISH",
  JAPANESE = "JAPANESE",
  KOREAN = "KOREAN",
}

export enum LayoutType {
  Layout_A = "Layout_A",
  Layout_B = "Layout_B",
}

export enum MemoType {
  HOST = "HOST",
}

export enum MsgType {
  LMS = "LMS",
  MMS = "MMS",
  SMS = "SMS",
}

export enum NotiLevel {
  NORMAL = "NORMAL",
  WARN = "WARN",
}

export enum NotiType {
  ELSE = "ELSE",
  NEW_BOOKING = "NEW_BOOKING",
  PRODUCT_EXPIRE = "PRODUCT_EXPIRE",
  TO_ALL = "TO_ALL",
}

export enum PayMethod {
  CARD = "CARD",
  CASH = "CASH",
  CHANNEL_PAY = "CHANNEL_PAY",
  VBANK = "VBANK",
}

export enum PaymentStatus {
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  PROGRESSING = "PROGRESSING",
}

export enum PaymentType {
  ONE_TIME = "ONE_TIME",
  SUBSCRIPTION = "SUBSCRIPTION",
}

export enum PricingType {
  DOMITORY = "DOMITORY",
  ROOM = "ROOM",
}

export enum ProductTypeKey {
  DEMO = "DEMO",
  NEGOTIATION = "NEGOTIATION",
  PREMIUM = "PREMIUM",
  STANDARD = "STANDARD",
}

export enum RoomGender {
  ANY = "ANY",
  FEMALE = "FEMALE",
  MALE = "MALE",
  SEPARATELY = "SEPARATELY",
}

export enum SalesStatisticsUnit {
  BY_DATE = "BY_DATE",
  BY_DAY_OF_WEEK = "BY_DAY_OF_WEEK",
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  YEARLY = "YEARLY",
}

export enum SendTarget {
  BOTH = "BOTH",
  GUEST = "GUEST",
  HOST = "HOST",
}

export enum TransactionStatus {
  CANCEL = "CANCEL",
  COMPLETE = "COMPLETE",
  FAIL = "FAIL",
  PROGRESSING = "PROGRESSING",
}

export enum UserRole {
  ADMIN = "ADMIN",
  AGENCY = "AGENCY",
  DEVELOPER = "DEVELOPER",
  GHOST = "GHOST",
  GUEST = "GUEST",
  HOST = "HOST",
}

export interface AllocateInfoInput {
  roomId: string;
  bedIndex?: number | null;
}

export interface AllocateOptions {
  forceToAllocate: boolean;
}

export interface AllocationInput {
  roomId: string;
  bedIndex?: number | null;
  gender?: Gender | null;
}

export interface AppInfoRequestInput {
  useHostApp?: boolean | null;
  url?: string | null;
  layoutType?: LayoutType | null;
}

export interface AssigTimelineInput {
  roomTypeTabEnable: boolean;
  itemBlockOp?: ItemBlockOpInput | null;
}

export interface BaseConfigInput {
  pricingTypes: PricingType[];
}

export interface BlockOptionInput {
  color?: string | null;
}

export interface BookingConfigInput {
  newBookingMark?: NewBookingMarkInput | null;
  collectingInfoFromGuest?: CollectingInfoFromGuestInput | null;
}

export interface CheckInInput {
  isIn: boolean;
  checkInDateTime?: any | null;
}

export interface CheckInOutInput {
  checkIn: any;
  checkOut: any;
}

export interface CollectingInfoFromGuestInput {
  email?: boolean | null;
  country?: boolean | null;
}

export interface CreateMemoParams {
  title?: string | null;
  text: string;
  memoType: MemoType;
  enableAlert?: boolean | null;
}

export interface CreateNotiParams {
  title?: string | null;
  validPeriod?: any | null;
  msg?: string | null;
  notiType: NotiType;
  notiLevel?: NotiLevel | null;
}

export interface CreateRoomTypeInput {
  name: string;
  houseId: string;
  pricingType: PricingType;
  roomGender?: RoomGender | null;
  img?: JdFileInput | null;
  peopleCount: number;
  peopleCountMax?: number | null;
  defaultPrice?: number | null;
  description?: string | null;
  tags?: TagInput[] | null;
}

export interface DayOfWeekPriceInput {
  day: Day;
  price: number;
  additionalPrice?: number | null;
}

export interface GetBookingParams {
  name: string;
  phoneNumber: string;
  password: string;
}

export interface GetBookingsFilter {
  bookingId?: string | null;
  name?: string | null;
  phoneNumnber?: string | null;
  stayDate?: any | null;
  createdAt?: any | null;
}

export interface HMmenuInput {
  id: number;
  type?: HMmenuType | null;
  name?: any | null;
  img?: JdFileInput | null;
  content?: any | null;
  icon?: string | null;
  isEnable?: boolean | null;
}

export interface InitValueGetCapacityToRoomInput {
  count: number;
  gender: Gender;
}

export interface ItemBlockOpInput {
  itemBlockOpEnable: boolean;
  useColor: boolean;
}

export interface JdFileInput {
  url: any;
  filename: string;
  mimeType: string;
  tags?: JdTagInput[] | null;
}

export interface JdTagInput {
  Key: string;
  Value: string;
}

export interface LocationInput {
  address: string;
  addressDetail?: string | null;
  lat: number;
  lng: number;
}

export interface NewBookingMarkInput {
  enable?: boolean | null;
  newGuestTime: number;
}

export interface PollingPeriodInput {
  enable: boolean;
  period: number;
}

export interface RoomTypePriceInput {
  roomTypeId: string;
  defaultPrice?: number | null;
  defaultAdditionalPrice?: number | null;
}

export interface SeasonPriceInput {
  roomTypeId: string;
  defaultPrice: number;
  defaultAdditionalPrice?: number | null;
  dayOfWeekPriceList?: DayOfWeekPriceInput[] | null;
}

export interface SmsAutoSendInput {
  enable: boolean;
  when: AutoSendWhen;
  who: SendTarget;
}

export interface SmsSenderInput {
  phoneNumber: any;
  registered?: boolean | null;
}

export interface SmsTemplateInput {
  formatName: string;
  smsFormat: string;
  smsSendCase?: SmsAutoSendInput | null;
}

/**
 * hosueId는 token에 의해서 불러와지는걸로
 */
export interface StartBookingBookerInput {
  name: any;
  phoneNumber: any;
  password: string;
  memo: string;
  email?: string | null;
  agreePrivacyPolicy: boolean;
}

export interface StartBookingDomitoryGuestInput {
  roomTypeId: string;
  countFemale: number;
  countMale: number;
}

export interface StartBookingPaymentInput {
  price: number;
  payMethod: PayMethod;
  status?: PaymentStatus | null;
}

export interface StartBookingRoomGuestInput {
  roomTypeId: string;
  countRoom: number;
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

export interface UpdateBookingMutationParamsInput {
  name?: any | null;
  phoneNumber?: any | null;
  email?: any | null;
  checkInInfo?: CheckInInput | null;
  price?: number | null;
  payMethod?: PayMethod | null;
  paymentStatus?: PaymentStatus | null;
  bookingStatus?: BookingStatus | null;
  memo?: string | null;
}

export interface UpdateHMparams {
  title?: any | null;
  backgroundImg?: JdFileInput | null;
  houseProfileImg?: string | null;
  email?: string | null;
  phoneNumber?: any | null;
  enableLangs?: Language[] | null;
  menus?: (HMmenuInput | null)[] | null;
}

export interface UpdateHouseConfigParams {
  pollingPeriod?: PollingPeriodInput | null;
  assigTimeline?: AssigTimelineInput | null;
  bookingConfig?: BookingConfigInput | null;
  baseConfig?: BaseConfigInput | null;
}

export interface UpdateMemoParams {
  title?: string | null;
  enableAlert?: boolean | null;
  text: string;
  memoType: MemoType;
}

export interface UpdateProductParams {
  canHaveHostApp?: boolean | null;
  price?: number | null;
  layoutPrice?: number | null;
  layoutPricePaid?: boolean | null;
  appliedUrl?: string | null;
  layoutType?: LayoutType | null;
  existingHostApp?: boolean | null;
  description?: string | null;
  expireDate?: any | null;
}

export interface UpdateRoomTypeInput {
  name?: string | null;
  peopleCount?: number | null;
  peopleCountMax?: number | null;
  img?: JdFileInput | null;
  defaultPrice?: number | null;
  description?: string | null;
}

export interface UpdateSeasonPriceInput {
  seasonPriceId: string;
  defaultPrice?: number | null;
  defaultAdditionalPrice?: number | null;
  dayOfWeekPriceList?: DayOfWeekPriceInput[] | null;
}

export interface UpdateSmsAutoSendInput {
  enable: boolean;
  when: AutoSendWhen;
  who: SendTarget;
}

export interface UpdateSmsTemplateInput {
  formatName?: string | null;
  smsFormat?: string | null;
  smsSendCase?: UpdateSmsAutoSendInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
