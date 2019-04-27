/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import CheckReservation from './CheckReservation';
import { ErrProtecter } from '../../../utils/utils';
import { createBooking, createBookingVariables } from '../../../types/api';
import { CREATE_BOOKING } from '../../../queries';

class CreatBookingMu extends Mutation<createBooking, createBookingVariables> {}

interface IProps {}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const CheckReservationWrap: React.SFC<IProps> = () => {
  const addSeasonHook = '';
  // TODO

  /* 아직 가져오는 api가없음 여기다가 해당날자에 가능한 방타입들을 가져오는 쿼리를 날리는거임
 쿼리 ⛔️아직 없음 */

  return (
    <CreatBookingMu mutation={CREATE_BOOKING}>
      {createBookingMu => <CheckReservation houseId="" createBookingMu={createBookingMu} />}
    </CreatBookingMu>
  );
};

export default ErrProtecter(CheckReservationWrap);
