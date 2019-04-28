import React from 'react';
import BookerModal from './BookerModal';
import { IUseModal } from '../../actions/hook';

interface IProps {
  modalHook: IUseModal;
}
// class GetHouseQuery extends Query<getHouse, getHouseVariables> {}

// 🆔 음 여기서 예약 변동 가능 범위를 받아야할것 같은뎅?
// 🆔 여기서 쿼리로 북커 인포를 받아야함
// 🆔 예약삭제 뮤테이션
// 🆔 예약변경 뮤테이션
// 🆔 예약생성 뮤테이션
const BookerModalWrap: React.FC<IProps> = ({ modalHook }) => <BookerModal modalHook={modalHook} />;

export default BookerModalWrap;
