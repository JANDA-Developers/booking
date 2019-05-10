/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect } from 'react';
import { Mutation, Query } from 'react-apollo';
import RoomTypeCard from './roomTypeCard';
import {
  ErrProtecter, QueryDataFormater, showError, isEmpty,
} from '../../../../utils/utils';
import { GuestPartInput, getAvailableGuestCount, getAvailableGuestCountVariables } from '../../../../types/api';
import { GET_ALL_ROOMTYPES, GET_AVAILABLE_GUEST_COUNT } from '../../../../queries';
import { IUseModal, IUseDayPicker, useSelect } from '../../../../actions/hook';
import { setYYYYMMDD } from '../../../../utils/setMidNight';
import { IRoomType } from '../../../../types/interface';

class GetAvailGuestCountQu extends Query<getAvailableGuestCount, getAvailableGuestCountVariables> {}

export interface IGuestCount {
  male: number;
  female: number;
  room: number;
}

interface IProps {
  houseId: string;
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
  roomInfoHook: any;
  windowWidth: any;
  toastModalHook: IUseModal;
  dayPickerHook: IUseDayPicker;
  roomTypeData: IRoomType;
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
  roomTypeData,
}) => {
  const [guestCountValue, setGuestCount] = useState<IGuestCount>({
    male: 0,
    female: 0,
    room: 0,
  });

  return (
    <GetAvailGuestCountQu
      query={GET_AVAILABLE_GUEST_COUNT}
      // fetchPolicy="network-only"
      // skip={roomType.pricingType === PricingType.DOMITORY}
      variables={{
        start: setYYYYMMDD(dayPickerHook.from),
        end: setYYYYMMDD(dayPickerHook.to),
        femalePadding: guestCountValue.female,
        malePadding: guestCountValue.male,
        roomTypeId: roomTypeData._id,
      }}
    >
      {({ data: availableData, loading: countLoading, error }) => {
        showError(error);
        const maleCount = QueryDataFormater(availableData, 'GetMale', 'roomCapacity', undefined);
        const femaleCount = QueryDataFormater(availableData, 'GetFemale', 'roomCapacity', undefined);
        const availableCount = {
          maleCount,
          femaleCount,
        };
        return (
          <RoomTypeCard
            resvRooms={resvRooms}
            setResvRooms={setResvRooms}
            roomTypeData={roomTypeData}
            roomInfoHook={roomInfoHook}
            windowWidth={windowWidth}
            toastModalHook={toastModalHook}
            availableCount={availableCount}
            setGuestCount={setGuestCount}
            guestCountValue={guestCountValue}
          />
        );
      }}
    </GetAvailGuestCountQu>
  );
};

export default ErrProtecter(RoomTypeCardsWrap);
