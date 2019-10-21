import React, {useState, useEffect, useMemo} from "react";
import {Link, withRouter} from "react-router-dom";
import "moment/locale/ko";
import _ from "lodash";
import {WindowSizeProps} from "react-window-size";
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
import assigGroupRendererFn from "./components/groupRenderFn";
import {IRoomType} from "../../../types/interface";
import Preloader from "../../../atoms/preloader/Preloader";
import "./AssigTimeline.scss";
import {ReactTooltip} from "../../../atoms/tooltipList/TooltipList";
import {
  TimePerMs,
  WindowSize as EWindowSize,
  GlobalCSS,
  WindowSize
} from "../../../types/enum";
import itemRendererFn from "./components/items/itemRenderFn";
import ItemMenuTooltip from "./components/tooltips/ItemMenuTooltip";
import CanvasMenuTooltip from "./components/tooltips/CanvasMenuTooltip";
import {DEFAUT_ASSIG_ITEM, DEFAUT_NONE_GOUP} from "../../../types/defaults";
import JDmodal, {JDtoastModal} from "../../../atoms/modal/Modal";
import {
  IAssigDataControl,
  IAssigItem,
  GuestTypeAdd,
  ICanvasMenuTooltipProps,
  IAssigGroup,
  IAssigTimelineHooks,
  IAssigTimelineContext,
  ICreateMenuProps,
  IDeleteMenuProps,
  TShortKey
} from "./components/assigIntrerface";
import {getAssigUtils} from "./components/assigUtils";
import BlockItemTooltip from "./components/tooltips/BlockItemTooltip";
import {ASSIG_VISIBLE_CELL_MB_DIFF} from "./timelineConfig";
import JDmultiBox from "../../../atoms/multiBox/MultiBox";
import {getAssigHandlers} from "./components/assigHandlers";
import moment from "moment";
import {isEmpty} from "../../../utils/utils";
import BlockOpModal from "./components/BlockOpModal";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import {IContext} from "../../MiddleServerRouter";
import ReadyItemTooltip from "./components/tooltips/ReadyItemTooltip";
import HeaderCellRender from "./components/HeaderCellRender";

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
  const {networkStatus} = assigDataControl;
  const {house, houseConfig, sideNavIsOpen} = context;
  const isMobile = windowWidth <= EWindowSize.MOBILE;
  const isTabletDown = windowWidth <= EWindowSize.TABLET;
  const [guestValue, setGuestValue] = useState<IAssigItem[]>(deafultGuestsData);
  const keyBoardModal = useModal(false);
  const confirmDelteGuestHook = useModal(false);
  const reservationModal = useModal(false);
  const [inIsEmpty, setEmpty] = useState(false);
  const [viewRoomType, setViewRoomType] = useState(
    roomTypesData.map(roomType => roomType._id)
  );
  const {datas: holidays} = getKoreaSpecificDayHook(["2019", "2018"]);
  const bookingModal = useModal(false);
  const blockOpModal = useModal<IAssigItem>(false, DEFAUT_ASSIG_ITEM);
  const [blockMenuProps, setBlockMenuProps] = useState<IDeleteMenuProps>({
    item: DEFAUT_ASSIG_ITEM
  });
  const [createMenuProps, setCreateMenuProps] = useState<ICreateMenuProps>({
    item: DEFAUT_ASSIG_ITEM
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

  const {assigTimeline} = houseConfig;
  if (!assigTimeline) {
    throw Error("empty houseConfig__assigTimeline");
  }

  const {roomTypeTabEnable} = assigTimeline;

  const {allTooltipsHide, removeMark} = assigUtils;

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
  if (isEmpty(filteredGroup)) filteredGroup = [DEFAUT_NONE_GOUP];

  return (
    <div>
      <div
        id="AssigTimeline"
        className={`${timelineClassNames} container container--full`}
        onDoubleClick={handleTimelineWrapClickEvent}
        onClick={e => e.stopPropagation()}
      >
        <div className="docs-section">
          <h3 className="assigTimeline__titleSection">
            {LANG("allocation_calendar")}
            <Preloader
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
                icon="edit"
                label={LANG("make_reservation")}
              />
              <Link to="/resvList">
                <Button mode="border" icon="arrowTo" label="예약목록 보기" />
              </Link>
              {/* 개발중 */}
              {/* <Button
              label="단축키"
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
            defaultTimeEnd={
              isTabletDown
                ? moment(defaultTimeEnd)
                    .add(-1 * ASSIG_VISIBLE_CELL_MB_DIFF, "days")
                    .toDate()
                : defaultTimeEnd
            }
            defaultTimeStart={defaultTimeStart}
            handleDraggingEnd={handleDraggingEnd}
            moveResizeValidator={handleMoveResizeValidator}
            onItemSelect={handleItemSelect}
            onCanvasContextMenu={handleCanvasContextMenu}
            sidebarWidth={isMobile ? 100 : 230}
            key={sideNavIsOpen ? "a" : "b"}
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
                intervalRenderer={(prop: any) => {
                  const onClickCell = ({intervalContext}: any) => {
                    if (!intervalContext) return;
                    dailyAssigHook.openModal({
                      date: moment(intervalContext.interval.startTime).toDate()
                    });
                  };
                  return HeaderCellRender({onClickCell, holidays, ...prop});
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
                  label="방타입 생성하러가기"
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
        <BookingModalWrap
          assigUtils={assigUtils}
          context={context}
          modalHook={bookingModal}
        />
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
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
