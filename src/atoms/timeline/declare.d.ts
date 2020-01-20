import { THandleMouseDown } from "../../pages/bookingHost/assig/components/assigIntrerface";

export interface IDotPoint {
  offsetX: number;
  offsetY: number;
  clientY: number;
  clientX: number;
  placeIndex: number;
  timeStart: number;
}

export interface IMoveCount {
  x: number;
  y: number;
}

interface ITimelineProps {
  handleMouseDownCanvas?: THandleMouseDown;
  hanldeOnKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleDraggingEnd?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDraggingCell?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    moveCounts: IMoveCount,
    dotPoint: IDotPoint
  ) => void;
}
