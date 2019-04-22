import React, { useState } from 'react';
import windowSize, { WindowSizeProps } from 'react-window-size';
import ErrProtecter from '../../utils/ErrProtecter';
import JDdayPicker from '../../components/dayPicker/DayPicker';
import PaymentModal from './components/paymentModal';
import RoomTypeCard from './components/roomTypeCard';
import { useDayPicker } from '../../actions/hook';
import './Reservation.scss';
import Button from '../../atoms/button/Button';
import Card from '../../atoms/cards/Card';
import {
  createBooking, createBookingVariables, GuestPartInput, BookerInput,
} from '../../types/api';

interface IProps extends WindowSizeProps {
  createBookingMu: MutationFn<createBooking, createBookingVariables>;
}

const SetPrice: React.SFC<IProps> = ({
  windowWidth, windowHeight, createBookingMu, houseId,
}) => {
  const defaultBookerInfo = {
    house: houseId,
    name: '',
    password: '',
    phoneNumber: '',
    agreePrivacyPolicy: false,
  };
  const [resvRooms, setResvRooms] = useState<GuestPartInput[]>([]);
  const [bookerInfo, setBookerInfo] = useState<BookerInput>(defaultBookerInfo);

  return (
    <div id="JDreservation" className="JDreservation">
      <div className="flex-grid">
        <div className="flex-grid__col col--full-4 col--wmd-12">
          <Card>
            {/* change 될때마다 resvRooms를 초기화 해주어야함 */}
            <JDdayPicker {...dayPickerHook} horizen={windowWidth < 750} onChange={() => {}} />
          </Card>
        </div>
        <div className="flex-grid__col col--full-8 col--wmd-12">
          <Card>
            {/* roomTypes들의 반복문을 통해서 만들고 해당 정보는 resvRooms 에서 filter를 통해서 가져와야함 */}
            <RoomTypeCard setResvRooms={setResvRooms} resvRooms={resvRooms} />
          </Card>
          <Button label="예약하기" />
        </div>
        {/* <PaymentModal /> */}
      </div>
    </div>
  );
};

export default ErrProtecter(windowSize(SetPrice));
