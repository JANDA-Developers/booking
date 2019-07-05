import {
  getMyProfile_GetMyProfile_user,
  getHouse_GetHouse_house,
  getHouse_GetHouse_house_product,
  getAllRoomType_GetAllRoomType_roomTypes as getAllRoomType_GetAllRoomType_roomType,
  getBookings_GetBookings_bookings,
  getAllRoomTypeWithGuest_GetGuests_guests,
  getAllSeasonTable_GetAllRoomType_roomTypes,
  getBooking_GetBooking_booking,
  getAppliedPriceWithDateRange_GetAppliedPriceWithDateRange_roomPrices,
  getAppliedPriceWithDateRange_GetAppliedPriceWithDateRange_seasonPrices,
  getAllRoomTypeWithGuest_GetBlocks_blocks,
  getAllSeasonTable_GetAllSeason_seasons,
  getMyProfile_GetMyProfile_user_houses,
  getMyProfile_GetMyProfile_user_houses_houseConfig
} from "./api";
import {IselectedOption} from "../atoms/forms/selectBox/SelectBox";

// 🥈 중복이 생기면 이렇게 감싸서 처리하자.
//  moudle 과 naeme space를 사용하려 해보았으나 실패 ㅠ
export interface GAST_RoomType
  extends getAllSeasonTable_GetAllRoomType_roomTypes {}
export interface ISpecificPrices
  extends getAppliedPriceWithDateRange_GetAppliedPriceWithDateRange_roomPrices {}
export interface ISeasonPrices
  extends getAppliedPriceWithDateRange_GetAppliedPriceWithDateRange_seasonPrices {}
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
export interface IGuests extends getAllRoomTypeWithGuest_GetGuests_guests {}
export interface ISeason extends getAllSeasonTable_GetAllSeason_seasons {}
export interface IBlock extends getAllRoomTypeWithGuest_GetBlocks_blocks {}
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
// NEW 카운터들 이걸로 할수있으면 이걸로
export interface IResvCount {
  male: number;
  female: number;
  roomCount: number;
}

/*  -------------------------------------------------------------------------- */
