import React from 'react';
import { WindowSizeProps } from 'react-window-size';
import { MutationFn } from 'react-apollo';
import ErrProtecter from '../../../utils/ErrProtecter';
import './CheckReservation.scss';
import {
  createBooking, createBookingVariables, GuestPartInput, BookerInput,
} from '../../../types/api';

export interface ISetBookerInfo extends React.Dispatch<React.SetStateAction<BookerInput>> {}

interface IProps extends WindowSizeProps {
  createBookingMu: MutationFn<createBooking, createBookingVariables>;
  houseId: string;
}

const SetPrice: React.SFC<IProps | any> = ({
  windowWidth, windowHeight, createBookingMu, houseId,
}) => {
  const defaultBookerInfo = {
    house: houseId,
    name: '',
    password: '',
    memo: '',
    phoneNumber: '',
    agreePrivacyPolicy: false,
  };

  return <div id="JDreservation" className="JDreservation" />;
};

export default ErrProtecter(SetPrice);
