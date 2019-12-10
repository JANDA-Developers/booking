import React from "react";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import { registerBillKey_RegisterBillKey_billInfo } from "../../../types/api";
import Vtable, { TVtableColumns, Vheader } from "../../../atoms/vtable/Vtable";
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

  const tableColumn: TVtableColumns[] = [
    {
      content: name,
      label: LANG("member_name")
    },
    {
      label: LANG("regi_date"),
      content: moment(authDate).format(DateFormat.YYMMDD)
    },
    {
      label: LANG("product_info"),
      content: productTypeName
    },
    {
      content: name,
      label: LANG("deposit_card_owner")
    },
    {
      content: `${cardName}: ${card_space(cardNo)}`,
      label: LANG("payment_information")
    }
  ];

  return (
    <div>
      <div className="JDstandard-margin-bottom">
        <h3>{LANG("pay_regist_complete_title")}</h3>
        <span>{LANG("pay_regist_complete_text")}</span>
      </div>
      <div>
        <Vtable columns={tableColumn} />
      </div>
    </div>
  );
};

export default PeriodicPay;
