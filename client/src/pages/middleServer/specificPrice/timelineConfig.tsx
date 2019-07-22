import {sharedProps} from "../../../atoms/timeline/Timeline";

const priceTimelineKeys = {
  groupIdKey: "_id",
  groupTitleKey: "name",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "name",
  itemDivTitleKey: "name",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "name"
};

const PriceTimelineDefaultProps = {
  ...sharedProps,
  keys: priceTimelineKeys,
  fixedHeader: "fixed",
  canMove: false,
  canResize: false,
  canSelect: false,
  itemsSorted: true,
  canChangeGroup: false,
  itemTouchSendsClick: false,
  stackItems: true,
  traditionalZoom: false,
  itemHeightRatio: 1,
  showCursorLine: false,
  lineHeight: 54
};
export default PriceTimelineDefaultProps;
export {PriceTimelineDefaultProps};
