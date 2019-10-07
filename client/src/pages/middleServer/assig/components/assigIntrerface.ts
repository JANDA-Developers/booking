import {
  RoomGender,
  PricingType,
  Gender,
  BookingModalType,
  BookingStatus
} from "../../../../types/enum";
import {IRoomType, IHouseConfig, IBlockOp} from "../../../../types/interface";
import {MutationFn, FetchResult} from "react-apollo";
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
  deleteBookingVariables,
  updateBlockOption,
  updateBlockOptionVariables,
  getAllRoomTypeWithGuest_GetGuests_guests_GuestRoom_blockOption,
  startBooking,
  getAllRoomTypeWithGuest_GetGuests_guests
} from "../../../../types/api";
import {IUseModal} from "../../../../hooks/hook";
import {string} from "prop-types";
import {MouseEvent} from "react";

export interface IAssigTimelineContext {
  isMobile: boolean;
  windowWidth: number;
  windowHeight: number;
  houseConfig: IHouseConfig;
  groupData: IAssigGroup[];
  houseId: string;
  shortKey?: TShortKey;
}

export type ICreateCreateItem = (
  canvasInfo: ICanvasMenuTooltipProps,
  gender?: Gender | undefined
) => void;

export type TIsTherePerson = (
  startTime: number,
  endTime: number,
  groupId: string,
  guest: IAssigItem
) => boolean;

export type TFilterTimeZone = (
  from: number,
  to: number,
  roomId?: string | undefined
) => IAssigItem[];

export type TGetItemById = (guestId: string) => IAssigItem;

export type TPopUpItemMenuTooltip = (
  location: {
    clientX: number;
    clientY: number;
  },
  target: IAssigItem
) => Promise<void>;

export type TGetGroupById = (groupId: string) => IAssigGroup;

export type TRemoveMark = () => void;

export type TDleteGhost = () => void;

export type TAllTooltipsHide = (
  except?: "blockMenu" | "canvasMenu" | "createMenu" | "itemTooltip"
) => void;

export type TDeleteGuestById = (guestId: string) => void;

export type TCreateMark = (time: number, groupId: string) => void;

export type TDeleteItemById = (id: string) => void;

export interface ILocation {
  clientX: number;
  clientY: number;
}

export type TOpenCreateMenu = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation,
  props?: ICreateMenuProps
) => void;

export type TOpenBlockMenu = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation,
  props?: IBlcokMenuProps
) => void;

export type TChangeCreateBlock = () => void;

export type TOpenCanvasMenuTooltip = (
  Eorlocation: React.MouseEvent<HTMLElement> | ILocation,
  props?: ICanvasMenuTooltipProps
) => void;

export type TIsGenderSafe = (
  targetGroup: IAssigGroup,
  item: IAssigItem,
  start: number,
  end: number
) => boolean;

export type TResizeBlockBlock = (targetGuest: IAssigItem, time: number) => void;

export type TAllocateGuest = (
  itemId: string,
  newGroupOrder: number,
  originalCopy?: IAssigItem[]
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

export type IGetGuestByBookingId = (bookingId: string) => IAssigItem[];

export type TGetBookingIdByGuestId = (guestId: string) => string;

export type IAssigMutationLoading = {
  updateBlockLoading: boolean;
  createBlockLoading: boolean;
  deleteBlockLoading: boolean;
  deleteGuestLoading: boolean;
  deleteBookingLoading: boolean;
  updateBookingLoading: boolean;
};

export type TToogleCheckIn = (
  guestId?: string | undefined,
  itemIndex?: number | undefined
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
  itemIndex: number;
  reason: string;
  start: number | null;
  end: number | null;
}

export interface IAssigItem {
  id: string;
  itemIndex: number;
  name: string;
  group: string;
  temp: boolean;
  loading: boolean;
  bookingId: string;
  checkInInfo: boolean;
  showNewBadge: boolean;
  roomTypeId: string;
  roomId: string;
  status: BookingStatus;
  bedIndex: number;
  start: number;
  showEffect: boolean;
  end: number;
  gender: Gender | null;
  canMove: boolean;
  blockOption: IBlockOp;
  type: GuestTypeAdd;
}

export interface IAssigDataControl {
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
  deleteBlockMu: MutationFn<deleteBlock, deleteBlockVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  deleteGuestsMu: MutationFn<deleteGuests, deleteGuestsVariables>;
  createBlockMu: MutationFn<createBlock, createBlockVariables>;
  updateBlockOpMu: MutationFn<updateBlockOption, updateBlockOptionVariables>;
  stopPolling: () => void;
  startPolling: () => void;
  totalMuLoading: boolean;
  mutationLoadings: IAssigMutationLoading;
  networkStatus: number;
}

export interface ICanvasMenuTooltipProps {
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
  MAKE = "MAKE",
  GHOST = "GHOST"
}

export interface ICreateMenuProps {
  item: IAssigItem;
}

export interface IDeletepgetDailyAssigUtilsMenuProps {
  item: IAssigItem;
}

export interface IDailyAssigUtils {
  allTooltipsHide: (except: string) => void;
  deleteGuestById: TDeleteGuestById;
  deleteBookingById: TDeleteBookingById;
  getBookingIdByGuestId: TGetBookingIdByGuestId;
  toogleCheckInOut: (
    targetGuest: getAllRoomTypeWithGuest_GetGuests_guests
  ) => Promise<void>;
}

export interface IDeleteMenuProps {
  item: IAssigItem;
}

export interface IDailyAssigDataControl {
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  deleteGuestsMu: MutationFn<deleteGuests, deleteGuestsVariables>;
  updateCheckInMu: MutationFn<updateBooking, updateBookingVariables>;
  createBlockMu: MutationFn<createBlock, createBlockVariables>;
  deleteBlockMu: MutationFn<deleteBlock, deleteBlockVariables>;
  updateBlockOpMu: MutationFn<updateBlockOption, updateBlockOptionVariables>;
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
  totalMuLoading: boolean;
}

export interface IAssigTimelineHooks {
  blockOpModal: IUseModal<IAssigItem>;
  bookingModal: IUseModal<any>;
  guestValue: IAssigItem[];
  canvasMenuProps: ICanvasMenuTooltipProps;
  createMenuProps: ICreateMenuProps;
  blockMenuProps: IDeleteMenuProps;
  setBlockMenuProps: React.Dispatch<React.SetStateAction<IDeleteMenuProps>>;
  setGuestValue: (value: IAssigItem[]) => void;
  setCanvasMenuTooltipProps: React.Dispatch<
    React.SetStateAction<ICanvasMenuTooltipProps>
  >;
  setCreateMenuProps: React.Dispatch<React.SetStateAction<ICreateMenuProps>>;
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

export type TGetGuestsInGroup = (group: IAssigGroup) => IAssigItem[];

export type TGetAssigInfoFromItems = (items: IAssigItem[]) => IAssigInfo[];

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

interface Ids {
  itemId?: string;
  bookingId?: string;
}

export type THilightGuestBlock = ({itemId, bookingId}: Ids) => void;

export type TBookingCheckedNew = (bookingId: string) => void;

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
  getAssigInfoFromItems: TGetAssigInfoFromItems;
  bookingCheckedNew: TBookingCheckedNew;
  hilightGuestBlock: THilightGuestBlock;
  popUpItemMenuTooltip: TPopUpItemMenuTooltip;
  getItemById: TGetItemById;
  getGroupById: TGetGroupById;
  removeMark: TRemoveMark;
  deleteGhost: TDleteGhost;
  isTherePerson: TIsTherePerson;
  filterTimeZone: TFilterTimeZone;
  allTooltipsHide: TAllTooltipsHide;
  deleteGuestById: TDeleteGuestById;
  getGuestsInGroup: TGetGuestsInGroup;
  deleteItemById: TDeleteItemById;
  openCreateMenu: TOpenCreateMenu;
  isGenderSafe: TIsGenderSafe;
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
  openCanvasMenuTooltip: TOpenCanvasMenuTooltip;
  changeCreateBlock: TChangeCreateBlock;
  createMark: TCreateMark;
  resizeBlockBlock: TResizeBlockBlock;
  getBookingIdByGuestId: TGetBookingIdByGuestId;
  getGuestsByBookingId: IGetGuestByBookingId;
  createCreateItem: ICreateCreateItem;
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
  checkIn: number;
  checkOut: number;
  resvInfoes: {
    group: IAssigGroup;
    roomTypeName: string;
    roomTypeId: string;
    gender: Gender | null;
  }[];
  assigInfo: IAssigInfo[];
}
