import $ from "jquery";
/* tslint:disable */
import Timeline, {
  // @ts-ignore
  SidebarHeader,
  // @ts-ignore
  DateHeader,
  // @ts-ignore
  TimelineHeaders,
  // @ts-ignore
  CustomHeader,
  defaultSubHeaderLabelFormats,
  defaultHeaderLabelFormats
} from "react-calendar-timeline";
import React, {useState} from "react";
import "./Timeline.scss";
import moment from "moment";

// import 'react-calendar-timeline/lib/Timeline.css';
import ErrProtecter from "../../utils/errProtect";
import {TimePerMs} from "../../types/enum";
import JDIcon, {IconSize} from "../icons/Icons";
import {IUseDayPicker, useModal} from "../../hooks/hook";
import DayPickerModal from "../../components/dayPickerModal/DayPickerModal";
import {isEmpty} from "../../utils/utils";
import {THandleMouseDown} from "../../pages/middleServer/assig/components/assigIntrerface";

export interface IDotPoint {
  clientY: number;
  clientX: number;
  placeIndex: number;
  timeStart: number;
}

export interface IMoveCount {
  x: number;
  y: number;
}

// 변수설정
const ASSIG_IMELINE_HEIGHT = 36;
export {ASSIG_IMELINE_HEIGHT};

interface Iprops {
  handleMouseDownCanvas?: THandleMouseDown;
  hanldeOnKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleDraggingCell?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    moveCounts: IMoveCount,
    dotPoint: IDotPoint
  ) => void;
}

// 🍰 메인리턴
const JDtimeline: React.FC<Iprops> = ({
  onMouseDown,
  onMouseMove,
  handleMouseDownCanvas,
  handleDraggingCell,
  hanldeOnKeyDown,
  ...props
}: any) => {
  const [isActive, setIsActive] = useState(false);
  const [dotPoint, setDotPoint] = useState<IDotPoint>({
    clientY: 0,
    clientX: 0,
    placeIndex: 0,
    timeStart: 0
  });

  const oneDayWith = $(".timelineHeaderCell").width();
  const firstCell = $(`.timelineHeaderCell`)[0];
  const targetGroup = $(`.timelineHeaderCell div:first-child`);
  let firstCellLeft = 0;
  if (firstCell) {
    firstCellLeft = $(firstCell).position().left;
  }

  const scrollTarget = $(".rct-scroll");

  const toggleDraggingMode = (flag: boolean) => {
    scrollTarget.css("pointer-events", flag ? "none" : "all");
    $(".react-calendar-timeline").css("cursor", flag ? "crosshair" : "");
    setIsActive(false);
  };

  return (
    <div
      onMouseMove={e => {
        e.persist();
        if (!oneDayWith || !handleDraggingCell || !isActive || !e.ctrlKey)
          return;
        const {clientX, clientY} = e.nativeEvent;
        const moveDiffX = clientX - dotPoint.clientX;
        const moveDiffY = clientY - dotPoint.clientY;
        const diffMovePoint =
          (dotPoint.clientX + Math.abs(firstCellLeft)) % oneDayWith;
        const opositDiffMovePoint = oneDayWith - diffMovePoint;

        let moveCountX = 0;
        let moveCountY = 0;
        if (moveDiffX > 0 && moveDiffX > opositDiffMovePoint) {
          moveCountX = Math.floor((moveDiffX - diffMovePoint) / oneDayWith) + 1;
        } else if (moveDiffX < 0 && Math.abs(moveDiffX) > diffMovePoint) {
          moveCountX = Math.ceil((moveDiffX + diffMovePoint) / oneDayWith) - 1;
        }
        const moveDiffCount = moveDiffY / 36;

        moveCountY =
          moveDiffY > 0 ? Math.floor(moveDiffCount) : Math.ceil(moveDiffCount);

        handleDraggingCell(e, {x: moveCountX, y: moveCountY}, dotPoint);
        // 마우스가 움직인 양을 토대로 위아래 좌우 그룹을 선택상태로 만듬
      }}
      // onMouseUp={e => {}}
      onKeyUp={e => {
        if (e.ctrlKey) {
          toggleDraggingMode(false);
          setIsActive(false);
        }
      }}
      onKeyDown={e => {
        if (e.ctrlKey) {
          toggleDraggingMode(true);
        }
      }}
      onMouseDown={e => {
        e.persist();
        const group = e.target;
        handleMouseDownCanvas && handleMouseDownCanvas();
        if (
          $(group).hasClass("group") ||
          !e.ctrlKey ||
          !isActive ||
          !oneDayWith ||
          isEmpty(targetGroup)
        )
          return;

        setIsActive(true);
        const {offsetX, offsetY, clientY, clientX} = e.nativeEvent;
        const firstCellLeft = $(firstCell).position().left;

        const cellIndex =
          Math.floor((offsetX + Math.abs(firstCellLeft)) / oneDayWith) + 1;

        const theCell = targetGroup[cellIndex];

        // 해당 인덱스 또는 인덱스-1 "Tooltip"떄문
        let startTime = $(theCell).data("start");
        if (!startTime) startTime = $(targetGroup[cellIndex - 1]).data("start");
        if (!startTime) return;

        setDotPoint({
          clientY,
          clientX,
          placeIndex: $(group).index(),
          timeStart: startTime
        });
      }}
    >
      <Timeline id="react-calendar-timeline" {...props} />
    </div>
  );
};

const krSubHeaderLabelFormats = Object.assign(
  {},
  defaultSubHeaderLabelFormats,
  {
    monthLong: "MM 월", // 년 월 필요
    hourLong: "M월 D일 ddd" // 월 일
  }
);

const krHeaderLabelFormats = Object.assign({}, defaultHeaderLabelFormats, {
  dayLong: "YYYY년 MM월 DD일 "
});

const defaultTimeStart = moment()
  .startOf("day")
  .toDate();

// 시작시 끝까지 보일범위
const defaultTimeEnd = moment()
  .startOf("day")
  .add(7, "day")
  .toDate();

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "bookingId",
  itemDivTitleKey: "id",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

const sharedProps = {
  keys,
  minZoom: 14 * TimePerMs.DAY,
  maxZoom: 7 * TimePerMs.DAY,
  dragSnap: TimePerMs.DAY,
  subHeaderLabelFormats: krSubHeaderLabelFormats,
  headerLabelFormats: krHeaderLabelFormats,
  timeSteps: {
    hour: 24,
    day: 1,
    month: 1,
    year: 1
  },
  fixedHeader: "fixed",
  verticalLineClassNamesForTime: (timeStart: any, timeEnd: any) => {
    if (timeEnd < new Date().getTime())
      return ["verticalLine", "verticalLine--past"];
    return ["verticalLine"];
  },
  horizontalLineClassNamesForGroup: (group: any) => ["group"],
  defaultTimeStart,
  defaultTimeEnd
};

export {
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats,
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  CustomHeader,
  sharedProps
};

interface IProps {
  dayPickerHook: IUseDayPicker;
  getRootProps: any;
}

export const SharedSideBarHeader: React.FC<IProps> = ({
  dayPickerHook,
  getRootProps
}) => {
  const dayPickerModalHook = useModal(false);
  return (
    <div>
      <div className="rct-header-root__topLeft" {...getRootProps()}>
        <div
          onClick={() => {
            dayPickerModalHook.openModal();
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <JDIcon
            className="dailyPrice__topLeftIcon"
            size={IconSize.MEDEIUM_SMALL}
            icon="calendar"
          />
        </div>
      </div>
      <DayPickerModal
        modalHook={dayPickerModalHook}
        isRange={false}
        canSelectBeforeDay={true}
        calenaderPosition="center"
        label="달력날자"
        {...dayPickerHook}
        className="JDwaves-effect JDoverflow-visible"
      />
    </div>
  );
};

export default ErrProtecter(JDtimeline);
