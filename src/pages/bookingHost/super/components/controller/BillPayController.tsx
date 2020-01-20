import React from "react";
import { IContext } from "../../../BookingHostRouter";
import {
  DO_BILL_PAY_PRODUCT,
  DO_BILL_PAY_CANCEL_PRODUCT
} from "../../../../../apollo/queries";
import client from "../../../../../apollo/apolloClient";
import {
  doBillPayProduct,
  doBillPayProductVariables,
  doBillPayCancelProduct,
  doBillPayCancelProductVariables
} from "../../../../../types/api";
import { useMutation } from "@apollo/react-hooks";
import { onCompletedMessage } from "../../../../../utils/utils";
import { LANG, IUseModal, useInput } from "../../../../../hooks/hook";
import JDmodal from "../../../../../atoms/modal/Modal";
import { Tab, TabList, TabPanel } from "react-tabs";
import Button from "../../../../../atoms/button/Button";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import { JDtabs } from "../../../../../atoms/tabs/Tabs_";
import { IControllSharedPorps } from "./SuperAdminControllModal";
import ModalEndSection from "../../../../../atoms/modal/components/ModalEndSection";

interface Iprops extends IControllSharedPorps {
  modalHook: IUseModal;
  billRequestParams: {
    pay?: doBillPayProductVariables;
    cancel?: doBillPayCancelProductVariables;
  };
}

const BillPayController: React.FC<Iprops> = ({
  context,
  data,
  modalHook,
  billRequestParams
}) => {
  const { product } = data!;

  const amtHook = useInput(billRequestParams.pay?.param.amt || 0);
  const amtCancelHook = useInput(
    billRequestParams.cancel?.param.payCancelInput.cancelAmt || 0
  );
  const decreasePeriodHook = useInput(
    billRequestParams.cancel?.param.decreasePeriod || 0
  );
  // 삭제 요청
  const [
    doBillPayProductMu,
    { loading: doBillPayProductLoading }
  ] = useMutation<doBillPayProduct, doBillPayProductVariables>(
    DO_BILL_PAY_PRODUCT,
    {
      client,
      ignoreResults: true,
      onCompleted: ({ DoBillPayProduct }) => {
        onCompletedMessage(
          DoBillPayProduct,
          LANG("delete_completed"),
          LANG("delete_failed")
        );
      }
    }
  );

  // 삭제 요청
  const [
    doBillPayCancelProductMu,
    { loading: doBillPayCancelProductLoading }
  ] = useMutation<doBillPayCancelProduct, doBillPayCancelProductVariables>(
    DO_BILL_PAY_CANCEL_PRODUCT,
    {
      client,
      ignoreResults: true,
      onCompleted: ({ DoBillPayCancelProduct }) => {
        onCompletedMessage(
          DoBillPayCancelProduct,
          LANG("delete_completed"),
          LANG("delete_failed")
        );
      }
    }
  );

  const handleDoBillPay = () => {
    if (billRequestParams.pay) {
      doBillPayProductMu({
        variables: {
          param: {
            ...billRequestParams.pay.param,
            amt: amtHook.value
          }
        }
      });
    }
  };

  const handleCancelBillPay = () => {
    if (billRequestParams.cancel) {
      doBillPayCancelProductMu({
        variables: {
          param: {
            payCancelInput: billRequestParams.cancel.param.payCancelInput,
            decreasePeriod: decreasePeriodHook.value,
            productId: billRequestParams.cancel.param.productId
          }
        }
      });
    }
  };

  return (
    <JDmodal {...modalHook}>
      <JDtabs>
        <TabList>
          <Tab>Do Bill Pay</Tab>
          <Tab>Cancel Bill Pay</Tab>
        </TabList>
        <TabPanel>
          <InputText {...amtHook} label="amt" />
          <ModalEndSection>
            <Button onClick={handleDoBillPay} mode="flat" label="pay" />
          </ModalEndSection>
        </TabPanel>
        <TabPanel>
          <InputText {...amtCancelHook} label="amt to cancel" />
          <InputText {...decreasePeriodHook} label="decrease/day" />
          <ModalEndSection>
            <Button onClick={handleCancelBillPay} mode="flat" label="cancel" />
          </ModalEndSection>
        </TabPanel>
      </JDtabs>
    </JDmodal>
  );
};

export default BillPayController;
