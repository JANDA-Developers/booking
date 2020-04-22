import React from "react";
import TooltipList, {
  TooltipButtons
} from "../../../atoms/tooltipList/TooltipList";
import { LANG } from "../../../hooks/hook";
import { TPlaceInfo } from "./DragItem";

interface Iprops {
  blockRoomBtnCallBack: (info: TPlaceInfo) => void;
}

const PlaceTooltip: React.FC<Iprops> = ({ blockRoomBtnCallBack }) => {
  return (
    <TooltipList
      unPadding
      getContent={(infoString: string) => {
        const info: TPlaceInfo = JSON.parse(infoString);
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
