import React, { useState } from 'react';
import Modal from '../../atoms/modal/Modal';
import {
  useInput, useSelect, IUseModal, useDayPicker,
} from '../../actions/hook';
import SelectBox from '../../atoms/forms/SelectBox';
import InputText from '../../atoms/forms/InputText';
import Button from '../../atoms/button/Button';
import RoomSelectInfoTable from './components/roomSelectInfoTable';
import JDdayPicker from '../dayPicker/DayPicker';

interface IProps {
  modalHook: IUseModal;
  bookerInfo?: any;
}

// ❕ 어차피 버튼 눌러서 수정할거니까 전부 STATE 에 하면됨
const POPbookerInfo: React.FC<IProps> = ({ modalHook, bookerInfo }) => {
  const bookerNameHook = useInput('');
  const bookerPhoneHook = useInput('');
  const bookerStatueHook = useSelect('');
  const resvDateHook = useDayPicker(null, null);
  const [reservationInfo, setReservationInfo] = useState<any>([
    {
      roomTypeID: 1,
      male: 1,
      female: 1,
      price:'',
    },
  ]);

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
      isOpen={modalHook.isOpen}
      onRequestClose={modalHook.closeModal}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <InputText {...bookerNameHook} label="예약자" />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
          <InputText {...bookerPhoneHook} label="전화번호" icon="sms" />
        </div>
        <div className="JD-z-index-1 flex-grid__col col--full-6 col--lg-6 col--md-6">
          <SelectBox {...bookerStatueHook} options={bookerStatueOptions} label="예약상태" />
        </div>
        <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
          <InputText textarea label="예약메모" />
        </div>
      </div>
      <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
        <JDdayPicker {...resvDateHook} input isRange label="예약날자" />
      </div>
      <div className="flex-grid__col col--full-6 col--lg-6 col--md-6">
        <RoomSelectInfoTable />
      </div>
      <div className="JDmodal__endSection">
        <Button label="닫기" mode="flat" onClick={modalHook.closeModal} />
        <Button label="수정하기" thema="warn" mode="flat" onClick={modalHook.closeModal} />
        <Button label="예약취소" mode="flat" onClick={bookerModalClose} />
        <Button label="예약삭제" thema="warn" mode="flat" onClick={bookerModalClose} />
      </div>
    </Modal>
  );
};
export default POPbookerInfo;
