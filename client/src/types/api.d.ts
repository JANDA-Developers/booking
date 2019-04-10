import { Data } from 'unist';

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllProductTypes
// ====================================================

export interface getAllProductTypes_GetAllProductTypes_productTypes {
  __typename: 'ProductType';
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
}

export interface getAllProductTypes_GetAllProductTypes {
  __typename: 'GetAllProductTypesResponse';
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

export interface getMyProfile_GetMyProfile_user_houses_product_productType {
  __typename: 'ProductType';
  _id: string;
}

export interface getMyProfile_GetMyProfile_user_houses_product {
  __typename: 'Product';
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  productType: getMyProfile_GetMyProfile_user_houses_product_productType;
}

export interface getMyProfile_GetMyProfile_user_houses_location {
  __typename: 'Location';
  address: string;
  addressDetail: string | null;
}

export interface getMyProfile_GetMyProfile_user_houses {
  __typename: 'House';
  product: getMyProfile_GetMyProfile_user_houses_product | null;
  _id: string;
  name: string;
  houseType: HouseType;
  location: getMyProfile_GetMyProfile_user_houses_location;
  createdAt: any;
  updatedAt: any | null;
}

export interface getMyProfile_GetMyProfile_user {
  __typename: 'User';
  _id: string;
  name: any;
  phoneNumber: any;
  password: any | null;
  email: any;
  isPhoneVerified: boolean;
  checkPrivacyPolicy: boolean;
  userRole: UserRole;
  houses: getMyProfile_GetMyProfile_user_houses[];
  createdAt: any;
  updatedAt: any | null;
}

export interface getMyProfile_GetMyProfile {
  __typename: 'GetMyProfileResponse';
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
// GraphQL query operation: getAllHouseForSuperUser
// ====================================================

export interface getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse_product_productType {
  __typename: 'ProductType';
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
}

export interface getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse_product {
  __typename: 'Product';
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
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  productType: getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse_product_productType;
}

export interface getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse_user {
  __typename: 'User';
  _id: string;
  name: any;
  phoneNumber: any;
  password: any | null;
  email: any;
  isPhoneVerified: boolean;
  userRole: UserRole;
  createdAt: any;
  updatedAt: any | null;
}

export interface getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse_location {
  __typename: 'Location';
  address: string;
  addressDetail: string | null;
  lat: number;
  lng: number;
}

export interface getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse {
  __typename: 'House';
  _id: string;
  name: string;
  houseType: HouseType;
  product: getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse_product | null;
  user: getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse_user;
  location: getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse_location;
  /**
   * Legarcy 연동을 위한 module_srl...
   */
  module_srl: number | null;
  createdAt: any;
  updatedAt: any | null;
  /**
   * Legarcy
   */
  moduleSrl: number | null;
}

export interface getAllHouseForSuperUser_GetAllHouseForSuperUser {
  __typename: 'GetAllHouseForSuperUserResponse';
  ok: boolean;
  error: string | null;
  allHouse: getAllHouseForSuperUser_GetAllHouseForSuperUser_allHouse[] | null;
}

export interface getAllHouseForSuperUser {
  GetAllHouseForSuperUser: getAllHouseForSuperUser_GetAllHouseForSuperUser;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: emailSignIn
// ====================================================

export interface emailSignIn_EmailSignIn {
  __typename: 'EmailSignInResponse';
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

export interface getHouse_GetHouse_house_product_productType {
  __typename: 'ProductType';
  _id: string;
}

export interface getHouse_GetHouse_house_product {
  __typename: 'Product';
  _id: string;
  /**
   * 제품 이름
   */
  name: string;
  productType: getHouse_GetHouse_house_product_productType;
}

export interface getHouse_GetHouse_house_location {
  __typename: 'Location';
  address: string;
  addressDetail: string | null;
}

export interface getHouse_GetHouse_house {
  __typename: 'House';
  _id: string;
  name: string;
  houseType: HouseType;
  product: getHouse_GetHouse_house_product | null;
  location: getHouse_GetHouse_house_location;
  createdAt: any;
  updatedAt: any | null;
}

export interface getHouse_GetHouse {
  __typename: 'GetHouseResponse';
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
// GraphQL query operation: getAllRoomType
// ====================================================

export interface getAllRoomType_GetAllRoomType_roomTypes_rooms {
  __typename: 'Room';
  _id: string;
  name: string;
  index: number;
  createdAt: any;
  updatedAt: any | null;
}

export interface getAllRoomType_GetAllRoomType_roomTypes {
  __typename: 'RoomType';
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  roomGender: RoomGender;
  roomCount: number;
  index: number;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  img: any | null;
  rooms: getAllRoomType_GetAllRoomType_roomTypes_rooms[];
}

export interface getAllRoomType_GetAllRoomType {
  __typename: 'GetAllRoomTypeResponse';
  ok: boolean | null;
  error: string | null;
  roomTypes: getAllRoomType_GetAllRoomType_roomTypes[] | null;
}

export interface getAllRoomType {
  GetAllRoomType: getAllRoomType_GetAllRoomType;
}

export interface getAllRoomTypeVariables {
  houseId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRoomType
// ====================================================

export interface createRoomType_CreateRoomType {
  __typename: 'CreateRoomTypeResponse';
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
  name: string;
  houseId: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax?: number | null;
  description?: string | null;
  tags?: TagInput[] | null;
  img?: any | null;
  roomGender?: RoomGender | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createRoom
// ====================================================

export interface createRoom_CreateRoom {
  __typename: 'CreateRoomResponse';
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
// GraphQL mutation operation: deleteRoomType
// ====================================================

export interface deleteRoomType_DeleteRoomType {
  __typename: 'DeleteRoomTypeResponse';
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
  __typename: 'DeleteRoomResponse';
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
  __typename: 'UpdateRoomResponse';
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
  __typename: 'UpdateRoomTypeResponse';
  ok: boolean;
  error: string | null;
}

export interface updateRoomType {
  UpdateRoomType: updateRoomType_UpdateRoomType;
}

export interface updateRoomTypeVariables {
  roomTypeId: string;
  houseId: string;
  name?: string | null;
  peopleCount?: number | null;
  peopleCountMax?: number | null;
  description?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateMyProfile
// ====================================================

export interface updateMyProfile_UpdateMyProfile {
  __typename: 'UpdateMyProfileResponse';
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
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startPhoneVerification
// ====================================================

export interface startPhoneVerification_StartPhoneVerification {
  __typename: 'StartPhoneVerificationResponse';
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
// GraphQL mutation operation: completePhoneVerification
// ====================================================

export interface completePhoneVerification_CompletePhoneVerification {
  __typename: 'CompletePhoneVerificationResponse';
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
  __typename: 'EmailSignUpResponse';
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
  __typename: 'UpdateHouseResponse';
  ok: boolean;
  error: string | null;
}

export interface updateHouse {
  UpdateHouse: updateHouse_UpdateHouse;
}

export interface updateHouseVariables {
  houseId: string;
  name?: string | null;
  houseType: HouseType;
  location: LocationInput;
  refundPolicy?: TermsOfRefundInput[] | null;
  termsOfBooking?: TermsOfBookingInput | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createHouse
// ====================================================

export interface createHouse_CreateHouse_house {
  __typename: 'House';
  _id: string;
  name: string;
}

export interface createHouse_CreateHouse {
  __typename: 'CreateHouseResponse';
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
  __typename: 'DeleteHouseResponse';
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
  __typename: 'BuyProductResponse';
  ok: boolean;
  error: string | null;
}

export interface buyProduct {
  BuyProduct: buyProduct_BuyProduct;
}

export interface buyProductVariables {
  houseId: string;
  productTypeId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: refundProduct
// ====================================================

export interface refundProduct_RefundProduct {
  __typename: 'RefundProductResponse';
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

//==============================================================
// START Enums and Input Objects
//==============================================================

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

export enum UserRole {
  ADMIN = 'ADMIN',
  GHOST = 'GHOST',
  GUEST = 'GUEST',
  HOST = 'HOST',
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

//==============================================================
// END Enums and Input Objects
//==============================================================
