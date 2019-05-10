/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import { getAllRoomType } from '../../../../types/api';
import { useToggle, useModal } from '../../../../actions/hook';
import ModifyTimeline from './ModifyTimeline';
import { ModifydefaultProps } from '../timelineConfig';
import { GET_ALL_ROOMTYPES } from '../../../../queries';
import {
  ErrProtecter, toast, isEmpty, QueryDataFormater, showError,
} from '../../../../utils/utils';
import RoomTypeModal from '../components/RoomTypeModalWrap';
import RoomModal from '../components/RoomModalWrap';
import { ISelectHouse, IRoomType } from '../../../../types/interface';

export enum ADD_ROOM {
  'ADDROOM' = -1,
  'ADDROOM_TYPE' = -1,
}

interface IProps {
  selectedHouse: any;
}

class GetAllRoomTypeQuery extends Query<getAllRoomType> {}

const ModifyTimelineWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  const roomTypeModalHook = useModal(false);
  const roomModalHook = useModal(false);
  const [_, setConfigMode] = useToggle(false);
  console.log(_);

  const refetchRoomData = [{ query: GET_ALL_ROOMTYPES, variables: { houseId: selectedHouse._id } }];

  const roomDataManufacture = (roomDatas: IRoomType[] | null | undefined = []) => {
    const roomGroups = [];

    if (roomDatas) {
      roomDatas.map((roomData) => {
        // 우선 방들을 원하는 폼으로 변환
        if (!isEmpty(roomData.rooms)) {
          roomData.rooms.map((room) => {
            roomGroups.push({
              id: room._id,
              title: room.name,
              roomTypeId: roomData._id,
              roomTypeIndex: roomData.index,
              roomIndex: room.index,
            });
          });
        }
        // 방타입의 마지막 방 추가버튼
        roomGroups.push({
          id: `addRoom-${roomData._id}`,
          title: '방추가',
          roomTypeId: roomData._id,
          roomTypeIndex: roomData.index,
          roomIndex: ADD_ROOM.ADDROOM,
        });
      });
      // 마지막 방타입후 추가버튼
      roomGroups.push({
        id: 'addRoomTypes',
        title: '방추가',
        roomTypeIndex: ADD_ROOM.ADDROOM_TYPE,
        roomTypeId: ADD_ROOM.ADDROOM_TYPE,
        roomIndex: ADD_ROOM.ADDROOM,
      });
    }
    return roomGroups;
  };

  return (
    // 모든 방 가져오기
    <GetAllRoomTypeQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES}
      variables={{ houseId: selectedHouse._id }}
    >
      {({ data: roomData, loading, error }) => {
        showError(error);
        const roomTypesData = QueryDataFormater(roomData, 'GetAllRoomType', 'roomTypes', undefined); // 원본데이터
        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터
        console.log('roomData');
        console.log(roomData);
        console.log('roomTypesData');
        console.log(roomTypesData);
        console.log('formatedRoomData');
        console.log(formatedRoomData);
        return (
          // 방생성 뮤테이션
          <Fragment>
            <ModifyTimeline
              loading={loading}
              setConfigMode={setConfigMode}
              defaultProps={ModifydefaultProps}
              roomTypeModal={roomTypeModalHook}
              roomModal={roomModalHook}
              roomData={formatedRoomData}
              roomTypesData={roomTypesData}
            />
            <RoomTypeModal
              refetchRoomData={refetchRoomData}
              selectedHouseId={selectedHouse._id}
              modalHook={roomTypeModalHook}
              roomData={roomTypesData}
            />
            <RoomModal
              selectedHouseId={selectedHouse._id}
              refetchRoomData={refetchRoomData}
              roomData={roomTypesData}
              modalHook={roomModalHook}
            />
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
