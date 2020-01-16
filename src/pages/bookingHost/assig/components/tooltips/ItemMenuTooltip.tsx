import React, { Fragment } from "react";
import TooltipList, {
  ReactTooltip
} from "../../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineHooks,
  IAssigTimelineUtils,
  IAssigTimelineContext
} from "../assigIntrerface";
import { BookingStatus } from "../../../../../types/enum";
import { LANG } from "../../../../../hooks/hook";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const ItemMenuTooltip: React.FC<IProps> = ({
  assigHooks: { guestValue, bookingModal, blockOpModal },
  assigContext: { houseConfig },
  assigUtils: { deleteBookingById, getBookingIdByGuestId, toogleCheckInOut }
}) => {
  return (
    <TooltipList
      unPadding
      getContent={(guestId: string) => {
        const targetGuest = guestValue.find(guest => guest.id === guestId);
        if (!targetGuest) return;
        return (
          <ul className="tooltipList__ul">
            {
              <Fragment>
                <li>
                  <Button
                    onClick={() => {
                      ReactTooltip.hide();
                      toogleCheckInOut(guestId);
                    }}
                    label={
                      targetGuest.checkInInfo
                        ? LANG("checkOut")
                        : LANG("checkIn")
                    }
                  />
                </li>
                <li>
                  <Button
                    onClick={() => {
                      ReactTooltip.hide();
                      deleteBookingById(getBookingIdByGuestId(guestId), true);
                    }}
                    label={LANG("delete")}
                  />
                </li>
              </Fragment>
            }
            {houseConfig.assigTimeline!.itemBlockOp!.useColor && (
              <li>
                <Button
                  onClick={() => {
                    ReactTooltip.hide();
                    blockOpModal.openModal(targetGuest);
                  }}
                  label={LANG("color_set")}
                />
              </li>
            )}
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  bookingModal.openModal({
                    bookingId: targetGuest.bookingId
                  });
                }}
                label={LANG("view_info")}
              />
            </li>
          </ul>
        );
      }}
      id="itemTooltip"
      className="itemTooltip"
    />
  );
};
export default ItemMenuTooltip;
