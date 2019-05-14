import React from 'react';
import { Query } from 'react-apollo';
import BookerModal from './BookerModal';
import { IUseModal } from '../../actions/hook';
import { getBooker, getBookerVariables } from '../../types/api';
import { queryDataFormater, showError } from '../../utils/utils';
import { GB_booker } from '../../types/interface';
import Preloader from '../../atoms/preloader/Preloader';
import { GET_BOOKER } from '../../queries';

interface IProps {
  modalHook: IUseModal;
}
// class GetHouseQuery extends Query<getHouse, getHouseVariables> {}

class GetBookerQuery extends Query<getBooker, getBookerVariables> {}

// 🆔 음 여기서 예약 변동 가능 범위를 받아야할것 같은뎅?
// 🆔 여기서 쿼리로 북커 인포를 받아야함
// 🆔 예약삭제 뮤테이션
// 🆔 예약변경 뮤테이션
// 🆔 예약생성 뮤테이션

const BookerModalWrap: React.FC<IProps> = ({ modalHook }) => (
  <GetBookerQuery
    query={GET_BOOKER}
    skip={!modalHook.info.bookerId}
    variables={{
      bookerId: modalHook.info.bookerId,
    }}
  >
    {({ data: bookerData, loading, error }) => {
      showError(error);
      const booker = queryDataFormater(bookerData, 'GetBooker', 'booker', undefined);
      const defualtBooker: GB_booker = {
        __typename: 'Booker',
        _id: 'default',
        bookings: [],
        memo: '',
        createdAt: '',
        updatedAt: '',
        name: '',
        phoneNumber: '',
      };
      return loading ? (
        <Preloader size="large" />
      ) : (
        <BookerModal bookerData={booker || defualtBooker} modalHook={modalHook} />
      );
    }}
  </GetBookerQuery>
);

export default BookerModalWrap;
