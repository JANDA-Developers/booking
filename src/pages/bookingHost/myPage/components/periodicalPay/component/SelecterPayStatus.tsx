import React from "react";
import JDselect, {
  IselectedOption
} from "../../../../../../atoms/forms/selectBox/SelectBox";
import { useSelect, LANG } from "../../../../../../hooks/hook";
import {
  updateProductBillPayStatus,
  updateProductBillPayStatusVariables
} from "../../../../../../types/api";
import client from "../../../../../../apollo/apolloClient";
import { UPDATE_PRODUCT_BILL_PAY_STATUS } from "../../../../../../apollo/queries";
import { useMutation } from "@apollo/react-hooks";
import { onCompletedMessage, muResult } from "../../../../../../utils/utils";
import { IContext } from "../../../../BookingHostRouter";

interface Iprops {
  context: IContext;
  isContinue: boolean;
  productId: string;
}

const SelecterPayStatus: React.FC<Iprops> = ({
  productId,
  isContinue,
  context
}) => {
  const { house } = context;
  // 카드 삭제
  const [updateProductBillPayStatusMu] = useMutation<
    updateProductBillPayStatus,
    updateProductBillPayStatusVariables
  >(UPDATE_PRODUCT_BILL_PAY_STATUS, {
    client,
    onCompleted: ({ UpdateProductBillPayStatus }) => {
      onCompletedMessage(
        UpdateProductBillPayStatus,
        LANG("periodical_payment_is_stopped")(house.name),
        LANG("request_is_failed")
      );
    }
  });

  const CHANGE_PAY_STATUS_OP = [
    { value: true, label: "Continue" },
    { value: false, label: "Dis continue" }
  ];
  const selectHook = useSelect(
    isContinue ? CHANGE_PAY_STATUS_OP[0] : CHANGE_PAY_STATUS_OP[1]
  );

  const handleChange = async (v: IselectedOption) => {
    const result = await updateProductBillPayStatusMu({
      variables: {
        param: {
          isContinue: v.value,
          productId
        }
      }
    });
    if (muResult(result, "UpdateProductBillPayStatus")) {
      //  DO MUTATION AT HERE
      selectHook.onChange(v);
    }
  };

  return (
    <JDselect
      {...selectHook}
      onChange={handleChange}
      options={CHANGE_PAY_STATUS_OP}
    />
  );
};

export default SelecterPayStatus;
