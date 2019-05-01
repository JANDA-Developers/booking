/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect } from 'react';
import { Mutation, Query } from 'react-apollo';
import RoomTypeCard from './roomTypeCard';
import { ErrProtecter, QueryDataFormater, showError } from '../../../../utils/utils';
import { getAllRoomType, getAllRoomTypeVariables, GuestPartInput } from '../../../../types/api';
import { GET_ALL_ROOMTYPES } from '../../../../queries';
import Preloader from '../../../../atoms/preloader/Preloader';
import { IUseModal } from '../../../../actions/hook';

class GetAllAvailRoomQu extends Query<getAllRoomType, getAllRoomTypeVariables> {}

interface IProps {
  houseId: string;
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
  roomInfoHook: any;
  windowWidth: any;
  toastModalHook: IUseModal;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const RoomTypeCardsWrap: React.SFC<IProps> = ({
  houseId,
  resvRooms,
  roomInfoHook,
  setResvRooms,
  windowWidth,
  toastModalHook,
}) => {
  const addSeasonHook = '';

  return (
    <GetAllAvailRoomQu variables={{ houseId }} query={GET_ALL_ROOMTYPES}>
      {({ data: roomTypeData, loading: roomLoading, error }) => {
        showError(error);
        const roomTypes = QueryDataFormater(roomTypeData, 'GetAllRoomType', 'roomTypes', undefined);
        // TODO   여기서 먼저 Quert 를 반복해서 예약가능한 인원들을 가져와야함!!
        return roomTypes ? (
          roomTypes.map(roomType => (
            <RoomTypeCard
              roomLoading={roomLoading}
              resvRooms={resvRooms}
              setResvRooms={setResvRooms}
              roomTypeData={roomType}
              roomInfoHook={roomInfoHook}
              windowWidth={windowWidth}
              toastModalHook={toastModalHook}
            />
          ))
        ) : (
          <h6>해당날자엔 예약가능한 방이 없습니다.</h6>
        );
      }}
    </GetAllAvailRoomQu>
  );
};

export default ErrProtecter(RoomTypeCardsWrap);
