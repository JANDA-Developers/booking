import React, { Fragment, useState, useRef } from "react";
import { IContext } from "../../../BookingHostRouter";
import CreaditCard from "./components/CreaditCard";
import { LANG } from "../../../../../hooks/hook";
import JDIcon from "../../../../../atoms/icons/Icons";
import "./CardViewer.scss";
import { getMyProfile_GetMyProfile_user_paymentInfos } from "../../../../../types/api";
import { toNumber, isEmpty } from "../../../../../utils/utils";
import CardInfoFormWrap, {
  ICardInfoFormWrapProps
} from "../../../../../components/bilingModal/components/CardInfoFormWrap";
import $ from "jquery";
import { getTargetsWithBillKey } from "../../../../../utils/getTargetsWithBillKey";
import { ICardModalTarget } from "./CardModal";

interface Iprops extends ICardInfoFormWrapProps {
  context: IContext;
  unPadding?: boolean;
  currentHouseInfo?: ICardModalTarget;
}

const CardViewer: React.FC<Iprops> = ({
  context,
  unPadding,
  currentHouseInfo,
  selectCallBack
}) => {
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

  const CardUnExsist = () => (
    <div className={`creaditCard creaditCard--unExsist`}>
      <div>{LANG("no_card")}</div>
      <span className="creaditCard__add-dec">{LANG("there_is_no_card")}</span>
    </div>
  );

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

  // GET USING-BILLKEY -  WITH TARGET-NAME
  const payTargets = getTargetsWithBillKey(context);

  return (
    <div className={`CardViewer ${unPadding && "CardViewer--unPadding"}`}>
      <div className="CardViewer__sliderWrap">
        <div className="CardViewer__slider">
          <div ref={scrollContainer} className="CardViewer__cardsWrap">
            {paymentInfos &&
              paymentInfos.map((payment, index) => {
                const payTaget = payTargets.filter(
                  paytaget => paytaget.billKey === payment.billKey
                );
                return (
                  <CreaditCard
                    payTargets={payTaget}
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
                );
              })}
            <CreaditCardAdd />
            {isEmpty(paymentInfos) && <CardUnExsist />}
          </div>
        </div>
      </div>
      <div className="CardViewer__infoFromWrap">
        <CardInfoFormWrap
          selectCallBack={selectCallBack}
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
          currentHouseInfo={currentHouseInfo}
          mode={selecteInfo ? "viewAndUpdate" : "create"}
          registCallBack={() => {}}
          context={context}
        />
      </div>
    </div>
  );
};

export default CardViewer;
