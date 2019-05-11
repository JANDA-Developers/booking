import React from 'react';
import 'moment/locale/ko';
import moment from 'moment';
import { MutationFn } from 'react-apollo';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  CustomHeader,
} from '../../../../atoms/timeline/Timeline';
import ErrProtecter from '../../../../utils/ErrProtecter';
import './PriceTimeline.scss';
import {
  getAllRoomTypePrice_GetAllRoomType_roomTypes as IRoomType,
  createRoomPrice,
  createRoomPriceVariables,
  deleteRoomPrice,
  deleteRoomPriceVariables,
} from '../../../../types/api';
import Preloader from '../../../../atoms/preloader/Preloader';
import { IItem } from './PriceTimelineWrap';
import InputText from '../../../../atoms/forms/inputText/InputText';
import { IUseDayPicker } from '../../../../actions/hook';
import JDdayPicker from '../../../../atoms/dayPicker/DayPicker';
import { setMidNight } from '../../../../utils/utils';
import { TimePerMs } from '../../../../types/enum';
import Icon, { IconSize } from '../../../../atoms/icons/Icons';

const LAST_ROOMTYPE: any = 'unRendered'; // 방들중에 방타입이 다른 마지막을 체크할것

interface IProps {
  items: IItem[] | undefined;
  houseId: string;
  priceMap: Map<any, any>;
  defaultProps: any;
  timelineProps?: any;
  loading: boolean;
  dateInputHook: IUseDayPicker;
  roomTypesData: IRoomType[] | undefined;
  createRoomPriceMu: MutationFn<createRoomPrice, createRoomPriceVariables>;
  delteRoomPriceMu: MutationFn<deleteRoomPrice, deleteRoomPriceVariables>;
  setDataTime: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
    }>
  >;
  dataTime: { start: number; end: number };
  defaultTime: { start: number; end: number };
}

const ModifyTimeline: React.FC<IProps> = ({
  items,
  defaultProps,
  roomTypesData,
  loading,
  createRoomPriceMu,
  delteRoomPriceMu,
  houseId,
  priceMap,
  dataTime,
  setDataTime,
  defaultTime,
  dateInputHook,
  ...timelineProps
}) => {
  // 그룹 렌더
  const ModifyGroupRendererFn = ({ group }: any) => {
    const roomType: IRoomType | undefined = roomTypesData && roomTypesData[group.roomTypeIndex];

    //  룹타입 부분 렌더할지 체크
    return (
      <div key={group._id}>
        <span className="title">{group.name}</span>
      </div>
    );
  };

  // date Input 변화시
  const handleInputDateChange = (start: string, end: string) => {
    setDataTime({
      start: moment(end)
        .subtract(7, 'day')
        .valueOf(),
      end: moment(end)
        .add(20, 'day')
        .valueOf(),
    });
  };

  // 가격 인풋 블러시
  const handlePriceBlur = (value: string | null, item: IItem) => {
    const inValue = value ? parseInt(value, 10) : null;
    //  ❗️ 남은 부분이 PLcae Holder로 매워져 있을수 있도록 해야함

    const beforePrice = priceMap.get(item.id);

    if (beforePrice !== undefined) {
      // 이전가격과 같다면 리턴.
      if (beforePrice === inValue) return;

      if (inValue === null) {
        delteRoomPriceMu({
          variables: {
            date: item.end,
            roomTypeId: item.group,
          },
        });
        // ❔ 컬백으로 옴겨야할까?
        priceMap.delete(item.id);
        return;
      }
    }

    if (inValue !== null) {
      createRoomPriceMu({
        variables: {
          houseId,
          date: item.end,
          roomTypeId: item.group,
          price: inValue,
        },
      });
      // ❔ 컬백으로 옴겨야할까? 아마 그러는게 낳을듯 ㅠㅠ
      //  이게 실패가 생기니까 Ui 오류가 발생함. 콜백에서하면
      //  실패시 다시 map에서 default가 나올수도 있으니...
      priceMap.set(item.id, inValue);
    }
  };

  // 아이템 렌더
  const itemRendererFn = ({
    item, itemContext, getItemProps, getResizeProps,
  }: any) => {
    // props 안에 필수 좌표값 존재
    const props = getItemProps(item.itemProps);

    return (
      <div style={{ ...props.style, backgroundColor: 'transparent', border: 'none' }}>
        <InputText
          defaultValue={priceMap.get(item.id)}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            handlePriceBlur(e.currentTarget.value, item);
          }}
        />
      </div>
    );
  };

  // 타임라인 이동시
  const handleTimeChnage = (visibleTimeStart: number, visibleTimeEnd: number, updateScrollCanvas: any) => {
    const dataLimitEnd = dataTime.end - TimePerMs.DAY * 20;
    const dataLimitstart = dataTime.start + TimePerMs.DAY * 10;

    //  뒤로 요청
    if (visibleTimeStart < dataLimitstart) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * 60;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * 30;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd),
      });
    }

    //  앞으로 요청
    if (dataLimitEnd < visibleTimeEnd) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * 30;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * 60;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd),
      });
    }
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  };

  const modifySideBarRendererFn = () => <div className="modify__sideTop" />;

  return (
    <div id="specificPrice" className="specificPrice container container--full">
      <div className="docs-section">
        <h3>상세가격 수정</h3>
        <p className="JDtextColor--secondary">* 해당 가격 수정은 모든 가격설정중 최우선 적용 됩니다.</p>
        <div className="flex-grid flex-grid--end">
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-6" />
        </div>
        <div className="ModifyTimeline__timelineWrapScroll">
          <div className="ModifyTimeline__timelineWrap specificPrice__timeline">
            <Timeline
              {...defaultProps}
              {...timelineProps}
              items={items || []}
              groups={roomTypesData || []}
              onTimeChange={handleTimeChnage}
              defaultTimeStart={defaultTime.start}
              defaultTimeEnd={defaultTime.end}
              itemRenderer={itemRendererFn}
              groupRenderer={ModifyGroupRendererFn}
              sidebarContent={modifySideBarRendererFn()}
            >
              <TimelineHeaders>
                <SidebarHeader>
                  {({ getRootProps }: any) => (
                    <div {...getRootProps()}>
                      <JDdayPicker
                        onChangeDate={handleInputDateChange}
                        isRange={false}
                        input
                        canSelectBeforeDays={false}
                        label="달력날자"
                        {...dateInputHook}
                        inputComponent={(
                          <span>
                            <Icon
                              className="specificPrice__topLeftIcon"
                              size={IconSize.MEDEIUM_SMALL}
                              icon="calendar"
                            />
                          </span>
)}
                      />
                    </div>
                  )}
                </SidebarHeader>
                <DateHeader unit="primaryHeader" />
                <DateHeader />
              </TimelineHeaders>
            </Timeline>
            {loading && <Preloader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(ModifyTimeline);
