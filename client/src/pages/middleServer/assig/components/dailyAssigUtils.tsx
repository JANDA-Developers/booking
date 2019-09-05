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
  {
    houseId,
    blocksData,
    guestsData,
    confirmDelteGuestHook,
    networkStatus
  }: IDailyAssigContext
): IAssigTimelineUtils {
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
    const deleteGuestCallBackFn = (flag: boolean, key: string) => {
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

    confirmDelteGuestHook.openModal({
      callBack: deleteGuestCallBackFn,
      children: (
        <span>
          해당 게스트를 삭제하시겠습니까? <br />
          (해당 예약자가 예약한 다른 인원들은 지워지지 않습니다.)
        </span>
      ),
      trueBtns: [
        {msg: "알겠습니다.", callBackKey: "deleteOne"},
        {msg: "관련된 모든 인원을 제거하세요.", callBackKey: "deleteAll"}
      ]
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
