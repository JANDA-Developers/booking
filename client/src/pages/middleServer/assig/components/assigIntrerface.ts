import {
  RoomGender,
  PricingType,
  Gender,
  BookingModalType
} from "../../../../types/enum";
import {IRoomType} from "../../../../types/interface";
import {MutationFn} from "react-apollo";
import {
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  deleteBlock,
  deleteBlockVariables,
  updateBooking,
  updateBookingVariables,
  deleteGuests,
  deleteGuestsVariables,
  createBlock,
  createBlockVariables,
  deleteBooking,
  deleteBookingVariables
} from "../../../../types/api";
import {IUseModal} from "../../../../actions/hook";
import {string} from "prop-types";
import {MouseEvent} from "react";

export interface IAssigTimelineContext {
  isMobile: boolean;
  windowWidth: number;
  windowHeight: number;
  groupData: IAssigGroup[];
  houseId: string;
  shortKey?: TShortKey;
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

export type TPopUpItemMenu = (
  location: {
    clientX: number;
    clientY: number;
  },
  target: IAssigItem
) => Promise<void>;

export type TFindGroupById = (groupId: string) => IAssigGroup;

export type TRemoveMark = () => void;

export type TAllTooltipsHide = (
  except?: "blockMenu" | "canvasMenu" | "makeMenu" | "itemTooltip"
) => void;

export type TDeleteGuestById = (guestId: string) => void;

export type TMakeMark = (time: number, groupId: string) => void;

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

export type TResizeBlock = (targetGuest: IAssigItem, time: number) => void;

export type TAllocateGuest = (
  itemId: string,
  newGroupOrder: number,
  originalCopy: any[]
) => void;

export type TAllocateItem = (
  targetGuest: IAssigItem,
  newGroupOrder: number
) => void;

export type TShortKey = (
  flag: "canvas" | "guestItem",
  e: React.MouseEvent<HTMLElement>,
  time?: number | undefined,
  groupId?: string | undefined,
  itemId?: string | undefined
) => Promise<void>;

export type TAddBlock = (time: number, groupId: string) => Promise<void>;

export type TGenderToggleById = (guestId: string) => void;

export type TResizeValidater = (item: IAssigItem, time: number) => void;

export type TResizeLinkedItems = (bookingId: string, newTime: number) => void;

export type TMoveLinkedItems = (bookingId: string, newTime: number) => void;

export type TDeleteBookingById = (bookingId: string) => void;

export type TFindBookingIdByGuestId = (guestId: string) => string;

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
  type: "add" | "normal" | "addRoomType" | "noneGroup";
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
  bookingId: string;
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
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
  deleteBlockMu: MutationFn<deleteBlock, deleteBlockVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
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
  bookingModal: IUseModal<any>;
  guestValue: IAssigItem[];
  canvasMenuProps: ICanvasMenuProps;
  makeMenuProps: IMakeMenuProps;
  blockMenuProps: IDeleteMenuProps;
  setBlockMenuProps: React.Dispatch<React.SetStateAction<IDeleteMenuProps>>;
  setGuestValue: React.Dispatch<React.SetStateAction<any[]>>;
  setCanvasMenuProps: React.Dispatch<React.SetStateAction<ICanvasMenuProps>>;
  setMakeMenuProps: React.Dispatch<React.SetStateAction<IMakeMenuProps>>;
  confirmDelteGuestHook: IUseModal<any>;
  dataTime: {
    start: number;
    end: number;
  };
  setDataTime: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
    }>
  >;
}

export type THandleCanvasContextMenu = (
  groupId: string,
  time: number,
  e: React.MouseEvent<HTMLElement>
) => void;

export type THandleTimeChange = (
  visibleTimeStart: number,
  visibleTimeEnd: number,
  updateScrollCanvas: any
) => void;

export type THandleItemClick = (
  itemId: string,
  e: React.MouseEvent<HTMLElement>,
  time: number
) => Promise<void>;

export type THandleItemMove = (
  itemId: string,
  dragTime: number,
  newGroupOrder: number
) => Promise<void>;

export type THandleCanvasClick = (
  groupId: string,
  time: number,
  e: React.MouseEvent<HTMLElement>
) => Promise<void>;

export type THandleItemDoubleClick = (
  itemId: string,
  e: React.MouseEvent<HTMLElement>,
  time: number
) => Promise<void>;

export type THandleCanvasDoubleClick = (
  groupId: string,
  time: number,
  e: React.MouseEvent<HTMLElement>
) => Promise<void>;

export type THandleMoveResizeValidator = (
  action: "move" | "resize",
  item: any,
  time: number,
  resizeEdge: "left" | "right" | undefined
) => number;

export type THandleItemResize = (
  itemId: string,
  time: number,
  edge: "left" | "right"
) => Promise<void>;

export type THandleItemSelect = (
  itemId: string,
  e: React.MouseEvent<HTMLElement>,
  time: number
) => Promise<void>;

export interface IAssigHandlers {
  handleItemResize: THandleItemResize;
  handleItemMove: THandleItemMove;
  handleItemClick: THandleItemClick;
  handleItemDoubleClick: THandleItemDoubleClick;
  handleCanvasClick: THandleCanvasClick;
  handleCanvasDoubleClick: THandleCanvasDoubleClick;
  handleMoveResizeValidator: THandleMoveResizeValidator;
  handleTimeChange: THandleTimeChange;
  handleCanvasContextMenu: THandleCanvasContextMenu;
  handleItemSelect: THandleItemSelect;
}

export interface IAssigTimelineUtils {
  popUpItemMenu: TPopUpItemMenu;
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
  allocateGuest: TAllocateGuest;
  allocateItem: TAllocateItem;
  deleteBookingById: TDeleteBookingById;
  genderToggleById: TGenderToggleById;
  resizeValidater: TResizeValidater;
  resizeLinkedItems: TResizeLinkedItems;
  moveLinkedItems: TMoveLinkedItems;
  toogleCheckInOut: TToogleCheckIn;
  openBlockMenu: TOpenBlockMenu;
  openCanvasMenu: TOpenCanvasMenu;
  makeMark: TMakeMark;
  resizeBlock: TResizeBlock;
  findBookingIdByGuestId: TFindBookingIdByGuestId;
}

export interface IAssigInfo {
  bedIndex: number;
  roomId: string;
  gender: Gender | null;
}
// ⭐️ 배정달력에서 예약 생성시사용
export interface ICreateBookingInfo {
  bookingId: string;
  createMode: boolean;
  type: BookingModalType.CREATE | BookingModalType.CREATE_WITH_ASSIG;
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
