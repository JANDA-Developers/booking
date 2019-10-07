import classNames from "classnames";
import React, {Fragment} from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import {IUseModal} from "../../../../hooks/hook";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../atoms/button/Button";
import BookerInfoBox from "./bookerInfoBox";
import {IReservationHooks} from "../Reservation";
import {
  PAYMETHOD_FOR_BOOKER_OP,
  PAYMETHOD_FOR_HOST_OP,
  PAYMENT_STATUS_OP
} from "../../../../types/enum";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import Preloader from "../../../../atoms/preloader/Preloader";
import InputText from "../../../../atoms/forms/inputText/InputText";

interface IProps {
  className?: string;
  modalHook: IUseModal;
  createLoading: boolean;
  bookingCompleteFn(): void;
  isHost: boolean;
  reservationHooks: IReservationHooks;
}

const PayMentModal: React.SFC<IProps> = ({
  className,
  modalHook,
  reservationHooks,
  bookingCompleteFn,
  createLoading,
  isHost
}) => {
  const {
    payMethodHook,
    sendSmsHook,
    bookerInfo,
    setBookerInfo,
    paymentStatusHook,
    priceHook
  } = reservationHooks;
  const classes = classNames("paymentModal", className, {});

  // pay 한후 request 받아서 진행
  const onPayRequest = () => {
    bookingCompleteFn();
  };

  return (
    <JDmodal className={classes} {...modalHook}>
      <Preloader size={"large"} loading={createLoading} />
      {createLoading || (
        <div>
          <h6 className="JDreservation__sectionTitle JDtext-align-center">
            결제 정보 입력
          </h6>
          <div>
            <div>
              <JDselect
                {...payMethodHook}
                options={
                  isHost ? PAYMETHOD_FOR_HOST_OP : PAYMETHOD_FOR_BOOKER_OP
                }
                label="결제수단"
              />
            </div>
            {isHost && (
              <Fragment>
                <div>
                  <JDselect
                    label="결제상태"
                    {...paymentStatusHook}
                    options={PAYMENT_STATUS_OP}
                  />
                </div>
                <div>
                  <InputText comma {...priceHook} label="최종금액" />
                </div>
              </Fragment>
            )}
            <BookerInfoBox
              bookerInfo={bookerInfo}
              setBookerInfo={setBookerInfo}
            />
          </div>
          {isHost && <CheckBox {...sendSmsHook} label="SMS전송" />}
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
