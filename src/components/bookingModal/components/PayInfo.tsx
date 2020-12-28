import React from "react";
import { IBookingModalContext } from "../declaration";
import Align from "../../../atoms/align/Align";
import JDtypho from "../../../atoms/typho/Typho";
import InputText from "../../../atoms/forms/inputText/InputText";
import { LANG } from "../../../hooks/hook";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import { PAYMETHOD_FOR_HOST_OP, PAYMENT_STATUS_OP } from "../../../types/const";
import { autoComma, toNumber } from "../../../utils/utils";
import { enumToOption, JDbutton } from "@janda-com/front";
import { PayMethod } from "../../../types/enum";
import { printRecipt } from "../../../utils/printRecipt";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";

interface IProps {
  responseStyle: any;
  bookingModalContext: IBookingModalContext;
  context: IContext
}

const PaymentInfo: React.FC<IProps> = ({
  bookingModalContext,
  responseStyle,
  context
}) => {
  const {
    priceHook,
    payMethodHook,
    paymentStatusHook,
    placeHolederPrice,
    isDesktopUp,
    bookingData,
  } = bookingModalContext;

  const { house, user } = context;

  const handleViewCard = () => {
    printRecipt({
      ...bookingData
    }, {
      __typename: "House",
      bookingPayInfo: house.bookingPayInfo,
      houseConfig: {
        __typename: "HouseConfig",
        // @ts-ignore
        bookingConfig: house.houseConfig.bookingConfig,
        options: []
      },
      location: house.location,
      name: house.name,
      tags: house.tags,
      phoneNumber: user.phoneNumber,
    })
  }
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
          options={enumToOption(LANG, "PayMethod", PayMethod)}
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
      <div>
        {bookingData.payment.cardInfo &&
          <JDbutton onClick={handleViewCard} mode="flat">카드전표보기</JDbutton>
        }
      </div>
    </Align>
  );
};

export default PaymentInfo;
