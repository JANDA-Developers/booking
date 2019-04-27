import React, { useState } from 'react';
import windowSize, { WindowSizeProps } from 'react-window-size';
import { MutationFn } from 'react-apollo';
import ErrProtecter from '../../../utils/ErrProtecter';
import JDdayPicker from '../../../components/dayPicker/DayPicker';
import RoomTypeCard from '../components/roomTypeCard';
import { useDayPicker, useModal2 } from '../../../actions/hook';
import './Reservation.scss';
import Button from '../../../atoms/button/Button';
import Card from '../../../atoms/cards/Card';
import {
  createBooking, createBookingVariables, GuestPartInput, BookerInput,
} from '../../../types/api';
import RoomSelectInfo from '../components/roomSelectInfo';
import PayMentModal from '../components/paymentModal';

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
  const dayPickerHook = useDayPicker(null, null);
  const [resvRooms, setResvRooms] = useState<GuestPartInput[]>([]);
  const [bookerInfo, setBookerInfo] = useState<BookerInput>(defaultBookerInfo);
  const rsevModalHook = useModal2(false);

  return (
    <div id="JDreservation" className="JDreservation">
      <div className="flex-grid">
        <div className="flex-grid__col col--full-4 col--lg-5 col--wmd-12">
          <Card className="JDreservation__card JDreservation__dayPickerCard">
            <h6 className="JDreservation__sectionTitle">① 예약날자 선택</h6>
            {/* TODO: change 될때마다 resvRooms를 초기화 해주어야함 */}
            <JDdayPicker maxLimit={false} {...dayPickerHook} horizen={windowWidth < 750} onChange={() => {}} />
          </Card>
        </div>
        <div className="flex-grid__col col--full-8 col--lg-7 col--wmd-12">
          <Card className="JDreservation__card">
            <h6 className="JDreservation__sectionTitle">② 방 선택</h6>
            {/* TODO: roomTypes들의 반복문을 통해서 만들고 해당 정보는 resvRooms 에서 filter를 통해서 가져와야함 */}
            <RoomTypeCard setResvRooms={setResvRooms} resvRooms={resvRooms} />
          </Card>
          <Card className="JDreservation__card">
            <h6 className="JDreservation__sectionTitle"> 선택 확인</h6>
            <RoomSelectInfo />
          </Card>
          <Button onClick={rsevModalHook.openModal} label="예약하기" mode="long" />
        </div>
        {/* <PaymentModal /> */}
      </div>
      <PayMentModal bookerInfo={bookerInfo} setBookerInfo={setBookerInfo} modalHook={rsevModalHook} />
    </div>
  );
};

export default windowSize(ErrProtecter(SetPrice));
