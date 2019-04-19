/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import { printIntrospectionSchema } from 'graphql';
import moment from 'moment';
import { any } from 'prop-types';
import {
  getAllRoomType,
  getAllRoomType_GetAllRoomType_roomTypes as IRoomTypes,
  getAllRoomType_GetAllRoomType_roomTypes_rooms as IRoom,
} from '../../../types/api';
import PriceTimeline from './PriceTimeline';
import { ModifydefaultProps } from './timelineConfig';
import { GET_ALL_ROOMTYPES } from '../../../queries';
import {
  ErrProtecter, toast, isEmpty, QueryDataFormater, showError,
} from '../../../utils/utils';
import RoomModal from './components/RoomModalWrap';
import { TimePerMs } from '../../../types/apiEnum';

export enum ADD_ROOM {
  'ADDROOM' = -1,
  'ADDROOM_TYPE' = -1,
}

interface IProps {
  selectedHouse: any;
}

class GetAllRoomTypeQuery extends Query<getAllRoomType> {}

interface IPropItemMaker {
  startDate: string;
  endDate: string;
  priceMap: any;
  roomTypes: IRoomTypes[];
}

export interface IItems {
  id: string;
  group: string;
  start: number;
  end: number;
}
// 날자와 방타입 2중 순환 시켜서 모든 블럭에 맞는 item 을 생성
// price 부분은 Map 에서호출

const itemMaker = ({
  startDate, endDate, priceMap, roomTypes,
}: IPropItemMaker): IItems[] => {
  const items: IItems[] = [];
  const end = parseInt(endDate.replace(/#/gi, '.'), 10);
  let now = parseInt(startDate.replace(/#/gi, '.'), 10);
  const toMiliSecound = (inNow: number): number => moment(inNow.toString(), 'YYYY-MM-DD').valueOf() * TimePerMs.DAY;

  for (let i = 0; now <= end; i += 1) {
    const date = toMiliSecound(now);
    roomTypes.map((roomType) => {
      //  이부분 나중에 Utils 함수로 빠질듯
      const item = {
        id: `${i}`,
        group: roomType._id,
        start: date,
        end: date + TimePerMs.DAY,
      };
      items.push(item);
    });
    now += i;
  }
  return items;
};

const ModifyTimelineWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  // 오늘날자 기준으로 5일전 앞으로 12일 더 여유분을 호출함.
  // 포멧 형식 "2019.04.09."
  const startDate = moment()
    .subtract(5, 'days')
    .calendar();
  const endDate = moment()
    .add(10, 'days')
    .calendar();

  return (
    // 모든 방 가져오기 NOTE
    <GetAllRoomTypeQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES}
      variables={{ houseId: selectedHouse._id }}
    >
      {({ data: roomData, loading, error }) => {
        showError(error);
        const roomTypesData = QueryDataFormater(roomData, 'GetAllRoomType', 'roomTypes', undefined); // 원본데이터
        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터

        // 방타입과 날자 조합의 키를 가지고 value로 pirce를 가지는 Map 생성
        const priceMapMaker = (priceData) => {
          const priceMap = new Map();
          priceData.map((price) => {
            priceMap.set();
          });
        };

        return (
          // 방생성 뮤테이션
          <Fragment>
            <PriceTimeline loading={loading} defaultProps={ModifydefaultProps} roomTypesData={roomTypesData} />
          </Fragment>
        );
      }}
    </GetAllRoomTypeQuery>
  );
};

ModifyTimelineWrap.defaultProps = {
  selectedHouse: {},
};

export default ErrProtecter(ModifyTimelineWrap);
