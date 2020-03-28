import React from "react";
import {
  TDeleteBookingById,
  TGetBookingIdByGuestId,
  IDailyAssigUtils,
  IDailyAssigDataControl
} from "../components/assigIntrerface";
import { ReactTooltip } from "../../../../atoms/tooltipList/TooltipList";
import JDisNetworkRequestInFlight from "../../../../utils/netWorkStatusToast";
import { IDailyAssigContext } from "../../../../components/dailyAssjg/DailyAssig";
import { getGuests_GetGuests_guests as IG } from "../../../../types/api";
import { muResult } from "../../../../utils/utils";
import { toast } from "react-toastify";
import { LANG } from "../../../../hooks/hook";

export function getDailyAssigUtils(
  { deleteBookingMu, updateCheckInMu }: IDailyAssigDataControl,
  { guestsData, networkStatus, confirmModalHook }: IDailyAssigContext
): IDailyAssigUtils {
  // 모든 툴팁 숨김
  const allTooltipsHide = (except: string) => {
    ReactTooltip.hide();
  };

  // 예약을 예약 아이디로 삭제
  const deleteBookingById: TDeleteBookingById = async (
    bookingId: string,
    confirm
  ) => {
    const callBackFn = async (flag: boolean) => {
      if (flag) {
        const result = await deleteBookingMu({
          variables: {
            bookingId
          }
        });
      }
    };

    // 확인메시지 출력여부
    if (!confirm) callBackFn(true);
    else {
      confirmModalHook.openModal({
        txt: LANG("are_you_sure_you_want_to_delete_the_reservation"),
        callBack: callBackFn
      });
    }
  };

  // 체크인 아웃 투글
  const toogleCheckInOut = async (targetGuest: IG) => {
    const {
      booking: {
        _id: bookingId,
        checkInInfo: { isIn }
      }
    } = targetGuest;
    if (JDisNetworkRequestInFlight(networkStatus)) return;
    const result = await updateCheckInMu({
      variables: {
        bookingId,
        params: {
          checkInInfo: {
            isIn: !isIn
          }
        }
      }
    });

    if (muResult(result, "UpdateBooking")) {
      toast.success(!isIn ? LANG("checkIn") : LANG("checkOut"));
    } else {
      toast.warn(LANG("checkin_change_fail"));
    }
  };

  //  예약아이디를 게스트아이디로 찾음
  const getBookingIdByGuestId: TGetBookingIdByGuestId = (
    guestId: string
  ): string => {
    const target = guestsData.find(guest => guest._id === guestId);
    if (!target) {
      throw Error("guestId not exist :: getBookingByGuestId");
    }
    return target.booking._id;
  };

  const dailyAssigUtils = {
    allTooltipsHide,
    deleteBookingById,
    getBookingIdByGuestId,
    toogleCheckInOut
  };

  return dailyAssigUtils;
}

export default getDailyAssigUtils;
