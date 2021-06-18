import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment,
  useRef,
  useLayoutEffect
} from "react";
import { Link } from "react-router-dom";
import "dayjs/locale/ko";
import "moment/locale/ko";
import _ from "lodash";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CustomMarker,
  CursorMarker
} from "../../../atoms/timeline/Timeline";
import {
  getCutCount,
  getCuttedGroups,
  getCuttedItmes
} from "./helper/outHelper";
import $ from "jquery";
import Button from "../../../atoms/button/Button";
import BookingModalWrap from "../../../components/bookingModal/BookingModalWrap";
import { IUseDayPicker, useModal, LANG } from "../../../hooks/hook";
import classnames from "classnames";
import assigGroupRendererFn from "./helper/groupRenderFn";
import { IRoomType } from "../../../types/interface";
import "./scss/AssigTimeline.scss";
import {
  WindowSize as EWindowSize,
  GlobalCSS,
  WindowSize,
  TimePerMs
} from "../../../types/enum";
import itemRendererFn from "./components/items/itemRenderFn";
import ItemMenuTooltip from "./components/tooltips/ItemMenuTooltip";
import CanvasMenuTooltip from "./components/tooltips/CanvasMenuTooltip";
import { DEFAULT_ASSIG_ITEM, DEFAULT_NONE_GOUP } from "../../../types/defaults";
import JDmodal, { JDtoastModal } from "../../../atoms/modal/Modal";
import {
  IAssigDataControl,
  IAssigItem,
  GuestTypeAdd,
  IAssigGroup,
  IAssigTimelineHooks,
  IAssigTimelineContext,
  ICreateMenuProps,
  IDeleteMenuProps
} from "./components/assigIntrerface";
import { getAssigUtils } from "./helper/assigUtils";
import BlockItemTooltip from "./components/tooltips/BlockItemTooltip";
import JDmultiBox from "../../../atoms/multiBox/MultiBox";
import { getAssigHandlers } from "./helper/assigHandlers";
import dayjs from "dayjs";
import { isEmpty } from "../../../utils/utils";
import BlockOpModal from "./helper/BlockOpModal";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrapWrap";
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import ReadyItemTooltip from "./components/tooltips/ReadyItemTooltip";
import HeaderCellRender from "./helper/HeaderCellRender";
import { IContext } from "../BookingHostRouter";
import { SharedSideBarHeader } from "../../../atoms/timeline/components/SharedHeader";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import AssigTimelineConfigModal from "./components/AssigTimelineConfigModal/AssigTimelineConfigModal";
import getConfigStorage from "./helper/getStorage";
import Preloader from "../../../atoms/preloader/Preloader";
import { SIDE_IS_OPEN } from "../../../components/sideNav/SideNav";
import { useWindowSize, JDdayPickerModal } from "@janda-com/front";
import { SkipUpdate } from "../../../components/skipUpdate/SkipUpdate";

interface IProps {
  context: IContext;
  defaultProps: any;
  dayPickerHook: IUseDayPicker;
  groupData: IAssigGroup[];
  loading: boolean;
  roomTypesData: IRoomType[];
  deafultGuestsData: IAssigItem[];
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  assigDataControl: IAssigDataControl;
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
  reloadTime: () => void;
}

const AssigTimeline: React.FC<IProps> = ({
  dayPickerHook,
  defaultProps,
  groupData,
  loading,
  context,
  deafultGuestsData,
  defaultTimeStart,
  defaultTimeEnd,
  roomTypesData,
  setDataTime,
  dataTime,
  assigDataControl,
  reloadTime
}) => {
  const [viewRoomType, setViewRoomType] = useState(
    roomTypesData.map(roomType => roomType._id)
  );
  const firstUpdate = useRef(true);
  const {
    networkStatus,
    totalMuLoading,
    stopPolling,
    startPolling
  } = assigDataControl;
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { house, houseConfig } = context;
  const isFirstLoading = networkStatus === 1;
  const isLoading = networkStatus < 7;
  const totalLoading = networkStatus < 7;
  const isDesktopHDDown = windowWidth < EWindowSize.DESKTOPHD;
  const isTabletDown = windowWidth <= EWindowSize.TABLET;
  const isMobile = windowWidth < EWindowSize.PHABLET;
  const [lock, setLock] = useState(isMobile);
  const timeline_size_var = (() => {
    if (isMobile) return 3;
    if (isTabletDown) return 6;
    if (isDesktopHDDown) return 5;
    return 0;
  })();

  const [cutCount, setCutCount] = useState(getCutCount(windowHeight));

  // 그룹 데이터에서 필터된것만 추출
  let filteredGroup = useMemo(() => {
    stopPolling();
    const groups = getCuttedGroups(
      groupData.filter(group => viewRoomType.includes(group.roomTypeId)),
      cutCount.cutFrom,
      cutCount.cutTo
    );
    startPolling();
    return groups;
  }, [groupData.length, cutCount.cutTo, cutCount.cutFrom, viewRoomType]);

  // 그룹 데이터가 비어있다면 보정용으로 하나추가
  if (isEmpty(filteredGroup)) filteredGroup = [DEFAULT_NONE_GOUP];

  const filtedGroupIds = useMemo(() => filteredGroup.map(fg => fg.id), [
    groupData.length,
    cutCount.cutTo,
    cutCount.cutFrom,
    viewRoomType
  ]);

  const [guestValue, setGuestValue] = useState<IAssigItem[]>(
    getCuttedItmes(filtedGroupIds, deafultGuestsData)
  );

  const dayPickerModalHook = useModal(false);
  const [isMultiSelectingMode, setIsMultiSelectingMode] = useState(false);
  const configModal = useModal(false);
  const confirmModalHook = useModal(false);
  const reservationModal = useModal(false);
  const [inIsEmpty, setEmpty] = useState(false);
  const [sideBarFold, setSideBarFold] = useState(isMobile);
  const bookingModal = useModal(false);
  const blockOpModal = useModal<IAssigItem>(false, DEFAULT_ASSIG_ITEM);
  const [blockMenuProps, setBlockMenuProps] = useState<IDeleteMenuProps>({
    item: DEFAULT_ASSIG_ITEM
  });
  const [createMenuProps, setCreateMenuProps] = useState<ICreateMenuProps>({
    item: DEFAULT_ASSIG_ITEM
  });
  const dailyAssigHook = useModal(false);
  const { basicConfig } = useMemo(() => getConfigStorage(), [
    configModal.isOpen
  ]);
  const { useTodayMark, useCursorMark, zoomValue } = basicConfig;

  const debounceCut = _.throttle(
    () => {
      stopPolling();
      setCutCount(getCutCount(windowHeight));
      startPolling();
    },
    300,
    {
      leading: false,
      trailing: true
    }
  );

  // 스크롤시 데이터로딩
  const scrollAnimater = () => {
    if (isMobile) return;
    const secter = $("#AssigTimeline");
    const targetHeight = secter.find(".rct-sidebar").height() || 0;
    if (!targetHeight) return;
    const target = secter.find(".rct-outer");
    target.css("max-height", targetHeight + 100);
  };

  const handleWindowScrollTouchEndEvent = () => {
    // allTooltipsHide();
    debounceCut();
    scrollAnimater();
  };

  const handleWindowScrollEvent = _.debounce(() => {
    allTooltipsHide();
    if (isMobile) return;
    scrollAnimater();
    debounceCut();
  }, 500);

  const handleKeyDownCavnas = (e: KeyboardEvent) => {
    if (
      !isMultiSelectingMode &&
      e.shiftKey &&
      !isEmpty(getItemsByType(GuestTypeAdd.MARK))
    ) {
      console.info(handleKeyDownCavnas);
      setIsMultiSelectingMode(true);
    }
  };

  const debounceKeyDownCanvas = _.debounce(handleKeyDownCavnas, 100);

  const handleKeyUpCavnas = (e: KeyboardEvent) => {
    setIsMultiSelectingMode(false);
  };

  const assigHooks: IAssigTimelineHooks = {
    guestValue,
    blockMenuProps,
    createMenuProps,
    setGuestValue,
    setCreateMenuProps,
    setBlockMenuProps,
    confirmModalHook,
    bookingModal,
    setDataTime,
    dataTime,
    blockOpModal,
    isMultiSelectingMode
  };

  const assigContext: IAssigTimelineContext = useMemo(
    () => ({
      isMobile,
      houseConfig,
      networkStatus,
      windowWidth,
      windowHeight,
      groupData,
      filteredGroup,
      lock,
      setLock,
      houseId: house._id
    }),
    [windowWidth, guestValue, networkStatus, viewRoomType]
  );

  const assigUtils = useMemo(
    () => getAssigUtils(assigHooks, assigDataControl, assigContext),
    [guestValue, isMultiSelectingMode, lock, networkStatus, viewRoomType]
  );

  const { assigTimeline } = houseConfig;
  if (!assigTimeline) throw Error("empty houseConfig__assigTimeline");

  const { roomTypeTabEnable } = assigTimeline;

  const { allTooltipsHide, removeMark, getItemsByType } = assigUtils;

  const assigHandler = useMemo(
    () => getAssigHandlers(assigUtils, assigContext, assigHooks),
    [guestValue, isMultiSelectingMode, lock, networkStatus, viewRoomType]
  );

  // 메모를 사용해 멀티박스 업데이트 방지
  const roomTypesDatas = useMemo(
    () => ({
      value: roomTypesData.map(roomType => roomType._id),
      labels: roomTypesData.map(roomType => roomType.name)
    }),
    [roomTypesData.length, viewRoomType]
  );

  const callBackitemRenderer = useCallback(
    (props: any) =>
      itemRendererFn({
        ...props,
        assigUtils,
        assigContext,
        assigHooks
      }),
    []
  );

  const timelineClassNames = useMemo(
    () =>
      classnames("assigTimeline", undefined, {
        "assiTimeline--mobile": windowWidth <= WindowSize.MOBILE,
        "assigTimeline--loading": firstUpdate.current && loading,
        "assigTimeline--empty": inIsEmpty,
        "assigTimeline--foldSidebar": sideBarFold
      }),
    [windowWidth, loading, inIsEmpty]
  );

  // 기본으로 사용될 끝시간을 계산합니다.
  const endTime = useMemo(() => {
    let configZoom = zoomValue || 0;
    return dayjs(defaultTimeEnd.valueOf() - configZoom * TimePerMs.H * 3).add(
      -1 * timeline_size_var,
      "days"
    );
  }, [zoomValue]);

  const timelineKey = `timeline${endTime}${SIDE_IS_OPEN ? "a" : "b"}`;

  const {
    handleCanvasClick,
    handleCanvasContextMenu,
    handleItemClick,
    handleItemMove,
    handleItemResize,
    handleItemSelect,
    handleMoveResizeValidator,
    handleDraggingEnd,
    handleTimeChange,
    handleItemDoubleClick,
    handleDraggingCell,
    handleMouseDownCanvas
  } = assigHandler;

  // 툴팁들을 제거하고
  const handleTimelineWrapClickEvent = () => {
    console.count("handleTimelineWrapClickEvent");
    if (guestValue.find(guest => guest.type === GuestTypeAdd.MARK)) {
      removeMark();
    }
    allTooltipsHide();
  };

  const renderHeaderCell = useCallback((prop: any) => {
    // 아이템 업데이트때는 업데이트될 필요가없는데
    const onClickCell = ({ intervalContext }: any) => {
      if (!intervalContext) return;
      dailyAssigHook.openModal({
        date: dayjs(intervalContext.interval.startTime).toDate()
      });
    };
    return (
      <HeaderCellRender onClickCell={onClickCell} holidays={[]} {...prop} />
    );
  }, []);

  // 아예 그룹이 없을떄 처리
  useEffect(() => {
    if (isEmpty(groupData) && !loading) setEmpty(true);
  }, [inIsEmpty]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
  });

  useEffect(() => {
    stopPolling();
    const cuttedItems = getCuttedItmes(
      filteredGroup.map(fg => fg.id),
      deafultGuestsData
    );
    setGuestValue(cuttedItems);
    startPolling();
  }, [filtedGroupIds.join()]);

  // 이벤트 리스너
  useEffect(() => {
    const handleClickWindow = () => {
      allTooltipsHide();
    };

    const remove = () => {
      window.removeEventListener("keyup", handleKeyUpCavnas);
      window.removeEventListener("keydown", debounceKeyDownCanvas);
      window.removeEventListener("touchend", handleWindowScrollTouchEndEvent);
      window.removeEventListener("scroll", e => handleWindowScrollEvent);
      window.removeEventListener("click", handleClickWindow);
      return "";
    };

    window.addEventListener("keyup", handleKeyUpCavnas);
    window.addEventListener("keydown", debounceKeyDownCanvas);
    window.addEventListener("touchend", handleWindowScrollTouchEndEvent);
    window.addEventListener("scroll", handleWindowScrollEvent);
    window.addEventListener("click", handleClickWindow);
    return () => {
      remove();
    };
  }, []);

  // 풀링으로 새로받은 게스트데이터를 적용시켜준다.
  useEffect(() => {
    if (!totalMuLoading) {
      if (!isLoading) {
        const cuttedData = getCuttedItmes(filtedGroupIds, deafultGuestsData);
        const newIndexStart = cuttedData.length;

        // 업데이트전 휘발성 블럭들을 찾아서 합쳐줍니다.
        const volatilityBlocks = getItemsByType(GuestTypeAdd.MARK);

        // 휘발성 블록들의 인덱스를 다시 정의해줍니다.
        volatilityBlocks.forEach(
          (block, index) => (block.itemIndex = newIndexStart + index)
        );

        setGuestValue([...deafultGuestsData, ...volatilityBlocks]);
      }
    }
  }, [deafultGuestsData]);

  useLayoutEffect(() => {
    if (!firstUpdate.current) scrollAnimater();
  }, [viewRoomType]);

  const commonButtonProps: any = {
    mode: isMobile ? "iconButton" : undefined,
    size: "small",
    disabled: isFirstLoading
  };

  return (
    <Fragment>
      <PageHeader
        title={LANG("allocation_calendar")}
        desc={LANG("assigTimeline__decs")}
      />
      <div
        id="AssigTimeline"
        className={timelineClassNames}
        onDoubleClick={handleTimelineWrapClickEvent}
      >
        <PageBody
          style={{
            paddingBottom: 0
          }}
        >
          <div className="flex-grid flex-grid--end">
            <div>
              <Button
                {...commonButtonProps}
                onClick={() => {
                  reservationModal.openModal();
                }}
                label={LANG("make_reservation")}
                icon="edit"
              />
              <Button
                {...commonButtonProps}
                onClick={() => {
                  dayPickerHook.setDate(
                    dayjs()
                      .add(-1, "day")
                      .toDate()
                  );
                  reloadTime();
                }}
                icon="calendar"
                label={LANG("goto_today")}
              />
              <Button
                {...commonButtonProps}
                onClick={() => {
                  configModal.openModal();
                }}
                label={LANG("config")}
                icon="keyBoard"
              />
              <Button
                {...commonButtonProps}
                label={LANG("assig_lock")}
                onClick={() => {
                  setLock(!lock);
                }}
                icon={lock ? "lock" : "unLock"}
              />
            </div>
            {roomTypeTabEnable && (
              <JDmultiBox
                noWrap
                reversal="always"
                defaultAllToogle={true}
                withAllTooglerLabel={LANG("see_all")}
                withAllToogler
                onChange={foo => {
                  if (networkStatus >= 7) setViewRoomType(foo);
                }}
                selectedValue={viewRoomType}
                {...roomTypesDatas}
              />
            )}
          </div>
        </PageBody>
        <PageBody className="assigTimeline__timelineBody">
          <CanvasMenuTooltip
            assigHooks={assigHooks}
            assigContext={assigContext}
            assigUtils={assigUtils}
          />
          <BlockItemTooltip
            assigHooks={assigHooks}
            assigContext={assigContext}
            assigUtils={assigUtils}
          />
          <BlockOpModal
            key={blockOpModal.info.bookingId}
            assigDataControl={assigDataControl}
            assigHooks={assigHooks}
            assigContext={assigContext}
            assigUtils={assigUtils}
          />
          <ReadyItemTooltip />
          <ItemMenuTooltip
            assigHooks={assigHooks}
            assigContext={assigContext}
            assigUtils={assigUtils}
          />
          <SkipUpdate skip={networkStatus < 7}>
            <div className="assigTimeline__timelineWrap">
              <Timeline
                key={timelineKey}
                handleMouseDownCanvas={handleMouseDownCanvas}
                onItemMove={handleItemMove}
                onItemResize={handleItemResize}
                items={guestValue}
                groups={filteredGroup}
                {...defaultProps}
                canMove={!lock}
                canChangeGroup={!lock}
                handleDraggingCell={handleDraggingCell}
                onItemDoubleClick={handleItemDoubleClick}
                onItemClick={handleItemClick}
                onCanvasClick={handleCanvasClick}
                onTimeChange={handleTimeChange}
                itemRenderer={callBackitemRenderer}
                groupRenderer={assigGroupRendererFn}
                defaultTimeStart={defaultTimeStart}
                defaultTimeEnd={endTime}
                handleDraggingEnd={handleDraggingEnd}
                moveResizeValidator={handleMoveResizeValidator}
                onItemSelect={handleItemSelect}
                onCanvasContextMenu={handleCanvasContextMenu}
                // TODO
                // 접이식으로 변경 방번호만으로도 충분할수 있다.
                // 사이드바는 햔재크기의 3분의 1로 하고
                // 옆으로 펼치는 식으로 진행하는것임
                sidebarWidth={isMobile ? (sideBarFold ? 30 : 100) : 230}
              >
                <TimelineHeaders>
                  {/* 왼쪽 위 달력 부분 */}
                  <SidebarHeader>
                    {({ getRootProps }: any) => (
                      <SharedSideBarHeader
                        dayPickerModalHook={dayPickerModalHook}
                        getRootProps={getRootProps}
                      />
                    )}
                  </SidebarHeader>
                  <DateHeader
                    labelFormat="MM.DD ddd"
                    intervalRenderer={renderHeaderCell}
                    height={GlobalCSS.TIMELINE_HEADER_HEIGHT}
                    unit="day"
                  />
                  {useCursorMark && <CursorMarker />}
                  <DateHeader />
                </TimelineHeaders>
                <TimelineMarkers>
                  {useTodayMark && <CustomMarker date={new Date().valueOf()} />}
                </TimelineMarkers>
              </Timeline>
            </div>
          </SkipUpdate>
          {/* 생성된 방이 없을때 */}
          {inIsEmpty && (
            <div className="assigTimeline__placeHolderWrap">
              <Link to="/roomConfig">
                <Button
                  mode="border"
                  thema="point"
                  pulse
                  label={LANG("goto_create_roomType")}
                />
              </Link>
            </div>
          )}
          <ReservationModal
            modalHook={reservationModal}
            callBackCreateBookingMu={CreateBooking => {
              if (CreateBooking?.booking) {
                assigUtils.hilightGuestBlock({
                  bookingId: CreateBooking.booking._id,
                  scrollMove: true
                });
              }
            }}
            context={context}
            publicKey={house.publicKey || undefined}
          />
          <BookingModalWrap context={context} modalHook={bookingModal} />
          <JDtoastModal confirm {...confirmModalHook} />
          <AssigTimelineConfigModal context={context} modalHook={configModal} />
          <JDmodal
            head={{
              title: dayjs(dailyAssigHook.info.date).format("YYYY-MM-DD")
            }}
            fullInMobile
            {...dailyAssigHook}
          >
            <DailyAssigWrap date={dailyAssigHook.info.date} context={context} />
          </JDmodal>
        </PageBody>
      </div>
      <JDdayPickerModal
        modalHook={dayPickerModalHook}
        isRange={false}
        canSelectBeforeDay={true}
        calenaderPosition="center"
        label={`${LANG("calender_date")}`}
        {...dayPickerHook}
        className="JDwaves-effect JDoverflow-visible"
      />
      <Preloader
        style={{
          zIndex: 99999999
        }}
        floating
        loading={loading}
        className="assigTimeline__mainPreloder"
      />
    </Fragment>
  );
};

export default AssigTimeline;
