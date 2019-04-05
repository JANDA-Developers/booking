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

interface IProps {
  selectedHouse: any;
}

class GetAllRoomTypeQuery extends Query<getAllRoomType> {}

const ModifyTimelineWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  const roomTypeModalHook = useModal2(false);
  const roomModalHook = useModal2(false);
  const [_, setConfigMode] = useToggle(false);
  console.log(_);

  const roomDataManufacture = (roomData: getAllRoomType | undefined): TimelineGroup | [] => {
    const roomGroups: any = [];
    if (roomData && roomData.GetAllRoomType) {
      if (!isEmpty(roomData.GetAllRoomType.roomTypes)) {
        const { roomTypes }: any = roomData.GetAllRoomType;
        roomTypes.map((roomType: any) => {
          if (!isEmpty(roomType.rooms)) {
            roomType.rooms.map((room: any) => {
              roomGroups.push({
                id: room._id,
                title: room.name,
                roomTypeId: roomType._id,
              });
            });
          } else {
            // case: 방타입이 있으나 방이없음
            roomGroups.push({
              id: `falsyRoom-${roomType._id}`,
              title: '방없음',
              roomTypeId: roomType._id,
            });
          }
        });
      }
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
        const formatedRoomData = roomDataManufacture(roomData);
        return (
          // 방생성 뮤테이션
          <Fragment>
            <ModifyTimeline
              loading={loading}
              // roomData={}
              setConfigMode={setConfigMode}
              defaultProps={ModifydefaultProps}
              roomTypeModal={roomTypeModalHook}
              roomModal={roomModalHook}
              roomData={formatedRoomData}
            />
            <RoomTypeModal modalHook={roomTypeModalHook} roomData={roomData} selectedHouse={selectedHouse} />
            <RoomModal modalHook={roomModalHook} />
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
