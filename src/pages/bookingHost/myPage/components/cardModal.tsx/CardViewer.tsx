import React, { Fragment, useState, useRef } from "react";
import { IContext } from "../../../BookingHostRouter";
import CreaditCard from "./components/CreaditCard";
import { LANG } from "../../../../../hooks/hook";
import JDIcon from "../../../../../atoms/icons/Icons";
import "./CardViewer.scss";
import { getMyProfile_GetMyProfile_user_paymentInfos } from "../../../../../types/api";
import { isEmpty, JDscrollTo, toNumber } from "../../../../../utils/utils";
import CardInfoFormWrap, {
  ICardInfoFormWrapProps
} from "../../../../../components/bilingModal/components/CardInfoFormWrap";
import $ from "jquery";

interface Iprops extends ICardInfoFormWrapProps {
  context: IContext;
  unPadding?: boolean;
}

const CardViewer: React.FC<Iprops> = ({ context, unPadding }) => {
  const { user } = context;
  const { paymentInfos } = user;
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [
    selecteInfo,
    setSelectInfo
  ] = useState<getMyProfile_GetMyProfile_user_paymentInfos | null>(
    paymentInfos ? paymentInfos[0] || null : null
  );

  const scrollSlider = (index: number) => {
    if (scrollContainer.current) {
      const scrollElemntIndex = index;

      const result =
        toNumber($(".creaditCard").outerWidth(true)) * scrollElemntIndex;

      $(scrollContainer.current).animate(
        {
          scrollLeft: result
        },
        500,
        "swing"
      );
    }
  };

  const CreaditCardAdd = () => (
    <div
      onClick={() => {
        setSelectInfo(null);
        scrollSlider(paymentInfos ? paymentInfos.length + 1 : 0);
      }}
      className={`creaditCard creaditCard__add ${selecteInfo === null &&
        "creaditCard__add--selected"}`}
    >
      <JDIcon icon="addCircle" size="large" />
      <div>{LANG("add_card")}</div>
      <span className="creaditCard__add-dec">{LANG("add_card_dec")}</span>
    </div>
  );

  return (
    <div className={`CardViewer ${unPadding && "CardViewer--unPadding"}`}>
      <div className="CardViewer__sliderWrap">
        <div className="CardViewer__slider">
          <div ref={scrollContainer} className="CardViewer__cardsWrap">
            {paymentInfos &&
              paymentInfos.map((payment, index) => (
                <CreaditCard
                  key={`card:${payment.billKey}`}
                  isSelected={
                    selecteInfo
                      ? selecteInfo.billKey === payment.billKey
                      : false
                  }
                  callBackCardClick={info => {
                    setSelectInfo(info);
                    scrollSlider(index);
                  }}
                  payment={payment}
                />
              ))}
            <CreaditCardAdd />
          </div>
        </div>
      </div>
      <div className="CardViewer__infoFromWrap">
        <CardInfoFormWrap
          viewInfo={
            selecteInfo
              ? {
                  billKey: selecteInfo.billKey,
                  authDate: selecteInfo.authDate,
                  cardNumber: selecteInfo.cardNo,
                  cardName: selecteInfo.cardName
                }
              : undefined
          }
          mode={selecteInfo ? "view" : "create"}
          registCallBack={info => 0}
          context={context}
        />
      </div>
    </div>
  );
};

export default CardViewer;
