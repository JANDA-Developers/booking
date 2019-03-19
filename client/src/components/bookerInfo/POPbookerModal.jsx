import React, { useState } from 'react';
import Modal from '../../atoms/modal/Modal';
import { useInput, useSelect } from '../../actions/hook';
import SelectBox from '../../atoms/forms/SelectBox';
import InputText from '../../atoms/forms/InputText';
import Button from '../../atoms/button/Buttons';
import DayPicker from '../dayPicker/DayPicker';

const POPbookerInfo = ({ bookerModalIsOpen, bookerInfo, bookerModalClose }) => {
  const bookerNameHook = useInput('');
  const bookerPhoneHook = useInput('');
  const bookerPrice = useInput('');
  const bookerStatueHook = useSelect('');
  const [reservationInfo, setReservationInfo] = useState([
    {
      roomTypeID: 1,
      male: 1,
      female: 1,
    },
  ]);

  const ReservationInfo = () => {
    // 예약정보
    const handleReservationInfoChange = (value, index) => {
      setReservationInfo();
    };

    return (
      <div className="flex-grid-grow">
        <SelectBox label="객실타입" onChange={handleReservationInfoChange} />
        <SelectBox label="남" onChange={handleReservationInfoChange} />
        <SelectBox label="여" onChange={handleReservationInfoChange} />
        <SelectBox label="배정된방" onChange={handleReservationInfoChange} />
      </div>
    );
  };

  const bookerStatueOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <Modal
      style={{
        content: {
          maxWidth: '800px',
        },
      }}
      isOpen={bookerModalIsOpen}
      onRequestClose={bookerModalClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <InputText {...bookerNameHook} label="예약자" />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <InputText {...bookerPhoneHook} label="전화번호" />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <DayPicker input label="input" isRange label="예약날자" />
        </div>
        <div className="JD-z-index-1 flex-grid__col col--full-6 col--lg-6 col--md-6">
          <SelectBox {...bookerStatueHook} options={bookerStatueOptions} label="예약상태" />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <InputText {...bookerPrice} label="이용금액" />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <ReservationInfo reservationInfo={reservationInfo} />
        </div>
        <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
          <InputText textarea label="예약메모" />
        </div>
      </div>
      <div className="ReactModal__EndSection">
        <Button label="닫기" mode="flat" onClick={bookerModalClose} />
        <Button label="수정하기" mode="flat" onClick={bookerModalClose} />
        <Button label="예약취소" mode="flat" onClick={bookerModalClose} />
        <Button label="예약삭제" mode="flat" onClick={bookerModalClose} />
      </div>
    </Modal>
  );
};
export default POPbookerInfo;
