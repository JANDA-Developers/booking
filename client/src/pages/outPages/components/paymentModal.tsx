import classNames from "classnames";
import React from "react";
import JDmodal from "../../../atoms/modal/Modal";
import {IUseModal, useSelect} from "../../../actions/hook";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../atoms/button/Button";
import BookingInfoBox from "./bookerInfoBox";
import {BookerInput} from "../../../types/api";
import {ISetBookingInfo} from "../reservation/Reservation";
import {
  PAYMETHOD_FOR_BOOKER_OP,
  PAYMETHOD_FOR_HOST_OP
} from "../../../types/enum";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import Preloader from "../../../atoms/preloader/Preloader";

interface IProps {
  className?: string;
  modalHook: IUseModal;
  bookingInfo: BookerInput;
  setBookingInfo: ISetBookingInfo;
  createLoading: boolean;
  bookingCompleteFn(): void;
  isAdmin: boolean;
  sendSmsHook: {
    checked: boolean;
    onChange: (value: boolean) => void;
  };
}

const PayMentModal: React.SFC<IProps> = ({
  className,
  modalHook,
  bookingInfo,
  setBookingInfo,
  bookingCompleteFn,
  createLoading,
  sendSmsHook,
  isAdmin
}) => {
  const classes = classNames("paymentModal", className, {});
  const payMethodHook = useSelect(
    isAdmin ? PAYMETHOD_FOR_BOOKER_OP[0] : PAYMETHOD_FOR_HOST_OP[0]
  );

  // pay 한후 request 받아서 진행
  const onPayRequest = () => {
    bookingCompleteFn();
  };
  return (
    <JDmodal className={classes} {...modalHook}>
      <Preloader size={"large"} loading={createLoading} />
      {createLoading || (
        <div>
          <h6 className="JDreservation__sectionTitle">③ 결제 정보 입력</h6>
          <div>
            <div>
              <JDselect
                {...payMethodHook}
                options={
                  isAdmin ? PAYMETHOD_FOR_HOST_OP : PAYMETHOD_FOR_BOOKER_OP
                }
                label="결제수단"
              />
            </div>
            <BookingInfoBox
              bookingInfo={bookingInfo}
              setBookingInfo={setBookingInfo}
            />
          </div>
          {isAdmin && <CheckBox {...sendSmsHook} label="SMS전송" />}
          <div className="JDmodal__endSection">
            <Button
              thema="primary"
              flat
              onClick={onPayRequest}
              label="결제하기"
              size="long"
            />
          </div>
        </div>
      )}
    </JDmodal>
  );
};

export default PayMentModal;
