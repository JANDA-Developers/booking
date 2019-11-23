import React from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import CardBillingModal from "./CardBilingModal";
import { createBillkey, createBillkeyVariables } from "../../types/api";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_BILLKEY } from "../../apollo/queries";
import client from "../../apollo/apolloClient";
import { onCompletedMessage } from "../../utils/utils";
import { LANG, IUseModal } from "../../hooks/hook";

export interface IChainProp {
  modalHook: IUseModal;
  context: IContext;
}

interface IProps extends IChainProp {}

const CardBillingModalWrap: React.FC<IProps> = ({ modalHook, context }) => {
  const [createBillMu, { loading }] = useMutation<
    createBillkey,
    createBillkeyVariables
  >(CREATE_BILLKEY, {
    client,
    onCompleted: ({ CreateBillkey }) => {
      onCompletedMessage(
        CreateBillkey,
        LANG("card_regist_complete"),
        LANG("card_regist_complete_fail")
      );
    }
  });

  return (
    <CardBillingModal
      modalHook={modalHook}
      createBillMu={createBillMu}
      context={context}
    />
  );
};

export default CardBillingModalWrap;
