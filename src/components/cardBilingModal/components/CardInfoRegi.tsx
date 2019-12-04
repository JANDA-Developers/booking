import React from "react";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import Button from "../../../atoms/button/Button";
import { LANG, useModal } from "../../../hooks/hook";
import { CardBillingSteps, TCardRegistInfo } from "../CardBilingModal";
import InputText from "../../../atoms/forms/inputText/InputText";
import TextButton from "../../../atoms/textButton/TextButton";
import JDlist from "../../../atoms/list/List";
import privacyPolicy from "../../../docs/privacyPolicy";
import RefundPolicyModal from "../../policyModal/RefundPolicyModal";
import PrivacyPolicyModal from "../../policyModal/PrivacyPolicyModal";

interface Iprops {
  context: IContext;
  setStep: React.Dispatch<React.SetStateAction<CardBillingSteps>>;
  setCardInfo: React.Dispatch<React.SetStateAction<TCardRegistInfo>>;
  cardInfo: TCardRegistInfo;
  handleCardRegistBtnClick: () => void;
}

const CardInfoRegi: React.FC<Iprops> = ({
  context,
  setStep,
  cardInfo,
  setCardInfo,
  handleCardRegistBtnClick
}) => {
  const refundPolicyModalHook = useModal();
  const privacyPolicyModalHook = useModal();

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
            card
            onChange={(v: any) => {
              handleOnChangeInput(v, "cardNumber");
            }}
            value={cardInfo.cardNumber}
            label={LANG("card_number")}
          />
        </div>
        <div className="JDflex">
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
            maxLength={2}
            label={LANG("exp_year")}
          />
          <InputText
            onChange={(v: any) => {
              handleOnChangeInput(v, "cardPassword");
            }}
            value={cardInfo.cardPassword}
            maxLength={2}
            label={LANG("card_pasword_front_two_digits")}
            type="password"
          />
        </div>
        <div>
          <InputText
            type="password"
            onChange={(v: any) => {
              handleOnChangeInput(v, "idNumber");
            }}
            value={cardInfo.idNumber}
            label={LANG("idnumber_or_business_number")}
          />
        </div>
        <div className="JDsmall-text JDstandard-margin-bottom">
          <div>
            {LANG("completing_this_card_registration_you_agree_to_the")}
          </div>
          <TextButton
            onClick={() => {}}
            color="primary"
            className="JDstandard-margin0"
            anchor
          >
            {LANG("use_conditions")},
          </TextButton>{" "}
          <TextButton color="primary" className="JDstandard-margin0" anchor>
            {LANG("privacy_policy")}
          </TextButton>
        </div>
      </div>
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            handleCardRegistBtnClick();
          }}
          size="long"
          mode="flat"
          thema="primary"
          label={LANG("payment_regist_complete")}
        />
      </div>
      <RefundPolicyModal modalHook={refundPolicyModalHook} />
      <PrivacyPolicyModal modalHook={privacyPolicyModalHook} />
    </div>
  );
};

export default CardInfoRegi;
