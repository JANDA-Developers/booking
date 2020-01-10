import React, { useState } from "react";
import Modal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG, useModal } from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import { MutationFn } from "react-apollo";
import {
  IProductTypeDec,
  IBillInfo,
  TPayinfoes
} from "../../../../types/interface";
import CardModal, {
  ICardModalInfo
} from "../../myPage/components/cardModal.tsx/CardModal";
import { IContext } from "../../BookingHostRouter";
import BillCompleteView from "../../../../components/bilingModal/components/PeriodicPay";
import { muResult, isEmpty } from "../../../../utils/utils";
import { selectProduct, selectProductVariables } from "../../../../types/api";
import PreloaderModal from "../../../../atoms/preloaderModal/PreloaderModal";

export interface applyProductModalInfo {
  productType: IProductTypeDec;
}

interface IProps {
  loading?: boolean;
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
  buyProductMu,
  loading
}) => {
  if (!modalHook.isOpen) return <div />;
  const {
    house: { name, _id, product },
    user: { paymentInfos }
  } = context;
  const havePaymentInfoes = !isEmpty(paymentInfos);
  const cardModalHook = useModal<ICardModalInfo>(false);
  const [billInfo, setBillInfo] = useState<null | IBillInfo | TPayinfoes>(null);
  const { productType } = modalHook.info;
  const [step, setStep] = useState<"describe" | "complete">("describe");
  const updateVariables = {
    param: {
      houseId: _id,
      productTypeId: productType._id
    }
  };

  const doBuyProduct = async (billInfo: IBillInfo | TPayinfoes) => {
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
  };

  const findHousesBillInfo = () => {
    const err = () => {
      throw new Error(
        "can not find billKey of product.billkey in user.paymentInfoes"
      );
    };

    if (havePaymentInfoes && paymentInfos && product?.billKey) {
      const tempResult = paymentInfos.find(p => p.billKey === product.billKey);
      if (!tempResult) err();

      return tempResult;
    }
    err();
  };

  const openCardModalHook = () => {
    // card가 존재하지 않느지 확인해야한다
    cardModalHook.openModal({
      currentHouseInfo: {
        houseName: name
      },
      createCardCallBack: async billInfo => {
        await doBuyProduct(billInfo);
      }
    });
  };

  if (loading) return <PreloaderModal loading={loading} />;

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
            onClick={async () => {
              if (havePaymentInfoes) {
                const billInfo = findHousesBillInfo();
                await doBuyProduct(billInfo!);
                return;
              } else {
                openCardModalHook();
              }
            }}
          />
        </div>
      )}
      {step === "complete" && billInfo && (
        <BillCompleteView context={context} billInfo={billInfo} />
      )}
      <CardModal modalHook={cardModalHook} context={context} />
    </Modal>
  );
};

export default ApplyProductModal;
