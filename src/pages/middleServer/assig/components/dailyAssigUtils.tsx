import React from "react";
import {
  TDeleteGuestById,
  IAssigTimelineUtils,
  TDeleteBookingById,
  TGetBookingIdByGuestId,
  IDailyAssigUtils,
  TToogleCheckIn,
  IDailyAssigDataControl
} from "./assigIntrerface";
import {ReactTooltip} from "../../../../atoms/tooltipList/TooltipList";
import JDisNetworkRequestInFlight from "../../../../utils/netWorkStatusToast";
import {IDailyAssigContext} from "../../../../components/dailyAssjg/DailyAssig";
import {assigSharedDleteGuestConfirmMessage} from "./items/shared";
import {getAllRoomTypeWithGuest_GetGuests_guests as IG} from "../../../../types/api";
import {muResult} from "../../../../utils/utils";
import {toast} from "react-toastify";

export function getDailyAssigUtils(
  {
    deleteBookingMu,
    allocateMu,
    createBlockMu,
    deleteBlockMu,
    deleteGuestsMu,
    totalMuLoading,
    updateCheckInMu
  }: IDailyAssigDataControl,
  {blocksData, guestsData, confirmModalHook, networkStatus}: IDailyAssigContext
): IDailyAssigUtils {
  const allTooltipsHide = (except: string) => {
    ReactTooltip.hide();
  };

  // 예약을 예약 아이디로 삭제
  const deleteBookingById: TDeleteBookingById = async (bookingId: string) => {
    const result = await deleteBookingMu({
      variables: {
        bookingId
      }
    });
  };

  const toogleCheckInOut = async (targetGuest: IG) => {
    const {
      booking: {
        _id: bookingId,
        checkInInfo: {isIn}
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
      toast.success(!isIn ? {LANG('checkIn')} : {LANG('checkOut')});
    } else {
      toast.warn("체크인 변경 실패");
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

  // 해당 게스트를 찾아서 제거함
  const deleteGuestById: TDeleteGuestById = guestId => {
    if (JDisNetworkRequestInFlight(networkStatus)) return;
    const confirmModalCallBack = (flag: boolean, key: string) => {
      if (key === "deleteAll") {
        deleteBookingById(getBookingIdByGuestId(guestId));
      }
      if (flag) {
        deleteGuestsMu({
          variables: {
            guestIds: [guestId]
          }
        });
      }
    };

    confirmModalHook.openModal({
      callBack: confirmModalCallBack,
      children: assigSharedDleteGuestConfirmMessage
    });
  };

  const dailyAssigUtils = {
    allTooltipsHide,
    deleteGuestById,
    deleteBookingById,
    getBookingIdByGuestId,
    toogleCheckInOut
  };

  return dailyAssigUtils;
}

export default getDailyAssigUtils;
