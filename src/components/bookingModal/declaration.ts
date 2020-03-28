import {
  BookingModalMode,
  GB_booking,
  IGuestCount,
  IRoomType
} from "../../types/interface";
import {
  deleteBooking_DeleteBooking,
  updateBooking_UpdateBooking,
  startBooking_StartBooking,
  getBooking_GetBooking_booking_guests,
  Funnels,
  UpsertRoomTypeInput,
  startBookingVariables,
  updateBookingVariables,
  deleteBookingVariables,
  deleteBooking,
  updateBooking,
  startBooking,
  refundBookingVariables
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
  refundAmt: number,
  refundFn: (variables: refundBookingVariables) => void;
  paymentStatusHook: IUseSelect<PaymentStatus>;
  bookingNameHook: TUseInput<any>;
  roomSelectInfo: IRoomSelectInfo[];
  bookingPhoneHook: TUseInput<any>;
  priceHook: TUseInput<any>;
  isDesktopUp: boolean;
  confirmModalHook: IUseModal<any>
  payMethodHook: IUseSelect<PayMethod>;
  startBookingMu: MutationFn<startBooking, startBookingVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  isCreateMode: boolean;
  bookingData: GB_booking;
  totalPrice: number;
  emailHook: TUseInput<any>;
  checkInOutHook: IUseSelect<any>;
  setAssigInfo: React.Dispatch<React.SetStateAction<IBookingModal_AssigInfo[]>>
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
  sendSmsModalHook: IUseModal<IModalSMSinfo>
}

export interface IBookingModalProp {
  onCloseModal?: () => any;
  onStartBookingStart?: () => any;
  startBookingCallBack?: (result: "error" | startBooking_StartBooking) => any;
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
  startBookingCallBack?: (result: "error" | startBooking_StartBooking) => any;
  updateBookingCallBack?: (
    result: "error" | updateBooking_UpdateBooking
  ) => any;
  deleteBookingCallBack?: (
    result: "error" | deleteBooking_DeleteBooking
  ) => any;
  context: IContext;
  modalHook: IUseModal<IBookingModalProp>;
}
