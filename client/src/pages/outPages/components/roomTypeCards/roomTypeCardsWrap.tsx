/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect } from 'react';
import { Mutation, Query } from 'react-apollo';
import RoomTypeCard from './roomTypeCard';
import { ErrProtecter, QueryDataFormater, showError } from '../../../../utils/utils';
import {
  getAllRoomType,
  getAllRoomTypeVariables,
  GuestPartInput,
  getAvailableGuestCount,
  getAvailableGuestCountVariables,
} from '../../../../types/api';
import { GET_ALL_ROOMTYPES, GET_AVAILABLE_GUEST_COUNT } from '../../../../queries';
import { IUseModal, IUseDayPicker, useSelect } from '../../../../actions/hook';
import { Gender, PricingType } from '../../../../types/apiEnum';

class GetAllAvailRoomQu extends Query<getAllRoomType, getAllRoomTypeVariables> {}
class GetAllAvailGuestCountQu extends Query<getAvailableGuestCount, getAvailableGuestCountVariables> {}

export interface IGuestCount {
  male: number;
  female: number;
  count: number;
  lastChanged: Gender;
}

interface IProps {
  houseId: string;
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
  roomInfoHook: any;
  windowWidth: any;
  toastModalHook: IUseModal;
  dayPickerHook: IUseDayPicker;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const RoomTypeCardsWrap: React.SFC<IProps> = ({
  houseId,
  resvRooms,
  roomInfoHook,
  setResvRooms,
  windowWidth,
  toastModalHook,
  dayPickerHook,
}) => {
  const [guestCountValue, setGuestCount] = useState<IGuestCount>({
    male: 0,
    female: 0,
    count: 0,
    lastChanged: Gender.MALE,
  });
  const paddingOtherGenderCount = guestCountValue.lastChanged === Gender.MALE ? guestCountValue.female : guestCountValue.male;

  return (
    <GetAllAvailRoomQu variables={{ houseId }} query={GET_ALL_ROOMTYPES}>
      {({ data: roomTypeData, loading: roomLoading, error }) => {
        showError(error);
        const roomTypes = QueryDataFormater(roomTypeData, 'GetAllRoomType', 'roomTypes', undefined);
        // TODO   여기서 먼저 Quert 를 반복해서 예약가능한 인원들을 가져와야함!!
        return roomTypes ? (
          roomTypes.map(roomType => (
            <GetAllAvailGuestCountQu
              query={GET_AVAILABLE_GUEST_COUNT}
              skip={roomType.pricingType === PricingType.DOMITORY}
              variables={{
                start: dayPickerHook.from,
                end: dayPickerHook.to,
                gender: guestCountValue.lastChanged,
                paddingOtherGenderCount,
                roomTypeId: roomType._id,
              }}
            >
              {({ data: availableData, loading: countLoading, error }) => {
                showError(error);
                const availableCount = QueryDataFormater(
                  availableData,
                  'GetAvailableGuestCount',
                  'roomCapacity',
                  undefined,
                );
                return (
                  <RoomTypeCard
                    loading={countLoading && roomLoading}
                    roomLoading={roomLoading}
                    resvRooms={resvRooms}
                    setResvRooms={setResvRooms}
                    roomTypeData={roomType}
                    roomInfoHook={roomInfoHook}
                    windowWidth={windowWidth}
                    toastModalHook={toastModalHook}
                    availableCount={availableCount}
                    setGuestCount={setGuestCount}
                    guestCountValue={guestCountValue}
                  />
                );
              }}
            </GetAllAvailGuestCountQu>
          ))
        ) : (
          <h6>해당날자엔 예약가능한 방이 없습니다.</h6>
        );
      }}
    </GetAllAvailRoomQu>
  );
};

export default ErrProtecter(RoomTypeCardsWrap);
