import {
  getBooking_GetBooking_booking_guests,
  startBookingVariables
} from "../../types/api";
import { inOr } from "../../utils/C";
import { Gender, PaymentStatus, AutoSendWhen } from "../../types/enum";
import { IBookingModal_AssigInfo, IBookingModalContext } from "./declaration";
import { toast } from "react-toastify";
import { LANG } from "../../hooks/hook";
import guestsToInput, { getRoomSelectString, getGenderChangedGuest } from "../../utils/typeChanger";
import { to4YMMDD } from "../../utils/setMidNight";
import { isDomitoryGuest } from "../../utils/interfaceMatch";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import moment from "moment";
import { IModalSMSinfo } from "../smsModal/SendSmsModal";
import { autoComma } from "../../utils/utils";

export const bookingModalValidate = (
  bookingModalContext: IBookingModalContext,
  mode?: "create" | "modify" | "delete"
) => {
  const {
    paymentStatusHook,
    bookingStatusHook,
    bookingPhoneHook,
    bookingNameHook,
    payMethodHook
  } = bookingModalContext;

  if (!payMethodHook.selectedOption) {
    toast.warn(LANG("please_select_a_payment_method"));
    return false;
  }

  if (!paymentStatusHook.selectedOption) {
    toast.warn(LANG("please_select_a_payment_status"));
    return false;
  }

  if (!paymentStatusHook.selectedOption) {
    toast.warn(LANG("please_select_a_payment_status"));
    return false;
  }

  if (!bookingStatusHook.selectedOption) {
    toast.warn(LANG("please_select_reservation_status"));
    return false;
  }

  if (!bookingNameHook.value) {
    toast.warn(LANG("please_enter_booker_name"));
    return false;
  }

  if (!bookingPhoneHook.value) {
    toast.warn(LANG("please_enter_phone_number"));
    return false;
  }
  return true;
};

// SMS 발송 모달에 전달할 정보를 생성
export const makeSmsInfoParam = (
  bookingModalContext: IBookingModalContext,
  bookingId: string,
  context: IContext
): IModalSMSinfo => {
  const { publicKey } = context.house;
  const { bookingPhoneHook, paymentStatusHook, roomSelectInfo, bookingNameHook, resvDateHook, updateGuests, priceHook, assigInfo, bookingStatusHook, emailHook, payMethodHook, guests } = bookingModalContext;
  const roomSelectString = getRoomSelectString(roomSelectInfo);

  return {
    bookingIds: [bookingId],
    receivers: [bookingPhoneHook.value],
    // 페이먼트 에따라서 각 상황에맞는 SMS 를 찾아줌
    findSendCase: (() => {
      const { selectedOption } = paymentStatusHook;
      if (selectedOption) {
        if (selectedOption.value === PaymentStatus.COMPLETED) {
          return AutoSendWhen.WHEN_BOOKING_CREATED;
        } else if (selectedOption.value === PaymentStatus.NOT_YET) {
          return AutoSendWhen.WHEN_BOOKING_CREATED_PAYMENT_NOT_YET;
        }
      }
    })(),
    smsParser: {
      BOOKERNAME: bookingNameHook.value,
      HM: `/outpage/HM/${publicKey}`,
      PAYMENTSTATUS: LANG("PaymentStatus", paymentStatusHook.selectedOption?.value),
      PAYMETHOD: LANG("PaymentStatus", payMethodHook.selectedOption?.value),
      ROOMTYPE_N_COUNT: roomSelectString,
      STAYDATE: `${moment(resvDateHook.from || undefined).format("MM/DD")} ~ ${moment(resvDateHook.to || undefined).format("MM/DD")}`,
      STAYDATE_YMD: `${to4YMMDD(resvDateHook.from || undefined)} ~ ${to4YMMDD(resvDateHook.to || undefined)}`,
      TOTALPRICE: autoComma(priceHook.value) + LANG("money_unit");
    }
  };
};

// 게스트 정보를 토대로 배정정보를 생산
export const makeAssigInfo = (
  guests: getBooking_GetBooking_booking_guests[] | null
): IBookingModal_AssigInfo[] =>
  guests
    ? guests.map(guest => {
      if (isDomitoryGuest(guest)) {
        return {
          _id: guest._id,
          roomId: inOr(guest.room, "_id", ""),
          gender: guest.gender || Gender.MALE,
          bedIndex: guest.bedIndex,
          pricingType: guest.pricingType
        };
      } else {
        return {
          _id: guest._id,
          roomId: inOr(guest.room, "_id", ""),
          gender: null,
          bedIndex: 0,
          pricingType: guest.pricingType
        };
      }
    })
    : [];

// 게스트들을 룸타입별로 정렬

// 현재 부킹모달 정보들을 토대로 예약생성에 필요한 파라미터를 반환합니다.
export const bookingModalGetStartBookingVariables = (
  bookingModalContext: IBookingModalContext
): startBookingVariables => {
  const {
    bookingNameHook,
    mode,
    bookingPhoneHook,
    guests,
    updateGuests,
    paymentStatusHook,
    priceHook,
    resvDateHook,
    payMethodHook,
    assigInfo,
    houseId,
    memoHook,
    funnelStatusHook
  } = bookingModalContext;

  const guestsToInputs = guestsToInput(updateGuests);

  const allocationParams = assigInfo.map(info => ({
    bedIndex: info.bedIndex,
    gender: info.gender,
    roomId: info.roomId
  }));

  return {
    bookerParams: {
      agreePrivacyPolicy: true,
      email: "demo@naver.com",
      memo: memoHook.value,
      name: bookingNameHook.value,
      password: "admin",
      phoneNumber: bookingPhoneHook.value,
      funnels: funnelStatusHook.selectedOption?.value || null
    },
    checkInOut: {
      checkIn: to4YMMDD(resvDateHook.from),
      checkOut: to4YMMDD(resvDateHook.to)
    },
    guestDomitoryParams: guestsToInputs.countInDomitorys,
    guestRoomParams: guestsToInputs.countInRooms,
    paymentParams: {
      payMethod: payMethodHook.selectedOption!.value,
      price: parseInt(priceHook.value),
      status: paymentStatusHook.selectedOption!.value
    },
    houseId,
    allocationParams: mode === "CREATE_ASSIG" ? allocationParams : undefined,
    forceToAllocate: mode === "CREATE_ASSIG"
  };
};
