import React from "react";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import Vtable, { Vheader, ColumnCells } from "../../../atoms/vtable/Vtable";
import { LANG } from "../../../hooks/hook";
import { card_space } from "../../../utils/autoFormat";
import moment from "moment";
import { DateFormat } from "../../../types/enum";
import { IBillInfo, TPayinfoes } from "../../../types/interface";

interface IProps {
  context: IContext;
  billInfo: IBillInfo | TPayinfoes;
}

const BillCompleteView: React.FC<IProps> = ({ context, billInfo }) => {
  const { user, applyedProduct } = context;
  if (!applyedProduct || !billInfo) return <div />;
  const { name } = user;
  const { productType } = applyedProduct;
  const { name: productTypeName } = productType;
  const { authDate, cardName, cardCl, cardNo } = billInfo;

  const tableTitle: Vheader = {
    title: LANG("payment_information")
  };

  const renders = [
    {
      label: LANG("member_name"),
      Component: () => name
    },
    {
      label: LANG("regi_date"),
      Component: () => moment(authDate).format(DateFormat.YYMMDD)
    },
    {
      label: LANG("product_info"),
      Component: () => productTypeName
    },
    {
      label: LANG("deposit_card_owner"),
      Component: () => name
    },
    {
      label: LANG("payment_information"),
      Component: () => `${cardName}}: ${card_space(cardNo)}`
    }
  ];

  return (
    <div>
      <div className="JDstandard-margin-bottom">
        <h3>{LANG("product_regist_complete_message")}</h3>
        <span>{LANG("pay_regist_complete_text")}</span>
      </div>
      <div>
        <Vtable>
          <ColumnCells datas={renders} />
        </Vtable>
      </div>
    </div>
  );
};

export default BillCompleteView;
