import React, { useState } from "react";
import { LANG } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import JDmultiStep, { IMultiStepSteps } from "../../atoms/multiStep/MultiStep";
import productTypeGetDesc from "../../pages/bookingHost/product/helper";
import Button from "../../atoms/button/Button";
import CheckProduct from "./components/CheckProduct";
import CardInfoRegi from "./components/CardInfoRegi";
import { IChainProp } from "./CardBilingModalWrap";
import { MutationFunctionOptions } from "@apollo/react-common";
import { createBillkey, createBillkeyVariables } from "../../types/api";
import { ExecutionResult, validate } from "graphql";
import RegiComplete from "./components/RegiComplete";
import { muResult } from "../../utils/utils";

interface Iprops extends IChainProp {
  createBillMu: (
    options?:
      | MutationFunctionOptions<createBillkey, createBillkeyVariables>
      | undefined
  ) => Promise<ExecutionResult<createBillkey>>;
}

export type TCardRegistInfo = {
  cardNumber: string;
  idNumber: string;
  expMonth: string;
  expYear: string;
  cardPassword: string;
};

export type CardBillingSteps = "checkProdcut" | "cardInfo" | "complete";

const CardBillingModal: React.FC<Iprops> = ({
  context,
  modalHook,
  createBillMu
}) => {
  const { applyedProduct } = context;

  // 진입 밸리데이션
  if (!applyedProduct) {
    throw Error("CardBillingModal:: 상품이 적용되어있어야합니다.");
    // for typescript
    return (<div />) as any;
  }

  const [cardInfo, setCardInfo] = useState<TCardRegistInfo>({
    cardNumber: "",
    idNumber: "",
    expMonth: "",
    expYear: "",
    cardPassword: ""
  });

  const { productType: currnetProductType } = applyedProduct;
  const [step, setStep] = useState<CardBillingSteps>("checkProdcut");

  const [productTypeDecs] = productTypeGetDesc([currnetProductType]);

  const multiStepSteps: IMultiStepSteps[] = [
    {
      // "상품 확인"
      name: LANG("check_product"),
      current: step === "checkProdcut"
    },
    // "정보 입력"
    { name: LANG("input_information"), current: step === "cardInfo" },
    {
      // 등록확인
      name: LANG("registration_confirmation"),
      current: step === "complete"
    }
  ];

  const validate = () => {
    return true;
  };

  const handleCardRegistBtnClick = () => {
    if (validate()) {
      const reuslt = createBillMu({
        variables: {
          billParams: {
            cardNo: cardInfo.cardNumber,
            expMonth: cardInfo.expMonth,
            expYear: cardInfo.expYear,
            idNo: cardInfo.idNumber,
            pwd: cardInfo.cardPassword
          }
        }
      });
    }
  };

  const renderContent = () => {
    if (step === "checkProdcut") {
      return (
        <CheckProduct
          setStep={setStep}
          productTypeDecs={productTypeDecs}
          context={context}
        />
      );
    } else if (step === "cardInfo") {
      <CardInfoRegi
        cardInfo={cardInfo}
        setCardInfo={setCardInfo}
        setStep={setStep}
        context={context}
      />;
    } else if (step === "complete") {
      <RegiComplete />;
    }
  };

  // checkProdcut 상품확인
  return () => (
    <JDmodal {...modalHook}>
      <h5>{LANG("card_resist")}</h5>
      <JDmultiStep steps={multiStepSteps} />
      {renderContent()}
    </JDmodal>
  );
};

export default CardBillingModal;
