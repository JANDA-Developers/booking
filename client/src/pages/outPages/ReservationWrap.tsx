/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import { onError } from 'apollo-link-error';
import Reservation from './Reservation';
import { ErrProtecter } from '../../utils/utils';
import { createBooking, createBookingVariables } from '../../types/api';
import { CREATE_BOOKING } from '../../queries';

class CreatBookingMu extends Mutation<createBooking, createBookingVariables> {}

interface IProps {}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const ReservationWrap: React.SFC<IProps> = () => {
  const dayPickerHook = useDayPicker(null, null);

  const addSeasonHook = '';
  // TODO
  return (
    <CreatBookingMu Mutation={CREATE_BOOKING} onError={(error) => {}} onCompleted={(data) => {}}>
      {/*   여기다가 해당날자에 가능한 방타입들을 가져오는 쿼리를 날리는거임
    이쿼리는 State가 변경될때마다 날리게 되는거지. */}
      {createBookingMu => <Reservation createBookingMu={createBookingMu} />}
    </CreatBookingMu>
  );
};

export default ErrProtecter(ReservationWrap);
