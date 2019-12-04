import React from "react";
import { IContext } from "../../../../BookingHostRouter";
import Vtable, { TVtableColumns } from "../../../../../../atoms/vtable/Vtable";
import { LANG, useModal } from "../../../../../../hooks/hook";
import Button from "../../../../../../atoms/button/Button";
import { getMyProfile_GetMyProfile_user_paymentInfos } from "../../../../../../types/api";
import { DEFAULT_PAYMENT_INFO } from "../../../../../../types/defaults";
import "./PeriodicalSignCard.scss";
import moment from "moment";
import { DateFormat } from "../../../../../../types/enum";
import {
  card_space,
  autoComma,
  toNumber
} from "../../../../../../utils/autoFormat";
import BillPayChangeModal from "./BillPayChangeModal";
import { isTestProduct } from "../../../../../../utils/utils";

interface Iprops {
  context: IContext;
}

const PeriodicalSignCard: React.FC<Iprops> = ({ context }) => {
  // 등록이 안되어있으면
  // 가격부분에 테스트사용중 이라고 적어놓자
  // 저기 적혀있는 달은 다음에 납부할 달이여야한다.
  // 예금(주)명은 없다. 따라서 상품타입명으로 변경한다.
  const { applyedProduct, user } = context;
  const {
    price,
    productType,
    name: productName,
    billKey,
    expireDate
  } = applyedProduct!;
  const { name } = productType;
  const billPayChangeModalHook = useModal(false);
  let { paymentInfos } = user;
  let paymentInfo: getMyProfile_GetMyProfile_user_paymentInfos = DEFAULT_PAYMENT_INFO;
  if (paymentInfos)
    paymentInfo =
      paymentInfos.find(patemntInfo => patemntInfo.billKey === billKey) ||
      DEFAULT_PAYMENT_INFO;
  const { authDate, cardCl, cardName, cardNo, isLive } = paymentInfo;

  const currentStatus = (() => {
    if (isTestProduct(productName)) return LANG("on_testing");
    return isLive ? LANG("approved") : LANG("need_regist");
  })();

  const priceTable: TVtableColumns[] = [
    {
      label: [LANG("product_info"), LANG("current_status")],
      content: [productName, currentStatus]
    },
    {
      label: [LANG("method_of_payment"), LANG("periodical_sign_date")],
      content: [
        billKey ? "card" : LANG("un_registed"),
        moment(authDate).format(DateFormat.YYMMDD)
      ]
    },
    {
      label: [LANG("payment_information"), ""],
      content: [
        `${cardName}:${card_space(cardNo)}`,
        <Button
          mode="border"
          onClick={() => {
            // 1. 카드 등록이 안된경우
            // 2. 카드 등록은 했지만 결제등록이 안된경우
            billPayChangeModalHook.openModal();
          }}
          label={LANG("change_periodical_change")}
        />
      ]
    }
  ];

  return (
    <div className="periodicalSignCard">
      {/* 헤더 */}
      <div className="periodicalSignCard__header">
        <div className="periodicalSignCard__product">
          <span className="JDstandard-space periodicalSignCard__product-name">{`${LANG(
            "applied_product_type"
          )}:${name}`}</span>
          <Button
            mode="flat"
            thema="primary"
            icon={"config"}
            label={LANG("product_change")}
          />
        </div>
      </div>
      <div className="flex-grid periodicalSignCard__bodyWrap">
        <div className="flex-grid__col col--full-4 periodicalSignCard__priceZone">
          <span>
            {moment(new Date()).format(
              `YYYY${LANG("year")} MM${LANG("month")} `
            )}
            {LANG("payment_fee")}
          </span>
          <h1 className="periodicalSignCard__price JDtextColor--point">
            {autoComma(toNumber(price || 0))}
          </h1>
        </div>
        <div className="flex-grid__col col--full-8">
          <Vtable
            border="none"
            className="periodicalSignCard__infoTable"
            columns={priceTable}
          />
        </div>
      </div>
      <BillPayChangeModal
        context={context}
        modalHook={billPayChangeModalHook}
      />
    </div>
  );
};

export default PeriodicalSignCard;
