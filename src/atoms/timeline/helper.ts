import $ from "jquery";
import { IDotPoint } from "./declare";
import { ASSIG_IMELINE_HEIGHT } from "./config";
import { isEmpty } from "../../utils/utils";

const cellHeight = ASSIG_IMELINE_HEIGHT;

let oneDayWith = 0;
let firstCell;
let targetGroup: any;
let firstCellLeft = 0;

// 자원을 아끼기위해 누르는순간에만 기록합니다.
const getTimelineInfo = () => {
  targetGroup = $(`.timelineHeaderCell div:first-child`);
  firstCell = $(`.timelineHeaderCell`)[0];
  oneDayWith = $(firstCell).width() || 0;

  if (firstCell) {
    firstCellLeft = $(firstCell).position().left;
  }
};

interface IProps {
  clientX: number;
  clientY: number;
  dotPoint: IDotPoint;
}

export const cellMoveCountCalculation = ({
  clientX,
  clientY,
  dotPoint
}: IProps) => {
  // 움직임양 X Y
  const moveDiffX = clientX - dotPoint.clientX;
  const moveDiffY = clientY - dotPoint.clientY;

  // 왼쪽 [▒▒▒▒| ]
  const diffMovePoint =
    (dotPoint.offsetX + Math.abs(firstCellLeft)) % oneDayWith;
  // 오른쪽 [    |▒▒]
  const opositDiffMovePoint = oneDayWith - diffMovePoint;

  let moveCountX = 0;
  let moveCountY = 0;

  // X축 움직임 계산
  if (moveDiffX > 0 && moveDiffX > opositDiffMovePoint) {
    moveCountX = Math.floor((moveDiffX - opositDiffMovePoint) / oneDayWith) + 1;
  } else if (moveDiffX < 0 && Math.abs(moveDiffX) > diffMovePoint) {
    moveCountX = Math.ceil((moveDiffX + diffMovePoint) / oneDayWith) - 1;
  }

  // Y축 움직임 계산
  const diffMovePointY = dotPoint.offsetY;
  const opositDiffMovePointY = cellHeight - diffMovePointY;

  if (moveDiffY > 0 && moveDiffY > opositDiffMovePointY) {
    moveCountY =
      Math.floor((moveDiffY - opositDiffMovePointY - 2) / cellHeight) + 1;
  } else if (moveDiffY < 0 && Math.abs(moveDiffY) > diffMovePointY) {
    moveCountY = Math.ceil((moveDiffY + diffMovePointY) / cellHeight) - 1;
  }

  return { moveCountX, moveCountY };
};

// 닷포인트이 시작 시간을 찾음
export const getStartTime = async ({ offsetX }: { offsetX: number }) => {
  await getTimelineInfo();

  const cellIndex =
    Math.floor((offsetX + Math.abs(firstCellLeft)) / oneDayWith) + 1;

  const theCell = targetGroup[cellIndex];

  if (isEmpty(theCell)) return 0;

  // 해당 인덱스 또는 인덱스-1 "Tooltip"떄문
  let startTime = $(theCell).data("start");

  if (!startTime) startTime = $(targetGroup[cellIndex - 1]).data("start");
  if (!startTime) {
    Error("셀 시작시간을 찾을수 없습니다.");
  }

  return startTime;
};
