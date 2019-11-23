import React from "react";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import JDproductCard from "../../../pages/bookingHost/product/components/ProductCard";
import Button from "../../../atoms/button/Button";
import { LANG } from "../../../hooks/hook";
import { CardBillingSteps } from "../CardBilingModal";
import { IProductTypeDec } from "../../../types/interface";

interface Iprops {
  context: IContext;
  setStep: React.Dispatch<React.SetStateAction<CardBillingSteps>>;
  productTypeDecs: IProductTypeDec;
}

const CheckProduct: React.FC<Iprops> = ({
  productTypeDecs,
  context,
  setStep
}) => {
  return (
    <div>
      <JDproductCard productTypeDec={productTypeDecs} hover={false} isCurrent />
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            setStep("cardInfo");
          }}
          thema="positive"
          label={LANG("input_card_information")}
        />
      </div>
    </div>
  );
};

export default CheckProduct;
