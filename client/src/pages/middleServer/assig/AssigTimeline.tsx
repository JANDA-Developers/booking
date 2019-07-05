import React, {useState, useEffect} from "react";
import $ from "jquery";
import {Link} from "react-router-dom";
import "moment/locale/ko";
import {MutationFn} from "react-apollo";
import _ from "lodash";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import windowSize, {WindowSizeProps} from "react-window-size";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  ASSIGT_IMELINE_HEIGHT,
  CustomHeader,
  SharedSideBarHeader
} from "../../../atoms/timeline/Timeline";
import ErrProtecter from "../../../utils/errProtect";
import Button from "../../../atoms/button/Button";
import BookingModalWrap from "../../../components/bookingModal/BookingModalWrap";
import {IUseDayPicker, useModal} from "../../../actions/hook";
import classnames from "classnames";
import assigGroupRendererFn from "./components/groupRenderFn";
import {IRoomType, IHouseConfig} from "../../../types/interface";
import Preloader from "../../../atoms/preloader/Preloader";
import "./AssigTimeline.scss";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import TooltipList, {
  ReactTooltip
} from "../../../atoms/tooltipList/TooltipList";
import {
  TimePerMs,
  WindowSize as EWindowSize,
  GlobalCSS
} from "../../../types/enum";
import itemRendererFn, {
  CLASS_LINKED,
  CLASS_MOVING
} from "./components/itemRenderFn";
import {setMidNight, onCompletedMessage, isEmpty} from "../../../utils/utils";
import ItemMenu from "./components/itemMenu";
import CanvasMenu from "./components/canvasMenu";
import MakeItemMenu from "./components/makeItemMenu";
import {DEFAULT_ASSIG_ITEM, DEFAULT_ASSIG_GROUP} from "../../../types/defaults";
import {JDtoastModal} from "../../../atoms/modal/Modal";
import moment from "moment-timezone";
import {
  IAssigMutationes,
  IAssigItem,
  GuestTypeAdd,
  TToogleCheckIn,
  ICanvasMenuProps,
  IAssigGroup,
  IAssigTimelineHooks,
  IAssigTimelineContext,
  IMakeMenuProps,
  IDeleteMenuProps,
  TOpenBlockMenu,
  TOpenCanvasMenu
} from "./components/assigIntrerface";
import {getAssigUtils} from "./components/assigUtils";
import BlockItemMenu from "./components/blockItemMenu";
import {
  ASSIG_DATA_END_LIMITE,
  ASSIG_DATA_START_LIMITE,
  ASSIG_DATA_END,
  ASSIG_DATA_START,
  ASSIG_VISIBLE_CELL_MB_DIFF
} from "./timelineConfig";
import JDmultiBox from "../../../atoms/multiBox/MultiBox";

// Temp 마킹용이 있는지
let MARKED = false;

// 충돌시간 인터페이스
// 단순히 안됨 보다 ~부터 ~가 안됨을 표시하기 위함
// 게스트1이 이동하는 주체

interface IProps {
  houseId: string;
  defaultProps: any;
  dayPickerHook: IUseDayPicker;
  groupData: IAssigGroup[];
  loading: boolean;
  //  디프리 될수도
  roomTypesData: IRoomType[];
  deafultGuestsData: IAssigItem[];
  defaultTimeStart: number;
  defaultTimeEnd: number;
  houseConfig: IHouseConfig;
  assigMutationes: IAssigMutationes;
  dataTime: {
    start: number;
    end: number;
  };
  setDataTime: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
    }>
  >;
}

// 👿 모든 Util들과 서브함수들은 파일분리 순수한 timeline Hadnler만 남길것
const ShowTimeline: React.FC<IProps & WindowSizeProps> = ({
  dayPickerHook,
  defaultProps,
  groupData,
  loading,
  houseId,
  houseConfig,
  deafultGuestsData,
  defaultTimeStart,
  defaultTimeEnd,
  windowWidth,
  windowHeight,
  roomTypesData,
  setDataTime,
  dataTime,
  assigMutationes
}) => {
  const isMobile = windowWidth <= EWindowSize.MOBILE;
  const isTabletDown = windowWidth <= EWindowSize.TABLET;
  const [guestValue, setGuestValue] = useState<IAssigItem[]>(deafultGuestsData);
  const confirmDelteGuestHook = useModal(false);
  const [viewRoomType, setViewRoomType] = useState(
    roomTypesData.map(roomType => roomType._id)
  );
  const [canvasMenuProps, setCanvasMenuProps] = useState<ICanvasMenuProps>({
    start: 0,
    end: 0,
    groupId: "",
    group: {
      ...DEFAULT_ASSIG_GROUP
    }
  });
  const bookingModal = useModal(false);
  const [blockMenuProps, setBlockMenuProps] = useState<IDeleteMenuProps>({
    item: DEFAULT_ASSIG_ITEM
  });
  const [makeMenuProps, setMakeMenuProps] = useState<IMakeMenuProps>({
    item: DEFAULT_ASSIG_ITEM
  });

  useEffect(() => {
    setGuestValue(deafultGuestsData);
  }, [JSON.stringify(deafultGuestsData)]);

  const assigHooks: IAssigTimelineHooks = {
    guestValue,
    canvasMenuProps,
    blockMenuProps,
    makeMenuProps,
    setGuestValue,
    setCanvasMenuProps,
    setMakeMenuProps,
    setBlockMenuProps,
    confirmDelteGuestHook,
    bookingModal
  };

  const assigContext: IAssigTimelineContext = {
    isMobile,
    windowWidth,
    windowHeight,
    groupData,
    houseId
  };

  const assigUtils = getAssigUtils(assigHooks, assigMutationes, assigContext);

  const {assigTimeline} = houseConfig;
  if (!assigTimeline) {
    throw Error("empty houseConfig__assigTimeline");
  }

  const {roomTypeTabEnable} = assigTimeline;

  const {
    addBlock,
    allTooltipsHide,
    deleteGuestById,
    findGroupById,
    findItemById,
    moveLinkedItems,
    openMakeMenu,
    removeMark,
    resizeLinkedItems,
    toogleCheckInOut,
    openBlockMenu,
    openCanvasMenu
  } = assigUtils;

  const {allocateMu, createBlockMu} = assigMutationes;

  // 툴팁들을 제거하고
  const handleWindowClickEvent = () => {
    if (MARKED) {
      removeMark();
      MARKED = false;
    }

    allTooltipsHide();
  };

  // 툴팁 제거 이벤트들을 window에 달아줌 그리고 나갈때 제거
  useEffect(() => {
    window.addEventListener("click", handleWindowClickEvent);
    return () => {
      window.removeEventListener("click", handleWindowClickEvent);
    };
  });

  // 툴팁 리빌드
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const handleItemDoubleClick = async (
    itemId: string,
    e: React.MouseEvent<HTMLElement>,
    time: number
  ) => {
    e.persist();
    const location = {
      clientX: e.clientX,
      clientY: e.clientY
    };
    await allTooltipsHide();
    const target = findItemById(itemId);
    if (target.type === GuestTypeAdd.BLOCK) {
      openBlockMenu(location, {item: target});
    }
    // if (target.type === "normal")
    // bookingModal.openModal({bookingId: target.bookingId});
    if (target.type === GuestTypeAdd.MAKE) {
      openMakeMenu(location, {item: target});
    }
  };

  //  캔버스 클릭시 호출됨
  const handleCanvasClick = async (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (isMobile) {
      handleCanvasDoubleClick(groupId, time, e);
    }
    if (e.ctrlKey) {
      addBlock(time, groupId);
    }
    $(".assigItem").removeClass(CLASS_LINKED);
  };

  // 핸들아이템이 그룹에 그시간대에 포함될수 있는지 검사해줍니다.
  // const moveValidater = (item: IAssigItem, targetGroup: IAssigGroup, time: number): IValidationResult[] => {
  //   const linkedGuests = guestValue.filter(guest => guest.bookingId === item.bookingId);
  //   // 좌우MOVE 일경우
  //   if (Math.abs(time - item.start) >= TimePerMs.DAY) {
  //     const validaterResults = linkedGuests.map((guest) => {
  //       const result = validater(guest);
  //       return result;
  //     });
  //     return validaterResults;
  //   }
  //   // 위아래 MOVE
  //   const validaterResult = validater(item);
  //   return [validaterResult];
  // };
  // Handle -- item : TripleClick

  // 핸들 캔버스 더블클릭시
  const handleCanvasDoubleClick = async (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    MARKED = true;

    await allTooltipsHide();

    const targetGroup = findGroupById(groupId);

    openCanvasMenu(e, {
      start: time,
      end: time + TimePerMs.DAY,
      groupId: groupId,
      group: targetGroup
    });

    const filteredGuestValue = guestValue.filter(
      guest => guest.type !== GuestTypeAdd.MARK
    );

    filteredGuestValue.push({
      ...DEFAULT_ASSIG_ITEM,
      id: `mark${groupId}${time}`,
      type: GuestTypeAdd.MARK,
      start: time,
      end: time + TimePerMs.DAY,
      group: groupId
    });

    setGuestValue([...filteredGuestValue]);
  };

  // 핸들 움직일때 벨리데이션 (마우스 움직이면 호출됨)
  // 새로운 시간을 리턴하거나 time을 리턴하세요.
  const handleMoveResizeValidator = (
    action: "move" | "resize",
    item: IAssigItem,
    time: number,
    resizeEdge: "left" | "right" | undefined
  ): number => {
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
      $(`#assigItem--guest${item.id}`).removeClass(CLASS_MOVING);

      const targetGroup = groupData.find(group => group.id === item.group);
      // 이동하는곳 성별 제한 확인
      if (targetGroup) {
        // 💔💔💔💔 아이템이 기존 아이템과 동일한 상태라서 group이 New 그룹이 아닙니다 ㅠㅠㅠ
      }
      moveLinkedItems(item.bookingId, time);
    }

    return time;
  };

  // 핸들 아이템 움직일시 (마우스 놓아야 호출됨)
  const handleItemMove = async (
    itemId: string,
    dragTime: number,
    newGroupOrder: number
  ) => {
    const guestValueOriginCopy = $.extend(true, [], guestValue);
    const targetGuest = findItemById(itemId);
    if (!targetGuest) return;
    targetGuest.group = groupData[newGroupOrder].id;
    setGuestValue([...guestValue]);

    const newGroupId = groupData[newGroupOrder].roomId;

    $(`.${CLASS_MOVING}`).removeClass(CLASS_MOVING);

    // 배정 뮤테이션을 발생
    if (targetGuest.type === GuestTypeAdd.GUEST) {
      const result = await allocateMu({
        variables: {
          guestId: itemId,
          roomId: newGroupId,
          bedIndex: groupData[newGroupOrder].bedIndex
        }
      });
      // 실패하면 전부 되돌림

      // 👿 이반복을 함수 if 로 만들면 어떨까?
      if (result) {
        if (result.data) {
          if (!result.data.AllocateGuestToRoom.ok) {
            setGuestValue([...guestValueOriginCopy]);
          }
        }
      }
    }
  };

  // 핸들 아이템 리사이즈시 (마우스 놓아야 호출됨)
  const handleItemResize = async (
    itemId: string,
    time: number,
    edge: "left" | "right"
  ) => {
    const targetGuest = findItemById(itemId);
    if (targetGuest.type === GuestTypeAdd.BLOCK) {
      const guestValueOriginCopy = $.extend(true, [], guestValue);
      await resizeLinkedItems(targetGuest.bookingId, time);

      const result = await createBlockMu({
        variables: {
          bedIndex: targetGuest.bedIndex,
          end: time,
          houseId: houseId,
          roomId: targetGuest.roomId,
          start: targetGuest.start
        }
      });

      // 에러처리
      if (result && result.data && !result.data.CreateBlock.ok) {
        setGuestValue([...guestValueOriginCopy]);
      } else {
      }
    }
  };

  // 핸들 아이템 클릭
  const handleItemClick = async (
    itemId: string,
    e: React.MouseEvent<HTMLElement>,
    time: number
  ) => {
    if (e.persist) e.persist();
    const {clientX, clientY} = e;
    const location = {
      clientX: clientX,
      clientY: clientY
    };
    const target = findItemById(itemId);
    if (target.bookingId === "block") return;

    if (isMobile) {
      if (target.type === GuestTypeAdd.BLOCK)
        openBlockMenu(location, {item: target});
      if (target.type === GuestTypeAdd.MAKE)
        openMakeMenu(location, {item: target});
    }

    // 컨트롤: 체크인
    if (e.ctrlKey) {
      toogleCheckInOut(itemId);
    }
    // 쉬프트 팝업
    if (e.shiftKey) {
      bookingModal.openModal({bookingId: target.bookingId});
    }
    // 알트: 배정확정
    if (e.altKey) {
      guestValue[target.guestIndex].isUnsettled = !guestValue[target.guestIndex]
        .isUnsettled;
      setGuestValue([...guestValue]);
    }
  };

  // 타임라인 이동시
  const handleTimeChnage = (
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

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd)
      });
    }

    //  앞으로 요청
    if (dataLimitEnd < visibleTimeEnd) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * ASSIG_DATA_START;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * ASSIG_DATA_END;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd)
      });
    }
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  };

  // 🐭 캔버스 오른쪽 클릭
  const handleCanvasContextMenu = (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {};

  // 🐭 아이템이 선택되었을때
  const handleItemSelect = async (
    itemId: string,
    e: React.MouseEvent<HTMLElement>,
    time: number
  ) => {
    const target = findItemById(itemId);
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

  const timelineClassNames = classnames("assigTimeline", undefined, {
    "assiTimeline--mobile": windowWidth <= 400
  });

  return (
    <div
      id="AssigTimeline"
      className={`${timelineClassNames} container container--full`}
    >
      <div className="docs-section">
        <h3 className="assigTimeline__titleSection">
          {"방배정"}
          <Preloader
            floating
            loading={loading}
            className="assigTimeline__mainPreloder"
            size="medium"
          />
        </h3>
        <div className="flex-grid flex-grid--end">
          <Link to="/middleServer/resvList">
            <Button float="right" icon="list" label="예약목록 보기" />
          </Link>
          {roomTypeTabEnable && (
            <JDmultiBox
              defaultAllToogle={true}
              withAllTooglerLabel="전부보기"
              withAllToogler
              onChange={setViewRoomType}
              value={roomTypesData.map(roomType => roomType._id)}
              selectedValue={viewRoomType}
              labels={roomTypesData.map(roomType => roomType.name)}
            />
          )}
        </div>
        <CanvasMenu
          assigHooks={assigHooks}
          assigContext={assigContext}
          assigUtils={assigUtils}
        />
        <MakeItemMenu
          assigHooks={assigHooks}
          assigContext={assigContext}
          assigUtils={assigUtils}
        />
        <BlockItemMenu
          assigHooks={assigHooks}
          assigContext={assigContext}
          assigUtils={assigUtils}
        />
        <ItemMenu
          deleteGuestById={deleteGuestById}
          toogleCheckInOut={toogleCheckInOut}
          bookingModalHook={bookingModal}
          guestValue={guestValue}
        />
        <Timeline
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          items={guestValue}
          groups={groupData.filter(group =>
            viewRoomType.includes(group.roomTypeId)
          )}
          {...defaultProps}
          onItemDoubleClick={handleItemDoubleClick}
          onItemClick={handleItemClick}
          onCanvasDoubleClick={handleCanvasDoubleClick}
          onCanvasClick={handleCanvasClick}
          onTimeChange={handleTimeChnage}
          itemRenderer={(props: any) =>
            itemRendererFn({
              ...props,
              assigUtils,
              assigContext,
              assigHooks
            })
          }
          groupRenderer={assigGroupRendererFn}
          defaultTimeEnd={
            isTabletDown
              ? defaultTimeEnd - TimePerMs.DAY * ASSIG_VISIBLE_CELL_MB_DIFF
              : defaultTimeEnd
          }
          defaultTimeStart={defaultTimeStart}
          moveResizeValidator={handleMoveResizeValidator}
          onItemSelect={handleItemSelect}
          onCanvasContextMenu={handleCanvasContextMenu}
          sidebarWidth={isMobile ? 100 : 230}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({getRootProps}: any) => (
                <SharedSideBarHeader
                  getRootProps={getRootProps}
                  dayPickerHook={dayPickerHook}
                />
              )}
            </SidebarHeader>
            <DateHeader
              intervalRenderer={({getIntervalProps, intervalContext}: any) => {
                const isToday = intervalContext.interval.startTime.isSame(
                  new Date(),
                  "day"
                );
                return (
                  <div
                    className={`rct-dateHeader ${isToday &&
                      "rct-dateHeader--today"}`}
                    {...getIntervalProps()}
                  >
                    {intervalContext.intervalText
                      .replace("요일,", ", ")
                      .replace(/[0-9]{4}년/, "")}
                  </div>
                );
              }}
              height={GlobalCSS.TIMELINE_HEADER_HEIGHT}
              unit="day"
            />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
        {/* 생성된 방이 없을때 */}
        {groupData.length === 0 && !loading && (
          <div className="assigTimeline__placeHolderWrap">
            <Link to="/middleServer/timelineConfig">
              <JDIcon
                className="assigTimeline__placeHolder"
                size={IconSize.LARGE}
                icon="addCircle"
              />
            </Link>
          </div>
        )}
      </div>
      <BookingModalWrap houseId={houseId} modalHook={bookingModal} />
      <JDtoastModal confirm {...confirmDelteGuestHook} />
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
