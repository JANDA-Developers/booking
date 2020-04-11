import {
  THandleItemDoubleClick,
  IAssigTimelineHooks,
  IAssigTimelineUtils,
  THandleItemClick,
  THandleCanvasClick,
  THandleMoveResizeValidator,
  IAssigItem,
  GuestTypeAdd,
  IAssigHandlers,
  THandleItemResize,
  THandleItemMove,
  THandleCanvasDoubleClick,
  THandleTimeChange,
  THandleCanvasContextMenu,
  THandleItemSelect,
  IAssigTimelineContext,
  TShortKey,
  THandleDraggingCell,
  THandleMouseDown,
  THandleDraggingEnd
} from "../components/assigIntrerface";
import { TimePerMs } from "../../../../types/enum";
import { setMidNight, isEmpty } from "../../../../utils/utils";
import { CLASS_MOVING, CLASS_LINKED } from "../components/items/itemRenderFn";
import moment from "moment";
import _ from "lodash";
import $ from "jquery";
import {
  ASSIG_DATA_END,
  ASSIG_DATA_START,
  ASSIG_DATA_START_LIMITE,
  ASSIG_DATA_END_LIMITE
} from "../timelineConfig";
import { ReactTooltip } from "../../../../atoms/tooltip/Tooltip";
import { toast } from "react-toastify";
import { LANG } from "../../../../hooks/hook";

export function getAssigHandlers(
  {
    getItemById,
    allTooltipsHide,
    createMark,
    openCanvasMenuTooltip,
    resizeLinkedItems,
    allocateItem,
    resizeBlockBlock,
    openBlockMenu,
    popUpItemMenuTooltip,
    moveLinkedItems,
    removeMark,
    toogleCheckInOut,
    getItemsByType,
    getInfoesFromMarks
  }: IAssigTimelineUtils,
  {
    groupData,
    filteredGroup,
    isMobile,
    networkStatus,
    lock
  }: IAssigTimelineContext,
  {
    setDataTime,
    dataTime,
    bookingModal,
    guestValue,
    setGuestValue,
    isMultiSelectingMode
  }: IAssigTimelineHooks
): IAssigHandlers {
  // 단축키
  const shortKey: TShortKey = async (
    flag: "canvas" | "guestItem",
    e: React.MouseEvent<HTMLElement>,
    time?: number,
    groupId?: string,
    itemId?: string
  ) => {
    if (flag === "canvas") {
      if (e.ctrlKey) {
        // addBlock(time!, groupId!);
      }
    }
    if (flag === "guestItem") {
      if (e.ctrlKey) {
        toogleCheckInOut(itemId!);
      }
    }
  };

  const handleItemDoubleClick: THandleItemDoubleClick = async (
    itemId: string,
    e: React.MouseEvent<HTMLElement>,
    time: number
  ) => {
    console.info("handleItemDoubleClick");
    if (!e.persist) return;
    e.persist();
    const location = {
      clientX: e.clientX,
      clientY: e.clientY
    };
    const target = getItemById(itemId);
    popUpItemMenuTooltip(location, target);

    if (target.type === GuestTypeAdd.GUEST)
      bookingModal.openModal({ bookingId: target.bookingId });
  };

  // 핸들 캔버스 더블클릭시
  const handleCanvasDoubleClick: THandleCanvasDoubleClick = async (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {
    // 현재 인터페이스만 존재하는 함수 입니다.
  };

  //  캔버스 클릭시 호출됨
  const handleCanvasClick: THandleCanvasClick = async (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (e && e.persist) {
      e.persist();
      e.stopPropagation();
    }

    if (!e.shiftKey)
      setGuestValue([
        ...guestValue.filter(guest => guest.type !== GuestTypeAdd.MARK)
      ]);

    await allTooltipsHide();

    openCanvasMenuTooltip(e);
    createMark(time, time + TimePerMs.DAY, [groupId]);

    // if (shortKey) await shortKey("canvas", e, time, groupId);
    $(".assigItem").removeClass(CLASS_LINKED);
  };
  // 핸들 움직일때 벨리데이션 (마우스 움직이면 호출됨)
  // 새로운 시간을 리턴하거나 time을 리턴하세요.
  const handleMoveResizeValidator: THandleMoveResizeValidator = (
    action: "move" | "resize",
    item: IAssigItem,
    time: number,
    resizeEdge: "left" | "right" | undefined
  ) => {
    allTooltipsHide();
    if (action === "resize") {
      // 최소 아이템줌 설정
      if (item.start >= time) return item.end;
      if (setMidNight(Date.now()) >= time) return item.end;

      // resizeValidater(item, time);

      if (item.type !== GuestTypeAdd.BLOCK) {
        resizeLinkedItems(item.bookingId, time);
      }
    }

    if (action === "move") {
      // 🦄 예약날자 수정이 안료되면 적용
      return item.start;

      if (time < setMidNight(moment().valueOf())) {
        return item.start;
      }

      $(`.assigItem--booking${item.bookingId}`).addClass(CLASS_MOVING);
      $(`#assigItem--item${item.id}`).removeClass(CLASS_MOVING);

      const targetGroup = groupData.find(group => group.id === item.group);
      // 이동하는곳 성별 제한 확인
      if (targetGroup) {
        // 💔💔💔💔 아이템이 기존 아이템과 동일한 상태라서 group이 New 그룹이 아닙니다 ㅠㅠㅠ
      }
      moveLinkedItems(item.bookingId, time);
    }

    return time;
  };

  // 드래그를 토대로 마크들을 생성시킴
  const handleDraggingCell: THandleDraggingCell = (e, moveCounts, dotPoint) => {
    let { timeStart, placeIndex } = dotPoint;
    const { x, y } = moveCounts;

    let timeEnd = timeStart + TimePerMs.DAY * x + TimePerMs.DAY;
    let ids = [];

    for (let i = 0; i <= y; i++) {
      if (!filteredGroup[placeIndex + i]) return;
      ids.push(filteredGroup[placeIndex + i].id);
    }

    if (isMultiSelectingMode) {
      const markInfo = getInfoesFromMarks();
      if (markInfo) {
        const { start, end } = markInfo;
        timeStart = start;
        timeEnd = end;
        ids = [...ids, ...markInfo.groupIds];
        ids = _.uniq(ids);
      }
    } else if (timeEnd < timeStart) {
      const timeTemp = timeStart;
      timeStart = timeEnd;
      timeEnd = timeTemp;
    }

    if (isEmpty(ids)) return;

    createMark(timeStart, timeEnd, ids);
  };

  // 핸들 아이템 움직일시 (마우스 놓아야 호출됨)
  const handleItemMove: THandleItemMove = async (
    itemId: string,
    dragTime: number,
    newGroupOrder: number
  ) => {
    const targetGuest = getItemById(itemId);

    if (lock) {
      toast(LANG("cannot_move_item_now"));
      return;
    }
    if (!targetGuest) return;

    allocateItem(targetGuest, newGroupOrder);
    // $(`.${CLASS_MOVING}`).removeClass(CLASS_MOVING);
  };

  // 핸들 아이템 리사이즈시 (마우스 놓아야 호출됨)
  const handleItemResize: THandleItemResize = async (
    itemId: string,
    time: number,
    edge: "left" | "right"
  ) => {
    const targetGuest = getItemById(itemId);
    if (targetGuest.type === GuestTypeAdd.BLOCK) {
      resizeBlockBlock(targetGuest, time);
    }
  };

  // 핸들 아이템 클릭
  const handleItemClick: THandleItemClick = async (
    itemId: string,
    e: React.MouseEvent<HTMLElement>,
    time: number
  ) => {
    if (lock) return;
    console.info("handleItemClick");
    e.persist && e.persist();
    const target = getItemById(itemId);
    if (target.type === GuestTypeAdd.MARK) return;
    await removeMark();
    await allTooltipsHide();
    if (!e.clientX) return;

    const { clientX, clientY } = e;
    const location = {
      clientX: clientX + 10,
      clientY: clientY + 15
    };

    if (target.bookingId === "block") return;

    if (isMobile) {
      if (target.type === GuestTypeAdd.BLOCK)
        openBlockMenu(location, { item: target });
      // if (target.type === GuestTypeAdd.MAKE)
      // openCreateMenu(location, {item: target});
    } else {
      await popUpItemMenuTooltip(location, target);
    }

    if (shortKey) await shortKey("guestItem", e, undefined, undefined, itemId);
  };

  const handleDraggingEnd: THandleDraggingEnd = (e, IS_MOVE: boolean) => {
    console.info("handleDraggingEnd");

    IS_MOVE && openCanvasMenuTooltip(e);
  };

  const refetchDataByTime = _.debounce((start: number, end: number) => {
    setDataTime({
      start: setMidNight(start),
      end: setMidNight(end)
    });
  }, 900);

  // 타임라인 이동시
  const handleTimeChange: THandleTimeChange = (
    visibleTimeStart: number,
    visibleTimeEnd: number,
    updateScrollCanvas: any
  ) => {
    allTooltipsHide();
    const dataLimitEnd = dataTime.end - TimePerMs.DAY * ASSIG_DATA_END_LIMITE;
    const dataLimitStart =
      dataTime.start + TimePerMs.DAY * ASSIG_DATA_START_LIMITE;

    //  뒤로 요청
    if (visibleTimeStart < dataLimitStart) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * ASSIG_DATA_START;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * ASSIG_DATA_END;

      if (networkStatus >= 7) {
        refetchDataByTime(queryStart, queryEnd);
      }
    }

    //  앞으로 요청
    if (dataLimitEnd < visibleTimeEnd) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * ASSIG_DATA_START;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * ASSIG_DATA_END;
      if (networkStatus >= 7) {
        refetchDataByTime(queryStart, queryEnd);
      }
    }

    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  };

  // 🐭 캔버스 오른쪽 클릭
  const handleCanvasContextMenu: THandleCanvasContextMenu = (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {};

  // 🐭 아이템이 선택되었을때
  const handleItemSelect: THandleItemSelect = async (
    itemId: string,
    e: React.MouseEvent<HTMLElement>,
    time: number
  ) => {
    const target = getItemById(itemId);
    if (target) {
      await $(".assigItem").removeClass(CLASS_LINKED);
      $(`.assigItem--booking${target.bookingId}`).addClass(CLASS_LINKED);
    }

    if (target.type === GuestTypeAdd.GUEST) {
      await removeMark();
      await allTooltipsHide();
      const targetEl = $(`#assigItem__configIconWrapId${target.id}`).get(0);
      ReactTooltip.show(targetEl);
      $("#itemTooltip").addClass("itemTooltip--show");
    }
  };

  const handleMouseDownCanvas: THandleMouseDown = e => {
    allTooltipsHide();
    removeMark();
  };

  const assigHandler: IAssigHandlers = {
    handleCanvasClick,
    handleMouseDownCanvas,
    handleCanvasDoubleClick,
    handleItemClick,
    handleItemDoubleClick,
    handleItemMove,
    handleItemResize,
    handleDraggingEnd,
    handleMoveResizeValidator,
    handleTimeChange,
    handleCanvasContextMenu,
    handleItemSelect,
    handleDraggingCell
  };

  return assigHandler;
}
