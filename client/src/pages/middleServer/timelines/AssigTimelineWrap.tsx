/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Query } from 'react-apollo';
import { getAllRoomType, getAllRoomTypeVariables, deleteRoomPrice_DeleteRoomPrice } from '../../../types/api';
import { useToggle, useDayPicker } from '../../../actions/hook';
import AssigTimeline from './AssigTimeline';
import { defaultProps } from './timelineConfig';
import { IRoomType } from '../../../types/interface';
import { isEmpty, showError, QueryDataFormater } from '../../../utils/utils';
import { GET_ALL_ROOMTYPES } from '../../../queries';
import EerrorProtect from '../../../utils/ErrProtecter';
import { PricingType } from '../../../types/apiEnum';

export interface IGroup {
  id: string;
  title: string;
  roomTypeId: string;
  roomTypeIndex: number;
  roomIndex: number;
  roomType: IRoomType;
  roomId: string;
  placeIndex: number;
}

interface IProps {
  houseId: string;
}

class GetAllRoomTypeQuery extends Query<getAllRoomType, getAllRoomTypeVariables> {}

const AssigTimelineWrap: React.SFC<IProps> = ({ houseId }) => {
  const dayPickerHook = useDayPicker(null, null);
  const [_, setConfigMode] = useToggle(false);

  const roomDataManufacture = (roomTypeDatas: IRoomType[] | null | undefined = []) => {
    const roomGroups: IGroup[] = [];

    if (!roomTypeDatas) return roomGroups;

    roomTypeDatas.map((roomTypeData) => {
      // 우선 방들을 원하는 폼으로 변환

      const { rooms } = roomTypeData;

      // 빈방타입 제외
      if (!isEmpty(rooms)) {
        // 🏠 방타입일 경우
        if (roomTypeData.pricingType === PricingType.ROOM) {
          rooms.map((room) => {
            roomGroups.push({
              id: room._id,
              title: room.name,
              roomTypeId: roomTypeData._id,
              roomTypeIndex: roomTypeData.index,
              roomIndex: room.index,
              roomType: roomTypeData,
              roomId: room._id,
              placeIndex: -1,
            });
          });
        }

        // 🛌 베드타입일경우
        if (roomTypeData.pricingType === PricingType.DOMITORY) {
          rooms.map((room, index) => {
            for (let i = 0; roomTypeData.peopleCount > i; i += 1) {
              roomGroups.push({
                id: room._id,
                title: room.name,
                roomTypeId: roomTypeData._id,
                roomTypeIndex: roomTypeData.index,
                roomIndex: room.index,
                roomType: roomTypeData,
                roomId: room._id,
                placeIndex: index,
              });
            }
          });
        }
      }
    });

    return roomGroups;
  };

  //  TODO 1. 한번의 쿼리로 끝내야겠지 modify Timelines 에 있는 거를 끌고와서 수정해서 넣으면 잘들어갈듯
  //  🚫 Get Booking 이거 cursor 기반인데 어떻게하지... 우선 백엔드님 오면 물어봐야겠다.

  return (
    <GetAllRoomTypeQuery fetchPolicy="network-only" query={GET_ALL_ROOMTYPES} variables={{ houseId }}>
      {({ data: roomData, loading, error }) => {
        showError(error);
        const roomTypesData = QueryDataFormater(roomData, 'GetAllRoomType', 'roomTypes', undefined); // 원본데이터
        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터

        console.log('roomTypesData');
        console.log(roomTypesData);
        console.log('formatedRoomData');
        console.log(formatedRoomData);
        return (
          <AssigTimeline
            loading={loading}
            roomData={formatedRoomData}
            dayPickerHook={dayPickerHook}
            setConfigMode={setConfigMode}
            defaultProps={defaultProps}
            roomTypesData={roomTypesData}
          />
        );
      }}
    </GetAllRoomTypeQuery>
  );
};

export default EerrorProtect(AssigTimelineWrap);
