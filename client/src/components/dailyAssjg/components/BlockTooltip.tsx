import React from "react";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import {IContext} from "../../../pages/MiddleServerRouter";
import {
  IDailyAssigUtils,
  IDailyAssigDataControl
} from "../../../pages/middleServer/assig/components/assigIntrerface";
import {IDailyAssigContext} from "../DailyAssig";
import {
  getAllRoomTypeWithGuest_GetGuests_guests as IG,
  getAllRoomTypeWithGuest_GetBlocks_blocks as IB
} from "../../../types/api";
import Button from "../../../atoms/button/Button";

interface Iprops {
  context: IContext;
  dailyAssigUtils: IDailyAssigUtils;
  dailayAssigContext: IDailyAssigContext;
  dailyAssigDataControl: IDailyAssigDataControl;
  deleteBtnCallBack: (block: IB) => void;
}

const BlockTooltip: React.FC<Iprops> = ({
  context,
  dailyAssigUtils,
  dailyAssigDataControl,
  deleteBtnCallBack,
  dailayAssigContext
}) => {
  const {blocksData} = dailayAssigContext;

  return (
    <TooltipList
      id="blockTooltip"
      className="blockTooltip"
      getContent={(guestId: string) => {
        const targetBlock = blocksData.find(guest => guest._id === guestId);
        if (!targetBlock) return <div />;
        return (
          <ul className="tooltipList__ul">
            <li>
              <Button
                onClick={() => {
                  deleteBtnCallBack(targetBlock);
                }}
                label="삭제"
              />
            </li>
          </ul>
        );
      }}
    />
  );
};

export default BlockTooltip;
