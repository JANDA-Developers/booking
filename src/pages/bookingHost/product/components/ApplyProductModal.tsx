import React, { useState } from "react";
import Modal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG, useModal } from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import { ProductTypeKey } from "../../../../types/enum";
import { buyProduct, buyProductVariables } from "../../../../types/api";
import { MutationFn } from "react-apollo";
import { IProductTypeDec } from "../../../../types/interface";
import CardModal from "../../myPage/components/cardModal.tsx/CardModal";
import { IContext } from "../../BookingHostRouter";

export interface applyProductModalInfo {
  productType: IProductTypeDec;
}

interface IProps {
  buyProductMu: MutationFn<buyProduct, buyProductVariables>;
  modalHook: IUseModal<applyProductModalInfo>;
  houseId: string;
  context: IContext;
}

// ❕ 어차피 버튼 눌러서 수정할거니까 전부 STATE 에 하면됨
const ApplyProductModal: React.FC<IProps> = ({
  context,
  houseId,
  modalHook,
  buyProductMu
}) => {
  if (!modalHook.isOpen) return <div />;

  const cardModalHook = useModal(false);
  const { productType } = modalHook.info;
  const [step, setStep] = useState<"describe" | "cardSelect" | "complete">(
    "describe"
  );
  const isSelectTestMode = productType.key === ProductTypeKey.DEMO;

  const validation = () => {
    return true;
  };

  return (
    <Modal className="applyProductModal" {...modalHook}>
      {step === "describe" && (
        <div className="JDmodal__endSection">
          <h3>{productType.name}</h3>
          <div className="modal__section">{productType.detailDesc}</div>
          <Button
            id="ApplyStepDescBtnApplyStepDescBtn"
            mode="flat"
            thema="point"
            label={LANG("apply_this_product_to_house")}
            onClick={() => {
              if (isSelectTestMode) {
                setStep("complete");
              } else {
                setStep("cardSelect");
              }
            }}
          />
        </div>
      )}
      {step === "cardSelect" && (
        <CardModal modalHook={cardModalHook} context={context} />
      )}
    </Modal>
  );
};

export default ApplyProductModal;
