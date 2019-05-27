import React from "react";
import TooltipList, {
  ReactTooltip
} from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {TToogleCheckIn} from "../AssigTimeline";
import {IUseModal} from "../../../../actions/hook";
import {IAssigItem} from "../AssigTimelineWrap";

interface IProps {
  toogleCheckInOut: TToogleCheckIn;
  deleteGuest(guestId: string): void;
  bookerModalHook: IUseModal;
  guestValue: IAssigItem[];
}

const ItemMenu: React.FC<IProps> = ({
  toogleCheckInOut,
  deleteGuest,
  bookerModalHook,
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
                  deleteGuest(guestId);
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
                  bookerModalHook.openModal({bookerId: targetGuest.bookerId});
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
    />
  );
};
export default ItemMenu;
