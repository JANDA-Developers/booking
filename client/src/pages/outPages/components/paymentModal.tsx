import classNames from 'classnames';
import React from 'react';
import JDmodal from '../../../atoms/modal/Modal';
import { IUseModal, useSelect } from '../../../actions/hook';
import JDselect from '../../../atoms/forms/SelectBox';
import Button from '../../../atoms/button/Button';
import BookerInfoBox from './bookerInfoBox';
import { BookerInput } from '../../../types/api';
import { ISetBookerInfo } from '../reservation/Reservation';

interface IProps {
  className?: string;
  modalHook: IUseModal;
  bookerInfo: BookerInput;
  setBookerInfo: ISetBookerInfo;
  bookingCompleteFn(): void;
}

const PayMentModal: React.SFC<IProps> = ({
  className, modalHook, bookerInfo, setBookerInfo, bookingCompleteFn,
}) => {
  const classes = classNames('paymentModal', className, {});
  const payMethodHook = useSelect({ value: 'chocolate', label: 'Chocolate' });
  // TODO :페이메소드 enum으로 대체
  const selectDummyOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  // pay 한후 request 받아서 진행
  const onPayRequest = () => {
    bookingCompleteFn();
  };
  return (
    <JDmodal className={classes} {...modalHook}>
      <div>
        <h6 className="JDreservation__sectionTitle">③ 결제 정보 입력</h6>
        <div>
          <div>
            <JDselect {...payMethodHook} options={selectDummyOptions} label="결제수단" />
          </div>
          <BookerInfoBox bookerInfo={bookerInfo} setBookerInfo={setBookerInfo} />
        </div>
        <div className="JDmodal__endSection">
          <Button thema="primary" flat onClick={onPayRequest} label="결제하기" mode="long" />
        </div>
      </div>
    </JDmodal>
  );
};

export default PayMentModal;
