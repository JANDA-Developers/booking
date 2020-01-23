import React, { useState } from "react";
import moment from "moment";
import { TimePerMs } from "../../types/enum";
import { number } from "prop-types";

interface IProps {}

interface ITimeBlock {
  start: number;
  isSelected: boolean;
  isPast: boolean;
  isBlocked: boolean;
}

const TimerPicker: React.FC<IProps> = () => {
  const currentTime = moment(new Date()).valueOf();

  const [visibleTime, setVisibletime] = useState({
    start: currentTime - TimePerMs.H * 3,
    end: currentTime + TimePerMs.H * 3
  });
  const renderBlockCount = 14;
  const timeUnit = TimePerMs.H / 2;
  const blocksStartTime = Math.floor(visibleTime.start / timeUnit) * timeUnit;
  const defaultBlockss: ITimeBlock[] = Array(renderBlockCount).map((_, i) => ({
    start: blocksStartTime + i * timeUnit,
    isSelected: false,
    isPast: false,
    isBlocked: false
  }));

  const timeBlocks = useState<ITimeBlock[]>(defaultBlockss);
  // 블록의 시작 시간 배열

  const TimeBlockRender = ({
    time,
    timeUnit,
    isSelected,
    isPastTime
  }: {
    time: number;
    timeUnit: number;
    isSelected: boolean;
    isPastTime: boolean;
  }) => (
    <div className="TimeBlock">
      <div className="TimeBlockLabel"></div>
      <div></div>
    </div>
  );

  return <div>{timeBlocks.map(TB => )}</div>;
};

export default TimerPicker;
