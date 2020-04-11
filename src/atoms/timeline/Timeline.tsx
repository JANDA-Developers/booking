import $ from "jquery";
import _ from "lodash";
import Timeline, {
  SidebarHeader,
  DateHeader,
  TimelineHeaders,
  CustomHeader,
  TimelineMarkers,
  CustomMarker,
  CursorMarker
} from "react-calendar-timeline";
import React, { useState, useEffect } from "react";
import "./Timeline.scss";

import ErrProtecter from "../../utils/errProtect";
import { TimePerMs } from "../../types/enum";
import { IDotPoint, ITimelineProps } from "./declare";
import { getStartTime, cellMoveCountCalculation } from "./helper";
// @ts-ignore
import containerResizeDetector from "react-calendar-timeline/lib/resize-detector/container";
// 드래그를 했는지 검사
let IS_MOVE = true;

// 🍰 메인리턴
const JDtimeline: React.FC<ITimelineProps> = ({
  onMouseDown,
  onMouseMove,
  handleDraggingEnd,
  handleMouseDownCanvas,
  handleDraggingCell,
  hanldeOnKeyDown,
  ...props
}: any) => {
  const [isActive, setIsActive] = useState(false);
  const defaultDotPoint: IDotPoint = {
    clientX: 0,
    clientY: 0,
    offsetX: 0,
    offsetY: 0,
    placeIndex: 0,
    timeStart: 0
  };
  const [dotPoint, setDotPoint] = useState<IDotPoint>(defaultDotPoint);

  const toggleDraggingMode = (flag: boolean) => {
    $(".rct-scroll").css("cursor", flag ? "cell" : "");
    setIsActive(flag);
  };

  const handleCavasMouseMove = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.persist();
    if (
      !handleDraggingCell ||
      !isActive ||
      !dotPoint.clientX ||
      !dotPoint.clientY ||
      !e.nativeEvent
    )
      return;
    const { clientX, clientY } = e.nativeEvent;

    IS_MOVE = true;

    const { moveCountX, moveCountY } = cellMoveCountCalculation({
      clientX,
      clientY,
      dotPoint
    });

    handleDraggingCell(e, { x: moveCountX, y: moveCountY }, dotPoint);
    // 마우스가 움직인 양을 토대로 위아래 좌우 그룹을 선택상태로 만듬
  };

  const hanldeMouseDown = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.persist();
    const group = e.target;
    handleMouseDownCanvas && handleMouseDownCanvas(e);

    // 마우스 오른쪽버튼이 아니거나
    // 그룹이 올바르지 않거나
    if (e.button !== 2 || !$(group).hasClass("group")) return;

    IS_MOVE = false;
    toggleDraggingMode(true);

    const { offsetX, offsetY, clientY, clientX } = e.nativeEvent;
    const timeStart = await getStartTime({ offsetX });

    setDotPoint({
      offsetX,
      offsetY,
      clientY,
      clientX,
      placeIndex: $(group).index(),
      timeStart
    });
  };

  const throttenHandleMouseMove = _.throttle(handleCavasMouseMove, 200, {
    trailing: true
  });

  useEffect(() => {
    // 타임라인 밖까지 드래그했을경우 이벤트가 발생 하지않아서 여기배치
    const handleMouseUpCanvas = (e: any) => {
      if (isActive) handleDraggingEnd(e, IS_MOVE);
      toggleDraggingMode(false);
      setDotPoint(defaultDotPoint);
    };

    window.addEventListener("mouseup", handleMouseUpCanvas);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpCanvas);
    };
  });

  return (
    <div onMouseMove={throttenHandleMouseMove} onMouseDown={hanldeMouseDown}>
      <Timeline
        fixedHeader="fixed"
        id="react-calendar-timeline"
        {...props}
        resizeDetector={containerResizeDetector}
      />
    </div>
  );
};

export {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  CustomHeader,
  CursorMarker,
  TimelineMarkers,
  CustomMarker
};

export default ErrProtecter(JDtimeline);
