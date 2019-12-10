import React from "react";
import {
  registerBillKey,
  registerBillKeyVariables,
  registerBillKey_RegisterBillKey_billInfo,
  updateProductBillInfo,
  updateProductBillInfoVariables,
  unregisterBillKey,
  unregisterBillKeyVariables,
  discontinueProduct,
  discontinueProductVariables
} from "../../../types/api";
import {
  REGISTE_BILLKEY,
  UN_REGISTER_BILLKEY,
  UPDATE_PRODUCT_BILL_INFO,
  GET_USER_INFO
} from "../../../apollo/queries";
import client from "../../../apollo/apolloClient";
import { useMutation } from "@apollo/react-hooks";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import CardInfoForm, { IChainProps } from "./CardInfoForm";
import { muResult, onCompletedMessage } from "../../../utils/utils";
import { TCardRegistInfo } from "../BillingModal";
import { getOperationName } from "apollo-link";
import { LANG } from "../../../hooks/hook";
import { cardExpire, cardExprieGet } from "../../../utils/autoFormat";

export interface TCardViewInfo {
  billKey: string;
  cardNumber: string;
  cardName: string;
  authDate: Date;
}

export interface ICardInfoFormWrapChainProps {
  continueCallBack?: () => any;
  discontinueCallBack?: () => any;
  deleteBillCallBack?: () => any;
  registCallBack?: (
    billInfo: false | registerBillKey_RegisterBillKey_billInfo | null
  ) => any;
}

export interface ICardInfoFormWrapProps
  extends ICardInfoFormWrapChainProps,
    IChainProps {
  context: IContext;
}

// 이곳에서 카드 등록 수정 삭제 모든 요청 발생
const CardInfoFormWrap: React.FC<ICardInfoFormWrapProps> = ({
  context,
  registCallBack,
  deleteBillCallBack,
  continueCallBack,
  discontinueCallBack,
  ...props
}) => {
  const refetchQueries = [getOperationName(GET_USER_INFO) || ""];

  // 카드 등록
  const [createBillMu, { loading: registerBillLoading }] = useMutation<
    registerBillKey,
    registerBillKeyVariables
  >(REGISTE_BILLKEY, {
    client,
    refetchQueries,
    onCompleted: ({ RegisterBillKey }) => {
      onCompletedMessage(
        RegisterBillKey,
        LANG("card_regist_complete"),
        LANG("card_regist_complete_fail")
      );
    }
  });
  // 상품에 관한 정기결제 등록
  const [updateBillPayMu, { loading: updateBillPayLoading }] = useMutation<
    updateProductBillInfo,
    updateProductBillInfoVariables
  >(UPDATE_PRODUCT_BILL_INFO, {
    client,
    refetchQueries,
    onCompleted: ({ UpdateProductBillInfo }) => {
      onCompletedMessage(
        UpdateProductBillInfo,
        LANG("periodical_pay_regist_complete"),
        LANG("periodical_pay_regist_fail")
      );
    }
  });
  // 카드 삭제
  const [unRegisterBillKeyMu, { loading: unRegisterBillLoading }] = useMutation<
    unregisterBillKey,
    unregisterBillKeyVariables
  >(REGISTE_BILLKEY, {
    client,
    refetchQueries,
    onCompleted: ({ UnregisterBillKey }) => {
      onCompletedMessage(
        UnregisterBillKey,
        LANG("card_delte_complete"),
        LANG("card_info_complete_fail")
      );
    }
  });
  // 정기 결제 캔슬
  const [discontinueProductMu, { loading: discontinueProdcut }] = useMutation<
    discontinueProduct,
    discontinueProductVariables
  >(UN_REGISTER_BILLKEY, {
    client,
    refetchQueries,
    onCompleted: ({ DiscontinueProduct }) => {
      onCompletedMessage(
        DiscontinueProduct,
        LANG("periodical_cancel_complete"),
        LANG("periodical_cancel_complete_fail")
      );
    }
  });

  // 정기결제취소
  const discontinueProductFn = async (productId: string) => {
    discontinueProductMu({
      variables: {
        productId
      }
    });
    discontinueCallBack && discontinueCallBack();
  };
  // 정기결제 등록
  const updateBillPayFn = async (variables: updateProductBillInfoVariables) => {
    updateBillPayMu({ variables });
  };
  // 카드삭제
  const unRegisterBillKeyFn = async (billKey: string) => {
    unRegisterBillKeyMu({
      variables: {
        billKey
      }
    });
    deleteBillCallBack && deleteBillCallBack();
  };
  // 카드등록
  const createBillFn = async (cardInfo: TCardRegistInfo) => {
    const expObj = cardExprieGet(cardInfo.exp);

    const reuslt = await createBillMu({
      variables: {
        param: {
          addBillInfoToUser: true,
          createBillKeyInput: {
            cardNo: cardInfo.cardNumber,
            expMonth: expObj.month,
            expYear: expObj.year,
            idNo: cardInfo.idNumber,
            cardPw: cardInfo.cardPassword
          }
        }
      }
    });

    const billInfo = muResult(reuslt, "RegisterBillKey", "billInfo");

    registCallBack && registCallBack(billInfo);
  };

  return (
    <CardInfoForm
      {...props}
      context={context}
      handleRegistBtn={createBillFn}
      handleContinueBtn={updateBillPayFn}
      handleDisContinueBtn={discontinueProductFn}
      handleDeleteBtn={unRegisterBillKeyFn}
    />
  );
};

export default CardInfoFormWrap;
