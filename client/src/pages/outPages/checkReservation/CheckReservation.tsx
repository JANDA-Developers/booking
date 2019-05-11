import React from 'react';
import { WindowSizeProps } from 'react-window-size';
import { ReactTableDefaults } from 'react-table';
import { MutationFn } from 'react-apollo';
import ErrProtecter from '../../../utils/ErrProtecter';
import './CheckReservation.scss';
import {
  createBooking, createBookingVariables, GuestPartInput, BookerInput,
} from '../../../types/api';
import InputText from '../../../atoms/forms/inputText/InputText';
import Button from '../../../atoms/button/Button';
import JDtable from '../../../atoms/table/Table';

export interface ISetBookerInfo extends React.Dispatch<React.SetStateAction<BookerInput>> {}

interface IProps extends WindowSizeProps {
  createBookingMu: MutationFn<createBooking, createBookingVariables>;
  houseId: string;
}

const SetPrice: React.SFC<IProps | any> = ({
  windowWidth, windowHeight, createBookingMu, houseId,
}) => {
  const TableColumns = [
    {
      Header: '숙박일',
      accessor: 'day',
    },
    {
      Header: '객실/인원',
      accessor: 'person',
    },
    {
      Header: '이용금액',
      accessor: 'price',
    },
    {
      Header: '상태',
      accessor: 'statue',
    },
  ];

  return (
    <div id="JDreservation" className="JDreservation">
      <h6>예약정보</h6>
      <div className="flex-grid-grow">
        <InputText label="이름" />
        <InputText label="연락처" />
        <InputText label="비밀번호" />
      </div>
      <div className="JDtext-align-center">
        <Button label="예약조회" />
      </div>
      <h6>예약확인</h6>
      <JDtable {...ReactTableDefaults} minRows={1} columns={TableColumns} />
    </div>
  );
};

export default ErrProtecter(SetPrice);
