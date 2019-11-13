import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "moment/locale/ko";
import _ from "lodash";
import { WindowSizeProps } from "react-window-size";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  SharedSideBarHeader
} from "../../../atoms/timeline/Timeline";
import ErrProtecter from "../../../utils/errProtect";
import Button from "../../../atoms/button/Button";
import BookingModalWrap from "../../../components/bookingModal/BookingModalWrap";
import {
  IUseDayPicker,
  useModal,
  getKoreaSpecificDayHook,
  LANG
} from "../../../hooks/hook";
import classnames from "classnames";
import assigGroupRendererFn from "./helpers/groupRenderFn";
import { IRoomType } from "../../../types/interface";
import "./css/AssigTimeline.scss";
import { ReactTooltip } from "../../../atoms/tooltipList/TooltipList";
import {
  WindowSize as EWindowSize,
  GlobalCSS,
  WindowSize
} from "../../../types/enum";
import $ from "jquery";
import itemRendererFn from "./helpers/itemRenderFn";
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
} from "./assigIntrerface";
import { getAssigUtils } from "./helpers/assigUtils";
import BlockItemTooltip from "./components/tooltips/BlockItemTooltip";
import JDmultiBox from "../../../atoms/multiBox/MultiBox";
import { getAssigHandlers } from "./helpers/assigHandlers";
import moment from "moment";
import { isEmpty } from "../../../utils/utils";
import BlockOpModal from "./components/BlockOpModal";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import { IContext } from "../MiddleServerRouter";
import ReadyItemTooltip from "./components/tooltips/ReadyItemTooltip";
import HeaderCellRender from "./helpers/HeaderCellRender";
import { PortalPreloader } from "../../../utils/portalElement";
import DayPickerModal from "../../../atoms/dayPickerModal/DayPickerModal";

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
}

const ShowTimeline: React.FC<IProps & WindowSizeProps> = ({
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
  assigDataControl
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
  const keyBoardModal = useModal(false);
  const confirmDelteGuestHook = useModal(false);
  const reservationModal = useModal(false);
  const [inIsEmpty, setEmpty] = useState(false);
  const [viewRoomType, setViewRoomType] = useState(
    roomTypesData.map(roomType => roomType._id)
  );
  const { datas: holidays } = getKoreaSpecificDayHook(["2019", "2018"]);
  const bookingModal = useModal(false);
  const blockOpModal = useModal<IAssigItem>(false, DEFAULT_ASSIG_ITEM);
  const [blockMenuProps, setBlockMenuProps] = useState<IDeleteMenuProps>({
    item: DEFAULT_ASSIG_ITEM
  });
  const [createMenuProps, setCreateMenuProps] = useState<ICreateMenuProps>({
    item: DEFAULT_ASSIG_ITEM
  });
  const dailyAssigHook = useModal(false);

  // 스크롤시 툴팁제거
  const handleWindowScrollEvent = () => {
    allTooltipsHide();
  };

  //  스크롤 할때
  useEffect(() => {
    const handleClickWindow = () => {
      allTooltipsHide();
    };
    $(".rct-header-root").mousedown(e => {
      // e.preventDefault();
      // e.stopPropagation();
    });
    window.addEventListener("scroll", handleWindowScrollEvent);
    window.addEventListener("click", handleClickWindow);
    return () => {
      window.removeEventListener("scroll", handleWindowScrollEvent);
      window.removeEventListener("scroll", handleClickWindow);
    };
  });

  // 풀링으로 새로받은 게스트데이터를 적용시켜준다.
  useEffect(() => {
    if (networkStatus >= 7) {
      const newIndexStart = deafultGuestsData.length;

      // TODO 함수분리
      // 업데이트전 휘발성 블럭들을 찾아서 합쳐줍니다.
      const volatilityBlocks = guestValue.filter(
        guest => guest.type === GuestTypeAdd.MARK
      );
      // 휘발성 블록들의 인덱스를 다시 정의해줍니다.
      volatilityBlocks.forEach(
        (block, index) => (block.itemIndex = newIndexStart + index)
      );

      setGuestValue([...deafultGuestsData, ...volatilityBlocks]);
    }
  }, [deafultGuestsData]);

  const assigHooks: IAssigTimelineHooks = {
    guestValue,
    blockMenuProps,
    createMenuProps,
    setGuestValue,
    setCreateMenuProps,
    setBlockMenuProps,
    confirmDelteGuestHook,
    bookingModal,
    setDataTime,
    dataTime,
    blockOpModal
  };

  const assigContext: IAssigTimelineContext = {
    isMobile,
    houseConfig,
    windowWidth,
    windowHeight,
    groupData,
    houseId: house._id
  };

  const assigUtils = getAssigUtils(assigHooks, assigDataControl, assigContext);

  const { assigTimeline } = houseConfig;
  if (!assigTimeline) {
    throw Error("empty houseConfig__assigTimeline");
  }

  const { roomTypeTabEnable } = assigTimeline;

  const { allTooltipsHide, removeMark, hilightHeader } = assigUtils;

  const assigHandler = getAssigHandlers(assigUtils, assigContext, assigHooks);

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

  // 툴팁 제거 이벤트들을 window에 달아줌 그리고 나갈때 제거

  // 툴팁 리빌드
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  useEffect(() => {
    hilightHeader(dayPickerHook.from);
  }, [dayPickerHook.from]);

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
    [windowWidth]
  );

  // 그룹 데이터에서 필터된것만 추출
  let filteredGroup = groupData.filter(group =>
    viewRoomType.includes(group.roomTypeId)
  );

  // 그룹 데이터가 비어있다면 보정용으로 하나추가
  if (isEmpty(filteredGroup)) filteredGroup = [DEFAULT_NONE_GOUP];

  return (
    <div>
      <div
        id="AssigTimeline"
        className={`${timelineClassNames} container container--full`}
        onDoubleClick={handleTimelineWrapClickEvent}
        onClick={e => {
          // 윈도우 마우스클릭 이벤트를 방지함
          e.stopPropagation();
        }}
      >
        <div className="docs-section">
          <h3 className="assigTimeline__titleSection">
            {LANG("allocation_calendar")}
            <PortalPreloader
              size="small"
              floating
              loading={loading}
              className="assigTimeline__mainPreloder"
            />
          </h3>
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
              <Link to="/resvList">
                <Button
                  mode="border"
                  icon="arrowTo"
                  label={LANG("goto_reservation_list")}
                />
              </Link>
              {/* 개발중 */}
              {/* <Button
              onClick={() => {
                keyBoardModal.openModal();
              }}
              icon="keyBoard"
            /> */}
            </div>
            {roomTypeTabEnable && (
              <JDmultiBox
                defaultAllToogle={true}
                // withAllTooglerLabel="전부보기"
                // withAllToogler
                onChange={setViewRoomType}
                value={roomTypesData.map(roomType => roomType._id)}
                selectedValue={viewRoomType}
                labels={roomTypesData.map(roomType => roomType.name)}
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
          <Timeline
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
            itemRenderer={(props: any) =>
              itemRendererFn({
                ...props,
                assigUtils,
                assigContext,
                assigHooks
              })
            }
            groupRenderer={assigGroupRendererFn}
            defaultTimeEnd={moment(defaultTimeEnd)
              .add(-1 * timeline_size_var, "days")
              .toDate()}
            defaultTimeStart={defaultTimeStart}
            handleDraggingEnd={handleDraggingEnd}
            moveResizeValidator={handleMoveResizeValidator}
            onItemSelect={handleItemSelect}
            onCanvasContextMenu={handleCanvasContextMenu}
            sidebarWidth={isMobile ? 100 : 230}
            key={sideNavIsOpen ? "a" : "b"}
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
                intervalRenderer={(prop: any) => {
                  const onClickCell = ({ intervalContext }: any) => {
                    if (!intervalContext) return;
                    dailyAssigHook.openModal({
                      date: moment(intervalContext.interval.startTime).toDate()
                    });
                  };
                  return HeaderCellRender({ onClickCell, holidays, ...prop });
                }}
                height={GlobalCSS.TIMELINE_HEADER_HEIGHT}
                unit="day"
              />
              <DateHeader />
            </TimelineHeaders>
          </Timeline>
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
        </div>
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
        <JDtoastModal confirm {...confirmDelteGuestHook} />
        {/* <KeyBoardModal modalHook={keyBoardModal}> */}
        <JDmodal {...dailyAssigHook}>
          <DailyAssigWrap
            isInModal
            date={dailyAssigHook.info.date}
            context={context}
          />
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
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
