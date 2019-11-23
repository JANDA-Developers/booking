import React, { useState } from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { useInput, LANG, IUseModal } from "../../hooks/hook";
import InputText from "../../atoms/forms/inputText/InputText";
import JDmodal from "../../atoms/modal/Modal";
import JDmultiStep, { IMultiStepSteps } from "../../atoms/multiStep/MultiStep";
import JDproductCard from "../../pages/bookingHost/product/components/Product";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

const CardBillingModal: React.FC<Iprops> = ({ context, modalHook }) => {
  const { applyedProduct } = context;
  let temp;
  if (applyedProduct) {
    const { _id } = applyedProduct;
  }

  // 아이디를 가지고 설명 가져와야함

  const [step, setStep] = useState<"checkProdcut" | "cardInfo" | "complete">(
    "checkProdcut"
  );
  const cardNumberHook = useInput("");

  const multiStepSteps: IMultiStepSteps[] = [
    {
      // "상품 확인"
      name: LANG(""),
      current: step === "checkProdcut"
    },
    // "정보 입력"
    { name: LANG(""), current: step === "cardInfo" },
    {
      // 등록확인
      name: LANG(""),
      current: step === "complete"
    }
  ];

  const renderContent = () => {
    if (step === "checkProdcut") {
    } else if (step === "cardInfo") {
    } else if (step === "complete") {
    }
  };

  // checkProdcut 상품확인
  return () => (
    <JDmodal {...modalHook}>
      <h5>{LANG("")}</h5>
      <JDmultiStep steps={multiStepSteps} />
      {/* describe */}
      <JDproductCard hover={false} isCurrent />
    </JDmodal>
  );
};

{
  /* <tr>
<th><span>카드번호</span></th>
<td><input name="CardNo" type="text" value=""/></td>
</tr>
<tr>
<th><span>유효기간</span></th>
<td>
    <input name="ExpMonth" maxLength="2" size="3" type="text" placeholder="MONTH" value="">/                
    <input name="ExpYear" maxLength="2" size="3" type="text" placeholder="YEAR" value="">
</td>
</tr>
<tr>
<th><span>생년월일(YYMMDD)or사업자번호</span></th>
<td><input name="IDNo" type="password" value=""></td>
</tr>
<tr>
<th><span>비밀번호 앞 두자리</span></th>
<td><input name="CardPw" type="password" value="" size="2" maxlength="2"></td>
</tr>            */
}

export default CardBillingModal;
