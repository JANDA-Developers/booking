import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import CardBillingModal from "./CardBilingModal";
import {
  registerBillKeyVariables,
  registerBillKey,
  updateProductBillInfo,
  updateProductBillInfoVariables
} from "../../types/api";
import { useMutation } from "@apollo/react-hooks";
import {
  REGISTE_BILLKEY,
  UPDATE_PRODUCT_BILL_INFO
} from "../../apollo/queries";
import client from "../../apollo/apolloClient";
import { IUseModal } from "../../hooks/hook";

export interface IChainProp {
  modalHook: IUseModal;
  context: IContext;
}

interface IProps extends IChainProp {}

const CardBillingModalWrap: React.FC<IProps> = ({ modalHook, context }) => {
  const [updateBillPayMu, { loading: updateBillPayLoading }] = useMutation<
    updateProductBillInfo,
    updateProductBillInfoVariables
  >(UPDATE_PRODUCT_BILL_INFO, {
    client
  });

  const [createBillMu, { loading: registerBillLoading }] = useMutation<
    registerBillKey,
    registerBillKeyVariables
  >(REGISTE_BILLKEY, {
    client
  });

  return (
    <CardBillingModal
      updateBillPayMu={updateBillPayMu}
      modalHook={modalHook}
      createBillMu={createBillMu}
      context={context}
      loading={registerBillLoading || updateBillPayLoading}
    />
  );
};

export default CardBillingModalWrap;
