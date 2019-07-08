import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
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
import {IUseDayPicker, useModal} from "../../../actions/hook";
import classnames from "classnames";
import assigGroupRendererFn from "./components/groupRenderFn";
import {IRoomType, IHouseConfig, IHouse} from "../../../types/interface";
import Preloader from "../../../atoms/preloader/Preloader";
import "./AssigTimeline.scss";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {ReactTooltip} from "../../../atoms/tooltipList/TooltipList";
import {
  TimePerMs,
  WindowSize as EWindowSize,
  GlobalCSS,
  WindowSize
} from "../../../types/enum";
import itemRendererFn from "./components/itemRenderFn";
import ItemMenu from "./components/itemMenu";
import CanvasMenu from "./components/canvasMenu";
import MakeItemMenu from "./components/makeItemMenu";
import {
  DEFAULT_ASSIG_ITEM,
  DEFAULT_ASSIG_GROUP,
  DEFAULT_NONE_GOUP
} from "../../../types/defaults";
import JDmodal, {JDtoastModal} from "../../../atoms/modal/Modal";
import {
  IAssigMutationes,
  IAssigItem,
  GuestTypeAdd,
  ICanvasMenuProps,
  IAssigGroup,
  IAssigTimelineHooks,
  IAssigTimelineContext,
  IMakeMenuProps,
  IDeleteMenuProps,
  TShortKey
} from "./components/assigIntrerface";
import {getAssigUtils} from "./components/assigUtils";
import BlockItemMenu from "./components/blockItemMenu";
import {ASSIG_VISIBLE_CELL_MB_DIFF} from "./timelineConfig";
import JDmultiBox from "../../../atoms/multiBox/MultiBox";
import {getAssigHandlers} from "./components/assigHandlers";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import moment from "moment";
import {isEmpty} from "../../../utils/utils";

// Temp 마킹용이 있는지

// 충돌시간 인터페이스
// 단순히 안됨 보다 ~부터 ~가 안됨을 표시하기 위함
// 게스트1이 이동하는 주체

interface IProps {
  house: IHouse;
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
  house,
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
    bookingModal,
    setDataTime,
    dataTime
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
    allTooltipsHide,
    deleteGuestById,
    removeMark,
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
    handleTimeChange
  } = assigHandler;

  // 툴팁들을 제거하고
  const handleWindowClickEvent = () => {
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

  const timelineClassNames = classnames("assigTimeline", undefined, {
    "assiTimeline--mobile": windowWidth <= WindowSize.MOBILE
  });

  let filteredGroup = groupData.filter(group =>
    viewRoomType.includes(group.roomTypeId)
  );

  if (isEmpty(filteredGroup)) filteredGroup = [DEFAULT_NONE_GOUP];

  return (
    <div
      id="AssigTimeline"
      className={`${timelineClassNames} container container--full`}
      onDoubleClick={handleWindowClickEvent}
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
          groups={filteredGroup}
          {...defaultProps}
          // onItemDoubleClick={handleItemDoubleClick}
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
                    <div
                      className="rct-dateHeader__inner"
                      onClickCapture={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        dailyAssigHook.openModal({
                          date: moment(
                            intervalContext.interval.startTime
                          ).toDate()
                        });
                      }}
                    >
                      {intervalContext.intervalText
                        .replace("요일,", ", ")
                        .replace(/[0-9]{4}년/, "")}
                    </div>
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
      <JDmodal {...dailyAssigHook}>
        <DailyAssigWrap date={dailyAssigHook.info.date} house={house} />
      </JDmodal>
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
