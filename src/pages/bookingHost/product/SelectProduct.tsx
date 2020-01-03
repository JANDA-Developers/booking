/* eslint-disable no-underscore-dangle */
import React, { useEffect, Fragment, useState } from "react";
import JDproductCard from "./components/ProductCard";
import Preloader from "../../../atoms/preloader/Preloader";
import Slider from "../../../atoms/slider/Slider";
import { isEmpty } from "../../../utils/utils";
import Tooltip, { ReactTooltip } from "../../../atoms/tooltip/Tooltip";
import { IHouse, IProductTypeDec } from "../../../types/interface";
import { useModal, LANG } from "../../../hooks/hook";
import "./SelectProduct.scss";
import {
  refundProduct,
  refundProductVariables,
  buyProduct,
  buyProductVariables,
  getMyProfile_GetMyProfile_user_houses_product
} from "../../../types/api";
import { MutationFn } from "react-apollo";
import ApplyProductModal, {
  applyProductModalInfo
} from "./components/ApplyProductModal";
import JDlist from "../../../atoms/list/List";
import { inOr } from "../../../utils/C";
import PreloaderModal from "../../../atoms/preloaderModal/PreloaderModal";
import PageBody, { PageBottom } from "../../../components/pageBody/PageBody";
import { closeTooltip } from "../../../utils/closeTooltip";
import { WindowSize } from "../../../types/enum";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { IContext } from "../BookingHostRouter";

interface IProps {
  productTypeDecs: IProductTypeDec[];
  refundMu: MutationFn<refundProduct, refundProductVariables>;
  buyProductMu: MutationFn<buyProduct, buyProductVariables>;
  loading: boolean;
  mutationLoading: boolean;
  selectedHouse: IHouse;
  currentProduct: getMyProfile_GetMyProfile_user_houses_product | undefined;
  isPhoneVerified: boolean;
  context: IContext;
  disableProducts?: string[];
}

// currentProduct : 현재 적용중인 서비스
const SelectProducts: React.FC<IProps> = ({
  productTypeDecs,
  buyProductMu,
  context,
  loading,
  selectedHouse,
  currentProduct,
  mutationLoading,
  disableProducts
}) => {
  productTypeDecs.filter(
    productType => !disableProducts?.includes(productType._id)
  );
  const currentProductTypeId = inOr(currentProduct, "_id", "");
  const applyModal = useModal<applyProductModalInfo>(false);
  const [selectedProductTypeId, setSelectedProductTypeId] = useState(
    currentProductTypeId
  );

  const isTabeltDown = window.innerWidth < WindowSize.TABLET;

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const CardsGroup = () => (
    <div className="flex-grid__col selectProducts__productWrap">
      <Slider condition={isTabeltDown} onSwipe={closeTooltip} infinite={false}>
        {productTypeDecs.map((productTypeDec, index) => {
          const { _id } = productTypeDec;
          const commonProps = {
            productTypeDec: productTypeDec,
            setSelectedProductTypeId: setSelectedProductTypeId,
            isCurrent: currentProductTypeId === _id,
            isSelected: selectedProductTypeId === _id,
            applyModal: applyModal
          };
          return isTabeltDown ? (
            <JDproductCard id={`Product${index}`} key={_id} {...commonProps} />
          ) : (
            <JDproductCard
              id={`Product${index}--slider`}
              key={`${_id}--slider`}
              slider
              {...commonProps}
            />
          );
        })}
      </Slider>
    </div>
  );

  return (
    <div id="selectProducts" className="selectProducts">
      <PageHeader title={LANG("select_service")} />
      <PageBody>
        <Preloader size={"large"} loading={loading} />
        <div className="flex-grid flex-grid-grow selectProducts__productWrapWrap">
          <CardsGroup />
        </div>
        <PageBottom>
          {isEmpty(selectedHouse) ? (
            <span className="JDtextColor--error">
              {LANG("no_house_currently_created")}
            </span>
          ) : (
            <JDlist
              contents={[
                LANG("F_selected_product_apply_to_house"),
                <span className="JDtextColor--error">
                  {LANG(
                    "if_you_choose_wrong_size_product_to_house_service_can_be_stop"
                  )}
                </span>
              ]}
            />
          )}
        </PageBottom>
      </PageBody>
      <ApplyProductModal
        context={context}
        houseId={selectedHouse?._id || ""}
        buyProductMu={buyProductMu}
        modalHook={applyModal}
      />
      {/* 툴팁  : disabled */}
      <Tooltip
        getContent={() => <span>{LANG("can_use_after_phone_auth")}</span>}
        class="JDtooltip"
        clickable
        id="tooltip__productDisable"
        effect="solid"
      />
      <Tooltip
        getContent={() => <span>{LANG("currently_applied_service")}</span>}
        class="JDtooltip"
        clickable
        id="tooltip__currentProduct"
        effect="solid"
      />
      <PreloaderModal loading={mutationLoading} />
    </div>
  );
};

export default SelectProducts;
