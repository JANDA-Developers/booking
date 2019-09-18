import {GB_booking, IHouseConfigFull} from "./interface";
import {
  RoomGender,
  PricingType,
  PayMethod,
  PaymentStatus,
  BookingStatus,
  Gender,
  SendTarget,
  LayoutType,
  HouseStatus,
  TimePerMs,
  MemoType,
  UserRole
} from "./enum";
import {
  getBooking_GetBooking_booking_roomTypes,
  getSmsInfo_GetSmsInfo_smsInfo_smsTemplates,
  getSmsInfo_GetSmsInfo_smsInfo,
  getSpecification_GetHouse_house_product_productType,
  getSpecification_GetHouse_house_product,
  getSpecification_GetHouse_house_product_appInfoRequested,
  getAllRoomTypeWithGuest_GetGuests_guests_blockOption,
  getMyProfile_GetMyProfile_user_houses_houseConfig_assigTimeline_itemBlockOp,
  getAllRoomType_GetAllRoomType_roomTypes_rooms,
  getMemos_GetMemos_memos,
  getMyProfile_GetMyProfile_user,
  getHManual_GetHManual_houseManual,
  getSmsInfo_GetSmsInfo_smsInfo_smsTemplates_smsSendCase
} from "./api";
import {
  IAssigItem,
  IAssigGroup,
  GuestTypeAdd
} from "../pages/middleServer/assig/components/assigIntrerface";
import {s4} from "../utils/utils";
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
  payMethod: PayMethod.CASH,
  paymentStatus: PaymentStatus.READY,
  email: "",
  checkOut: null,
  checkIn: null,
  agreePrivacyPolicy: true,
  price: null,
  password: null,
  bookingStatus: BookingStatus.COMPLETE,
  guests: null
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
  url: "",
  useHostApp: false
};

// specification에서 사용
export const DEFAULT_PRODUCT: getSpecification_GetHouse_house_product = {
  __typename: "Product",
  _id: "0",
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

export const DEFAULT_BLOCK_OP: getAllRoomTypeWithGuest_GetGuests_guests_blockOption = {
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
  roomId: "",
  roomTypeId: "",
  loading: false,
  start: 0,
  type: GuestTypeAdd.BLOCK,
  validate: [],
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

export const DEFAULT_HM: getHManual_GetHManual_houseManual = {
  __typename: "HouseManual",
  _id: "",
  backgroundImg: "",
  createdAt: "",
  house: {
    __typename: "House",
    location: {
      __typename: "Location",
      address: "",
      addressDetail: "",
      lat: 0,
      lng: 0
    }
  },
  langList: [],
  menus: [],
  phoneNumber: "",
  profileImg: "",
  updatedAt: ""
};

export const DEFAULT_MEMO: getMemos_GetMemos_memos = {
  __typename: "Memo",
  _id: s4(),
  createdAt: "",
  memoType: MemoType.HOST,
  text: "",
  important: false,
  title: "",
  updatedAt: ""
};

// 서버 모델에서 가져옴
// @ts-ignore
export const DEFAULT_HOUSE_CONFIG: IHouseConfigFull = {
  __typename: "HouseConfig",
  pollingPeriod: {
    __typename: "PollingPeriod",
    enable: false,
    period: 5000
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

export const DEFAULT_USER: getMyProfile_GetMyProfile_user = {
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
