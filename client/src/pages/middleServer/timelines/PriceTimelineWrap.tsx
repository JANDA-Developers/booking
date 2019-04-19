/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import {
  getAllRoomType,
  getAllRoomType_GetAllRoomType_roomTypes as roomTypes,
  getAllRoomType_GetAllRoomType_roomTypes_rooms as IRoom,
} from '../../../types/api';
import PriceTimeline from './PriceTimeline';
import { ModifydefaultProps } from './timelineConfig';
import { GET_ALL_ROOMTYPES } from '../../../queries';
import {
  ErrProtecter, toast, isEmpty, QueryDataFormater, showError,
} from '../../../utils/utils';
import RoomModal from './components/RoomModalWrap';

export enum ADD_ROOM {
  'ADDROOM' = -1,
  'ADDROOM_TYPE' = -1,
}

interface IProps {
  selectedHouse: any;
}

class GetAllRoomTypeQuery extends Query<getAllRoomType> {}

const ModifyTimelineWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  const refetchRoomData = [{ query: GET_ALL_ROOMTYPES, variables: { houseId: selectedHouse._id } }];

  // FUNC :  방타입에 관한정보들에서 방들에 대한 순수한 정보로 치환
  const roomDataManufacture = (roomDatas: roomTypes[] | null | undefined = []) => {
    const roomGroups: IRoom[] = [];

    if (roomDatas) {
      roomDatas.map((roomData) => {
        if (!isEmpty(roomData.rooms)) {
          roomData.rooms.map((room) => {
            roomGroups.push(room);
          });
        }
      });
    }

    return roomGroups;
  };

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

        const itemMaker = ({startDate,endDate,priceData})=> {
          let items = [];
          for (let i = 0; i < itemCount; i++) {
            const startDate = (faker.date.recent(daysInPast).valueOf() + daysInPast * 0.3 * 86400 * 1000);
            const startValue = (Math.floor(moment(startDate).valueOf() / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000)) - (32400 * 1000);
            const endValue = Math.floor(moment(
              startDate + faker.random.number({
                min: 1,
                max: 4,
              }) * 24 * 60 * 60 * 1000,
            ).valueOf() / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000) - (32400 * 1000);
        
            items.push({
              id: `${i}`,
              group: priceData.roomType,
              title: '',
              start: startValue,
              end: endValue,
            });
          }
        }

        return (
          // 방생성 뮤테이션
          <Fragment>
            <PriceTimeline
              loading={loading}
              defaultProps={ModifydefaultProps}
              roomData={formatedRoomData}
              roomTypesData={roomTypesData}
            />
            <RoomModal refetchRoomData={refetchRoomData} roomData={roomTypesData} modalHook={roomModalHook} />
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
