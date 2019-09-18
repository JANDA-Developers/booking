import React from "react";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import {ReactTooltip} from "../../../atoms/tooltip/Tooltip";
interface Iprops {
  blockRoomBtnCallBack: (info: any) => void;
}

const PlaceTooltip: React.FC<Iprops> = ({blockRoomBtnCallBack}) => {
  return (
    <TooltipList
      unPadding
      getContent={(info: string) => {
        return (
          <ul className="tooltipList__ul">
            <li>
              <Button
                onClick={() => {
                  ReactTooltip.hide();
                  console.log(info);
                  blockRoomBtnCallBack(info);
                }}
                label={"방막기"}
              />
            </li>
          </ul>
        );
      }}
      id="placeTooltip"
      className="placeTooltip"
    />
  );
};

export default PlaceTooltip;
