import React, { useMemo, Fragment } from "react";
import "dayjs/locale/ko";
import { MutationFn } from "react-apollo";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
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
// import { IItem } from "./DailyPriceWrap[temp]";
import InputText from "../../../atoms/forms/inputText/InputText";
import {
  IUseDayPicker,
  getKoreaSpecificDayHook,
  useModal,
  LANG
} from "../../../hooks/hook";
import { setMidNight, autoComma, muResult } from "../../../utils/utils";
import { TimePerMs, GlobalCSS, WindowSize } from "../../../types/enum";
import reactWindowSize, { WindowSizeProps } from "react-window-size";
import { IContext } from "../../bookingHost/BookingHostRouter";
import PriceWarnModal from "../../../components/priceWarnModal.tsx/PriceWarnModal";
import HeaderCellRender from "../assig/helper/HeaderCellRender";
import dayjs from "dayjs";
import { SharedSideBarHeader } from "../../../atoms/timeline/components/SharedHeader";
import { JDdayPickerModal } from "@janda-com/front";
import { IItem } from "./DailyPriceWrap";

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
  dataTime: { start: number; end: number };
  defaultTime: { start: number; end: number };
  placeHolderMap: Map<any, any>;
  networkStatus: number;
}

const UpdateTimeline: React.FC<IProps & WindowSizeProps> = ({
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
  networkStatus,
  ...timelineProps
}) => {
  if (networkStatus === 1) return <Preloader page loading={true} />;

  const { house } = context;
  const isMobile = windowWidth <= WindowSize.MOBILE;
  const isTabletDown = windowWidth <= WindowSize.TABLET;
  const priceWarnModalHook = useModal(false);
  const dayPickerModalHook = useModal(false);

  const { datas: holidays, loading: holidayLoading } = getKoreaSpecificDayHook([
    "2019",
    "2018"
  ]);

  // 그룹 렌더
  const UpdateGroupRendererFn = ({ group }: any) => {
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
        date: dayjs(item.start).format("YYYY-MM-DD"),
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
        style={{
          ...props.style,
          backgroundColor: "transparent",
          border: "none"
        }}
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
          <h3>{LANG("daily_refine_price")}</h3>
          <p className="JDtextColor--point">
            *{" "}
            {LANG(
              "this_price_modification_will_be_the_highest_priority_of_all_pricing"
            )}
          </p>
          <div className="flex-grid flex-grid--end">
            <div className="flex-grid__col col--full-4 col--lg-4 col--md-6" />
          </div>
          <div className="UpdateTimeline__timelineWrapScroll">
            <div className="UpdateTimeline__timelineWrap dailyPrice__timeline">
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
                groupRenderer={UpdateGroupRendererFn}
                sidebarContent={modifySideBarRendererFn()}
                sidebarWidth={isMobile ? 100 : 230}
              >
                <TimelineHeaders>
                  <SidebarHeader>
                    {({ getRootProps }: any) => (
                      <SharedSideBarHeader
                        dayPickerModalHook={dayPickerModalHook}
                        getRootProps={getRootProps}
                      />
                    )}
                  </SidebarHeader>
                  <DateHeader
                    intervalRenderer={(props: any) => {
                      return HeaderCellRender({ ...props, holidays });
                    }}
                    height={GlobalCSS.TIMELINE_HEADER_HEIGHT}
                    unit="day"
                  />
                </TimelineHeaders>
              </Timeline>
              <PriceWarnModal modalHook={priceWarnModalHook} />
              <JDdayPickerModal
                modalHook={dayPickerModalHook}
                isRange={false}
                canSelectBeforeDay={true}
                calenaderPosition="center"
                label={`${LANG("calender_date")}`}
                {...dayPickerHook}
                className="JDwaves-effect JDoverflow-visible"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reactWindowSize<IProps>(ErrProtecter(UpdateTimeline));
