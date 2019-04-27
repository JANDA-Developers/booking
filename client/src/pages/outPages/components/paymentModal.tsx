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
}

const PayMentModal: React.SFC<IProps> = ({
  className, modalHook, bookerInfo, setBookerInfo,
}) => {
  const classes = classNames('paymentModal', className, {});
  const payMethod = useSelect({ value: 'chocolate', label: 'Chocolate' });
  // TODO :페이메소드 enum으로 대체
  const selectDummyOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const onPayRequest = () => {};
  return (
    <JDmodal className={classes} {...modalHook}>
      <div>
        <h6 className="JDreservation__sectionTitle">③ 결제 정보 입력</h6>
        <div>
          <div>
            <JDselect {...payMethod} mode="small" options={selectDummyOptions} label="결제수단" />
          </div>
          <BookerInfoBox bookerInfo={bookerInfo} setBookerInfo={setBookerInfo} />
        </div>
        <div className="JDmodal__endSection">
          <Button flat onClick={onPayRequest} label="결제완료" mode="long" />
        </div>
      </div>
    </JDmodal>
  );
};

export default PayMentModal;
