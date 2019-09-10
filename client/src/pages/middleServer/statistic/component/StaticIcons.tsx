import React from "react";
import {IGraphViewMode} from "../Statistic";
import {IContext} from "../../../MiddleServerRouter";
import JDIcon, {IconSize} from "../../../../atoms/icons/Icons";

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
  iconSize = IconSize.DEFAULT
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
          setViewMode(IGraphViewMode.pie);
        }}
        selected={viewMode === IGraphViewMode.pie}
        hover
        icon="graphPie"
        size={iconSize}
      />
    </div>
  );
};

export default StaticIcons;
