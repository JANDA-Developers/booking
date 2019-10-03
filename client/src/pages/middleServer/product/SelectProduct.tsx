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
import {useModal} from "../../../hooks/hook";
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

interface IProps {
  productTypes: IProductTypeDesc[];
  refundMu: MutationFn<refundProduct, refundProductVariables>;
  buyProductMu: MutationFn<buyProduct, buyProductVariables>;
  loading: boolean;
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
  isPhoneVerified
}) => {
  const currentProductTypeId = currentProduct
    ? currentProduct.productType._id
    : "";
  const applyModal = useModal<applyProductModalInfo>(false);
  const refundModal = useModal(false);

  const [selectedProductTypeId, setSelectedProductTypeId] = useState(
    currentProductTypeId
  );

  const handleSelectProductType = (value: any) =>
    setSelectedProductTypeId(value.replace("--slider", ""));

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const closeTooltip = () => {
    ReactTooltip.hide();
  };

  return (
    <div id="selectProducts" className="selectProducts container">
      <div className="docs-section">
        <h3>서비스 선택</h3>
        <div className="docs-section__box">
          <div
            title="프로덕트 그룹"
            className="flex-grid flex-grid-grow selectProducts__productWrapWrap"
          >
            <div className="flex-grid__col selectProducts__productWrap col--wmd-0">
              <Preloader noAnimation size="large" loading={loading} />
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
                현재 생성된 숙소가 없습니다.
              </span>
            ) : (
              <JDlist
                contents={[
                  <span>
                    * 선택하신 서비스는 숙소
                    <span className="JDtextColor--point">
                      {selectedHouse.name}
                    </span>
                    에 적용됩니다.
                  </span>,
                  <span className="JDtextColor--error">
                    규모에 맞지 않는 숙소를 선택하실 경우에 서비스가 중지 될수
                    있습니다.
                  </span>
                ]}
              />
            )}
          </p>
          {/* 서비스해지 버튼 */}
          {currentProduct && currentProduct._id && (
            <Button
              onClick={refundModal.openModal}
              disabled={isEmpty(selectedHouse)}
              thema="error"
              label="서비스해지"
            />
          )}
        </div>
      </div>
      {/* 리펀트 시작 */}
      <Modal className="refundModal" {...refundModal}>
        <h6>서비스 해지</h6>
        <p>
          <RefundPolicyNode />
        </p>
        <h6>서비스 해지 신청은 상담전화를 통해 요청바람니다.</h6>
        <div className="JDmodal__endSection">
          <Button onClick={refundModal.closeModal} label="닫기" />
        </div>
      </Modal>
      <ApplyProductModal
        houseId={selectedHouse && selectedHouse._id}
        buyProductMu={buyProductMu}
        modalHook={applyModal}
      />
      {/* 툴팁  : disabled */}
      <Tooltip
        getContent={() => <span>휴대폰 인증후 사용가능</span>}
        class="JDtooltip"
        clickable
        id="tooltip__productDisable"
        effect="solid"
      />
      <Tooltip
        getContent={() => <span>현재 적용된 서비스</span>}
        class="JDtooltip"
        clickable
        id="tooltip__currentProduct"
        effect="solid"
      />
    </div>
  );
};

export default SelectProducts;
