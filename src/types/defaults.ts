import { IuseImageUploaderOption, LANG } from "../hooks/hook";
import {
  GB_booking,
  IHouseConfigFull,
  IBlockOp,
  JdFile,
  JDpageInfo
} from "./interface";
import {
  RoomGender,
  PricingType,
  PayMethod,
  PaymentStatus,
  BookingStatus,
  LayoutType,
  TimePerMs,
  MemoType,
  UserRole,
  PaymentType,
  Gender
} from "./enum";

console.log("LANG");
console.log(LANG);

import {
  getBooking_GetBooking_booking_roomTypes,
  getSmsInfo_GetSmsInfo_smsInfo_smsTemplates,
  getSmsInfo_GetSmsInfo_smsInfo,
  getSpecification_GetHouse_house_product,
  getSpecification_GetHouse_house_product_appInfoRequested,
  getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline_itemBlockOp,
  getAllRoomType_GetAllRoomType_roomTypes_rooms,
  getMemos_GetMemos_memos,
  getMyProfile_GetMyProfile_user,
  getHM_GetHM_HM,
  getBooking_GetBooking_booking_guests_GuestDomitory,
  getMyProfile_GetMyProfile_user_paymentInfos
} from "./api";
import {
  IAssigItem,
  IAssigGroup,
  GuestTypeAdd
} from "../pages/bookingHost/assig/components/assigIntrerface";

export const DEFAULT_ROOMTYPE_ROOM: getAllRoomType_GetAllRoomType_roomTypes_rooms = {
  __typename: "Room",
  _id: "",
  createdAt: "",
  index: -1,
  name: "222",
  updatedAt: ""
};

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
  img: null,
  createdAt: undefined,
  _id: "",
  roomTemplateSrl: -1
};

// 유틸성을 위해 만들어둔 기본 booking
export const DEFAULT_BOOKING: GB_booking = {
  __typename: "Booking",
  _id: "default",
  memo: "",
  funnels: null,
  createdAt: "",
  updatedAt: "",
  status: BookingStatus.COMPLETE,
  isConfirm: false,
  isNew: false,
  roomTypes: null,
  name: "",
  phoneNumber: "",
  checkInInfo: {
    __typename: "CheckInInfo",
    isIn: false,
    checkInDateTime: new Date()
  },
  email: "",
  checkOut: null,
  checkIn: null,
  agreePrivacyPolicy: true,
  password: null,
  guests: null,
  payment: {
    __typename: "Payment",
    payMethod: PayMethod.CARD,
    paymentResultParam: null,
    status: PaymentStatus.COMPLETE,
    totalPrice: 0,
    type: PaymentType.ONE_TIME
  }
};

export const DEFAULT_ASSIG_GROUP: IAssigGroup = {
  id: "-1",
  title: "",
  roomTypeId: "-1",
  roomTypeIndex: -1,
  roomIndex: -1,
  room: {
    _id: "",
    name: ""
  },
  roomType: { ...DEFAULT_ROOMTYPE, rooms: [] },
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
  url: "",
  useHostApp: false
};

// specification에서 사용
export const DEFAULT_PRODUCT: getSpecification_GetHouse_house_product = {
  __typename: "Product",
  _id: "0",
  status: {
    __typename: "ProductStatus",
    discontinueDate: "",
    isContinue: false
  },
  daysLeftToExpire: 0,
  billKey: null,
  expireDate: new Date(),
  isExpired: false,
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
  name: "",
  price: 0,
  productType: {
    __typename: "ProductType",
    _id: "",
    name: ""
  },
  updatedAt: ""
};

export const DEFAULT_NONE_GOUP: IAssigGroup = {
  ...DEFAULT_ASSIG_GROUP,
  id: "noneGroup",
  type: "noneGroup"
};

export const DEFAULT_BLOCK_OP: IBlockOp = {
  __typename: "BlockOption",
  color: null
};

export const DEFAULT_ASSIG_ITEM: IAssigItem = {
  bedIndex: -1,
  bookingId: "",
  end: 0,
  gender: null,
  group: "",
  itemIndex: -1,
  id: "",
  checkInInfo: false,
  name: "",
  status: BookingStatus.COMPLETE,
  roomId: "",
  temp: false,
  roomTypeId: "",
  loading: false,
  start: 0,
  type: GuestTypeAdd.BLOCK,
  canMove: true,
  blockOption: DEFAULT_BLOCK_OP,
  showEffect: false,
  showNewBadge: false
};

export const DEFAULT_ADDITION_BLOCKOP: getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline_itemBlockOp = {
  __typename: "ItemBlockOp",
  itemBlockOpEnable: false,
  useColor: false
};

export const DEFAULT_HM: getHM_GetHM_HM = {
  __typename: "HM",
  _id: "",
  title: {},
  backgroundImg: null,
  createdAt: "",
  location: {
    __typename: "Location",
    address: "",
    addressDetail: "",
    lat: 0,
    lng: 0
  },
  email: "",
  langList: [],
  menus: [],
  phoneNumber: "",
  profileImg: null,
  updatedAt: ""
};

export const DEFAULT_MEMO: getMemos_GetMemos_memos = {
  __typename: "Memo",
  _id: "default__memo",
  createdAt: "",
  memoType: MemoType.HOST,
  text: "",
  enableAlert: false,
  title: "",
  updatedAt: ""
};

export const DEFAULT_IMAGEUP_LOADER_OPTION: IuseImageUploaderOption = {
  quality: 100,
  resizeMaxHeight: 500,
  resizeMaxWidth: 500
};

// 서버 모델에서 가져옴
// @ts-ignore
export const DEFAULT_HOUSE_CONFIG: IHouseConfigFull = {
  __typename: "HouseConfig",
  pollingPeriod: {
    __typename: "PollingPeriod",
    enable: false,
    period: 50000
  },
  assigTimeline: {
    __typename: "AssigTimeline",
    roomTypeTabEnable: false,
    itemBlockOp: {
      __typename: "ItemBlockOp",
      itemBlockOpEnable: false,
      useColor: false
    }
  },
  bookingConfig: {
    __typename: "BookingConfig",
    newBookingMark: {
      __typename: "NewBookingMark",
      enable: false,
      newGuestTime: TimePerMs.DAY
    },
    collectingInfoFromGuest: {
      __typename: "CollectingInfoFromGuest",
      email: false,
      country: false
    }
  },
  baseConfig: {
    __typename: "BaseConfig",
    pricingTypes: []
  }
};

export const DEFAULT_GUEST: getBooking_GetBooking_booking_guests_GuestDomitory = {
  __typename: "GuestDomitory",
  _id: "",
  bedIndex: 0,
  checkIn: "",
  checkOut: "",
  gender: Gender.MALE,
  pricingType: PricingType.DOMITORY,
  room: null,
  roomType: DEFAULT_ROOMTYPE
};

export const DEFAULT_FILE: JdFile = {
  filename: "",
  mimeType: "",
  tags: [],
  url: "",
  __typename: "JdFile"
};

export const DEFAULT_USER: getMyProfile_GetMyProfile_user = {
  __typename: "User",
  _id: "",
  createdAt: "",
  checkPrivacyPolicy: false,
  paymentInfos: null,
  updatedAt: "",
  name: "",
  phoneNumber: "",
  userRoles: [],
  email: "",
  password: "",
  userRole: UserRole.GHOST,
  isPhoneVerified: false,
  profileImg: null,
  houses: []
};

export const DEFAULT_PAYMENT_INFO: getMyProfile_GetMyProfile_user_paymentInfos = {
  __typename: "PaymentInfo",
  authDate: new Date(),
  billKey: "",
  cardCl: 0,
  cardName: "",
  cardNo: "",
  isLive: false
};

export const DEFAULT_CARD_INFO = {
  cardNumber: "",
  idNumber: "",
  exp: "",
  cardPassword: ""
};

export const DEFAULT_PAY_HISTORY: JDpageInfo = {
  currentPage: 0,
  rowCount: 0,
  totalPage: 0
};
