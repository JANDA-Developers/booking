import React from "react";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {TToogleCheckIn} from "../AssigTimeline";

interface IProps {
  toogleCheckInOut: TToogleCheckIn;
  deleteGuest(guestId: string): void;
  bookerModalHook: IUseModal;
}

const ItemMenu: React.FC<IProps> = ({toogleCheckInOut, deleteGuest}) => (
  <TooltipList
    unPadding
    getContent={(guestId: string) => (
      <ul>
        <li>
          <Button
            onClick={() => toogleCheckInOut(guestId)}
            label="체크아웃"
            mode="flat"
            color="white"
          />
        </li>
        {/* <li>
          <Button label="배정확정" mode="flat" color="white" />
        </li> */}
        <li>
          <Button
            onClick={() => deleteGuest(guestId)}
            label="삭제"
            mode="flat"
            color="white"
          />
        </li>
        <li>
          <Button
            onClick={() => toogleCheckInOut(guestId)}
            label="정보보기"
            mode="flat"
            color="white"
          />
        </li>
      </ul>
    )}
    id="itemTooltip"
  />
);

export default ItemMenu;
