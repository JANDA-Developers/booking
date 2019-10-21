import React, {Fragment} from "react";
import "./Product.scss";
import JDIcon, {IconSize} from "../../../../atoms/icons/Icons";
import JDbadge from "../../../../atoms/badge/Badge";
import Button from "../../../../atoms/button/Button";
import {IUseModal, LANG} from "../../../../hooks/hook";
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
  const {disable} = productType;

  const handleProductSelect = () => {
    if (disable) {
      toast.success(LANG("please_inquire_separately"));
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
              <JDbadge thema={"positive"}>{LANG("useing")}}</JDbadge>
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
              label={LANG("choose_product")}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default JDproduct;
