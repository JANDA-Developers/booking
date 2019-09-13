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
import React from "react";
import "./Timeline.scss";
import moment from "moment";

// import 'react-calendar-timeline/lib/Timeline.css';
import ErrProtecter from "../../utils/errProtect";
import {TimePerMs, GlobalCSS} from "../../types/enum";
import JDdayPicker from "../dayPicker/DayPicker";
import JDIcon, {IconSize} from "../icons/Icons";
import {IUseDayPicker} from "../../actions/hook";

// 변수설정
const ASSIGT_IMELINE_HEIGHT = 36;
export {ASSIGT_IMELINE_HEIGHT};

const JDtimeline = ({...props}: any) => <Timeline {...props} />;

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
}) => (
  <div className="rct-header-root__topLeft" {...getRootProps()}>
    <JDdayPicker
      isRange={false}
      input
      canSelectBeforeDay={false}
      label="달력날자"
      {...dayPickerHook}
      className="JDwaves-effect JDoverflow-visible"
      inputComponent={
        <span>
          <JDIcon
            className="dailyPrice__topLeftIcon"
            size={IconSize.MEDEIUM_SMALL}
            icon="calendar"
          />
        </span>
      }
    />
  </div>
);

export default ErrProtecter(JDtimeline);
