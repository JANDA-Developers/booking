import {
  getMyProfile_GetMyProfile_user,
  getHouse_GetHouse_house_product,
  getAllRoomType_GetAllRoomType_roomTypes as getAllRoomType_GetAllRoomType_roomType,
  getBookings_GetBookings_bookings,
  getAllRoomTypeWithGuest_GetGuests_guests,
  getAllSeasonTable_GetAllRoomType_roomTypes,
  getBooking_GetBooking_booking,
  getAllRoomTypeWithGuest_GetBlocks_blocks,
  getAllSeasonTable_GetAllSeason_seasons,
  getMyProfile_GetMyProfile_user_houses,
  getMyProfile_GetMyProfile_user_houses_houseConfig,
  ProductTypeKey,
  getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory,
  getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom,
  getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_blockOption,
  singleUpload_SingleUpload_jdFile
} from "./api";
import {IselectedOption} from "../atoms/forms/selectBox/SelectBox";
import {PricingType} from "./enum";
import {MutationFunctionOptions} from "@apollo/react-common";
import {ExecutionResult} from "graphql";
import {IStartBookingCallBack} from "../pages/bookingHost/assig/components/assigIntrerface";
export interface JdFile extends singleUpload_SingleUpload_jdFile {}

export interface GASt_RoomType
  extends getAllSeasonTable_GetAllRoomType_roomTypes {}
export interface GB_booking extends getBooking_GetBooking_booking {}
export interface IProduct extends getHouse_GetHouse_house_product {}
export interface IUser extends getMyProfile_GetMyProfile_user {}
export interface IHouse extends getMyProfile_GetMyProfile_user_houses {}
export interface IHouseConfig
  extends getMyProfile_GetMyProfile_user_houses_houseConfig {}
export interface IDiv extends React.HTMLAttributes<HTMLDivElement> {}
export interface IUl extends React.HTMLAttributes<HTMLUListElement> {}
export interface IRoomType extends getAllRoomType_GetAllRoomType_roomType {}
export interface IBooking extends getBookings_GetBookings_bookings {}
export type IGuest = getAllRoomTypeWithGuest_GetGuests_guests;
export type IGuestD = getAllRoomTypeWithGuest_GetGuests_guests_GuestDomitory;
export type IGuestR = getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom;
export interface ISeason extends getAllSeasonTable_GetAllSeason_seasons {}
export interface IBlock extends getAllRoomTypeWithGuest_GetBlocks_blocks {}
export interface IBlockOp
  extends getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_blockOption {}
export interface IPageInfo {
  currentPage: number;
  totalPage: number;
  rowCount: number;
}
// 👿 사용중지
export interface ICursorPageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface IPage {
  pageInfo: IPageInfo;
  totalCount: number;
}
export interface IPageResult {
  origin: any;
  data: any;
  pageInfo: IPage;
}
export type BookingModalMode = "READ_ONLY" | "CREATE" | "CREATE_ASSIG";
export interface ISelectHouse {
  ok: boolean;
  erorr: any;
}
export interface ISelectHouseVariables {
  selectedHouse: IselectedOption | null;
}
export interface ILocationInput {
  address: string;
  addressDetail?: string | null;
  lat: number;
  lng: number;
}

export interface ITagInput {
  name: string;
  content: string;
  icon?: string | null;
}

// use Mutation MU 축약용
export type IMu<M, MV> = (
  options?: MutationFunctionOptions<M, MV> | undefined
) => Promise<ExecutionResult<M>>;

export type TBookingModalOpenWithMark = (
  startBookingCallBack: IStartBookingCallBack
) => void;

export interface ITermsOfBookerInput {
  farthestSelectableDate: number;
  nearestSelectableDate: number;
  selectableDateRange: number;
}

export interface ITermsOfRefundInput {
  beforeDays: number;
  rate: number;
  description?: string | null;
}
/* 타임라인 -------------------------------------------------------------------------- */

export interface ITimelineContext {
  timelineWidth: number;
  visibleTimeStart: number;
  visibleTimeEnd: number;
  canvasTimeStart: number;
  canvasTimeEn: number;
}
export interface IItemContext {
  dimensions: any;
  useResizeHandle: boolean;
  title: string;
  canMove: boolean;
  canResizeLeft: boolean;
  canResizeRight: boolean;
  selected: boolean;
  dragging: boolean;
  dragStart: any;
  dragTime: number;
  resizing: boolean;
  resizeEdge: "left" | "right";
  resizeStart: number;
  resizeTime: number;
  width: boolean;
}

export interface IGuestCount {
  male: number;
  female: number;
  roomCount: number;
}

export interface IHouseConfigFull extends IHouseConfig {
  __typename: "HouseConfig";
  pollingPeriod: {
    __typename: "PollingPeriod";
    enable: false;
    period: number;
  };
  assigTimeline: {
    __typename: "AssigTimeline";
    roomTypeTabEnable: false;
    itemBlockOp: {
      __typename: "ItemBlockOp";
      itemBlockOpEnable: boolean;
      useColor: boolean;
    };
  };
  bookingConfig: {
    __typename: "BookingConfig";
    newBookingMark: {
      __typename: "NewBookingMark";
      enable: false;
      newGuestTime: number;
    };
    collectingInfoFromGuest: {
      __typename: "CollectingInfoFromGuest";
      email: false;
      country: false;
    };
  };
  baseConfig: {
    __typename: "BaseConfig";
    pricingTypes: PricingType[];
  };
}

export interface IHolidaysByApi {
  dateKind: string;
  dateName: string;
  searchHoliday: string;
  locdate: string;
  seq: number;
}

export interface IProductTypeDesc {
  _id: string;
  name: string;
  price: number;
  roomCount: number;
  key: ProductTypeKey;
  roomCountExtraCharge: number;
  bookingCount: number;
  bookingCountExtraCharge: number;
  description: string | null;
  canHaveHostApp: boolean;
  shortDesc: string | JSX.Element | JSX.Element[];
  detailDesc: string | JSX.Element | JSX.Element[];
  createdAt: Date;
  updatedAt: Date;
  icon: any;
  priceText: string;
  disable?: boolean | undefined;
}

/*  -------------------------------------------------------------------------- */
