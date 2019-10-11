import React, {Fragment} from "react";
import TooltipList, {
  ReactTooltip
} from "../../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../../atoms/button/Button";
import {
  IAssigTimelineHooks,
  IAssigTimelineUtils,
  IAssigTimelineContext
} from "../assigIntrerface";
import {BookingStatus} from "../../../../../types/enum";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const ItemMenuTooltip: React.FC<IProps> = ({
  assigHooks: {guestValue, bookingModal, blockOpModal},
  assigContext: {houseConfig},
  assigUtils: {deleteGuestById, toogleCheckInOut}
}) => {
  return (
    <TooltipList
      unPadding
      getContent={(guestId: string) => {
        const targetGuest = guestValue.find(guest => guest.id === guestId);
        if (!targetGuest) return;
        const isProgressing = targetGuest.status === BookingStatus.PROGRESSING
        return (
          <ul className="tooltipList__ul">
            {!isProgressing && (
              <Fragment>
                <li>
                  <Button
                    onClick={() => {
                      ReactTooltip.hide();
                      toogleCheckInOut(guestId);
                    }}
                    label={targetGuest.checkInInfo ? "체크아웃" : "체크인"}
                  />
                </li>
                <li>
                  <Button
                    onClick={() => {
                      ReactTooltip.hide();
                      deleteGuestById(guestId);
                    }}
                    label="삭제"
                  />
                </li>
              </Fragment>
            )}
            {houseConfig.assigTimeline!.itemBlockOp!.useColor && (
              <li>
                <Button
                  onClick={() => {
                    ReactTooltip.hide();
                    blockOpModal.openModal(targetGuest);
                  }}
                  label="색상설정"
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
                label="정보보기"
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
