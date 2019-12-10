import React from "react";
import { LANG } from "../../../hooks/hook";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import Vtable, { Vheader, TVtableColumns } from "../../../atoms/vtable/Vtable";
import { registerBillKey_RegisterBillKey_billInfo } from "../../../types/api";
import { card_space } from "../../../utils/autoFormat";

interface IProps {
  context: IContext;
  billInfo: registerBillKey_RegisterBillKey_billInfo;
}

const RegiComplete: React.FC<IProps> = ({ context, billInfo }) => {
  const { user } = context;
  const { name } = user;
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
      content: authDate,
      label: LANG("regi_date")
    },
    {
      content: `${cardName}, ${card_space(cardNo)}`,
      label: LANG("payment_information")
    }
  ];

  return (
    <div>
      <h3>{LANG("card_regist_complete")}</h3>
      <span>{LANG("card_regist_complete_message")}</span>
      <Vtable columns={tableColumn} header={tableTitle} />
    </div>
  );
};

export default RegiComplete;
