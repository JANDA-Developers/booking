import React from "react";
import Tooltip from "../../../../../atoms/tooltip/Tooltip";
interface Iprops {}

const ReadyItemTooltip: React.FC<Iprops> = () => {
  return (
    <Tooltip type="dark" id="tooltipReadyBlock">
      누군가 예약을 진행중 입니다.
    </Tooltip>
  );
};

export default ReadyItemTooltip;
