import React from "react";
import {
  TDeleteGuestById,
  IAssigTimelineUtils,
  TDeleteBookingById,
  TGetBookingIdByGuestId
} from "./assigIntrerface";
import {ReactTooltip} from "../../../../atoms/tooltipList/TooltipList";
import JDisNetworkRequestInFlight from "../../../../utils/netWorkStatusToast";
import {IDailyAssigContext} from "../../../../components/dailyAssjg/DailyAssigNew";
import {IDailyAssigDataControl} from "../../../../components/dailyAssjg/DailyAssigWrap";
import {assigSharedDleteGuestConfirmMessage} from "./item/shared";

export function getDailyAssigUtils(
  {
    deleteBookingMu,
    allocateMu,
    createBlockMu,
    deleteBlockMu,
    deleteGuestsMu,
    totalMuLoading,
    updateBlockOpMu
  }: IDailyAssigDataControl,
  {blocksData, guestsData, confirmModalHook, networkStatus}: IDailyAssigContext
): IDailyAssigTimelineUtils {
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
    getBookingIdByGuestId
  };

  return dailyAssigUtils;
}

export default getDailyAssigUtils;
