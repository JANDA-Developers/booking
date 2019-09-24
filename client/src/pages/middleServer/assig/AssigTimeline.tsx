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
  getKoreaSpecificDayHook
} from "../../../actions/hook";
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
import MakeItemTooltip from "./components/tooltips/MakeItemTooltip";
import {
  DEFAULT_ASSIG_ITEM,
  DEFAULT_ASSIG_GROUP,
  DEFAULT_NONE_GOUP
} from "../../../types/defaults";
import JDmodal, {JDtoastModal} from "../../../atoms/modal/Modal";
import {
  IAssigDataControl,
  IAssigItem,
  GuestTypeAdd,
  ICanvasMenuTooltipProps,
  IAssigGroup,
  IAssigTimelineHooks,
  IAssigTimelineContext,
  IMakeMenuProps,
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
import $ from "jquery";
import BlockOpModal from "./components/blockOpModal";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import {IContext} from "../../MiddleServerRouter";
import Tooltip from "../../../atoms/tooltip/Tooltip";
import ReadyItemTooltip from "./components/tooltips/ReadyItemTooltip";
import JDbadge from "../../../atoms/badge/Badge";
import JDdot from "../../../atoms/dot/dot";
import HeaderCellRender from "./components/HeaderCellRender";
2;

// Temp 마킹용이 있는지

// 충돌시간 인터페이스
// 단순히 안됨 보다 ~부터 ~가 안됨을 표시하기 위함
// 게스트1이 이동하는 주체

interface IProps {
  context: IContext;
  defaultProps: any;
  dayPickerHook: IUseDayPicker;
  groupData: IAssigGroup[];
  loading: boolean;
  //  디프리 될수도
  roomTypesData: IRoomType[];
  deafultGuestsData: IAssigItem[];
  defaultTimeStart: number;
  defaultTimeEnd: number;
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

// 👿 모든 Util들과 서브함수들은 파일분리 순수한 timeline Hadnler만 남길것
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
  const {house, houseConfig} = context;
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
  const [canvasMenuProps, setCanvasMenuTooltipProps] = useState<
    ICanvasMenuTooltipProps
  >({
    start: 0,
    end: 0,
    groupId: "",
    group: {
      ...DEFAULT_ASSIG_GROUP
    }
  });
  const bookingModal = useModal(false);
  const blockOpModal = useModal<IAssigItem>(false, DEFAULT_ASSIG_ITEM);
  const [blockMenuProps, setBlockMenuProps] = useState<IDeleteMenuProps>({
    item: DEFAULT_ASSIG_ITEM
  });
  const [makeMenuProps, setMakeMenuProps] = useState<IMakeMenuProps>({
    item: DEFAULT_ASSIG_ITEM
  });
  const dailyAssigHook = useModal(false);
  // 스크롤시 툴팁제거
  const handleWindowScrollEvent = () => {
    allTooltipsHide();
  };

  //  스크롤 할때
  useEffect(() => {
    window.addEventListener("scroll", handleWindowScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleWindowScrollEvent);
    };
  });

  // 풀링으로 새로받은 게스트데이터를 적용시켜준다.
  useEffect(() => {
    if (networkStatus >= 7) {
      const newIndexStart = deafultGuestsData.length;

      // 업데이트전 휘발성 블럭들을 찾아서 합쳐줍니다.
      const volatilityBlocks = guestValue.filter(
        guest =>
          guest.type === GuestTypeAdd.MARK || guest.type === GuestTypeAdd.MAKE
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
    canvasMenuProps,
    blockMenuProps,
    makeMenuProps,
    setGuestValue,
    setCanvasMenuTooltipProps,
    setMakeMenuProps,
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

  const {
    allTooltipsHide,
    deleteGuestById,
    removeMark,
    allocateGuest,
    toogleCheckInOut
  } = assigUtils;

  const assigHandler = getAssigHandlers(assigUtils, assigContext, assigHooks);

  const {
    handleCanvasClick,
    handleCanvasContextMenu,
    handleItemClick,
    handleItemMove,
    handleItemResize,
    handleItemSelect,
    handleMoveResizeValidator,
    handleTimeChange,
    handleItemDoubleClick
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
  if (isEmpty(filteredGroup)) filteredGroup = [DEFAULT_NONE_GOUP];

  return (
    <div
      id="AssigTimeline"
      className={`${timelineClassNames} container container--full`}
      onDoubleClick={handleTimelineWrapClickEvent}
    >
      <div className="docs-section">
        <h3 className="assigTimeline__titleSection">
          {"방배정"}
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
              label="예약하기"
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
        <MakeItemTooltip
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
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          items={guestValue}
          groups={filteredGroup}
          {...defaultProps}
          onItemDoubleClick={handleItemDoubleClick}
          onItemClick={handleItemClick}
          // onCanvasDoubleClick={handleCanvasDoubleClick}
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
        houseId={house._id}
        modalHook={reservationModal}
        callBackCreateBookingMu={CreateBooking => {
          CreateBooking.booking &&
            assigUtils.hilightGuestBlock({
              bookingId: CreateBooking.booking._id
            });
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
  );
};

export default ErrProtecter(ShowTimeline);
