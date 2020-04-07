import React from "react";
import TooltipList, {
  TooltipButtons
} from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import { ReactTooltip } from "../../../atoms/tooltip/Tooltip";
import { LANG } from "../../../hooks/hook";
interface Iprops {
  blockRoomBtnCallBack: (info: any) => void;
}

const PlaceTooltip: React.FC<Iprops> = ({ blockRoomBtnCallBack }) => {
  return (
    <TooltipList
      unPadding
      getContent={(info: string) => {
        return (
          <TooltipButtons
            Buttons={[
              {
                onClick: () => {
                  blockRoomBtnCallBack(info);
                },
                label: LANG("block_room")
              }
            ]}
          ></TooltipButtons>
        );
      }}
      id="placeTooltip"
      className="placeTooltip"
    />
  );
};

export default PlaceTooltip;
