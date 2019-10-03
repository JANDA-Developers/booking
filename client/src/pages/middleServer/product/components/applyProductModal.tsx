import React, {Fragment, useState} from "react";
import {toast} from "react-toastify";
import Modal from "../../../../atoms/modal/Modal";
import {
  IUseModal,
  useSwitch,
  useRadio,
  useInput
} from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import Radio from "../../../../atoms/forms/radio/Radio";
import InputText from "../../../../atoms/forms/inputText/InputText";
import LayoutCards from "./layoutCard/LayoutCards";
import JDLabel from "../../../../atoms/label/JDLabel";
import {IAdditionHook} from "../SelectProductWrap";
import {LayoutType, ProductTypeKey} from "../../../../types/enum";
import {isUrl} from "../../../../utils/inputValidations";
import {
  getAllProductTypes_GetAllProductTypes_productTypes,
  buyProduct,
  buyProductVariables
} from "../../../../types/api";
import {MutationFn} from "react-apollo";
import {IProductTypeDesc} from "../../../../types/interface";

export interface applyProductModalInfo {
  productType: IProductTypeDesc;
}

interface IProps {
  buyProductMu: MutationFn<buyProduct, buyProductVariables>;
  modalHook: IUseModal<applyProductModalInfo>;
  houseId: string;
}

// ❕ 어차피 버튼 눌러서 수정할거니까 전부 STATE 에 하면됨
const ApplyProductModal: React.FC<IProps> = ({
  houseId,
  modalHook,
  buyProductMu
}) => {
  if (!modalHook.isOpen) return <div />;

  const {productType} = modalHook.info;
  const isSelectExMode = productType.key === ProductTypeKey.DEMO;

  const [step, setStep] = useState(1);
  const [appInfoValue, setAppInfoValue] = useState({
    useLayout: false,
    url: "",
    layoutType: LayoutType.Layout_A
  });

  const {layoutType, url, useLayout} = appInfoValue;
  const handleUseLayoutRadio = (value: boolean) => {
    setAppInfoValue({...appInfoValue, useLayout: value});
  };

  const validation = () => {
    return true;
  };

  return (
    <Modal className="applyProductModal" {...modalHook}>
      {step === 1 && (
        <div className="JDmodal__endSection">
          <h3>{productType.name}</h3>
          <div className="modal__section">{productType.detailDesc}</div>
          <Button
            thema="point"
            
            label="이 상품을 숙소에 적용하기"
            onClick={() => {
              setStep(2);
            }}
          />
        </div>
      )}
      {step === 2 && (
        <div>
          <div className="modal__section">
            {isSelectExMode ? (
              <div>
                잔다 고객분들에게 무료 홈페이지를 제공합니다. <br />
                잔다 홈페이지를 살펴보세요.
              </div>
            ) : (
              <div>
                잔다 고객분들에게 무료 홈페이지를 제공합니다. <br />
                홈페이지를 신청하시겠습니까?
              </div>
            )}
          </div>
          <div className="modal__section">
            <Radio
              selectedValue={useLayout}
              onChange={handleUseLayoutRadio}
              value={true}
              label="희망합니다."
              id="HR1--1"
              groupName="HompageRadio"
            />
            <Radio
              selectedValue={useLayout}
              onChange={handleUseLayoutRadio}
              value={false}
              label="예약서비스만 사용하겠습니다."
              id="HR1--2"
              groupName="HompageRadio"
            />
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <div className="modal__section">
            <h5>레이아웃 선택</h5>
            <div className="">
              <div className="applyProductModal__cardsWrap">
                <LayoutCards
                  selectedLayout={layoutType}
                  setLayout={(value: LayoutType) => {
                    setAppInfoValue({...appInfoValue, layoutType: value});
                  }}
                />
              </div>
            </div>
            {isSelectExMode || (
              <InputText
                placeholder="http://"
                validation={isUrl}
                label="신청URL"
                value={url}
                onChange={(value: string) => {
                  setAppInfoValue({...appInfoValue, url: value});
                }}
              />
            )}
          </div>
        </div>
      )}
      {step > 1 && (
        <div className="JDmodal__endSection">
          <Button
            
            thema="primary"
            label="신청하기"
            onClick={() => {
              if (useLayout && step === 2) setStep(3);
              else if (validation()) {
                buyProductMu({
                  variables: {
                    houseId,
                    productTypeId: productType._id,
                    appInfoRequest: {
                      layoutType: appInfoValue.layoutType,
                      url: appInfoValue.url,
                      useHostApp: appInfoValue.useLayout
                    }
                  }
                });

                modalHook.closeModal();
              }
            }}
          />
        </div>
      )}
    </Modal>
  );
};

export default ApplyProductModal;
