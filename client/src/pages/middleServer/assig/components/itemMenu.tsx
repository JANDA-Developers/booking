import React from "react";
import TooltipList, {
  ReactTooltip
} from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {IUseModal} from "../../../../actions/hook";
import {
  TToogleCheckIn,
  IAssigItem,
  IAssigTimelineHooks,
  IAssigTimelineUtils,
  IAssigTimelineContext
} from "./assigIntrerface";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const ItemMenu: React.FC<IProps> = ({
  assigHooks: {guestValue, bookingModal, blockOpModal},
  assigContext: {},
  assigUtils: {deleteGuestById, toogleCheckInOut}
}) => {
  return (
    <TooltipList
      unPadding
      getContent={(guestId: string) => {
        const targetGuest = guestValue.find(guest => guest.id === guestId);
        if (!targetGuest) return;
        return (
          <ul className="tooltipList__ul">
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
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  blockOpModal.openModal(targetGuest);
                }}
                label="색상설정"
              />
            </li>
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
export default ItemMenu;
