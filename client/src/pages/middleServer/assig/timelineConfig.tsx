import {
  ASSIGT_IMELINE_HEIGHT,
  sharedProps
} from "../../../atoms/timeline/Timeline";
import assigGroupRendererFn from "./components/groupRenderFn";
import {IAssigGroup} from "./AssigTimelineWrap";
import itemRendererFn from "./components/itemRenderFn";

// Assig Timeline 으로 전달될 객체
const assigDefaultProps = {
  ...sharedProps,
  groupRenderer: assigGroupRendererFn,
  fixedHeader: "fixed",
  sidebarWidth: 230,
  canMove: true,
  canResize: "right",
  canSelect: true,
  itemsSorted: true,
  itemTouchSendsClick: false,
  stackItems: true,
  itemHeightRatio: 1,
  showCursorLine: true,
  lineHeight: ASSIGT_IMELINE_HEIGHT,
  horizontalLineClassNamesForGroup: (group: IAssigGroup) => {
    const groupClasses = ["group"];
    group.isLastOfRoom && groupClasses.push("group--lastOfRoom");
    group.isLastOfRoomType && groupClasses.push("group--lastOfRoomType");
    return groupClasses;
  }
};

export default assigDefaultProps;
