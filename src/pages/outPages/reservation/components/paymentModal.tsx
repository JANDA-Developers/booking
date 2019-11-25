import classNames from "classnames";
import React, { Fragment } from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../../../hooks/hook";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../atoms/button/Button";
import BookerInfoBox from "./bookerInfoBox";
import { PAYMETHOD_FOR_BOOKER_OP } from "../../../../types/enum";
import Preloader from "../../../../atoms/preloader/Preloader";
import { IReservationHooks } from "../Reservation";

interface IProps {
  className?: string;
  modalHook: IUseModal;
  createLoading: boolean;
  bookingCompleteFn(): void;
  reservationHooks: IReservationHooks;
}

const PayMentModal: React.FC<IProps> = ({
  className,
  modalHook,
  reservationHooks,
  bookingCompleteFn,
  createLoading
}) => {
  const { payMethodHook, bookerInfo, setBookerInfo } = reservationHooks;
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
            {LANG("payment_info")}
          </h6>
          <div>
            <div>
              <JDselect
                {...payMethodHook}
                options={PAYMETHOD_FOR_BOOKER_OP}
                label={LANG("method_of_payment")}
              />
            </div>
            <BookerInfoBox
              bookerInfo={bookerInfo}
              setBookerInfo={setBookerInfo}
            />
          </div>
          <div className="JDmodal__endSection">
            <Button
              mode="flat"
              thema="primary"
              flat
              onClick={onPayRequest}
              label={LANG("make_payment")}
              size="long"
            />
          </div>
        </div>
      )}
    </JDmodal>
  );
};

export default PayMentModal;
