import React from "react";
import { IContext } from "../../../../BookingHostRouter";
import "./CreaditCard.scss";
import PhotoFrame from "../../../../../../atoms/photoFrame/PhotoFrame";
import { LANG } from "../../../../../../hooks/hook";
import Color from "color";
import { getMyProfile_GetMyProfile_user_paymentInfos } from "../../../../../../types/api";
import { CardStyleInfo } from "./helper";
import classNames from "classnames";
import { card_space } from "../../../../../../utils/autoFormat";
import { IMG_REPO } from "../../../../../../types/const";

interface Iprops {
  isSelected?: boolean;
  payment: getMyProfile_GetMyProfile_user_paymentInfos;
  callBackCardClick: (
    info: getMyProfile_GetMyProfile_user_paymentInfos
  ) => void;
  className?: string;
  refProp?: any;
}

const CreaditCard: React.FC<Iprops> = ({
  payment,
  callBackCardClick,
  className,
  isSelected,
  refProp
}) => {
  const { cardName, cardNo } = payment;
  const folderName = "card_logo/";

  const getLinear = (color: string) =>
    `radial-gradient(circle at 0% 0%, ${color} 0%, ${color} 40%, ${Color(color)
      .darken(0.15)
      .toString()} 100%)`;
  const classes = classNames("creaditCard", className, {
    "creaditCard--selected": isSelected
  });

  return (
    <div
      ref={refProp}
      onClick={() => callBackCardClick(payment)}
      style={{
        background: getLinear(CardStyleInfo[3].bg)
      }}
      className={classes}
    >
      <div className="creaditCard__logoWrap">
        <PhotoFrame
          unStyle
          className="creaditCard__logo"
          type=".png"
          src={IMG_REPO + folderName + "cd_" + CardStyleInfo[3].logo}
        />
        <span className="JDsmall-text creaditCard__label">{`(${LANG(
          "credit"
        )})`}</span>
      </div>
      <div className="creaditCard__cardNumber">{card_space(cardNo)}</div>
      <div className="creaditCard__cardDate">11/22</div>
    </div>
  );
};

export default CreaditCard;
