import React from "react";
import JDmodal from "../../../../../../atoms/modal/Modal";
import Button from "../../../../../../atoms/button/Button";
import { IUseModal, LANG } from "../../../../../../hooks/hook";
import { useMutation } from "@apollo/react-hooks";
import {
  DIS_CONTINUE_PRODUCT,
  GET_USER_INFO
} from "../../../../../../apollo/queries";
import client from "../../../../../../apollo/apolloClient";
import {
  discontinueProduct,
  discontinueProductVariables
} from "../../../../../../types/api";
import { onCompletedMessage } from "../../../../../../utils/utils";
import { IContext } from "../../../../BookingHostRouter";
import { getOperationName } from "apollo-link";

interface Iprops {
  modalHook: IUseModal;
  context: IContext;
}

const BillPayChangeModal: React.FC<Iprops> = ({ modalHook, context }) => {
  const { applyedProduct } = context;
  const { _id: productId } = applyedProduct!;
  const [discontinueMu, { loading }] = useMutation<
    discontinueProduct,
    discontinueProductVariables
  >(DIS_CONTINUE_PRODUCT, {
    client,
    refetchQueries: [getOperationName(GET_USER_INFO)!],
    onCompleted: ({ DiscontinueProduct }) => {
      onCompletedMessage(
        DiscontinueProduct,
        LANG("bill_pay_cancle_complete"),
        LANG("bill_pay_cancle_fail")
      );
      modalHook.closeModal();
    }
  });

  return (
    <JDmodal {...modalHook}>
      <h6>{LANG("change_periodical_change")}</h6>
      <div className="JDmodal__endSection">
        <Button
          mode="flat"
          onClick={() => {
            discontinueMu({
              variables: {
                productId
              }
            });
          }}
          thema="error"
          label={LANG("bill_pay_cancle")}
        />
      </div>
    </JDmodal>
  );
};

export default BillPayChangeModal;
