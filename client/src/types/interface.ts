import {
  getMyProfile_GetMyProfile_user,
  getHouse_GetHouse_house,
  getHouse_GetHouse_house_product,
  getAllRoomType_GetAllRoomType_roomTypes as getAllRoomType_GetAllRoomType_roomType,
  getBookers_GetBookers_bookers,
  getBookers_GetBookers_bookers_bookings,
  getAllRoomTypeWithGuest_GetGuests_guests,
} from './api';
import { IselectedOption } from '../atoms/forms/selectBox/SelectBox';

export interface IProduct extends getHouse_GetHouse_house_product {}
export interface IUser extends getMyProfile_GetMyProfile_user {}
export interface IHouse extends getHouse_GetHouse_house {}
export interface IDiv extends React.HTMLAttributes<HTMLDivElement> {}
export interface IRoomType extends getAllRoomType_GetAllRoomType_roomType {}
export interface IBooker extends getBookers_GetBookers_bookers {}
export interface IBooking extends getBookers_GetBookers_bookers_bookings {}
export interface IGuests extends getAllRoomTypeWithGuest_GetGuests_guests {}
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
