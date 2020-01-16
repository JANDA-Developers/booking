import React, { Fragment, useState } from "react";
import { useSelect, LANG, useModal } from "../../../../../../hooks/hook";
import {
  updateProductBillPayStatus,
  updateProductBillPayStatusVariables
} from "../../../../../../types/api";
import client from "../../../../../../apollo/apolloClient";
import { UPDATE_PRODUCT_BILL_PAY_STATUS } from "../../../../../../apollo/queries";
import { useMutation } from "@apollo/react-hooks";
import {
  onCompletedMessage,
  muResult,
  textAlignClass
} from "../../../../../../utils/utils";
import { IContext } from "../../../../BookingHostRouter";
import Button from "../../../../../../atoms/button/Button";
import JDmodal from "../../../../../../atoms/modal/Modal";
import ModalEndSection from "../../../../../../atoms/modal/components/ModalEndSection";

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
  const modalHook = useModal(false);
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

  const handelChangeBtn = () => {
    updateProductBillPayStatusMu({
      variables: {
        param: {
          isContinue: !isContinue,
          productId
        }
      }
    });
  };

  return (
    <Fragment>
      <Button
        mode="border"
        label={isContinue ? LANG("periodical_paying") : LANG("pay_stopped")}
        onClick={() => {
          modalHook.openModal();
        }}
      />
      <JDmodal {...modalHook}>
        <div className="modal__section">
          {LANG("do_you_want_to_change_periodical_pay")}
        </div>
        <ModalEndSection>
          <Button
            thema={isContinue ? "error" : "primary"}
            mode="flat"
            label={LANG(isContinue ? "auto_pay_stop" : "auto_pay_continue")}
            onClick={handelChangeBtn}
          />
        </ModalEndSection>
      </JDmodal>
    </Fragment>
  );
};

export default SelecterPayStatus;
