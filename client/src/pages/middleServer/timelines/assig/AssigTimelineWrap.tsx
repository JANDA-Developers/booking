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
import { PricingType } from '../../../../types/apiEnum';
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
  roomId: string;
  start: number;
  end: number;
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
      // 배정된 경우
      if (guestData.allocatedRoom) {
        //  TODO
        //  배정생기면 여기서처리
        // 👿 이거는 널이면 안되지 애초에
      } else if (guestData.booking && guestData.roomType) {
        // 배정안된 경우
        alloCateItems.push({
          id: guestData._id,
          name: guestData.name,
          bookerId: guestData.booking.booker._id,
          isCheckin: guestData.booking.booker.isCheckIn,
          roomId: guestData.roomType._id,
          start: setMyForm(guestData.start),
          end: setMyForm(guestData.end),
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
