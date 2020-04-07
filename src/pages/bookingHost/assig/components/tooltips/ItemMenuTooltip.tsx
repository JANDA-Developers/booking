import React, { Fragment } from "react";
import TooltipList, {
  ReactTooltip,
  TooltipButtons,
} from "../../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineHooks,
  IAssigTimelineUtils,
  IAssigTimelineContext,
} from "../assigIntrerface";
import { BookingStatus } from "../../../../../types/enum";
import { LANG } from "../../../../../hooks/hook";
import StatusMarker from "../items/StatusMarker";
import Align from "../../../../../atoms/align/Align";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const ItemMenuTooltip: React.FC<IProps> = ({
  assigHooks: { guestValue, bookingModal, blockOpModal },
  assigContext: { houseConfig },
  assigUtils: { deleteBookingById, getBookingIdByGuestId, toogleCheckInOut },
}) => {
  return (
    <TooltipList
      unPadding
      getContent={(guestId: string) => {
        const targetGuest = guestValue.find((guest) => guest.id === guestId);
        if (!targetGuest) return;
        return (
          <TooltipButtons
            head={{
              onlyMobile: true,
              element: (
                <Align
                  flex={{
                    center: true,
                    vCenter: true,
                  }}
                >
                  <StatusMarker
                    darkImg={true}
                    gender={targetGuest.gender}
                    breakfast={targetGuest.breakfast}
                    isUnpaid={targetGuest.isUnpaid}
                    memo={targetGuest.memo}
                  />
                  {targetGuest.name}
                </Align>
              ),
            }}
            Buttons={[
              {
                onClick: () => {
                  ReactTooltip.hide();
                  toogleCheckInOut(guestId);
                },
                label: targetGuest.checkInInfo
                  ? LANG("checkOut")
                  : LANG("checkIn"),
              },
              {
                onClick: () => {
                  ReactTooltip.hide();
                  deleteBookingById(getBookingIdByGuestId(guestId), true);
                },
                label: LANG("delete"),
              },
              // {
              //   onClick: () => {
              //     ReactTooltip.hide();
              //     blockOpModal.openModal(targetGuest);
              //   },
              //   label: LANG("color_set"),
              // },
              {
                onClick: () => {
                  ReactTooltip.hide();
                  bookingModal.openModal({
                    bookingId: targetGuest.bookingId,
                  });
                },
                label: LANG("view_info"),
              },
            ]}
          />
        );
      }}
      id="itemTooltip"
      className="itemTooltip"
    />
  );
};
export default ItemMenuTooltip;
