import React, { useState } from "react";
import { LANG } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import JDmultiStep, { IMultiStepSteps } from "../../atoms/multiStep/MultiStep";
import productTypeGetDesc from "../../pages/bookingHost/product/helper";
import CheckProduct from "./components/CheckProduct";
import CardInfoRegi from "./components/CardInfoRegi";
import { IChainProp } from "./CardBilingModalWrap";
import { MutationFunctionOptions } from "@apollo/react-common";
import { createBillkey, createBillkeyVariables } from "../../types/api";
import { ExecutionResult } from "graphql";
import RegiComplete from "./components/RegiComplete";
import "./CardBillModal.scss";
import { toNumber, muResult } from "../../utils/utils";
import { toast } from "react-toastify";
import moment from "moment";

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
const CARD_BILL_STEP: CardBillingSteps[] = [
  "checkProdcut",
  "cardInfo",
  "complete"
];

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
    const {
      expMonth: expMonthTemp,
      expYear: expYearTemp,
      cardNumber,
      idNumber
    } = cardInfo;

    const expMonth = toNumber(expMonthTemp);

    // 길이검사
    if (expMonth > 12 || expMonth < 1 || expYearTemp.length !== 2) {
      toast.warn("유효 하지 않은 카드 기한입니다.");
      return false;
    } else if (
      // 기한검사
      moment(20 + expYearTemp + expMonth + "01", "YYYYMMDD").isBefore(
        moment(),
        "month"
      )
    ) {
      toast.warn("유효 하지 않은 카드 기한입니다.");
      return false;
    }

    if (cardNumber.length !== 16) {
      toast.warn("유효하지 않은 카드번호 입니다.");
      return false;
    }

    return true;
  };

  const handleCardRegistBtnClick = async () => {
    if (validate()) {
      const reuslt = await createBillMu({
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

      const billInfo = muResult(reuslt, "CreateBillkey", "billInfo");
      if (billInfo) {
      }
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
      return (
        <CardInfoRegi
          handleCardRegistBtnClick={handleCardRegistBtnClick}
          cardInfo={cardInfo}
          setCardInfo={setCardInfo}
          setStep={setStep}
          context={context}
        />
      );
    } else if (step === "complete") {
      return <RegiComplete />;
    }
  };

  const handleStepClick = (index: number) => {
    setStep(CARD_BILL_STEP[index]);
  };

  // checkProdcut 상품확인
  return (
    <JDmodal className="CardBillModal" {...modalHook}>
      <JDmultiStep
        onStepClick={handleStepClick}
        clickAble={[0, 1]}
        steps={multiStepSteps}
      />
      {renderContent()}
    </JDmodal>
  );
};

export default CardBillingModal;
