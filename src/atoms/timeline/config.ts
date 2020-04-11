import { defaultHeaderFormats } from "react-calendar-timeline";
import { LANG } from "../../hooks/hook";
import moment from "moment";
import { TimePerMs } from "../../types/enum";
import { IS_MOBILE } from "../../types/const";

// 변수설정
const ASSIG_IMELINE_HEIGHT = IS_MOBILE ? 45 : 40;

// 또는 HeaderCellRedner 파일 참조
const krSubHeaderLabelFormats = Object.assign({}, defaultHeaderFormats, {
  monthLong: `AMM ${LANG("month")}`, // 년 LANG("month") 필요
  hourLong: `M${LANG("month")} D${LANG("date")} ddd` // LANG("month") 일
});

const krHeaderLabelFormats = Object.assign({}, defaultHeaderFormats, {
  day: {
    Long: `A YYYY${LANG("year")} MM${LANG("month")} DD${LANG("date")}`
  }
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

export { defaultHeaderFormats, ASSIG_IMELINE_HEIGHT, sharedProps };
