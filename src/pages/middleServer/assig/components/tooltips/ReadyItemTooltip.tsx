import React from "react";
import Tooltip from "../../../../../atoms/tooltip/Tooltip";
import { LANG } from "../../../../../hooks/hook";
interface Iprops { }

const ReadyItemTooltip: React.FC<Iprops> = () => {
  return (
    <Tooltip type="dark" id="tooltipReadyBlock">
      {LANG("someone_is_making_a_reservation")}
    </Tooltip>
  );
};

export default ReadyItemTooltip;
