import React from "react";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import Button from "../../../atoms/button/Button";
import { LANG } from "../../../hooks/hook";
import { CardBillingSteps, TCardRegistInfo } from "../CardBilingModal";
import InputText from "../../../atoms/forms/inputText/InputText";

interface Iprops {
  context: IContext;
  setStep: React.Dispatch<React.SetStateAction<CardBillingSteps>>;
  setCardInfo: React.Dispatch<React.SetStateAction<TCardRegistInfo>>;
  cardInfo: TCardRegistInfo;
}

const CardInfoRegi: React.FC<Iprops> = ({
  context,
  setStep,
  cardInfo,
  setCardInfo
}) => {
  const handleOnChangeInput = (
    v: string,
    key: "cardNumber" | "idNumber" | "expMonth" | "expYear" | "cardPassword"
  ) => {
    cardInfo[key] = v;
    setCardInfo({ ...cardInfo });
  };

  return (
    <div>
      <div>
        <div>
          <InputText
            onChange={(v: any) => {
              handleOnChangeInput(v, "cardNumber");
            }}
            value={cardInfo.cardNumber}
            label={LANG("card_number")}
          />
        </div>
        <div>
          <InputText
            onChange={(v: any) => {
              handleOnChangeInput(v, "expMonth");
            }}
            value={cardInfo.expMonth}
            sizes="2"
            maxLength={2}
            label={LANG("exp_month")}
          />
          <InputText
            onChange={(v: any) => {
              handleOnChangeInput(v, "expYear");
            }}
            value={cardInfo.expYear}
            sizes="2"
            maxLength={2}
            label={LANG("exp_year")}
          />
        </div>
        <div>
          <InputText
            onChange={(v: any) => {
              handleOnChangeInput(v, "idNumber");
            }}
            value={cardInfo.idNumber}
            label={LANG("idnumber_or_business_number")}
          />
        </div>
        <div>
          <InputText
            onChange={(v: any) => {
              handleOnChangeInput(v, "cardPassword");
            }}
            value={cardInfo.cardPassword}
            sizes="2"
            maxLength={2}
            label={LANG("card_pasword_front_two_digits")}
            type="password"
          />
        </div>
      </div>
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            setStep("complete");
          }}
          thema="positive"
          label={LANG("input_card_information")}
        />
      </div>
    </div>
  );
};

export default CardInfoRegi;
