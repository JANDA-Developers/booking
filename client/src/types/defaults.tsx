import {GB_booking, IHouseConfigFull, IBlockOp} from "./interface";
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
  PaymentType
} from "./enum";
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
  getBooking_GetBooking_booking_payment
} from "./api";
import {
  IAssigItem,
  IAssigGroup,
  GuestTypeAdd
} from "../pages/middleServer/assig/components/assigIntrerface";
import {s4} from "../utils/utils";
export const DEFAUT_ROOMTYPE_ROOM: getAllRoomType_GetAllRoomType_roomTypes_rooms = {
  __typename: "Room",
  _id: "",
  createdAt: "",
  index: -1,
  name: "222",
  updatedAt: ""
};
export const DEFAUT_ROOMTYPE: getBooking_GetBooking_booking_roomTypes = {
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
export const DEFAUT_BOOKING: GB_booking = {
  __typename: "Booking",
  _id: "default",
  memo: "",
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

export const DEFAUT_ASSIG_GROUP: IAssigGroup = {
  id: "-1",
  title: "",
  roomTypeId: "-1",
  roomTypeIndex: -1,
  roomIndex: -1,
  roomType: {...DEFAUT_ROOMTYPE, rooms: []},
  roomId: "-1",
  bedIndex: -1,
  placeIndex: -1,
  isLastOfRoom: false,
  isLastOfRoomType: false,
  type: "normal",
  roomGender: null,
  pricingType: PricingType.ROOM
};

export const DEFAUT_SMS_TEMPLATE: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates = {
  _id: "-1",
  __typename: "SmsTemplate",
  formatName: "",
  smsFormat: "",
  smsSendCase: null
};

export const DEFAUT_SMS_INFO: getSmsInfo_GetSmsInfo_smsInfo = {
  __typename: "SmsInfo",
  _id: "-1",
  receivers: null,
  sender: null,
  smsTemplates: null
};

export const DEFAUT_APP_INFO_REQUEST: getSpecification_GetHouse_house_product_appInfoRequested = {
  __typename: "AppInfoRequest",
  isDone: false,
  layoutType: LayoutType.Layout_A,
  requestedDate: "",
  url: "",
  useHostApp: false
};

// specification에서 사용
export const DEFAUT_PRODUCT: getSpecification_GetHouse_house_product = {
  __typename: "Product",
  _id: "0",
  daysLeftToExpire: 0,
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
  name: "상품없음",
  price: 0,
  productType: {
    __typename: "ProductType",
    _id: "",
    name: "상품없음"
  },
  updatedAt: ""
};

export const DEFAUT_NONE_GOUP: IAssigGroup = {
  ...DEFAUT_ASSIG_GROUP,
  id: "noneGroup",
  type: "noneGroup"
};

export const DEFAUT_BLOCK_OP: IBlockOp = {
  __typename: "BlockOption",
  color: null
};

export const DEFAUT_ASSIG_ITEM: IAssigItem = {
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
  blockOption: DEFAUT_BLOCK_OP,
  showEffect: false,
  showNewBadge: false
};

export const DEFAUT_ADDITION_BLOCKOP: getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline_itemBlockOp = {
  __typename: "ItemBlockOp",
  itemBlockOpEnable: false,
  useColor: false
};

export const DEFAUT_HM: getHM_GetHM_HM = {
  __typename: "HM",
  _id: "",
  title: {},
  backgroundImg: "",
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
  profileImg: "",
  updatedAt: ""
};

export const DEFAUT_MEMO: getMemos_GetMemos_memos = {
  __typename: "Memo",
  _id: s4(),
  createdAt: "",
  memoType: MemoType.HOST,
  text: "",
  enableAlert: false,
  title: "",
  updatedAt: ""
};

// 서버 모델에서 가져옴
// @ts-ignore
export const DEFAUT_HOUSE_CONFIG: IHouseConfigFull = {
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

export const DEFAUT_USER: getMyProfile_GetMyProfile_user = {
  __typename: "User",
  _id: "",
  createdAt: "",
  checkPrivacyPolicy: false,
  updatedAt: "",
  name: "",
  phoneNumber: "",
  userRoles: [],
  email: "",
  password: "",
  userRole: UserRole.GHOST,
  isPhoneVerified: false,
  profileImg: undefined,
  houses: []
};
