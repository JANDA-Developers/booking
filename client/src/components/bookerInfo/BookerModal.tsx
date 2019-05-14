import React, { useState } from 'react';
import moment from 'moment';
import Modal from '../../atoms/modal/Modal';
import {
  useInput, useSelect, IUseModal, useDayPicker,
} from '../../actions/hook';
import SelectBox from '../../atoms/forms/selectBox/SelectBox';
import InputText from '../../atoms/forms/inputText/InputText';
import Button from '../../atoms/button/Button';
import RoomSelectInfoTable from './components/roomSelectInfoTable';
import JDdayPicker from '../../atoms/dayPicker/DayPicker';
import {
  BOOKING_STATUS_OP, PAYMENT_STATUS_OP, PAYMETHOD_OP, PricingType,
} from '../../types/enum';
import './BookerModal.scss';
import { GB_booker, IResvCount } from '../../types/interface';
import { bookingStatuMerge, bookingGuestsMerge, bookingPriceMerge } from '../../utils/booking';
import { isEmpty } from '../../utils/utils';

export interface IroomSelectInfoTable {
  roomTypeId: string;
  roomTypeName: string;
  count: IResvCount;
  pricingType: PricingType;
}

interface IProps {
  modalHook: IUseModal;
  bookerData: GB_booker;
}

// ❕ 어차피 버튼 눌러서 수정할거니까 전부 STATE 에 하면됨
const POPbookerInfo: React.FC<IProps> = ({ modalHook, bookerData }) => {
  // 모달 훅안에 id 를 기반으로 default Value들을 찾아내고
  // key를 이용해서 초기화하면됨
  const bookerNameHook = useInput(bookerData.name);
  const bookerPhoneHook = useInput(bookerData.phoneNumber);
  const bookerStatueHook = useSelect(
    BOOKING_STATUS_OP.find(op => op.value === bookingStatuMerge(bookerData.bookings)) || null,
  );
  const defaultBookings = bookerData.bookings || [];
  const resvDateHook = useDayPicker(
    defaultBookings[0] ? moment(defaultBookings[0].start).toDate() : null,
    defaultBookings[0] ? moment(defaultBookings[0].end).toDate() : null,
  );

  console.log('booking.guests');
  console.log(defaultBookings);
  const defaultFormat: IroomSelectInfoTable[] = defaultBookings.map(booking => ({
    roomTypeId: booking._id,
    roomTypeName: booking.roomType.name,
    count: {
      male: bookingGuestsMerge(booking.guests).male,
      female: bookingGuestsMerge(booking.guests).female,
      roomCount: booking.guestCount,
    },
    pricingType: booking.roomType.pricingType,
  }));

  return (
    <Modal
      style={{
        content: {
          maxWidth: '30rem',
        },
      }}
      {...modalHook}
      className="Modal bookerModal"
      overlayClassName="Overlay"
    >
      <div className="modal__section">
        <h6>예약자정보</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <InputText {...bookerNameHook} label="예약자" />
          </div>
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <InputText {...bookerPhoneHook} label="전화번호" icon="sms" />
          </div>
          <div className="JD-z-index-1 flex-grid__col col--full-4 col--lg-4 col--md-4">
            <SelectBox {...bookerStatueHook} options={BOOKING_STATUS_OP} label="예약상태" />
          </div>
          <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
            <InputText halfHeight textarea label="예약메모" />
          </div>
        </div>
      </div>
      <div className="modal__section">
        <h6>예약정보</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-8 col--lg-8 col--md-8">
            <JDdayPicker canSelectBeforeDays={false} {...resvDateHook} input label="숙박일자" />
          </div>
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <InputText readOnly value="2018-03-24" label="예약일시" />
          </div>
          <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
            <RoomSelectInfoTable resvInfo={defaultFormat} />
          </div>
        </div>
      </div>
      <div className="JDz-index-1 modal__section">
        <h6>결제정보</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <InputText label="총금액" />
          </div>
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <SelectBox options={PAYMETHOD_OP} label="결제수단" />
          </div>
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <SelectBox options={PAYMENT_STATUS_OP} label="결제상태" />
          </div>
        </div>
      </div>
      <div className="JDmodal__endSection">
        <Button size="small" label="수정하기" thema="primary" mode="flat" onClick={modalHook.closeModal} />
        <Button size="small" label="예약삭제" thema="warn" mode="flat" onClick={modalHook.closeModal} />
        <Button size="small" label="닫기" mode="flat" thema="grey" onClick={modalHook.closeModal} />
      </div>
    </Modal>
  );
};
export default POPbookerInfo;
