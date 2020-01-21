import classNames from "classnames";
import React, { useRef, useState, Fragment } from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../../../hooks/hook";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../atoms/button/Button";
import BookerInfoBox from "./bookerInfoBox";
import { PAYMETHOD_FOR_BOOKER_OP } from "../../../../types/const";
import Preloader from "../../../../atoms/preloader/Preloader";
import { IReservationHooks } from "../declation";
import CardInfoForm from "./CardInfoForm";
import { bookerInfoValidation } from "../validations";
import { cardValidate } from "../../../../utils/validations";
import { PayMethod } from "../../../../types/enum";
import Vtable, { ColumnCells } from "../../../../atoms/vtable/Vtable";
import { getHouseForPublic_GetHouseForPublic_house } from "../../../../types/api";
import { toNumber } from "../../../../utils/utils";
import ModalEndSection from "../../../../atoms/modal/components/ModalEndSection";

interface IProps {
  className?: string;
  modalHook: IUseModal;
  createLoading: boolean;
  bookingCompleteFn(): void;
  reservationHooks: IReservationHooks;
  publicHouseInfo?: getHouseForPublic_GetHouseForPublic_house;
}

const PayMentModal: React.FC<IProps> = ({
  className,
  modalHook,
  reservationHooks,
  bookingCompleteFn,
  createLoading,
  publicHouseInfo
}) => {
  if (!publicHouseInfo?.bookingPayInfo) return <div />;
  const { bankAccountInfo, payMethods } = publicHouseInfo.bookingPayInfo;
  if (!payMethods) return <div />;

  const filteredPayMethodOp = PAYMETHOD_FOR_BOOKER_OP.filter(op =>
    payMethods.includes(op.value)
  );

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
  const selectedPayMethod = payMethodHook.selectedOption?.value;

  const handlePayBtn = () => {
    if (!bookerInfoValidation(bookerInfo, toastModalHook)) return;

    const skipCardValidate =
      payMethodHook.selectedOption?.value !== PayMethod.CARD;

    const validateResult = cardValidate(cardInfoHook[0]);
    if (!skipCardValidate && !validateResult.result) {
      toastModalHook.openModal({
        txt: validateResult.msg
      });
      return;
    }
    bookingCompleteFn();
  };

  const renders = [
    {
      label: LANG("bank_name"),
      Component: () => <div>{bankAccountInfo?.bankName}</div>
    },
    {
      label: LANG("account_number"),
      Component: () => <div>{bankAccountInfo?.accountNum}</div>
    },
    {
      label: LANG("depositor"),
      Component: () => <div>{bankAccountInfo?.accountHolder}</div>
    },
    {
      label: LANG("total_price"),
      Component: () => <div>{toNumber(priceHook.value)}</div>
    }
  ];

  const CommonFroPayMethod = () => (
    <ModalEndSection>
      <Button
        mode="flat"
        thema="primary"
        flat
        onClick={handlePayBtn}
        label={LANG("make_payment")}
        size="long"
      />
    </ModalEndSection>
  );

  return (
    <JDmodal minWidth={"320px"} className={classes} {...modalHook}>
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
              <ModalEndSection>
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
              </ModalEndSection>
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
                  options={filteredPayMethodOp}
                  label={LANG("method_of_payment")}
                />
              </div>
              {selectedPayMethod === PayMethod.CARD && (
                <Fragment>
                  <CardInfoForm
                    forHost={false}
                    cardInfo={cardInfoHook[0]}
                    setCardInfo={cardInfoHook[1]}
                  />
                  <CommonFroPayMethod />
                </Fragment>
              )}
              {selectedPayMethod === PayMethod.BANK_TRANSFER && (
                <div>
                  <Vtable mr="no">
                    <ColumnCells datas={renders} />
                  </Vtable>
                  <CommonFroPayMethod />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </JDmodal>
  );
};

export default PayMentModal;
