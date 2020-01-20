import React, { useEffect } from "react";
import "./CreaditCard.scss";
import PhotoFrame from "../../../../../../atoms/photoFrame/PhotoFrame";
import { LANG } from "../../../../../../hooks/hook";
import Color from "color";
import { getMyProfile_GetMyProfile_user_paymentInfos } from "../../../../../../types/api";
import { CardStyleInfo, CreaditCardTypesShort } from "./helper";
import classNames from "classnames";
import { card_space } from "../../../../../../utils/autoFormat";
import { IMG_REPO } from "../../../../../../types/const";
import { IPayTaget } from "../../../../../../utils/getTargetsWithBillKey";
import JDbadge from "../../../../../../atoms/badge/Badge";
import { isEmpty } from "../../../../../../utils/utils";
import ReactTooltip from "react-tooltip";

interface Iprops {
  payTargets: IPayTaget[];
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
  payTargets,
  isSelected,
  refProp
}) => {
  const { card, cardNo }: any = payment;
  // @ts-ignore
  const cardShort = CreaditCardTypesShort[card];
  const folderName = "card_logo/";
  const haveTaget = isEmpty(payTargets);

  const getLinear = (color: string) =>
    `radial-gradient(circle at 0% 0%, ${color} 0%, ${color} 40%, ${Color(color)
      .darken(0.15)
      .toString()} 100%)`;
  const classes = classNames("creaditCard", className, {
    "creaditCard--selected": isSelected
  });
  const cardStyle = CardStyleInfo.find(card => card.logo === cardShort);
  if (!cardShort || !cardStyle) throw Error(`unExist card type ${card}`);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <div
      ref={refProp}
      onClick={() => callBackCardClick(payment)}
      style={{
        background: getLinear(cardStyle.bg)
      }}
      className={classes}
    >
      <div className="creaditCard__logoWrap">
        {/* logo */}
        <PhotoFrame
          unStyle
          className="creaditCard__logo"
          type=".png"
          src={IMG_REPO + folderName + "cd_" + cardStyle.logo}
        />
        {/* creadi t+ */}
        <span className="JDsmall-text creaditCard__label">{`(${LANG(
          "credit"
        )})`}</span>
      </div>
      <div className="creaditCard__cardNumber">{card_space(cardNo)}</div>
      <div className="creaditCard__cardDate">11/22</div>
      <span className="creaditCard__badgeWrap">
        {haveTaget || (
          <JDbadge
            tooltip={payTargets.map(target => target.name)}
            thema="primary"
          >
            {LANG("periodical_paying")}
          </JDbadge>
        )}
      </span>
    </div>
  );
};

export default CreaditCard;
