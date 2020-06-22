import {
  BookingModalMode,
  GB_booking,
  IGuestCount,
  IRoomType
} from "../../types/interface";
import {
  deleteBooking_DeleteBooking,
  updateBooking_UpdateBooking,
  makeBooking_MakeBooking,
  getBooking_GetBooking_booking_guests,
  Funnels,
  UpsertRoomTypeInput,
  makeBookingVariables,
  updateBookingVariables,
  deleteBookingVariables,
  deleteBooking,
  updateBooking,
  makeBooking,
  refundBookingVariables,
  cancelBookingVariables,
  cancelBooking,
  refundBooking
} from "../../types/api";
import {
  Gender,
  PricingType,
  BookingStatus,
  PaymentStatus,
  PayMethod
} from "../../types/enum";
import {
  IUseSelect,
  IUseDayPicker,
  TUseInput,
  IUseModal
} from "../../hooks/hook";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { IModalSMSinfo } from "../smsModal/SendSmsModal";
import { MutationFn } from "react-apollo";
import { IMu } from "@janda-com/front/build/types/interface";

export interface RoomConfigSubmitData {
  updateCreateDatas: UpsertRoomTypeInput[];
  original: IRoomType[];
  tempData?: IRoomType | undefined;
  deleteIds: string[];
}

// (예약/게스트) 정보
export interface IBookingModal_AssigInfo {
  _id: string;
  roomId: string;
  gender: Gender | null;
  bedIndex: number;
  pricingType: PricingType;
}

//  (예약/방타입) 정보
export interface IRoomSelectInfo {
  roomTypeId: string;
  roomTypeName?: string;
  count: IGuestCount;
  pricingType: PricingType;
  roomNames?: string[];
}

export interface IBookingModalContext {
  bookingModalHook: IUseModal<IBookingModalProp>;
  bookingStatusHook: IUseSelect<BookingStatus>;
  resvDateHook: IUseDayPicker;
  refundModalHook: IUseModal;
  paymentStatusHook: IUseSelect<PaymentStatus>;
  bookingNameHook: TUseInput<any>;
  roomSelectInfo: IRoomSelectInfo[];
  bookingPhoneHook: TUseInput<any>;
  priceHook: TUseInput<any>;
  isDesktopUp: boolean;
  confirmModalHook: IUseModal<any>;
  payMethodHook: IUseSelect<PayMethod>;
  refundBookingMu: IMu<refundBooking, refundBookingVariables>;
  cancelBookingMu: IMu<cancelBooking, cancelBookingVariables>;
  makeBookingMu: MutationFn<makeBooking, makeBookingVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  isCreateMode: boolean;
  bookingData: GB_booking;
  totalPrice: number;
  emailHook: TUseInput<any>;
  checkInOutHook: IUseSelect<any>;
  setAssigInfo: React.Dispatch<React.SetStateAction<IBookingModal_AssigInfo[]>>;
  breakfast: boolean | null;
  setBreakfast: React.Dispatch<React.SetStateAction<boolean | null>>;
  guests: getBooking_GetBooking_booking_guests[] | null;
  updateGuests: getBooking_GetBooking_booking_guests[];
  assigInfo: IBookingModal_AssigInfo[];
  memoHook: TUseInput<string>;
  placeHolederPrice: number;
  houseId: string;
  funnelStatusHook: IUseSelect<Funnels | null>;
  mode?: BookingModalMode;
  sendSmsModalHook: IUseModal<IModalSMSinfo>;
}

export interface IBookingModalProp {
  onCloseModal?: () => any;
  onMakeBookingStart?: () => any;
  makeBookingCallBack?: (result: "error" | makeBooking_MakeBooking) => any;
  updateBookingCallBack?: (
    result: "error" | updateBooking_UpdateBooking
  ) => any;
  deleteBookingCallBack?: (
    result: "error" | deleteBooking_DeleteBooking
  ) => any;
  bookingId?: string;
  createParam?: GB_booking;
  mode?: BookingModalMode;
}

export interface IBookingModalWrapProps {
  makeBookingCallBack?: (result: "error" | makeBooking_MakeBooking) => any;
  updateBookingCallBack?: (
    result: "error" | updateBooking_UpdateBooking
  ) => any;
  deleteBookingCallBack?: (
    result: "error" | deleteBooking_DeleteBooking
  ) => any;
  context: IContext;
  modalHook: IUseModal<IBookingModalProp>;
}
