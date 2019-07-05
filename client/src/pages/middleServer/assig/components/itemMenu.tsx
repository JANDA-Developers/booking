import React from "react";
import TooltipList, {
  ReactTooltip
} from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {IUseModal} from "../../../../actions/hook";
import {TToogleCheckIn, IAssigItem} from "./assigIntrerface";

interface IProps {
  toogleCheckInOut: TToogleCheckIn;
  deleteGuestById(guestId: string): void;
  bookingModalHook: IUseModal;
  guestValue: IAssigItem[];
}

const ItemMenu: React.FC<IProps> = ({
  toogleCheckInOut,
  deleteGuestById,
  bookingModalHook,
  guestValue
}) => {
  return (
    <TooltipList
      unPadding
      getContent={(guestId: string) => {
        const targetGuest = guestValue.find(guest => guest.id === guestId);
        if (!targetGuest) return;
        return (
          <ul>
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  toogleCheckInOut(guestId);
                }}
                label={targetGuest.isCheckin ? "체크아웃" : "체크인"}
                mode="flat"
                color="white"
              />
            </li>
            {/* <li>
          <Button label="배정확정" mode="flat" color="white" />
        </li> */}
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  deleteGuestById(guestId);
                }}
                label="삭제"
                mode="flat"
                color="white"
              />
            </li>
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  bookingModalHook.openModal({
                    bookingId: targetGuest.bookingId
                  });
                }}
                label="정보보기"
                mode="flat"
                color="white"
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
