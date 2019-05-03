/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import moment from 'moment';
import {
  getAllRoomType,
  getAllRoomTypePrice_GetAllRoomType_roomTypes as IRoomType,
  getAllRoomType_GetAllRoomType_roomTypes_rooms as IRoom,
  getAllRoomTypePrice,
  getAllRoomTypePriceVariables,
  getAllRoomTypePrice_GetAllRoomPrice_roomPrices as roomPrices,
  createRoomPrice,
  createRoomPriceVariables,
  deleteRoomPrice,
  deleteRoomPriceVariables,
} from '../../../../types/api';
import PriceTimeline from './PriceTimeline';
import { PriceDefaultProps } from '../timelineConfig';
import {
  GET_ALL_ROOMTYPES, CREATE_ROOM_PRICE, GET_ALL_ROOMTYPES_PRICE, DELETE_ROOM_PRICE,
} from '../../../../queries';
import {
  ErrProtecter,
  toast,
  isEmpty,
  QueryDataFormater,
  showError,
  setMidNight,
  onCompletedMessage,
  onError,
} from '../../../../utils/utils';
import { TimePerMs } from '../../../../types/apiEnum';
import { IHouse } from '../../../../types/interface';
import { useDayPicker } from '../../../../actions/hook';

class GetAllRoomTypePriceQuery extends Query<getAllRoomTypePrice, getAllRoomTypePriceVariables> {}
class CreateRoomPriceMu extends Mutation<createRoomPrice, createRoomPriceVariables> {}
class DeleteRoomPriceMu extends Mutation<deleteRoomPrice, deleteRoomPriceVariables> {}

export interface IItem {
  id: string;
  group: string;
  name: string;
  // ms
  price: number;
  start: number;
  end: number;
}
// 날자와 방타입 2중 순환 시켜서 모든 블럭에 맞는 item 을 생성
// price 부분은 Map 에서호출

interface IPropItemMaker {
  startDate: number;
  endDate: number;
  priceMap: Map<any, any>;
  roomTypes: IRoomType[];
}

const itemMaker = ({
  startDate, endDate, priceMap, roomTypes,
}: IPropItemMaker): IItem[] => {
  let items: IItem[] = [];
  let now = startDate;

  const roomTpyesMapFn = (roomType: IRoomType) => ({
    id: roomType._id + now,
    group: roomType._id,
    start: now,
    price: priceMap.get(roomType._id + now),
    name: 'any',
    end: now + TimePerMs.DAY,
    style: {
      backgroundColor: 'fuchsia',
    },
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
    },
  });

  while (now <= endDate) {
    items = items.concat(roomTypes.map(roomTpyesMapFn));
    now = moment(now)
      .add(1, 'days')
      .valueOf();
  }
  return items;
};

interface IProps {
  selectedHouse: IHouse;
}

// 👼 앞으로 무조건 milisecond를 사용하는 편이 편할듯하다.
const PriceTimelineWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  //  Default 값
  const dateInputHook = useDayPicker(null, null);
  const queryStartDate = setMidNight(
    moment()
      .subtract(30, 'days')
      .valueOf(),
  );
  const queryEndDate = setMidNight(
    moment()
      .add(60, 'days')
      .valueOf(),
  );
  // 일주일치 view만 보이겠지만 미리미리 요청해두자
  // 포멧 형식 "2019.04.09."
  // 👿 여기는 state일 필요가 없는것 같은데?
  // 그냥 defaultTime 이고 변경하는곳은 오직 dateInput 뿐....
  const [defaultTime, setDefaultTime] = useState({
    start: setMidNight(moment().valueOf()),
    end: setMidNight(
      moment()
        .add(7, 'days')
        .valueOf(),
    ),
  });

  const [dataTime, setDataTime] = useState({ start: queryStartDate, end: queryEndDate });

  // 방타입과 날자 조합의 키를 가지고 value로 pirce를 가지는 Map 생성
  const priceMapMaker = (priceData: roomPrices[]): Map<string, number> => {
    const priceMap = new Map();
    priceData.map((price) => {
      priceMap.set(price.roomType._id + setMidNight(moment(price.date).valueOf()), price.price);
    });
    return priceMap;
  };

  const queryVarialbes = {
    houseId: selectedHouse._id,
    start: moment(dataTime.start)
      .toISOString()
      .split('T')[0],
    end: moment(dataTime.end)
      .toISOString()
      .split('T')[0],
  };

  return (
    <GetAllRoomTypePriceQuery fetchPolicy="network-only" query={GET_ALL_ROOMTYPES_PRICE} variables={queryVarialbes}>
      {({ data, loading, error }) => {
        showError(error);
        const roomTypesData = QueryDataFormater(data, 'GetAllRoomType', 'roomTypes', undefined); // 원본데이터
        const roomPriceData = QueryDataFormater(data, 'GetAllRoomPrice', 'roomPrices', undefined); // 원본데이터
        const priceMap = roomPriceData ? priceMapMaker(roomPriceData) : new Map();
        const items = roomTypesData
          && itemMaker({
            startDate: dataTime.start,
            endDate: dataTime.end,
            priceMap,
            roomTypes: roomTypesData,
          });
        return (
          // 방생성 뮤테이션
          <CreateRoomPriceMu
            onCompleted={({ CreateRoomPrice }) => {
              onCompletedMessage(CreateRoomPrice, '가격설정완료', '가격설정 실패');
            }}
            refetchQueries={[{ query: GET_ALL_ROOMTYPES_PRICE, variables: queryVarialbes }]}
            onError={onError}
            mutation={CREATE_ROOM_PRICE}
          >
            {createRoomPriceMu => (
              // 방생성 뮤테이션
              <DeleteRoomPriceMu
                onCompleted={({ DeleteRoomPrice }) => {
                  onCompletedMessage(DeleteRoomPrice, '가격설정삭제', '가격설정삭제 실패');
                }}
                refetchQueries={[{ query: GET_ALL_ROOMTYPES_PRICE, variables: queryVarialbes }]}
                onError={onError}
                mutation={DELETE_ROOM_PRICE}
              >
                {deleteRoomPriceMu => (
                  <PriceTimeline
                    houseId={selectedHouse._id}
                    items={items || undefined}
                    loading={loading}
                    defaultProps={PriceDefaultProps}
                    priceMap={priceMap}
                    roomTypesData={roomTypesData || undefined}
                    createRoomPriceMu={createRoomPriceMu}
                    dataTime={dataTime}
                    setDataTime={setDataTime}
                    defaultTime={defaultTime}
                    key={`defaultTime${defaultTime.start}${defaultTime.end}`}
                    setDefaultTime={setDefaultTime}
                    delteRoomPriceMu={deleteRoomPriceMu}
                    dateInputHook={dateInputHook}
                  />
                )}
              </DeleteRoomPriceMu>
            )}
          </CreateRoomPriceMu>
        );
      }}
    </GetAllRoomTypePriceQuery>
  );
};

export default ErrProtecter(PriceTimelineWrap);

// 왜 item 이 안나올까?
// 1.ID 문제다?
// 2.TimeStamp 문제다?
// 3. 필요한 인자가 빠졌다?
