import React from "react";
import { IGraphViewMode } from "../Statistic";
import { IContext } from "../../../bookingHost/BookingHostRouter";
import JDIcon from "../../../../atoms/icons/Icons";
import { IconSize } from "../../../../types/enum";
import { IUseSelect } from "@janda-com/front";
import { SalesStatisticsCalculationType } from "../../../../types/api";

interface Iprops {
  context: IContext;
  setViewMode: React.Dispatch<React.SetStateAction<IGraphViewMode>>;
  viewMode: IGraphViewMode;
  iconSize?: IconSize;
}

const StaticIcons: React.FC<Iprops> = ({
  context,
  setViewMode,
  viewMode,
  iconSize = undefined
}) => {
  return (
    <div className="statistic__iconsWrap">
      <JDIcon
        onClick={() => {
          setViewMode(IGraphViewMode.list);
        }}
        selected={viewMode === "list"}
        hover
        icon="checkList"
        size={iconSize}
      />
      <JDIcon
        onClick={() => {
          setViewMode(IGraphViewMode.line);
        }}
        selected={viewMode === IGraphViewMode.line}
        hover
        icon="graphLine"
        size={iconSize}
      />
      <JDIcon
        onClick={() => {
          setViewMode(IGraphViewMode.doughnut);
        }}
        selected={viewMode === IGraphViewMode.doughnut}
        hover
        icon="graphPie"
        size={iconSize}
      />
    </div>
  );
};

export default StaticIcons;
