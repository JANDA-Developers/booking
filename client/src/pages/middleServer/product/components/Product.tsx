import React, {Fragment} from "react";
import Radio from "../../../../atoms/forms/radio/Radio";
import "./Product.scss";
import {Product, ProductTypeKey} from "../../../../types/enum";
import JDIcon, {IIcons, IconSize} from "../../../../atoms/icons/Icons";
import JDbadge, {BADGE_THEMA} from "../../../../atoms/badge/Badge";
import {getAllProductTypes_GetAllProductTypes_productTypes} from "../../../../types/api";
import {autoComma} from "../../../../utils/utils";
import Button from "../../../../atoms/button/Button";
import {IUseModal} from "../../../../actions/hook";
import {IProductTypeDesc} from "../../../../types/interface";
import {applyProductModalInfo} from "./applyProductModal";
import classNames from "classnames";
import {toast} from "react-toastify";

//  👿 방관련된 정보들을 정리해서 interfcae로 만드는편이 낳음
interface IProps {
  productType: IProductTypeDesc;
  slider?: boolean;
  isSelected: boolean;
  isCurrent: boolean;
  applyModal: IUseModal<applyProductModalInfo>;
  setSelectedProductTypeId: React.Dispatch<React.SetStateAction<string>>;
}

const JDproduct: React.FC<IProps> = ({
  productType,
  slider,
  isSelected,
  applyModal,
  setSelectedProductTypeId,
  isCurrent
}) => {
  console.log(isCurrent);
  console.log(isCurrent);
  console.log(isCurrent);
  console.log(isCurrent);
  const {disable, priceText, name, shortDesc} = productType;

  const handleProductSelect = () => {
    if (disable) {
      toast.success("본 상품은 별도 문의 바랍니다.");
      return;
    }
    setSelectedProductTypeId(productType._id);
    applyModal.openModal({productType});
  };

  const classes = classNames("JDproduct", undefined, {
    "JDproduct--slider": slider,
    "JDproduct--selected": isSelected,
    "JDproduct--disable": disable
  });

  return (
    <Fragment>
      <div
        className={classes}
        onClick={slider ? undefined : handleProductSelect}
      >
        <div>
          <div className="JDproduct__iconWrap">
            <JDIcon
              size={IconSize.SUPER_LARGE}
              className="JDproduct__icon"
              icon={productType.icon || "rocket"}
            />
          </div>
          <h4 className="JDproduct__limit">
            {productType.name}{" "}
            {isCurrent && (
              <JDbadge thema={BADGE_THEMA.POSITIVE}>사용중</JDbadge>
            )}
          </h4>
        </div>
        <div className="JDproduct__decs">{productType.shortDesc}</div>
        <h5 className="JDproduct__price">{productType.priceText}</h5>

        <div>
          {slider && (
            <Button
              mode="border"
              thema="point"
              onClick={handleProductSelect}
              label="상품선택"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default JDproduct;
