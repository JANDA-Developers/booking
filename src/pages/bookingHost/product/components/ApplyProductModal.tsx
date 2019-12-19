import React, { useState } from "react";
import Modal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import Radio from "../../../../atoms/forms/radio/Radio";
import InputText from "../../../../atoms/forms/inputText/InputText";
import LayoutCards from "./layoutCard/LayoutCards";
import { LayoutType, ProductTypeKey } from "../../../../types/enum";
import { isUrl } from "../../../../utils/inputValidations";
import { buyProduct, buyProductVariables } from "../../../../types/api";
import { MutationFn } from "react-apollo";
import { IProductTypeDec } from "../../../../types/interface";

export interface applyProductModalInfo {
  productType: IProductTypeDec;
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

  const { productType } = modalHook.info;
  const isSelectExMode = productType.key === ProductTypeKey.DEMO;

  const [step, setStep] = useState(1);
  const [appInfoValue, setAppInfoValue] = useState({
    useLayout: false,
    url: "",
    layoutType: LayoutType.Layout_A
  });

  const { layoutType, url, useLayout } = appInfoValue;
  const handleUseLayoutRadio = (value: boolean) => {
    setAppInfoValue({ ...appInfoValue, useLayout: value });
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
            id="ApplyStep1Btn"
            mode="flat"
            thema="point"
            label={LANG("apply_this_product_to_house")}
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
                {LANG("JANDA_provide_free_homepage_for_guest")} <br />
                {LANG("check_our_samples")}
              </div>
            ) : (
              <div>
                {LANG("JANDA_provide_free_homepage_for_guest")} <br />
                {LANG("do_you_want_request_making_homepage")}
              </div>
            )}
          </div>
          <div className="modal__section">
            <Radio
              selectedValue={useLayout}
              onChange={handleUseLayoutRadio}
              value={true}
              label={LANG("yes")}
              id="HR1--1"
              groupName="HompageRadio"
            />
            <Radio
              selectedValue={useLayout}
              onChange={handleUseLayoutRadio}
              value={false}
              label={LANG("will_only_use_the_reservation_system")}
              id="HR1--2"
              groupName="HompageRadio"
            />
          </div>
        </div>
      )}
      {/* Only for Use Layout */}
      {step === 3 && (
        <div>
          <div className="modal__section">
            <h5>{LANG("select_layout")}</h5>
            <div>
              <div className="applyProductModal__cardsWrap">
                <LayoutCards
                  selectedLayout={layoutType}
                  setLayout={(value: LayoutType) => {
                    setAppInfoValue({ ...appInfoValue, layoutType: value });
                  }}
                />
              </div>
            </div>
            {isSelectExMode || (
              <InputText
                placeholder="http://"
                validation={isUrl}
                label={LANG("request_url")}
                value={url}
                onChange={(value: string) => {
                  setAppInfoValue({ ...appInfoValue, url: value });
                }}
              />
            )}
          </div>
        </div>
      )}
      {step > 1 && (
        <div className="JDmodal__endSection">
          <Button
            id="ApplyStepEndBtn"
            mode="flat"
            thema="primary"
            label={LANG("Apply")}
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
