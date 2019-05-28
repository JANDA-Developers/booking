import {GB_booker} from "./interface";
import {
  RoomGender,
  PricingType,
  PayMethod,
  PaymentStatus,
  BookingStatus,
  Gender,
  GuestTypeAdd
} from "./enum";
import {getBooker_GetBooker_booker_roomTypes} from "./api";
import {
  IAssigItem,
  IAssigGroup
} from "../pages/middleServer/assig/AssigTimelineWrap";

export const DEFAULT_ROOMTYPE: getBooker_GetBooker_booker_roomTypes = {
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

// 유틸성을 위해 만들어둔 기본 booker
export const DEFAULT_BOOKER: GB_booker = {
  __typename: "Booker",
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

export const DEFAULT_ASSIGITEM: IAssigItem = {
  bedIndex: -1,
  bookerId: "",
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
  type: "normal"
};
