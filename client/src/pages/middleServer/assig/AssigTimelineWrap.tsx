/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import assigDefaultProps from './timelineConfig';
import { getAllRoomTypeWithGuest, getAllRoomTypeWithGuestVariables } from '../../../types/api';
import { useToggle, useDayPicker } from '../../../actions/hook';
import { IRoomType, IGuests } from '../../../types/interface';
import {
  isEmpty, setMidNight, showError, queryDataFormater,
} from '../../../utils/utils';
import EerrorProtect from '../../../utils/errProtect';
import { Gender } from '../../../types/enum';
import { GET_ALL_ROOMTYPES_WITH_GUESTS } from '../../../queries';
import AssigTimeline from './AssigTimeline';
import { setYYYYMMDD } from '../../../utils/setMidNight';

export interface IAssigGroup {
  id: string;
  title: string;
  roomTypeId: string;
  roomTypeIndex: number;
  roomIndex: number;
  roomType: IRoomType;
  roomId: string;
  placeIndex: number;
  isLastOfRoom: boolean;
  isLastOfRoomType: boolean;
}

export interface IAssigItem {
  id: string;
  name: string;
  group: string;
  bookerId: string;
  isCheckin: boolean;
  roomTypeId: string;
  // roomId: string;
  start: number;
  end: number;
  gender: Gender | null;
  isTempAllocation: boolean;
}

interface IProps {
  houseId: string;
}

class GetAllRoomTypeWithGuestQuery extends Query<getAllRoomTypeWithGuest, getAllRoomTypeWithGuestVariables> {}

const AssigTimelineWrap: React.SFC<IProps> = ({ houseId }) => {
  const dayPickerHook = useDayPicker(null, null);
  const [_, setConfigMode] = useToggle(false);
  const defaultStartDate = setMidNight(dayPickerHook.from ? moment(dayPickerHook.from).valueOf() : moment().valueOf());
  const defaultEndDate = setMidNight(
    dayPickerHook.from
      ? moment(dayPickerHook.from)
        .add(7, 'days')
        .valueOf()
      : moment()
        .add(7, 'days')
        .valueOf(),
  );
  const [dataTime, setDataTime] = useState({
    start: setMidNight(
      moment()
        .subtract(30, 'days')
        .valueOf(),
    ),
    end: setMidNight(
      moment()
        .add(60, 'days')
        .valueOf(),
    ),
  });

  //  TODO: 메모를 사용해서 데이터를 아끼자
  // 게스트 데이터를 달력에서 쓸수있는 Item 데이터로 변경 절차
  const guestsDataManufacture = (guestsData: IGuests[] | null | undefined = []) => {
    const alloCateItems: IAssigItem[] = [];
    if (!guestsData) return alloCateItems;

    guestsData.forEach((guestData) => {
      const isDomitory = guestData.pricingType === 'DOMITORY';

      if (guestData && guestData.booking && guestData.roomType && guestData.allocatedRoom) {
        alloCateItems.push({
          id: guestData._id,
          name: guestData.name,
          bookerId: guestData.booking.booker._id,
          isCheckin: guestData.booking.booker.isCheckIn,
          gender: guestData.gender,
          roomTypeId: guestData.roomType._id,
          isTempAllocation: guestData.isTempAllocation,
          group: guestData.allocatedRoom._id + 1,
          start: moment(guestData.start).valueOf(),
          end: moment(guestData.end).valueOf(),
        });
      }
    });

    return alloCateItems;
  };

  // 🛌 베드타입일경우에 ID는 + 0~(인덱스);
  //  TODO: 메모를 사용해서 데이터를 아끼자
  // 룸 데이타를 달력에서 사용할수있는 Group 데이터로 변경
  const roomDataManufacture = (roomTypeDatas: IRoomType[] | null | undefined = []) => {
    const roomGroups: IAssigGroup[] = [];

    if (!roomTypeDatas) return roomGroups;

    roomTypeDatas.map((roomTypeData) => {
      // 우선 방들을 원하는 폼으로 변환

      const { rooms } = roomTypeData;

      // 빈방타입 제외
      if (!isEmpty(rooms)) {
        // 🏠 방타입일 경우
        if (roomTypeData.pricingType === 'ROOM') {
          rooms.map((room, index) => {
            roomGroups.push({
              id: room._id,
              title: room.name,
              roomTypeId: roomTypeData._id,
              roomTypeIndex: roomTypeData.index,
              roomIndex: room.index,
              roomType: roomTypeData,
              roomId: room._id,
              placeIndex: -1,
              isLastOfRoom: true,
              isLastOfRoomType: roomTypeData.roomCount === index,
            });
          });
        }

        // 🛌 베드타입일경우
        if (roomTypeData.pricingType === 'DOMITORY') {
          rooms.map((room, index) => {
            for (let i = 1; roomTypeData.peopleCount >= i; i += 1) {
              roomGroups.push({
                id: room._id + i,
                title: room.name,
                roomTypeId: roomTypeData._id,
                roomTypeIndex: roomTypeData.index,
                roomIndex: room.index,
                roomType: roomTypeData,
                roomId: room._id,
                placeIndex: i,
                isLastOfRoom: roomTypeData.peopleCount === i,
                isLastOfRoomType: roomTypeData.roomCount === index + 1 && roomTypeData.peopleCount === i,
              });
            }
          });
        }
      }
    });

    return roomGroups;
  };

  return (
    <GetAllRoomTypeWithGuestQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES_WITH_GUESTS}
      variables={{
        houseId,
        start: setYYYYMMDD(moment(dataTime.start)),
        end: setYYYYMMDD(moment(dataTime.end)),
      }}
    >
      {({ data, loading, error }) => {
        showError(error);
        const roomTypesData = queryDataFormater(data, 'GetAllRoomType', 'roomTypes', undefined); // 원본데이터
        const guestsData = queryDataFormater(data, 'GetGuests', 'guests', undefined); // 원본데이터
        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터
        const formatedGuestsData = guestsDataManufacture(guestsData); // 타임라인을 위해 가공된 데이터

        console.log(formatedRoomData);
        console.log(formatedGuestsData);

        return (
          <AssigTimeline
            loading={loading}
            roomData={formatedRoomData}
            guestsData={formatedGuestsData || []}
            dayPickerHook={dayPickerHook}
            setConfigMode={setConfigMode}
            defaultProps={assigDefaultProps}
            roomTypesData={roomTypesData || []}
            defaultTimeStart={defaultStartDate}
            defaultTimeEnd={defaultEndDate}
            key={`timeline${defaultStartDate}${defaultEndDate}`}
          />
        );
      }}
    </GetAllRoomTypeWithGuestQuery>
  );
};

export default EerrorProtect(AssigTimelineWrap);
