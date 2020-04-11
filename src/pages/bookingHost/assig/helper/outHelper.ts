import { IAssigGroup, IAssigItem } from "../components/assigIntrerface";
import $ from "jquery";
import { ASSIG_IMELINE_HEIGHT } from "../../../../atoms/timeline/config";
import isMobile from "is-mobile";

const IS_MOBILE = isMobile();
// 퍼포먼스 최적화 필요한 높이를 계산해줌
export const getCutCount = (
  winodwHiehgt: number
): {
  cutFrom: number;
  cutTo: number;
} => {
  const cutHeight = $(".group").height() || ASSIG_IMELINE_HEIGHT;
  const currentWindowScrollTop = $("html").scrollTop() || 0;
  const dataTopTemp = currentWindowScrollTop - winodwHiehgt / 2;
  const dataTop = dataTopTemp < 0 ? 0 : dataTopTemp;
  const dataBottomTemp = IS_MOBILE ? winodwHiehgt * 2.2 : winodwHiehgt * 3;
  const dataBottom = currentWindowScrollTop + dataBottomTemp;
  const cutCountFrom = dataTop / cutHeight;
  const cutCountEnd = dataBottom / cutHeight;

  return {
    cutFrom: cutCountFrom,
    cutTo: cutCountEnd
  };
};

export const getCuttedGroups = (
  groups: IAssigGroup[],
  from: number,
  to: number
): IAssigGroup[] => {
  return groups.slice(0, to);
};

export const getCuttedItmes = (
  viewGroupsId: string[],
  items: IAssigItem[]
): IAssigItem[] => {
  return items.filter(item => viewGroupsId.includes(item.group));
};
