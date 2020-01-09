import React, { Fragment } from "react";
import {
  registerBillKey,
  registerBillKeyVariables,
  unregisterBillKey,
  unregisterBillKeyVariables
} from "../../../types/api";
import {
  REGISTE_BILLKEY,
  GET_USER_INFO,
  UN_REGISTER_BILLKEY
} from "../../../apollo/queries";
import client from "../../../apollo/apolloClient";
import { useMutation } from "@apollo/react-hooks";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import CardInfoForm, { IChainProps } from "./CardInfoForm";
import { onCompletedMessage } from "../../../utils/utils";
import { TCardRegistInfo } from "../BillingModal";
import { getOperationName } from "apollo-link";
import { LANG } from "../../../hooks/hook";
import { cardExprieGet } from "../../../utils/autoFormat";
import { ICardModalTarget } from "../../../pages/bookingHost/myPage/components/cardModal.tsx/CardModal";
import { PortalPreloader } from "../../../utils/portalElement";

export interface TCardViewInfo {
  billKey: string;
  cardNumber: string;
  cardName: string;
  authDate: Date;
}

export interface ICardInfoFormWrapProps extends IChainProps {
  context: IContext;
  selectConfirmCallBack?: () => any;
  deleteBillCallBack?: () => any;
  registCallBack?: () => any;
  currentHouseInfo?: ICardModalTarget;
}

// 이곳에서 카드 등록 수정 삭제 모든 요청 발생
const CardInfoFormWrap: React.FC<ICardInfoFormWrapProps> = ({
  context,
  registCallBack,
  deleteBillCallBack,
  currentHouseInfo,
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
        LANG("card_regist_complete_fail"),
        "RegisterBillKey"
      );
      registCallBack && registCallBack();
    }
  });

  // 카드 삭제
  const [unRegisterBillKeyMu, { loading: unRegisterBillLoading }] = useMutation<
    unregisterBillKey,
    unregisterBillKeyVariables
  >(UN_REGISTER_BILLKEY, {
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

  // 카드삭제 FN
  const unRegisterBillKeyFn = async (billKey: string) => {
    unRegisterBillKeyMu({
      variables: {
        billKey
      }
    });
    deleteBillCallBack && deleteBillCallBack();
  };

  // 카드등록 FN
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
  };

  const loading = registerBillLoading || unRegisterBillLoading;

  return (
    <Fragment>
      <CardInfoForm
        {...props}
        context={context}
        currentHouseInfo={currentHouseInfo}
        handleRegistBtn={createBillFn}
        handleDeleteBtn={unRegisterBillKeyFn}
      />
      <PortalPreloader loading={loading} />
    </Fragment>
  );
};

export default CardInfoFormWrap;
