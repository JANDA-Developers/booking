import React from "react";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import { registerBillKey_RegisterBillKey_billInfo } from "../../../types/api";
import Vtable, {
  Vheader,
  VtableColumn,
  VtableCell
} from "../../../atoms/vtable/Vtable";
import { LANG } from "../../../hooks/hook";
import Button from "../../../atoms/button/Button";
import { card_space } from "../../../utils/autoFormat";
import moment from "moment";
import { DateFormat } from "../../../types/enum";

interface IProps {
  context: IContext;
  billInfo: registerBillKey_RegisterBillKey_billInfo;
}

const PeriodicPay: React.FC<IProps> = ({ context, billInfo }) => {
  const { user, applyedProduct } = context;
  if (!applyedProduct || !billInfo) return <div />;
  const { name } = user;
  const { productType } = applyedProduct;
  const { name: productTypeName } = productType;
  const { authDate, cardName, cardCl, cardNo } = billInfo;

  const tableTitle: Vheader = {
    title: LANG("payment_information")
  };

  return (
    <div>
      <div className="JDstandard-margin-bottom">
        <h3>{LANG("pay_regist_complete_title")}</h3>
        <span>{LANG("pay_regist_complete_text")}</span>
      </div>
      <div>
        <Vtable>
          <VtableColumn>
            <VtableCell label={LANG("member_name")}>{name}</VtableCell>
          </VtableColumn>
          <VtableColumn>
            <VtableCell label={LANG("regi_date")}>
              {moment(authDate).format(DateFormat.YYMMDD)}
            </VtableCell>
          </VtableColumn>
          <VtableColumn>
            <VtableCell label={LANG("product_info")}>
              {productTypeName}
            </VtableCell>
          </VtableColumn>
          <VtableColumn>
            <VtableCell label={LANG("deposit_card_owner")}>{name}</VtableCell>
          </VtableColumn>
          <VtableColumn>
            <VtableCell label={LANG("payment_information")}>
              {cardName}: {card_space(cardNo)}
            </VtableCell>
          </VtableColumn>
        </Vtable>
      </div>
    </div>
  );
};

export default PeriodicPay;
