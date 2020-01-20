import {
  getBooking_GetBooking_booking_guests,
  startBookingVariables
} from "../../types/api";
import { inOr } from "../../utils/C";
import { Gender, PaymentStatus, AutoSendWhen } from "../../types/enum";
import { IBookingModal_AssigInfo, IBookingModalContext } from "./declaration";
import { toast } from "react-toastify";
import { LANG } from "../../hooks/hook";
import { IModalSMSinfo } from "../smsModal/SendSmsModalWrap";
import guestsToInput from "../../utils/typeChanger";
import { to4YMMDD } from "../../utils/setMidNight";
import { isDomitoryGuest } from "../../utils/interfaceMatch";

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
  bookingModalContext: IBookingModalContext
): IModalSMSinfo => {
  const { bookingPhoneHook, paymentStatusHook } = bookingModalContext;
  return {
    receivers: [bookingPhoneHook.value],
    // 페이먼트 에따라서 각 상황에맞는 SMS 를 찾아줌
    autoSendWhen: (() => {
      const { selectedOption } = paymentStatusHook;
      if (selectedOption) {
        if (selectedOption.value === PaymentStatus.COMPLETED) {
          return AutoSendWhen.WHEN_BOOKING_CREATED;
        } else if (selectedOption.value === PaymentStatus.NOT_YET) {
          return AutoSendWhen.WHEN_BOOKING_CREATED_PAYMENT_NOT_YET;
        }
      }
    })()
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

// 현재 부킹모달 정보들을 토대로 예약생성에 필요한 파라미터를 반환합니다.
export const bookingModalGetStartBookingVariables = (
  bookingModalContext: IBookingModalContext
): startBookingVariables => {
  const {
    bookingNameHook,
    mode,
    bookingPhoneHook,
    guests,
    paymentStatusHook,
    priceHook,
    resvDateHook,
    payMethodHook,
    assigInfo,
    houseId,
    memoHook,
    funnelStatusHook
  } = bookingModalContext;

  // 예약자가 변경한 성별사항을 적용한 임시 게스트정보 생성
  const getGenderChangedGuest = (): getBooking_GetBooking_booking_guests[] => {
    if (!guests) return [];

    if (mode === "CREATE_ASSIG") {
      return guests.map(guest => {
        const copyGuest = guest;

        assigInfo.forEach(info => {
          if (isDomitoryGuest(copyGuest) && copyGuest._id === info._id)
            copyGuest.gender = info.gender;
        });
        return copyGuest;
      });
    }

    return guests;
  };

  // 게스트들을 룸타입별로 정렬
  const guestsToInputs = guestsToInput(guests ? getGenderChangedGuest() : []);

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
