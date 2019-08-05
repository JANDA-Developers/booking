import {
  ASSIGT_IMELINE_HEIGHT,
  sharedProps
} from "../../../atoms/timeline/Timeline";
import assigGroupRendererFn from "./components/groupRenderFn";
import itemRendererFn from "./components/item/itemRenderFn";
import {IAssigGroup} from "./components/assigIntrerface";

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

// 불러올 데이터양
export const ASSIG_VISIBLE_CELL_PC = 10;
export const ASSIG_VISIBLE_CELL_MB_DIFF = 5;
// 불러올 데이터양
export const ASSIG_DATA_END = 14;
export const ASSIG_DATA_START = 18;
// 불러올 데이터 타이밍
export const ASSIG_DATA_START_LIMITE = 10;
export const ASSIG_DATA_END_LIMITE = 10;

export default assigDefaultProps;
