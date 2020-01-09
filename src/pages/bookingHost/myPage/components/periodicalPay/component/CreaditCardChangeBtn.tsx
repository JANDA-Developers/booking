import React from "react";
import {
  updateProductBillInfoVariables,
  updateProductBillInfo
} from "../../../../../../types/api";
import { UPDATE_PRODUCT_BILL_INFO } from "../../../../../../apollo/queries";
import { onCompletedMessage } from "../../../../../../utils/utils";
import { LANG, IUseModal } from "../../../../../../hooks/hook";
import Button from "../../../../../../atoms/button/Button";
import client from "../../../../../../apollo/apolloClient";
import {
  ICardModalInfo,
  ICardModalTarget
} from "../../cardModal.tsx/CardModal";
import { useMutation } from "@apollo/react-hooks";

interface Iprops {
  cardModalHook: IUseModal<ICardModalInfo>;
  currentHouseInfo: ICardModalTarget;
}

const CreaditCardChangeBtn: React.FC<Iprops> = ({
  cardModalHook,
  currentHouseInfo
}) => {
  // 카드 등록
  const [
    updateProductBillInfoMu,
    { loading: registerBillLoading }
  ] = useMutation<updateProductBillInfo, updateProductBillInfoVariables>(
    UPDATE_PRODUCT_BILL_INFO,
    {
      client,
      onCompleted: ({ UpdateProductBillInfo }) => {
        onCompletedMessage(
          UpdateProductBillInfo,
          LANG("card_regist_complete"),
          LANG("card_regist_complete_fail")
        );
      }
    }
  );

  return (
    <Button
      id="CreaditCardChangeBtn"
      mode="border"
      onClick={() => {
        // 1. 카드 등록이 안된경우
        // 2. 카드 등록은 했지만 결제등록이 안된경우
        cardModalHook.openModal({
          currentHouseInfo,
          selectCallBack: biinInfo => {
            updateProductBillInfoMu({
              variables: {
                param: {
                  billKey: biinInfo.billKey,
                  productIds: [currentHouseInfo.product!._id]
                }
              }
            });
          }
        });
      }}
      label={LANG("creadit_card_change")}
    />
  );
};

export default CreaditCardChangeBtn;
