import React, { useState } from "react";
import Modal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG, useModal } from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import { MutationFn } from "react-apollo";
import { IProductTypeDec } from "../../../../types/interface";
import CardModal, {
  ICardModalInfo
} from "../../myPage/components/cardModal.tsx/CardModal";
import { IContext } from "../../BookingHostRouter";
import BillCompleteView from "../../../../components/bilingModal/components/PeriodicPay";
import { muResult } from "../../../../utils/utils";
import { TCardViewInfo } from "../../../../components/bilingModal/components/CardInfoFormWrap";
import { selectProduct, selectProductVariables } from "../../../../types/api";

export interface applyProductModalInfo {
  productType: IProductTypeDec;
}

interface IProps {
  buyProductMu: MutationFn<selectProduct, selectProductVariables>;
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
  const {
    house: { name, _id }
  } = context;
  const cardModalHook = useModal<ICardModalInfo>(false);
  const [billInfo, setBillInfo] = useState();
  const { productType } = modalHook.info;
  const [step, setStep] = useState<"describe" | "complete">("describe");

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
              cardModalHook.openModal({
                currentHouseInfo: {
                  houseName: name
                },
                selectCallBack: async (billInfo: TCardViewInfo) => {
                  const result = await buyProductMu({
                    variables: {
                      param: {
                        houseId: _id,
                        productTypeId: productType._id
                      }
                    }
                  });
                  if (muResult(result, "SelectProduct")) {
                    setStep("complete");
                    setBillInfo(billInfo);
                  }
                }
              });
            }}
          />
        </div>
      )}
      {step === "complete" && (
        <BillCompleteView context={context} billInfo={billInfo} />
      )}
      <CardModal modalHook={cardModalHook} context={context} />
    </Modal>
  );
};

export default ApplyProductModal;
