/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import { TimelineGroup } from 'react-calendar-timeline';
import { getAllRoomType } from '../../../types/api';
import { useToggle, useModal2 } from '../../../actions/hook';
import ModifyTimeline from './ModifyTimeline';
import { ModifydefaultProps } from './timelineConfig';
import { GET_ALL_ROOMTYPES } from '../../../queries';
import { ErrProtecter, toast, isEmpty } from '../../../utils/utils';
import RoomTypeModal from './components/RoomTypeModalWrap';
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
  const roomTypeModalHook = useModal2(false);
  const roomModalHook = useModal2(false);
  const [_, setConfigMode] = useToggle(false);
  console.log(_);

  const refetchRoomData = [{ query: GET_ALL_ROOMTYPES, variables: { houseId: selectedHouse._id } }];

  const roomDataManufacture = (roomData: getAllRoomType | undefined) => {
    const roomGroups = [];
    if (roomData && roomData.GetAllRoomType) {
      if (!isEmpty(roomData.GetAllRoomType.roomTypes)) {
        const { roomTypes } = roomData.GetAllRoomType;
        if (roomTypes) {
          roomTypes.map((roomType) => {
            if (!isEmpty(roomType.rooms)) {
              roomType.rooms.map((room) => {
                roomGroups.push({
                  id: room._id,
                  title: room.name,
                  roomTypeId: roomType._id,
                  roomTypeIndex: roomType.index,
                  roomIndex: room.index,
                });
              });
            }
            // 방타입의 마지막 방 추가버튼
            roomGroups.push({
              id: `addRoom-${roomType._id}`,
              title: '방추가',
              roomTypeId: roomType._id,
              roomTypeIndex: roomType.index,
              roomIndex: ADD_ROOM.ADDROOM,
            });
          });
        }
      }
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
        if (error) {
          console.error(error);
          toast.error(error.message);
        }
        const GetAllRoomType = roomData ? roomData.GetAllRoomType : undefined; // TEMP
        const roomTypesData = GetAllRoomType ? GetAllRoomType.roomTypes : undefined; // 원본데이터
        const formatedRoomData = roomDataManufacture(roomData); // 타임라인을 위해 가공된 데이터
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
