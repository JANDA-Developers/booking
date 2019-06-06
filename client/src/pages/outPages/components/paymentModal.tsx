import classNames from "classnames";
import React from "react";
import JDmodal from "../../../atoms/modal/Modal";
import {IUseModal, useSelect} from "../../../actions/hook";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../atoms/button/Button";
import BookingInfoBox from "./bookerInfoBox";
import {BookerInput} from "../../../types/api";
import {ISetBookingInfo} from "../reservation/Reservation";
import {PAYMETHOD_FOR_BOOKER_OP} from "../../../types/enum";

interface IProps {
  className?: string;
  modalHook: IUseModal;
  bookingInfo: BookerInput;
  setBookingInfo: ISetBookingInfo;
  bookingCompleteFn(): void;
}

const PayMentModal: React.SFC<IProps> = ({
  className,
  modalHook,
  bookingInfo,
  setBookingInfo,
  bookingCompleteFn
}) => {
  const classes = classNames("paymentModal", className, {});
  const payMethodHook = useSelect(PAYMETHOD_FOR_BOOKER_OP[0]);

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
            <JDselect
              {...payMethodHook}
              options={PAYMETHOD_FOR_BOOKER_OP}
              label="결제수단"
            />
          </div>
          <BookingInfoBox
            bookingInfo={bookingInfo}
            setBookingInfo={setBookingInfo}
          />
        </div>
        <div className="JDmodal__endSection">
          <Button
            thema="primary"
            flat
            onClick={onPayRequest}
            label="결제하기"
            mode="long"
          />
        </div>
      </div>
    </JDmodal>
  );
};

export default PayMentModal;
