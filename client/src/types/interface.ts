import {
  getMyProfile_GetMyProfile_user_houses,
  getMyProfile_GetMyProfile_user,
  getHouse_GetHouse_house,
} from '../types/api';
import { IselectedOption } from '../atoms/forms/SelectBox';

export interface IUser extends getMyProfile_GetMyProfile_user {}
export interface IHouse extends getHouse_GetHouse_house {}
export interface IDiv extends React.HTMLAttributes<HTMLDivElement> {}
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
  selectedHouse: IselectedOption;
}
