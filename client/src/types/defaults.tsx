import {GB_booking} from "./interface";
import {
  RoomGender,
  PricingType,
  PayMethod,
  PaymentStatus,
  BookingStatus,
  Gender,
  SendTarget,
  LayoutType
} from "./enum";
import {
  getBooking_GetBooking_booking_roomTypes,
  getSmsInfo_GetSmsInfo_smsInfo_smsTemplates,
  getSmsInfo_GetSmsInfo_smsInfo,
  getSpecification_GetHouse_house_product_productType,
  getSpecification_GetHouse_house_product,
  getSpecification_GetHouse_house_product_appInfoRequested
} from "./api";
import {
  IAssigItem,
  IAssigGroup,
  GuestTypeAdd
} from "../pages/middleServer/assig/components/assigIntrerface";
export const DEFAULT_ROOMTYPE: getBooking_GetBooking_booking_roomTypes = {
  __typename: "RoomType",
  name: "_",
  pricingType: PricingType.DOMITORY,
  peopleCount: 0,
  peopleCountMax: 0,
  index: -1,
  roomCount: 0,
  roomGender: RoomGender.ANY,
  description: null,
  defaultPrice: null,
  updatedAt: null,
  img: undefined,
  createdAt: undefined,
  _id: "",
  roomTemplateSrl: -1
};

// 유틸성을 위해 만들어둔 기본 booking
export const DEFAULT_BOOKING: GB_booking = {
  __typename: "Booking",
  _id: "default",
  memo: "",
  createdAt: "",
  updatedAt: "",
  roomTypes: null,
  name: "",
  phoneNumber: "",
  checkIn: {
    __typename: "CheckIn",
    isIn: false,
    checkInDateTime: new Date()
  },
  payMethod: PayMethod.CASH,
  paymentStatus: PaymentStatus.NOT_YET,
  email: "",
  end: null,
  start: null,
  agreePrivacyPolicy: true,
  price: 0,
  password: null,
  bookingStatus: BookingStatus.COMPLETE,
  guests: null
};

export const DEFAULT_ASSIG_ITEM: IAssigItem = {
  bedIndex: -1,
  bookingId: "",
  end: 0,
  gender: null,
  group: "",
  guestIndex: -1,
  id: "",
  isCheckin: false,
  isUnsettled: false,
  name: "",
  roomId: "",
  roomTypeId: "",
  start: 0,
  type: GuestTypeAdd.BLOCK,
  validate: [],
  canMove: true
};

export const DEFAULT_ASSIG_GROUP: IAssigGroup = {
  id: "-1",
  title: "",
  roomTypeId: "-1",
  roomTypeIndex: -1,
  roomIndex: -1,
  roomType: {...DEFAULT_ROOMTYPE, rooms: []},
  roomId: "-1",
  bedIndex: -1,
  placeIndex: -1,
  isLastOfRoom: false,
  isLastOfRoomType: false,
  type: "normal",
  roomGender: null,
  pricingType: PricingType.ROOM
};

export const DEFAULT_SMS_TEMPLATE: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates = {
  _id: "-1",
  __typename: "SmsTemplate",
  formatName: "",
  smsFormat: "",
  smsSendCase: null
};

export const DEFAULT_SMS_INFO: getSmsInfo_GetSmsInfo_smsInfo = {
  __typename: "SmsInfo",
  _id: "-1",
  receivers: null,
  sender: null,
  smsTemplates: null
};

export const DEFAULT_APP_INFO_REQUEST: getSpecification_GetHouse_house_product_appInfoRequested = {
  __typename: "AppInfoRequest",
  isDone: false,
  layoutType: LayoutType.Layout_A,
  requestedDate: "",
  url: ""
};

export const DEFAULT_PRODUCT: getSpecification_GetHouse_house_product = {
  __typename: "Product",
  _id: "-1",
  appliedUrl: "",
  appInfoRequested: [],
  roomCount: 0,
  roomCountExtraCharge: 0,
  bookingCount: 0,
  bookingCountExtraCharge: 0,
  canHaveHostApp: false,
  createdAt: "",
  description: "",
  discountedPrice: 0,
  existingHostApp: false,
  layoutPrice: null,
  layoutPricePaid: false,
  layoutType: LayoutType.Layout_A,
  name: "상품없음",
  price: 0,
  productType: {
    __typename: "ProductType",
    _id: "",
    name: "상품없음"
  },
  updatedAt: ""
};

export const DEFAULT_NONE_GOUP: IAssigGroup = {
  ...DEFAULT_ASSIG_GROUP,
  id: "noneGroup",
  type: "noneGroup"
};
