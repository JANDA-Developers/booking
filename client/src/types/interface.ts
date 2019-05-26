import {
  getMyProfile_GetMyProfile_user,
  getHouse_GetHouse_house,
  getHouse_GetHouse_house_product,
  getAllRoomType_GetAllRoomType_roomTypes as getAllRoomType_GetAllRoomType_roomType,
  getBookers_GetBookers_bookers,
  getAllRoomTypeWithGuest_GetGuests_guests,
  getAllSeason_GetAllSeason_seasons,
  getAllSeasonTable_GetAllRoomType_roomTypes,
  getBooker_GetBooker_booker,
  getAppliedPriceWithDateRange_GetAppliedPriceWithDateRange_roomPrices,
  getAppliedPriceWithDateRange_GetAppliedPriceWithDateRange_seasonPrices
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
export interface GB_booker extends getBooker_GetBooker_booker {}
export interface IProduct extends getHouse_GetHouse_house_product {}
export interface IUser extends getMyProfile_GetMyProfile_user {}
export interface IHouse extends getHouse_GetHouse_house {}
export interface IDiv extends React.HTMLAttributes<HTMLDivElement> {}
export interface IRoomType extends getAllRoomType_GetAllRoomType_roomType {}
export interface IBooker extends getBookers_GetBookers_bookers {}
export interface IGuests extends getAllRoomTypeWithGuest_GetGuests_guests {}
export interface ISeason extends getAllSeason_GetAllSeason_seasons {}
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

export interface ITermsOfBookingInput {
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
