import React, {useMemo, Fragment} from "react";
import "moment/locale/ko";
import moment from "moment";
import {MutationFn} from "react-apollo";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  SharedSideBarHeader
} from "../../../atoms/timeline/Timeline";
import ErrProtecter from "../../../utils/errProtect";
import "./DailyPrice.scss";
import {
  getAllRoomTypePrice_GetAllRoomType_roomTypes as IRoomType,
  createDailyPrice,
  createDailyPriceVariables,
  deleteDailyPrice,
  deleteDailyPriceVariables
} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import {IItem} from "./DailyPriceWrap";
import InputText from "../../../atoms/forms/inputText/InputText";
import {
  IUseDayPicker,
  getKoreaSpecificDayHook,
  useModal
} from "../../../actions/hook";
import {setMidNight, autoComma, isEmpty, muResult} from "../../../utils/utils";
import {TimePerMs, GlobalCSS, WindowSize} from "../../../types/enum";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import {ASSIG_VISIBLE_CELL_MB_DIFF} from "../assig/timelineConfig";
import JDbadge from "../../../atoms/badge/Badge";
import Tooltip from "../../../atoms/tooltip/Tooltip";
import {IContext} from "../../MiddleServerRouter";
import PriceWarnModal from "../../../components/priceWarnModal.tsx/PriceWarnModal";

interface IProps {
  items: IItem[] | undefined;
  context: IContext;
  priceMap: Map<any, any>;
  defaultProps: any;
  timelineProps?: any;
  loading: boolean;
  dayPickerHook: IUseDayPicker;
  roomTypesData: IRoomType[] | undefined;
  createDailyPriceMu: MutationFn<createDailyPrice, createDailyPriceVariables>;
  delteDailyPriceMu: MutationFn<deleteDailyPrice, deleteDailyPriceVariables>;
  setDataTime: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
    }>
  >;
  dataTime: {start: number; end: number};
  defaultTime: {start: number; end: number};
  placeHolderMap: Map<any, any>;
}

const ModifyTimeline: React.FC<IProps & WindowSizeProps> = ({
  items,
  defaultProps,
  roomTypesData,
  loading,
  createDailyPriceMu,
  delteDailyPriceMu,
  context,
  priceMap,
  dataTime,
  setDataTime,
  defaultTime,
  dayPickerHook,
  placeHolderMap,
  windowWidth,
  ...timelineProps
}) => {
  const {house} = context;
  const isMobile = windowWidth <= WindowSize.MOBILE;
  const isTabletDown = windowWidth <= WindowSize.TABLET;
  const priceWarnModalHook = useModal(false);

  const {datas: holidays, loading: holidayLoading} = getKoreaSpecificDayHook(
    "2019"
  );

  // 그룹 렌더
  const ModifyGroupRendererFn = ({group}: any) => {
    const roomType: IRoomType | undefined =
      roomTypesData && roomTypesData[group.roomTypeIndex];

    //  룹타입 부분 렌더할지 체크
    return (
      <div key={group._id}>
        <span className="title">{group.name}</span>
      </div>
    );
  };

  // 딜리트 뮤테이션 발송
  const deleteDailyPrice = async (item: IItem) => {
    const result = await delteDailyPriceMu({
      variables: {
        date: item.end,
        roomTypeId: item.group
      }
    });
    if (muResult(result, "DeleteDailyPrice")) priceMap.delete(item.id);
    else {
      // 에러처리
    }
  };

  // 크리에이트 뮤테이션 발송
  const createDailyPrice = async (value: number, item: IItem) => {
    const result = await createDailyPriceMu({
      variables: {
        houseId: house._id,
        date: item.end,
        roomTypeId: item.group,
        price: value
      }
    });
    if (muResult(result, "CreateDailyPrice")) priceMap.set(item.id, value);
    else {
      // 에러처리
      location.reload();
    }
  };

  // 크리에이트와 뮤테이션중 뭘할지 판단
  const switchMutation = (
    value: number | null,
    item: IItem,
    beforePrice: any
  ) => {
    if (value === null && beforePrice !== undefined) {
      deleteDailyPrice(item);
      return;
    }
    if (value !== null) {
      createDailyPrice(value, item);
    }
  };

  // 뮤테이션 발송전 벨리데이션
  const validationBeforeMu = (
    value: number | null,
    item: IItem,
    beforePrice: any
  ) => {
    // 같은 가격이면 아무것도 안함
    if (beforePrice === value) return false;

    // priceWarn  컬백용
    const callBackPriceWarn = (flag: boolean) => {
      if (flag) {
        switchMutation(value, item, beforePrice);
      } else {
        location.reload();
      }
    };
    // 가격이 천원이하면
    if (value !== null && 0 < value && value < 1000) {
      priceWarnModalHook.openModal({
        confirmCallBackFn: callBackPriceWarn
      });
      return false;
    }
    switchMutation(value, item, beforePrice);
  };

  // 가격 인풋 블러 핸들러
  const handlePriceBlur = (value: string | null, item: IItem) => {
    const inValue = value ? parseInt(value.replace(/,/g, ""), 10) : null;
    //  ❗️ 남은 부분이 PLcae Holder로 매워져 있을수 있도록 해야함
    const beforePrice = priceMap.get(item.id);

    validationBeforeMu(inValue, item, beforePrice);
  };

  // 아이템 렌더
  const itemRendererFn = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps
  }: any) => {
    // props 안에 필수 좌표값 존재
    const props = getItemProps(item.itemProps);

    return (
      <div
        className="dailyPrice__cellWrap"
        style={{...props.style, backgroundColor: "transparent", border: "none"}}
      >
        <InputText
          comma
          defaultValue={priceMap.get(item.id)}
          placeholder={autoComma(placeHolderMap.get(item.id))}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            handlePriceBlur(e.currentTarget.value, item);
          }}
        />
      </div>
    );
  };

  // 타임라인 이동시
  const handleTimeChange = (
    visibleTimeStart: number,
    visibleTimeEnd: number,
    updateScrollCanvas: any
  ) => {
    const dataLimitEnd = dataTime.end - TimePerMs.DAY * 20;
    const dataLimitstart = dataTime.start + TimePerMs.DAY * 10;

    //  뒤로 요청
    if (visibleTimeStart < dataLimitstart) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * 60;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * 30;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd)
      });
    }

    //  앞으로 요청
    if (dataLimitEnd < visibleTimeEnd) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * 30;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * 60;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd)
      });
    }
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  };

  const modifySideBarRendererFn = () => <div className="modify__sideTop" />;

  return (
    <div id="dailyPrice">
      <div className="dailyPrice container container--full">
        <div className="docs-section">
          <h3>상세가격 수정</h3>
          <p className="JDtextColor--point">
            * 해당 가격 수정은 모든 가격설정 중 최우선 적용 됩니다.
          </p>
          <div className="flex-grid flex-grid--end">
            <div className="flex-grid__col col--full-4 col--lg-4 col--md-6" />
          </div>
          <div className="ModifyTimeline__timelineWrapScroll">
            <div className="ModifyTimeline__timelineWrap dailyPrice__timeline">
              <Timeline
                {...defaultProps}
                {...timelineProps}
                items={items || []}
                groups={roomTypesData || []}
                onTimeChange={handleTimeChange}
                defaultTimeStart={defaultTime.start}
                defaultTimeEnd={
                  isTabletDown
                    ? defaultTime.end - TimePerMs.DAY * 5
                    : defaultTime.end
                }
                itemRenderer={itemRendererFn}
                groupRenderer={ModifyGroupRendererFn}
                sidebarContent={modifySideBarRendererFn()}
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
                    intervalRenderer={({
                      getIntervalProps,
                      intervalContext
                    }: any) => {
                      const {startTime} = intervalContext.interval;
                      const isToday = startTime.isSame(new Date(), "day");

                      const holiday = holidays.find(holiday => {
                        const result = moment(
                          holiday.locdate.toString(),
                          "YYYYMMDD"
                        ).isSame(startTime, "day");

                        return result;
                      });

                      return (
                        <div
                          className={`rct-dateHeader ${isToday &&
                            "rct-dateHeader--today"}`}
                          {...getIntervalProps()}
                          onClick={() => {}}
                        >
                          <div className="rct-dateHeader__inner">
                            {intervalContext.intervalText
                              .replace("요일,", ", ")
                              .replace(/[0-9]{4}년/, "")}
                          </div>

                          {holiday && (
                            <Fragment>
                              <JDbadge
                                data-tip
                                data-for={`holidayTooltip--${holiday.locdate}`}
                                thema={"error"}
                              >
                                공휴일
                              </JDbadge>
                              <Tooltip
                                id={`holidayTooltip--${holiday.locdate}`}
                                class="JDtooltip"
                              >
                                {holiday.dateName}
                              </Tooltip>
                            </Fragment>
                          )}
                        </div>
                      );
                    }}
                    height={GlobalCSS.TIMELINE_HEADER_HEIGHT}
                    unit="day"
                  />
                </TimelineHeaders>
              </Timeline>
              <PriceWarnModal modalHook={priceWarnModalHook} />
              <Preloader size="large" loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reactWindowSize<IProps>(ErrProtecter(ModifyTimeline));
