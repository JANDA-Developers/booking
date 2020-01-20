import React, { Fragment } from "react";
import "./ProductCard.scss";
import JDIcon from "../../../../atoms/icons/Icons";
import JDbadge from "../../../../atoms/badge/Badge";
import Button from "../../../../atoms/button/Button";
import { IUseModal, LANG } from "../../../../hooks/hook";
import { IProductTypeDec } from "../../../../types/interface";
import { applyProductModalInfo } from "./ApplyProductModal";
import classNames from "classnames";
import { toast } from "react-toastify";

//  👿 방관련된 정보들을 정리해서 interfcae로 만드는편이 낳음
interface IProps {
  productTypeDec: IProductTypeDec;
  slider?: boolean;
  hover?: boolean;
  isSelected?: boolean;
  isCurrent?: boolean;
  applyModal?: IUseModal<applyProductModalInfo>;
  setSelectedProductTypeId?: React.Dispatch<React.SetStateAction<string>>;
  id?: string;
}

const JDproductCard: React.FC<IProps> = ({
  id,
  productTypeDec,
  slider,
  hover = true,
  isSelected,
  applyModal,
  setSelectedProductTypeId,
  isCurrent
}) => {
  const {
    disable,
    name,
    price,
    icon,
    shortDesc,
    priceText,
    _id
  } = productTypeDec;

  const handleProductSelect = () => {
    if (disable) {
      toast.success(LANG("please_inquire_separately"));
      return;
    }
    setSelectedProductTypeId && setSelectedProductTypeId(_id);
    applyModal && applyModal.openModal({ productType: productTypeDec });
  };

  const classes = classNames("JDproduct", undefined, {
    "JDproduct--slider": slider,
    "JDproduct--selected": isSelected,
    "JDproduct--disable": disable,
    "JDproduct--hover": hover
  });

  return (
    <Fragment>
      <div
        id={id}
        className={classes}
        onClick={slider ? undefined : handleProductSelect}
      >
        <div>
          <div className="JDproduct__iconWrap">
            <JDIcon
              size={"largest"}
              className="JDproduct__icon"
              icon={icon || "rocket"}
            />
          </div>
          <h4 className="JDproduct__limit">
            {name}{" "}
            <span className="JDproduct__badgeWrap">
              {isCurrent && (
                <JDbadge thema={"positive"}>{LANG("useing")}</JDbadge>
              )}
            </span>
          </h4>
        </div>
        <div className="JDproduct__decs">{shortDesc}</div>
        <h5 className="JDproduct__price">{priceText}</h5>

        <div>
          {slider && (
            <Button
              mode="flat"
              thema="point"
              onClick={handleProductSelect}
              label={LANG("choose_product")}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default JDproductCard;
