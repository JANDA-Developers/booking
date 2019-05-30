import {
  RoomGender,
  PricingType,
  Gender,
  BookerModalType
} from "../../../../types/enum";
import {IRoomType} from "../../../../types/interface";
import {MutationFn} from "react-apollo";
import {
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  deleteBlock,
  deleteBlockVariables,
  updateBooker,
  updateBookerVariables,
  deleteGuests,
  deleteGuestsVariables,
  createBlock,
  createBlockVariables
} from "../../../../types/api";
import {IUseModal} from "../../../../actions/hook";
import {string} from "prop-types";

export interface IAssigTimelineContext {
  isMobile: boolean;
  windowWidth: number;
  windowHeight: number;
  groupData: IAssigGroup[];
  houseId: string;
}

export interface ICrushTime {
  crushGuest: string;
  crushGuest2: string;
  guestIndex: number;
  start: number;
  end: number;
}

export type TIsTherePerson = (
  startTime: number,
  endTime: number,
  groupId: string,
  guest: IAssigItem
) => false | (false | ICrushTime)[];

export type TFilterTimeZone = (
  from: number,
  to: number,
  roomId?: string | undefined
) => IAssigItem[];

export type TGetCrushTimeByTwoGuest = (
  guest: IAssigItem,
  guest2: IAssigItem
) => false | ICrushTime;

export type TFindItemById = (guestId: string) => IAssigItem;

export type TFindGroupById = (groupId: string) => IAssigGroup;

export type TRemoveMark = () => void;

export type TAllTooltipsHide = () => void;

export type TDeleteGuestById = (guestId: string) => void;

export type TDeleteItemById = (id: string) => void;

export interface ILocation {
  clientX: number;
  clientY: number;
}

export type TOpenMakeMenu = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation,
  props?: IMakeMenuProps
) => void;

export type TOpenBlockMenu = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation,
  props?: IBlcokMenuProps
) => void;

export type TOpenCanvasMenu = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation,
  props?: ICanvasMenuProps
) => void;

export type TIsGenderSafe = (
  targetGroup: IAssigGroup,
  item: IAssigItem,
  start: number,
  end: number
) => boolean | ICrushTime[];

export type TOneGuestValidation = (
  guest: IAssigItem,
  start: number,
  end: number,
  groupId: string
) => void;

export type TAddBlock = (time: number, groupId: string) => Promise<void>;

export type TGenderToggleById = (guestId: string) => void;

export type TResizeValidater = (item: IAssigItem, time: number) => void;

export type TResizeLinkedItems = (bookerId: string, newTime: number) => void;

export type TMoveLinkedItems = (bookerId: string, newTime: number) => void;

export type TToogleCheckIn = (
  guestId?: string | undefined,
  guestIndex?: number | undefined
) => void;

export interface IAssigGroup {
  id: string;
  title: string;
  roomTypeId: string;
  roomTypeIndex: number;
  roomIndex: number;
  roomType: IRoomType;
  roomId: string;
  placeIndex: number;
  isLastOfRoom: boolean;
  isLastOfRoomType: boolean;
  bedIndex: number;
  type: "add" | "normal" | "addRoomType";
  roomGender: RoomGender | null;
  pricingType: PricingType;
}
export interface IAssigItemCrush {
  guestIndex: number;
  reason: string;
  start: number | null;
  end: number | null;
}

export interface IAssigItem {
  id: string;
  guestIndex: number;
  name: string;
  group: string;
  bookerId: string;
  isCheckin: boolean;
  roomTypeId: string;
  roomId: string;
  bedIndex: number;
  start: number;
  end: number;
  gender: Gender | null;
  isUnsettled: boolean;
  canMove: boolean;
  validate: IAssigItemCrush[];
  type: GuestTypeAdd;
}

export interface IAssigMutationes {
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
  deleteBlockMu: MutationFn<deleteBlock, deleteBlockVariables>;
  updateBookerMu: MutationFn<updateBooker, updateBookerVariables>;
  deleteGuestsMu: MutationFn<deleteGuests, deleteGuestsVariables>;
  createBlockMu: MutationFn<createBlock, createBlockVariables>;
}

export interface ICanvasMenuProps {
  start: number;
  end: number;
  groupId: string;
  group: IAssigGroup;
}

export interface IBlcokMenuProps {
  item: IAssigItem;
}

export enum GuestTypeAdd {
  BLOCK = "BLOCK",
  GUEST = "GUEST",
  MARK = "MARK",
  MAKE = "MAKE"
}

export interface IMakeMenuProps {
  item: IAssigItem;
}

export interface IDeleteMenuProps {
  item: IAssigItem;
}

export interface IAssigTimelineHooks {
  bookerModal: IUseModal<any>;
  guestValue: any[];
  canvasMenuProps: ICanvasMenuProps;
  makeMenuProps: IMakeMenuProps;
  blockMenuProps: IDeleteMenuProps;
  setBlockMenuProps: React.Dispatch<React.SetStateAction<IDeleteMenuProps>>;
  setGuestValue: React.Dispatch<React.SetStateAction<any[]>>;
  setCanvasMenuProps: React.Dispatch<React.SetStateAction<ICanvasMenuProps>>;
  setMakeMenuProps: React.Dispatch<React.SetStateAction<IMakeMenuProps>>;
  confirmDelteGuestHook: IUseModal<any>;
}

export interface IAssigTimelineUtils {
  findItemById: TFindItemById;
  findGroupById: TFindGroupById;
  removeMark: TRemoveMark;
  isTherePerson: TIsTherePerson;
  filterTimeZone: TFilterTimeZone;
  allTooltipsHide: TAllTooltipsHide;
  getCrushTimeByTwoGuest: TGetCrushTimeByTwoGuest;
  deleteGuestById: TDeleteGuestById;
  deleteItemById: TDeleteItemById;
  openMakeMenu: TOpenMakeMenu;
  isGenderSafe: TIsGenderSafe;
  oneGuestValidation: TOneGuestValidation;
  addBlock: TAddBlock;
  genderToggleById: TGenderToggleById;
  resizeValidater: TResizeValidater;
  resizeLinkedItems: TResizeLinkedItems;
  moveLinkedItems: TMoveLinkedItems;
  toogleCheckInOut: TToogleCheckIn;
  openBlockMenu: TOpenBlockMenu;
  openCanvasMenu: TOpenCanvasMenu;
}

export interface IAssigInfo {
  bedIndex: number;
  roomId: string;
  gender: Gender | null;
}
// ⭐️ 배정달력에서 예약 생성시사용
export interface ICreateBookerInfo {
  type: BookerModalType.CREATE | BookerModalType.CREATE_WITH_ASSIG;
  start: number;
  end: number;
  resvInfoes: {
    group: IAssigGroup;
    roomTypeName: string;
    roomTypeId: string;
    gender: Gender | null;
  }[];
  assigInfo: IAssigInfo[];
}
