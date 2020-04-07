import React from "react";
import { IBookingModalContext } from "../declaration";
import Align from "../../../atoms/align/Align";
import JDtypho from "../../../atoms/typho/Typho";
import InputText from "../../../atoms/forms/inputText/InputText";
import { LANG } from "../../../hooks/hook";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import { PAYMETHOD_FOR_HOST_OP, PAYMENT_STATUS_OP } from "../../../types/const";
import { autoComma, toNumber } from "../../../utils/utils";

interface IProps {
  responseStyle: any;
  bookingModalContext: IBookingModalContext;
}

const PaymentInfo: React.FC<IProps> = ({
  bookingModalContext,
  responseStyle,
}) => {
  const {
    priceHook,
    payMethodHook,
    paymentStatusHook,
    placeHolederPrice,
    isDesktopUp,
  } = bookingModalContext;
  return (
    <Align {...responseStyle}>
      {isDesktopUp && <JDtypho mb="normal">{LANG("payment_info")}</JDtypho>}
      <div>
        <InputText
          id="PriceHook"
          mr={"no"}
          placeholder={`${LANG("normal_price")}:${autoComma(
            placeHolederPrice
          )}`}
          comma
          label={LANG("total_price")}
          {...priceHook}
          value={toNumber(priceHook.value)}
        />
      </div>
      <div>
        <JDselect
          id="PayMethodSelect"
          mr={"no"}
          {...payMethodHook}
          menuPlacement="top"
          options={PAYMETHOD_FOR_HOST_OP}
          label={LANG("method_of_payment")}
        />
      </div>
      <div>
        <JDselect
          mr={"no"}
          mb="no"
          id="PaymentStatusSelecter"
          {...paymentStatusHook}
          menuPlacement="top"
          options={PAYMENT_STATUS_OP}
          label={LANG("payment_status")}
        />
      </div>
    </Align>
  );
};

export default PaymentInfo;
