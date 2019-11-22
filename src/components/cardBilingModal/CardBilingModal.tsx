import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { useInput, LANG } from "../../hooks/hook";
import InputText from "../../atoms/forms/inputText/InputText";
interface Iprops {
    context: IContext
}

const CardBillingModal: React.FC<Iprops> = ({context}) => {

  const step = useInput<"checkProdcut" | "cardInfo" | "complete">("checkProdcut");
  const cardNumberHook = useInput("");

  return <JDmodal>
    <div>
      <InputText card {...cardNumberHook} label={LANG("card_number")} />
      </div>
      </JDmodal>;
};

{/* <tr>
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
</tr>            */}


export default CardBillingModal;
