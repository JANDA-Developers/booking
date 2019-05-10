/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import { getAllRoomTypeWithGuest, getAllRoomTypeWithGuestVariables } from '../../../../types/api';
import { useToggle, useDayPicker } from '../../../../actions/hook';
import { IRoomType, IGuests } from '../../../../types/interface';
import {
  isEmpty, setMidNight, showError, QueryDataFormater,
} from '../../../../utils/utils';
import EerrorProtect from '../../../../utils/ErrProtecter';
import { PricingType, Gender } from '../../../../types/enum';
import { GET_ALL_ROOMTYPES_WITH_GUESTS } from '../../../../queries';
import AssigTimeline from './AssigTimeline';
import { assigDefaultProps } from '../timelineConfig';
import { setYYYYMMDD } from '../../../../utils/setMidNight';

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

      // ⭐️임의방배정
      // 아이템에는 배정확정 버튼이있다.
      // 임의 방배정된 사람들은 자유롭게 이동할수있다.
      // 자유롭게 이동하되 이동할수 없는 방으로 갈경우네는 빨간 표시가된다.
      // 배정확정 버튼이 필요한 이유:: 백엔드 에서 예약가능 인원을 계산할떄
      // 배정된 화면을 기반으로 하기때문에 배정확정이 필요하다.
      // 🌈 임의배정 연한회색 || 배정확정: 파란색 || 배정 불가 붉은색 || 체크인 === 아이콘
      // 배정확정에 관해서는 말로 설명하는게 옳다.

      // 👿 애초에 null 이 아니여야하는거 아님?

      if (guestData && guestData.booking && guestData.roomType && guestData.allocatedRoom) {
        alloCateItems.push({
          id: guestData._id,
          name: guestData.name,
          bookerId: guestData.booking.booker._id,
          isCheckin: guestData.booking.booker.isCheckIn,
          gender: guestData.gender,
          roomTypeId: guestData.roomType._id,
          group: guestData.allocatedRoom._id + 0,
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
    const roomGroups: IGroup[] = [];

    if (!roomTypeDatas) return roomGroups;

    roomTypeDatas.map((roomTypeData) => {
      // 우선 방들을 원하는 폼으로 변환

      const { rooms } = roomTypeData;

      // 빈방타입 제외
      if (!isEmpty(rooms)) {
        // 🏠 방타입일 경우
        if (roomTypeData.pricingType === 'ROOM') {
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
        if (roomTypeData.pricingType === 'DOMITORY') {
          rooms.map((room) => {
            for (let i = 0; roomTypeData.peopleCount > i; i += 1) {
              roomGroups.push({
                id: room._id + i,
                title: room.name,
                roomTypeId: roomTypeData._id,
                roomTypeIndex: roomTypeData.index,
                roomIndex: room.index,
                roomType: roomTypeData,
                roomId: room._id,
                placeIndex: i + 1,
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
        const roomTypesData = QueryDataFormater(data, 'GetAllRoomType', 'roomTypes', undefined); // 원본데이터
        const guestsData = QueryDataFormater(data, 'GetGuests', 'guests', undefined); // 원본데이터
        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터
        const formatedGuestsData = guestsDataManufacture(guestsData); // 타임라인을 위해 가공된 데이터

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
            key={`defaultTime${defaultStartDate}${defaultEndDate}`}
          />
        );
      }}
    </GetAllRoomTypeWithGuestQuery>
  );
};

export default EerrorProtect(AssigTimelineWrap);
