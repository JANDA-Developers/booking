import React from 'react';
import 'moment/locale/ko';
import moment from 'moment';
import { MutationFn } from 'react-apollo';
import Timeline from '../../../../components/timeline/Timeline';
import ErrProtecter from '../../../../utils/ErrProtecter';
import './PriceTimeline.scss';
import {
  getAllRoomTypePrice_GetAllRoomType_roomTypes as IRoomType,
  createRoomPrice,
  createRoomPriceVariables,
} from '../../../../types/api';
import Preloader from '../../../../atoms/preloader/Preloader';
import { IItem } from './PriceTimelineWrap';
import InputText from '../../../../atoms/forms/InputText';
import { useDayPicker } from '../../../../actions/hook';
import JDdayPicker from '../../../../components/dayPicker/DayPicker';
import { setMidNight } from '../../../../utils/utils';
import { TimePerMs } from '../../../../types/apiEnum';

const LAST_ROOMTYPE: any = 'unRendered'; // 방들중에 방타입이 다른 마지막을 체크할것

interface IProps {
  items: IItem[] | undefined;
  houseId: string;
  priceMap: Map<any, any>;
  defaultProps: any;
  timelineProps?: any;
  loading: boolean;
  roomTypesData: IRoomType[] | undefined;
  createRoomPriceMu: MutationFn<createRoomPrice, createRoomPriceVariables>;
  delteRoomPriceMu: any;
  setDataTime: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
    }>
  >;
  dataTime: { start: number; end: number };
  defaultTime: { start: number; end: number };
  setDefaultTime: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
    }>
  >;
}

const ModifyTimeline: React.SFC<IProps> = ({
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
  setDefaultTime,
  ...timelineProps
}) => {
  const dateInputHook = useDayPicker(null, null);
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
    setDefaultTime({
      start: moment(end)
        .subtract(2, 'day')
        .valueOf(),
      end: moment(end)
        .add(4, 'day')
        .valueOf(),
    });
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

    // ❓ 뭔가 잘못됨 이부분에 관해서는... 항상 값이 있어야하는데

    //  ❗️ 알겠다 값이 없을떄는 deleteRoomPriceMu를 날려야함 남은 부분이 PLcae Holder로 매워져 있을수 있도록

    // ⛔️ 뮤테이션 문제가있음  4월 28일 이후로 안들어감 이게뭐냥...

    const beforePrice = priceMap.get(item.id);

    if (beforePrice) {
      // 이전가격과 같다면 리턴.
      if (beforePrice === inValue) return;

      if (inValue === null) delteRoomPriceMu({});
    }

    createRoomPriceMu({
      variables: {
        houseId,
        date: item.start,
        roomTypeId: item.group,
        price: inValue || 0,
      },
    });
    priceMap.set(item.id, inValue);
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
    const dataLimitEnd = dataTime.end - TimePerMs.DAY * 4;
    const dataLimitstart = dataTime.end + TimePerMs.DAY * 1;

    //  뒤로 요청
    if (visibleTimeStart < dataLimitstart) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * 20;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * 4;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd),
      })
    }

    //  앞으로 요청
    if (dataLimitEnd < visibleTimeEnd) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * 4;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * 20;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd),
      })
    }
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  };

  const modifySideBarRendererFn = () => <div className="modify__sideTop" />;

  return (
    <div id="specificPrice" className="specificPrice container container--full">
      <div className="docs-section">
        <h3>상세가격 수정</h3>
        <p className="JDtextColor--secondary">* 해당 가격 수정은 모든 가격설정중 최우선 적용 됩니다.</p>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-4 col--md-6">
            <JDdayPicker
              onChangeDate={handleInputDateChange}
              isRange={false}
              input
              label="달력날자"
              {...dateInputHook}
            />
          </div>
        </div>
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
            />
            {loading && <Preloader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(ModifyTimeline);
