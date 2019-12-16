import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Fragment
} from "react";
import { Link } from "react-router-dom";
import "moment/locale/ko";
import _ from "lodash";
import { WindowSizeProps } from "react-window-size";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CustomMarker,
  CursorMarker
} from "../../../atoms/timeline/Timeline";
import ErrProtecter from "../../../utils/errProtect";
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
import moment from "moment";
import { isEmpty } from "../../../utils/utils";
import BlockOpModal from "./helper/BlockOpModal";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import ReadyItemTooltip from "./components/tooltips/ReadyItemTooltip";
import HeaderCellRender from "./helper/HeaderCellRender";
import { PortalPreloader } from "../../../utils/portalElement";
import DayPickerModal from "../../../components/dayPickerModal/DayPickerModal";
import { IContext } from "../BookingHostRouter";
import { SharedSideBarHeader } from "../../../atoms/timeline/components/SharedHeader";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import AssigTimelineConfigModal from "./components/AssigTimelineConfigModal/AssigTimelineConfigModal";
import getConfigStorage from "./helper/getStorage";

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
  reloadTimeline: () => void;
}

const AssigTimeline: React.FC<IProps & WindowSizeProps> = ({
  dayPickerHook,
  defaultProps,
  groupData,
  loading,
  context,
  deafultGuestsData,
  defaultTimeStart,
  defaultTimeEnd,
  windowWidth,
  windowHeight,
  roomTypesData,
  setDataTime,
  dataTime,
  assigDataControl,
  reloadTimeline
}) => {
  const { networkStatus } = assigDataControl;
  const { house, houseConfig, sideNavIsOpen } = context;
  const isDesktopHDDown = windowWidth < EWindowSize.DESKTOPHD;
  const isTabletDown = windowWidth <= EWindowSize.TABLET;
  const isMobile = windowWidth < EWindowSize.PHABLET;
  const timeline_size_var = (() => {
    if (isMobile) return 7;
    if (isTabletDown) return 6;
    if (isDesktopHDDown) return 5;
    return 0;
  })();
  const [guestValue, setGuestValue] = useState<IAssigItem[]>(deafultGuestsData);
  const dayPickerModalHook = useModal(false);
  const [isMultiSelectingMode, setIsMultiSelectingMode] = useState(false);
  const configModal = useModal(false);
  const confirmModalHook = useModal(false);
  const reservationModal = useModal(false);
  const [inIsEmpty, setEmpty] = useState(false);
  const [viewRoomType, setViewRoomType] = useState(
    roomTypesData.map(roomType => roomType._id)
  );
  // const { datas: holidays } = getKoreaSpecificDayHook(["2019", "2018"]);
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

  // 스크롤시 툴팁제거
  const handleWindowScrollEvent = () => {
    allTooltipsHide();
  };

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
      houseId: house._id
    }),
    [windowWidth, guestValue, networkStatus]
  );

  const assigUtils = useMemo(
    () => getAssigUtils(assigHooks, assigDataControl, assigContext),
    [guestValue, isMultiSelectingMode]
  );

  const { assigTimeline } = houseConfig;
  if (!assigTimeline) {
    throw Error("empty houseConfig__assigTimeline");
  }

  const { roomTypeTabEnable } = assigTimeline;

  const {
    allTooltipsHide,
    removeMark,
    getItemsByType,
    hilightHeader
  } = assigUtils;

  const assigHandler = useMemo(
    () => getAssigHandlers(assigUtils, assigContext, assigHooks),
    [guestValue, isMultiSelectingMode]
  );

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
        date: moment(intervalContext.interval.startTime).toDate()
      });
    };
    return (
      <HeaderCellRender onClickCell={onClickCell} holidays={[]} {...prop} />
    );
  }, []);

  // 그룹 데이터에서 필터된것만 추출
  let filteredGroup = useMemo(
    () => groupData.filter(group => viewRoomType.includes(group.roomTypeId)),
    [groupData.length]
  );

  // 그룹 데이터가 비어있다면 보정용으로 하나추가
  if (isEmpty(filteredGroup)) filteredGroup = [DEFAULT_NONE_GOUP];

  // 메모를 사용해 멀티박스 업데이트 방지
  const roomTypesDatas = useMemo(
    () => ({
      value: roomTypesData.map(roomType => roomType._id),
      labels: roomTypesData.map(roomType => roomType.name)
    }),
    [roomTypesData.length]
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

  // 아예 그룹이 없을떄 처리
  useEffect(() => {
    if (isEmpty(groupData) && !loading) setEmpty(true);
  }, [inIsEmpty]);

  const timelineClassNames = useMemo(
    () =>
      classnames("assigTimeline", undefined, {
        "assiTimeline--mobile": windowWidth <= WindowSize.MOBILE,
        "assigTimeline--loading": isEmpty(groupData) && loading,
        "assigTimeline--empty": inIsEmpty
      }),
    [windowWidth, guestValue]
  );

  //  스크롤 할때
  useEffect(() => {
    const handleClickWindow = () => {
      allTooltipsHide();
    };

    // $(".rct-header-root").mousedown(e => {
    //   // e.preventDefault();
    //   // e.stopPropagation();
    // });
    window.addEventListener("keyup", handleKeyUpCavnas);
    window.addEventListener("keydown", debounceKeyDownCanvas);
    window.addEventListener("scroll", handleWindowScrollEvent);
    window.addEventListener("click", handleClickWindow);
    return () => {
      window.removeEventListener("keyup", handleKeyUpCavnas);
      window.removeEventListener("keydown", debounceKeyDownCanvas);
      window.removeEventListener("scroll", handleWindowScrollEvent);
      window.removeEventListener("scroll", handleClickWindow);
    };
  });

  // 풀링으로 새로받은 게스트데이터를 적용시켜준다.
  useEffect(() => {
    if (networkStatus >= 7) {
      console.count("volatilityEffectCount");
      const newIndexStart = deafultGuestsData.length;

      // 업데이트전 휘발성 블럭들을 찾아서 합쳐줍니다.
      const volatilityBlocks = getItemsByType(GuestTypeAdd.MARK);

      // 휘발성 블록들의 인덱스를 다시 정의해줍니다.
      volatilityBlocks.forEach(
        (block, index) => (block.itemIndex = newIndexStart + index)
      );

      setGuestValue([...deafultGuestsData, ...volatilityBlocks]);
    }
  }, [deafultGuestsData]);

  const endTime = (() => {
    let configZoom = zoomValue || 0;
    return (
      moment(defaultTimeEnd.valueOf())
        .add(-1 * timeline_size_var, "days")
        .valueOf() -
      configZoom * TimePerMs.H * 3
    );
  })();
  const timelineKey = `timeline${endTime}${sideNavIsOpen ? "a" : "b"}`;

  return (
    <Fragment>
      <PageHeader
        title={LANG("allocation_calendar")}
        desc={LANG("assigTimeline__decs")}
      />
      <PortalPreloader
        size="small"
        floating
        loading={loading}
        className="assigTimeline__mainPreloder"
      />
      <PageBody>
        <div
          id="AssigTimeline"
          className={timelineClassNames}
          onDoubleClick={handleTimelineWrapClickEvent}
          onClick={e => {
            // 윈도우 마우스클릭 이벤트를 방지함
            // e.stopPropagation();
          }}
        >
          <div className="flex-grid flex-grid--end">
            <div>
              <Button
                onClick={() => {
                  reservationModal.openModal();
                }}
                disabled={networkStatus === 1}
                icon="edit"
                label={LANG("make_reservation")}
              />
              <Button
                onClick={() => {
                  dayPickerHook.setDate(
                    moment()
                      .local()
                      .add(-1, "day")
                      .toDate()
                  );
                  reloadTimeline();
                }}
                icon="calendar"
                label={LANG("goto_today")}
              />
              <Button
                onClick={() => {
                  configModal.openModal();
                }}
                icon="keyBoard"
              />
            </div>
            {roomTypeTabEnable && (
              <JDmultiBox
                noWrap
                defaultAllToogle={true}
                withAllTooglerLabel={LANG("see_all")}
                withAllToogler
                onChange={setViewRoomType}
                selectedValue={viewRoomType}
                {...roomTypesDatas}
              />
            )}
          </div>
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
          <div className="assigTimeline__timelineWrap">
            <Timeline
              key={timelineKey}
              handleMouseDownCanvas={handleMouseDownCanvas}
              onItemMove={handleItemMove}
              onItemResize={handleItemResize}
              items={guestValue}
              groups={filteredGroup}
              {...defaultProps}
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
              sidebarWidth={isMobile ? 100 : 230}
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
                {useTodayMark && <CustomMarker date={new Date()} />}
              </TimelineMarkers>
            </Timeline>
          </div>
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
              if (
                CreateBooking.bookingTransaction &&
                CreateBooking.bookingTransaction.booking
              ) {
                assigUtils.hilightGuestBlock({
                  bookingId: CreateBooking.bookingTransaction.booking._id,
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
          <JDmodal {...dailyAssigHook}>
            <DailyAssigWrap date={dailyAssigHook.info.date} context={context} />
          </JDmodal>
        </div>
        <DayPickerModal
          modalHook={dayPickerModalHook}
          isRange={false}
          canSelectBeforeDay={true}
          calenaderPosition="center"
          label={`${LANG("calender_date")}`}
          {...dayPickerHook}
          className="JDwaves-effect JDoverflow-visible"
        />
      </PageBody>
    </Fragment>
  );
};

export default ErrProtecter(AssigTimeline);
