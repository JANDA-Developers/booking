/* eslint-disable no-underscore-dangle */
import React, {useEffect, Fragment, useState} from "react";
import Product from "./components/Product";
import Button from "../../../atoms/button/Button";
import Preloader from "../../../atoms/preloader/Preloader";
import Modal from "../../../atoms/modal/Modal";
import Slider from "../../../atoms/slider/Slider";
import {isEmpty} from "../../../utils/utils";
import Tooltip, {ReactTooltip} from "../../../atoms/tooltip/Tooltip";
import {RefundPolicyNode} from "../../../docs/refundPolicy";
import {IHouse, IProductTypeDesc} from "../../../types/interface";
import {useModal, LANG} from "../../../hooks/hook";
import "./SelectProduct.scss";
import {
  refundProduct,
  refundProductVariables,
  buyProduct,
  buyProductVariables,
  getMyProfile_GetMyProfile_user_houses_product
} from "../../../types/api";
import {MutationFn} from "react-apollo";
import ApplyProductModal, {
  applyProductModalInfo
} from "./components/applyProductModal";
import JDlist from "../../../atoms/list/List";
import {inOr, Check} from "../../../utils/C";
import PrloaderModal from "../../../atoms/preloaderModal/PreloaderModal";

interface IProps {
  productTypes: IProductTypeDesc[];
  refundMu: MutationFn<refundProduct, refundProductVariables>;
  buyProductMu: MutationFn<buyProduct, buyProductVariables>;
  loading: boolean;
  mutationLoading: boolean;
  selectedHouse: IHouse;
  currentProduct: getMyProfile_GetMyProfile_user_houses_product | undefined;
  isPhoneVerified: boolean;
}

// currentProduct : 현재 적용중인 서비스
const SelectProducts: React.FC<IProps> = ({
  productTypes,
  refundMu,
  buyProductMu,
  loading,
  selectedHouse,
  currentProduct,
  isPhoneVerified,
  mutationLoading
}) => {
  const currentProductTypeId = inOr(currentProduct, "_id", "");
  const applyModal = useModal<applyProductModalInfo>(false);
  const refundModal = useModal(false);

  const [selectedProductTypeId, setSelectedProductTypeId] = useState(
    currentProductTypeId
  );

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // 유팀 함수로 옴겨야할듯 하다.
  const closeTooltip = () => {
    ReactTooltip.hide();
  };

  return (
    <div id="selectProducts" className="selectProducts container">
      <div className="docs-section">
        {loading && (
          <div>
            <Preloader size={"large"} loading={true} />
          </div>
        )}
        <h3>{LANG("select_service")}</h3>
        <div className="docs-section__box">
          <div
            title="프로덕트 그룹"
            className="flex-grid flex-grid-grow selectProducts__productWrapWrap"
          >
            <div className="flex-grid__col selectProducts__productWrap col--wmd-0">
              {productTypes.map(productType => (
                <Product
                  key={productType._id}
                  productType={productType}
                  setSelectedProductTypeId={setSelectedProductTypeId}
                  isCurrent={currentProductTypeId === productType._id}
                  isSelected={selectedProductTypeId === productType._id}
                  applyModal={applyModal}
                />
              ))}
            </div>
            <div className="flex-grid__col col--wmd-6 col--full-0">
              <Slider onSwipe={closeTooltip} infinite={false}>
                {productTypes.map(productType => (
                  <Product
                    key={`${productType._id}--slider`}
                    slider
                    productType={productType}
                    setSelectedProductTypeId={setSelectedProductTypeId}
                    isCurrent={currentProductTypeId === productType._id}
                    isSelected={selectedProductTypeId === productType._id}
                    applyModal={applyModal}
                  />
                ))}
              </Slider>
            </div>
          </div>
          <p title="하단 메세지">
            {isEmpty(selectedHouse) ? (
              <span className="JDtextColor-warring-text">
                {LANG("no_house_currently_created")}
              </span>
            ) : (
              <JDlist
                contents={[
                  LANG("F_selected_product_apply_to_house"),
                  <span className="JDtextColor--error">
                    *{" "}
                    {LANG(
                      "if_you_choose_wrong_size_product_to_house_service_can_be_stop"
                    )}
                  </span>
                ]}
              />
            )}
          </p>
          {/* 서비스해지 버튼 */}
          {Check(currentProduct, "_id") && (
            <Button
              onClick={refundModal.openModal}
              disabled={isEmpty(selectedHouse)}
              thema="error"
              label={LANG("release_service")}
            />
          )}
        </div>
      </div>
      {/* 리펀트 시작 */}
      <Modal className="refundModal" {...refundModal}>
        <h6>{LANG("release_service")}</h6>
        <p>
          <RefundPolicyNode />
        </p>
        <h6>{LANG("please_request_through_helpline")}</h6>
      </Modal>
      <ApplyProductModal
        houseId={inOr(selectedHouse, "_id", "")}
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
      <PrloaderModal loading={mutationLoading} />
    </div>
  );
};

export default SelectProducts;
