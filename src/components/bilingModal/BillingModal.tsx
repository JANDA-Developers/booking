import React, { useState } from "react";
import { LANG } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import JDmultiStep, { IMultiStepSteps } from "../../atoms/multiStep/MultiStep";
import productTypeGetDesc from "../../pages/bookingHost/product/helper";
import CheckProduct from "./components/CheckProduct";
import { IChainProp } from "./BillingModalWrap";
import {
  registerBillKey_RegisterBillKey_billInfo,
} from "../../types/api";
import "./BillingModal.scss";
import { toast } from "react-toastify";
import JDpreloader from "../../atoms/preloader/Preloader";
import PeriodicPay from "./components/PeriodicPay";
import CardViewer from "../../pages/bookingHost/myPage/components/cardModal.tsx/CardViewer";

interface Iprops extends IChainProp {}

export type TCardRegistInfo = {
  cardNumber: string;
  idNumber: string;
  exp: string;
  cardPassword: string;
};

export type BillingSteps = "checkProdcut" | "cardInfo" | "complete";
const CARD_BILL_STEP: BillingSteps[] = ["checkProdcut", "cardInfo", "complete"];

const BillingModal: React.FC<Iprops> = ({ context, modalHook }) => {
  const [loading, setLoading] = useState();
  const { applyedProduct } = context;
  const { _id: productId } = applyedProduct!;

  // 진입 밸리데이션
  if (!applyedProduct) {
    throw Error("BillingModal:: 상품이 적용되어있어야합니다.");
    // for typescript
    return (<div />) as any;
  }

  const [billInfo, setBillInfo] = useState<
    registerBillKey_RegisterBillKey_billInfo
  >();
  const { productType: currnetProductType } = applyedProduct;
  const [step, setStep] = useState<BillingSteps>("checkProdcut");

  const [productTypeDecs] = productTypeGetDesc([currnetProductType]);

  const multiStepSteps: IMultiStepSteps[] = [
    {
      // "상품 확인"
      name: LANG("check_product"),
      current: step === "checkProdcut"
    },
    // "카드 정보"
    { name: LANG("card_info"), current: step === "cardInfo" },
    {
      // 등록확인
      name: LANG("registration_confirmation"),
      current: step === "complete"
    }
  ];

  const registCardCallBack = async () => {
    setStep("complete");
    setBillInfo(billInfo);
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
      return <CardViewer unPadding context={context} />;
    } else if (step === "complete") {
      return <PeriodicPay billInfo={billInfo!} context={context} />;
    }
  };

  const handleStepClick = (index: number) => {
    setStep(CARD_BILL_STEP[index]);
  };

  if (loading) {
    return (
      <JDmodal
        loading={loading}
        className="BillModal"
        {...modalHook}
        onRequestClose={() => {
          toast.warn(LANG("your_request_cannot_be_fulfilled_right_now"));
          return;
        }}
      >
        <JDpreloader loading={loading} size="large" />
      </JDmodal>
    );
  }
  // checkProdcut 상품확인
  return (
    <JDmodal className="BillModal" {...modalHook}>
      <JDmultiStep
        onStepClick={handleStepClick}
        clickAble={[0, 1, 2]}
        steps={multiStepSteps}
      />
      {renderContent()}
    </JDmodal>
  );
};

export default BillingModal;
