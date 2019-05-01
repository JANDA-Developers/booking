/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react';
import url from 'url';
import { Mutation, Query } from 'react-apollo';
import { Redirect } from 'react-router';
import Reservation from './Reservation';
import {
  ErrProtecter, QueryDataFormater, showError, onError, onCompletedMessage,
} from '../../../utils/utils';
import {
  createBooking, createBookingVariables, getAllRoomType, getAllRoomTypeVariables,
} from '../../../types/api';
import { CREATE_BOOKING, GET_ALL_ROOMTYPES } from '../../../queries';

class CreatBookingMu extends Mutation<createBooking, createBookingVariables> {}
class GetAllAvailRoomQu extends Query<getAllRoomType, getAllRoomTypeVariables> {}

interface IProps {
  houseId: string;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const ReservationWrap: React.SFC<IProps> = ({ houseId }) => {
  const addSeasonHook = '';
  // TODO

  /* 아직 가져오는 api가없음 여기다가 해당날자에 가능한 방타입들을 가져오는 쿼리를 날리는거임
 쿼리 ⛔️아직 없음 */

  return (
    <CreatBookingMu
      onError={onError}
      onCompleted={({ CreateBooking }) => {
        onCompletedMessage(CreateBooking, '예약완료', '예약실패');
        // Redirect 는 IFram 이 밖에 있어야가능하므로 일단생략
      }}
      mutation={CREATE_BOOKING}
    >
      {createBookingMu => <Reservation houseId="5cb1a8abcc8ef91ca45ab02b" createBookingMu={createBookingMu} />}
    </CreatBookingMu>
  );
};

export default ErrProtecter(ReservationWrap);

// 🚁 iFrame 에서 상위페이지를 Redirect 하는 방법 [https://help.surveygizmo.com/help/break-out-of-iframe];
