import React from "react";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import JDproductCard from "../../../pages/bookingHost/product/components/ProductCard";
import Button from "../../../atoms/button/Button";
import { LANG } from "../../../hooks/hook";
import { BillingSteps } from "../BillingModal";
import { IProductTypeDec } from "../../../types/interface";
import ModalEndSection from "../../../atoms/modal/components/ModalEndSection";

interface Iprops {
  context: IContext;
  setStep: React.Dispatch<React.SetStateAction<BillingSteps>>;
  productTypeDecs: IProductTypeDec;
}

const CheckProduct: React.FC<Iprops> = ({
  productTypeDecs,
  context,
  setStep
}) => {
  return (
    <div>
      <div className="JDstandard-margin-bottom">
        <JDproductCard
          productTypeDec={productTypeDecs}
          hover={false}
          isCurrent
        />
      </div>

      <ModalEndSection>
        <Button
          onClick={() => {
            setStep("cardInfo");
          }}
          size="long"
          mode="flat"
          thema="primary"
          label={LANG("input_card_information")}
        />
      </ModalEndSection>
    </div>
  );
};

export default CheckProduct;
