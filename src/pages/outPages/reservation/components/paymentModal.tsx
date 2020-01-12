import classNames from "classnames";
import React, { useRef, useState } from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../../../hooks/hook";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../atoms/button/Button";
import BookerInfoBox from "./bookerInfoBox";
import { PAYMETHOD_FOR_BOOKER_OP } from "../../../../types/const";
import Preloader from "../../../../atoms/preloader/Preloader";
import { IReservationHooks } from "../declation";
import CardInfoForm from "./CardInfoForm";
import { TCardRegistInfo } from "../../../../components/bilingModal/BillingModal";
import { bookerInfoValidation } from "../validations";
import { cardValidate } from "../../../../utils/validations";
import Vtable, { ColumnCells } from "../../../../atoms/vtable/Vtable";
import { card_space } from "../../../../utils/autoFormat";

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
  const [step, setStep] = useState<"bookerInput" | "cardInput">("bookerInput");
  const cardSumbmitRef = useRef<HTMLButtonElement>(null);

  const {
    payMethodHook,
    bookerInfo,
    setBookerInfo,
    cardInfoHook,
    toastModalHook,
    priceHook
  } = reservationHooks;
  const classes = classNames("paymentModal", className, {});

  const handlePayBtn = () => {
    if (!bookerInfoValidation(bookerInfo, toastModalHook)) return;
    const validateResult = cardValidate(cardInfoHook[0]);
    if (!validateResult.result) {
      toastModalHook.openModal({
        txt: validateResult.msg
      });
      return;
    }
    bookingCompleteFn();
  };

  return (
    <JDmodal className={classes} {...modalHook}>
      <Preloader size={"large"} loading={createLoading} />
      {createLoading || (
        <div>
          {step === "bookerInput" && (
            <div>
              <h6 className="JDreservation__sectionTitle JDtext-align-center">
                {LANG("booker_info")}
              </h6>
              <BookerInfoBox
                bookerInfo={bookerInfo}
                setBookerInfo={setBookerInfo}
              />
              <div className="JDmodal__endSection">
                <Button
                  mode="flat"
                  thema="primary"
                  flat
                  label={LANG("to_next")}
                  onClick={() => {
                    if (bookerInfoValidation(bookerInfo, toastModalHook))
                      setStep("cardInput");
                  }}
                  size="long"
                />
              </div>
            </div>
          )}
          {step === "cardInput" && (
            <div>
              <h6 className="JDreservation__sectionTitle JDtext-align-center">
                {LANG("payment_info")}
              </h6>
              <div>
                <JDselect
                  {...payMethodHook}
                  options={PAYMETHOD_FOR_BOOKER_OP}
                  label={LANG("method_of_payment")}
                />
              </div>
              <CardInfoForm
                cardInfo={cardInfoHook[0]}
                setCardInfo={cardInfoHook[1]}
              />
              <div className="JDmodal__endSection">
                <Button
                  mode="flat"
                  thema="primary"
                  flat
                  onClick={handlePayBtn}
                  label={LANG("make_payment")}
                  size="long"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </JDmodal>
  );
};

export default PayMentModal;
