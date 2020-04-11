import React, { useState, useEffect, useCallback, useMemo } from "react";
import moment from "moment";
import { TimePerMs } from "../../types/enum";
import classNames from "classnames";
import "./TimePicker.scss";
import JDLabel from "../label/JDLabel";
import { s4, isEmpty } from "../../utils/utils";
// @ts-ignore
import $ from "jquery";
import { lastOf } from "../../utils/lastOf";
import JDIcon from "../icons/Icons";
import _ from "lodash";
import reactWindowSize from "react-window-size";

interface ITimeBlock {
  start: number;
  isSelected: boolean;
  isPast: boolean;
  isBlocked: boolean;
}

interface IProps {
  timeUnit?: number;
}

const JDtimePicker: React.FC<IProps> = ({ timeUnit = TimePerMs.H / 2 }) => {
  const currentTime = moment(new Date()).valueOf();
  const uniqKey = useMemo(() => s4(), []);
  const thisPicker = `#${uniqKey}`;
  const [visibleTime, setVisibletime] = useState({
    start: currentTime - timeUnit * 1,
    end: currentTime + TimePerMs.H * 3
  });
  const [dragInfo, setDragInfo] = useState({
    isDrag: false,
    isStart: false,
    dotPoint: 0,
    currentPoint: 0
  });
  const renderBlockCount = 14;
  const blocksStartTime = Math.floor(visibleTime.start / timeUnit) * timeUnit;
  const defaultBlockss: ITimeBlock[] = Array(renderBlockCount)
    .fill(null)
    .map((_, i) => ({
      start: blocksStartTime + i * timeUnit,
      isSelected: false,
      isPast: blocksStartTime + i * timeUnit < currentTime,
      isBlocked: false
    }));

  const [timeBlocks, setTimeBlocks] = useState<ITimeBlock[]>(defaultBlockss);
  // 블록의 시작 시간 배열

  const selectedBlocks = timeBlocks.filter(tb => tb.isSelected === true);

  // 길이에 MovePoint를 더하면 드래그 글이가 나온다.

  const handleClickLineBlock = (start: number) => {
    const targetBlock = timeBlocks.find(tb => tb.start === start);
    if (!targetBlock) throw Error(`존재하지않는 타임블록 시간 ${start}`);
    if (targetBlock.isPast) return;
    // 이미 선택된경우 리턴
    if (targetBlock.isSelected) return;
    targetBlock.isSelected = true;

    const lastBlock = selectedBlocks[selectedBlocks.length - 1];
    const isNextOfLastSelect = lastBlock
      ? start - lastBlock.start === timeUnit
      : false;

    // 앞쪽을 선택한경우에
    if (isNextOfLastSelect) setTimeBlocks([...timeBlocks]);
    // 그렇지 않은경우에
    else {
      for (const selectedBlock of selectedBlocks) {
        selectedBlock.isSelected = false;
      }
      setTimeBlocks([...timeBlocks]);
    }
  };

  const TimeBlockRender = ({
    start,
    isBlocked,
    isSelected,
    isPast
  }: ITimeBlock) => {
    const selecteds = timeBlocks.filter(tb => tb.isSelected);
    const isLastSeleceted = lastOf(selecteds)?.start === start || false;
    const classes = classNames("JDtimePicker__block", undefined, {
      "JDtimePicker__block--selected": isSelected,
      "JDtimePicker__block--lastSelected": isLastSeleceted,
      "JDtimePicker__block--past": isPast
    });
    const isOclock = start % TimePerMs.H === 0;

    return (
      <div key={start} className={classes}>
        {isOclock ? (
          <div className="JDtimePicker__blockLabel">
            <JDLabel txt={moment(start).format("A H시")} />
          </div>
        ) : (
          <div className="JDtimePicker__emptySpace" />
        )}
        <div
          onClick={() => handleClickLineBlock(start)}
          className={"JDtimePicker__lineBlock"}
        >
          {isPast || (
            <div className="JDtimePicker__lineBlockHover">
              <JDIcon icon="addCircle" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const cellWidth = $(`${thisPicker} .JDtimePicker__block`).width() || 0;
  let diff = dragInfo.currentPoint - dragInfo.dotPoint;

  const getFisrtSetSelectedCellLeft = () => {
    const firstSelected = $(`${thisPicker} .JDtimePicker__block--selected`);
    const firstSelectedCellLeft = Math.abs(
      (firstSelected.parent(".JDtimePicker").offset()?.left || 0) -
        (firstSelected.offset()?.left || 0)
    );
    return firstSelectedCellLeft;
  };

  useEffect(() => {
    const scrollLeft = $(thisPicker).scrollLeft() || 0;
    const firstSelectedCellLeft = getFisrtSetSelectedCellLeft();
    const selectedBlocks = timeBlocks.filter(tb => tb.isSelected);
    const selectedCount = selectedBlocks.length;

    const selectingWidth = cellWidth * selectedCount + diff;

    $(".JDtimePicker__selectingMarks").css({
      left: firstSelectedCellLeft + scrollLeft,
      width: selectingWidth
    });
  });

  const handleDrag = (e: any) => {
    if (dragInfo.isStart) {
      setDragInfo({ ...dragInfo, isStart: false });
      return;
    }
    setDragInfo({
      ...dragInfo,
      currentPoint: e.clientX
    });
  };
  const handleDragEnd = (e: any) => {
    if (!dragInfo.isDrag) return;
    e.persist();
    const firstSelectedCellLeft = getFisrtSetSelectedCellLeft();
    const count = Math.floor((e.clientX - firstSelectedCellLeft) / cellWidth);

    setDragInfo({
      isDrag: false,
      isStart: false,
      currentPoint: 0,
      dotPoint: 0
    });

    if (count < 0) return;

    const firstIndex = timeBlocks.findIndex(tb => tb.isSelected);

    for (const timeBlock of timeBlocks) {
      timeBlock.isSelected = false;
    }

    for (let i = 0; i < count; i++) {
      if (timeBlocks[firstIndex + i])
        timeBlocks[firstIndex + i].isSelected = true;
    }

    setTimeBlocks([...timeBlocks]);
  };

  useEffect(() => {
    const moveTo =
      $(`${thisPicker} .JDtimePicker__block--past`)
        .last()
        .offset()?.left || 0;
    const moveTime = ((currentTime % timeUnit) * cellWidth) / timeUnit;
    $(`${thisPicker} .JDtimePicker__todayMarker`).css({
      left: moveTo + moveTime + "px"
    });
  }, [cellWidth]);

  return (
    <div
      onMouseLeave={e => {
        handleDragEnd(e);
      }}
      onMouseMove={e => {
        if (dragInfo.isDrag) {
          e.persist();
          handleDrag(e);
        }
      }}
      onMouseUp={e => {
        handleDragEnd(e);
      }}
      id={uniqKey}
      className={`JDtimePicker`}
    >
      {timeBlocks.map(TB => TimeBlockRender(TB))}
      {isEmpty(selectedBlocks) || (
        <div className="JDtimePicker__selectingMarks">
          <div
            onMouseDown={e => {
              e.persist();
              if (!dragInfo.isDrag) {
                setDragInfo({
                  isDrag: true,
                  isStart: true,
                  currentPoint: e.clientX,
                  dotPoint: e.clientX
                });
              }
            }}
            className="JDtimePicker__handle"
          >
            <JDIcon icon="arrowRight" />
          </div>
        </div>
      )}
      <div className="JDtimePicker__todayMarker" />
    </div>
  );
};

export default reactWindowSize<IProps>(JDtimePicker);
