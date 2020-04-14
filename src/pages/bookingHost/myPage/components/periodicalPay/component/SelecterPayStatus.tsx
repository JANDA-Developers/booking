import React, { Fragment, useState } from "react";
import { LANG, useModal } from "../../../../../../hooks/hook";
import {
  updateProductBillPayStatus,
  updateProductBillPayStatusVariables
} from "../../../../../../types/api";
import client from "../../../../../../apollo/apolloClient";
import {
  UPDATE_PRODUCT_BILL_PAY_STATUS,
  GET_USER_INFO
} from "../../../../../../apollo/queries";
import { useMutation } from "@apollo/react-hooks";
import { onCompletedMessage } from "../../../../../../utils/utils";
import { IContext } from "../../../../BookingHostRouter";
import TerminateModal from "./TerminateModal";
import TextButton from "../../../../../../atoms/textButton/TextButton";
import { getOperationName } from "apollo-link";

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
  const [btnLabel, setBtnLabel] = useState<"periodical_paying" | "pay_stopped">(
    "periodical_paying"
  );
  const terminateModalHook = useModal(false);
  const { house } = context;
  // 카드 삭제
  const [updateProductBillPayStatusMu] = useMutation<
    updateProductBillPayStatus,
    updateProductBillPayStatusVariables
  >(UPDATE_PRODUCT_BILL_PAY_STATUS, {
    client,
    refetchQueries: [getOperationName(GET_USER_INFO)!],
    onCompleted: ({ UpdateProductBillPayStatus }) => {
      onCompletedMessage(
        UpdateProductBillPayStatus,
        LANG("periodical_payment_is_changed")(
          house.name,
          UpdateProductBillPayStatus.product?.status.isContinue
        ),
        LANG("request_is_failed")
      );
    }
  });

  const statusChnage = (flag: boolean) => {
    updateProductBillPayStatusMu({
      variables: {
        param: {
          isContinue: flag,
          productId
        }
      }
    });
  };

  const handelTerminateBtn = () => {
    statusChnage(false);
  };

  return (
    <Fragment>
      <b className="JDstandard-space">
        {isContinue ? LANG("periodical_paying") : LANG("pay_stopped")}
      </b>
      <TextButton
        onClick={() => {
          if (isContinue) {
            terminateModalHook.openModal();
          } else {
            statusChnage(true);
          }
        }}
        size="small"
        mr="no"
        mb="no"
        mode="roundBorder"
        color={isContinue ? "error" : "point"}
      >
        {LANG(isContinue ? "auto_pay_stop" : "auto_pay_continue")}
      </TextButton>
      <TerminateModal
        modalHook={terminateModalHook}
        handleTerminateBtn={handelTerminateBtn}
      />
    </Fragment>
  );
};

export default SelecterPayStatus;
