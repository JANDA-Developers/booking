/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import { string } from 'prop-types';
import {
  getAllRoomType,
  getAllRoomTypeVariables,
  deleteRoomPrice_DeleteRoomPrice,
  getGuests,
  getGuestsVariables,
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables,
} from '../../../../types/api';
import { useToggle, useDayPicker } from '../../../../actions/hook';
import AssigTimeline from './AssigTimeline';
import { assigDefaultProps } from '../timelineConfig';
import { IRoomType, IGuests } from '../../../../types/interface';
import {
  isEmpty, showError, QueryDataFormater, setMidNight,
} from '../../../../utils/utils';
import { GET_ALL_ROOMTYPES, GET_ALL_ROOMTYPES_WITH_GUESTS } from '../../../../queries';
import EerrorProtect from '../../../../utils/ErrProtecter';
import { PricingType, Gender } from '../../../../types/apiEnum';
import { setMyForm } from '../../../../utils/setMidNight';

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

  const guestsDataManufacture = (guestsData: IGuests[] | null | undefined = []) => {
    const alloCateItems: IAssigItem[] = [];
    if (!guestsData) return alloCateItems;

    guestsData.forEach((guestData) => {
        const isDomitory = guestData.pricingType === PricingType.ROOM;

        // ⭐️임의방배정
        // 아이템에는 배정확정 버튼이있다.
        // 임의 방배정된 사람들은 자유롭게 이동할수있다.
        // 자유롭게 이동하되 이동할수 없는 방으로 갈경우네는 빨간 표시가된다.
        // 배정확정 버튼이 필요한 이유:: 백엔드 에서 예약가능 인원을 계산할떄
        // 배정된 화면을 기반으로 하기때문에 배정확정이 필요하다.
        // 🌈 임의배정 연한회색 || 배정확정: 파란색 || 배정 불가 붉은색 || 체크인 === 아이콘
        // 배정확정에 관해서는 말로 설명하는게 옳다.

        if(guestData && guestData.booking) {
          alloCateItems.push({
            id: guestData._id,
            name: guestData.name,
            bookerId: guestData.booking.booker._id,
            isCheckin: guestData.booking.booker.isCheckIn,
            gender: guestData.gender,
            roomTypeId: guestData.roomType._id,
            // group: guestData.allocatedRoom._id + guestData.bedIndex;
            // temp: guestData.temp // 임시방배정
            start: moment(guestData.start).valueOf(),
            end: moment(guestData.end).valueOf(),
          });
        }
    });
    return alloCateItems;
  };

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

  //  TODO Query 하나로하자 위커리가 아래쿼리 변수로 쓰이지 않는이상 상관없어.

  return (
    <GetAllRoomTypeWithGuestQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES_WITH_GUESTS}
      variables={{ houseId, start: queryStartDate, end: queryEndDate }}
    >
      {({ data: roomData, loading, error }) => {
        showError(error);
        const roomTypesData = QueryDataFormater(roomData, 'GetAllRoomType', 'roomTypes', undefined); // 원본데이터
        const guestsData = QueryDataFormater(roomData, 'GetGuests', 'guests', undefined); // 원본데이터
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
          />
        );
      }}
    </GetAllRoomTypeWithGuestQuery>
  );
};

export default EerrorProtect(AssigTimelineWrap);
