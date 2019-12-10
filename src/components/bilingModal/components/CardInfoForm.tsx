import React, { useState, Fragment } from "react";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import Button from "../../../atoms/button/Button";
import { LANG, useModal } from "../../../hooks/hook";
import { TCardRegistInfo } from "../BillingModal";
import InputText from "../../../atoms/forms/inputText/InputText";
import TextButton from "../../../atoms/textButton/TextButton";
import RefundPolicyModal from "../../policyModal/RefundPolicyModal";
import PrivacyPolicyModal from "../../policyModal/PrivacyPolicyModal";
import FormBox, {
  FormCell,
  FormHeader,
  FormRow
} from "../../../atoms/forms/formBox/FormBox";
import { toNumber } from "../../../utils/utils";
import { toast } from "react-toastify";
import moment from "moment";
import { DEFAULT_CARD_INFO } from "../../../types/defaults";
import { DateFormat } from "../../../types/enum";
import {
  card_space,
  cardExprieGet,
  cardExpire
} from "../../../utils/autoFormat";
import { TCardViewInfo } from "./CardInfoFormWrap";
import { updateProductBillInfoVariables } from "../../../types/api";

export interface IChainProps {
  mode?: "create" | "view";
  viewInfo?: TCardViewInfo;
}

interface Iprops extends IChainProps {
  context: IContext;
  handleRegistBtn: (cardInfo: TCardRegistInfo) => void;
  handleDisContinueBtn: (productId: string) => Promise<void>;
  handleContinueBtn: (
    variables: updateProductBillInfoVariables
  ) => Promise<void>;
  handleDeleteBtn: (billKey: string) => Promise<void>;
}

const CardInfoForm: React.FC<Iprops> = ({
  context,
  mode,
  viewInfo,
  handleRegistBtn,
  handleDisContinueBtn,
  handleContinueBtn,
  handleDeleteBtn
}) => {
  const refundPolicyModalHook = useModal();
  const privacyPolicyModalHook = useModal();

  const isCreateMode = mode === "create";
  const isUseingCard = true;

  const validate = () => {
    const { exp: expTemp, cardNumber, idNumber } = cardInfo;

    const expObj = cardExprieGet(expTemp);

    // 길이검사
    if (
      toNumber(expObj.month) > 12 ||
      toNumber(expObj.month) < 1 ||
      expTemp.length !== 5
    ) {
      toast.warn("유효 하지 않은 카드 기한입니다.");
      return false;
    }
    if (
      // 기한검사
      moment(20 + expObj.month + expObj.year + "01", "YYYYMMDD").isBefore(
        moment(),
        "month"
      )
    ) {
      toast.warn("유효 하지 않은 카드 기한입니다.");
      return false;
    }

    if (cardNumber.length !== 16) {
      toast.warn("유효하지 않은 카드번호 입니다.");
      return false;
    }

    return true;
  };

  const [cardInfo, setCardInfo] = useState<TCardRegistInfo>(DEFAULT_CARD_INFO);

  const onCardRegistBtnClick = () => {
    if (validate()) handleRegistBtn(cardInfo);
  };

  const handleOnChangeInput = (
    v: string,
    key: "cardNumber" | "idNumber" | "exp" | "cardPassword"
  ) => {
    cardInfo[key] = v;
    setCardInfo({ ...cardInfo });
  };

  return (
    <div>
      <FormBox>
        <FormHeader>
          {isCreateMode ? LANG("please_input_card_info") : LANG("card_info")}
        </FormHeader>
        <FormRow className="JDflex">
          {!isCreateMode && cardInfo.cardNumber}
          <FormCell label={LANG("card_number")}>
            {/* 카드번호 */}
            {isCreateMode ? (
              <InputText
                card
                placeholder={"**** **** **** ****"}
                onChange={(v: any) => {
                  handleOnChangeInput(v, "cardNumber");
                }}
                value={cardInfo.cardNumber}
              />
            ) : (
              card_space(viewInfo!.cardNumber)
            )}
          </FormCell>
          <FormCell
            label={isCreateMode ? LANG("expiration_date") : LANG("regi_date")}
          >
            {isCreateMode ? (
              // 유효기한
              <InputText
                onChange={(v: any) => {
                  handleOnChangeInput(cardExpire(v), "exp");
                }}
                placeholder="MM/YY"
                value={cardInfo.exp}
                maxLength={5}
              />
            ) : (
              viewInfo && moment(viewInfo.authDate).format(DateFormat.YYMMDD)
            )}
          </FormCell>
        </FormRow>

        {isCreateMode && (
          <FormRow className="JDflex">
            <FormCell label={LANG("card_pasword_front_two_digits")}>
              {/* 카드 비밀번호 */}
              <InputText
                placeholder="**XX"
                onChange={(v: any) => {
                  handleOnChangeInput(v, "cardPassword");
                }}
                value={cardInfo.cardPassword}
                maxLength={2}
                type="password"
              />
            </FormCell>
            <FormCell label={LANG("idnumber_6front")}>
              {/* 아이디 넘버 */}
              <InputText
                placeholder={LANG("idnumber_or_business_number")}
                readOnly={!isCreateMode}
                type="password"
                onChange={(v: any) => {
                  handleOnChangeInput(v, "idNumber");
                }}
                value={cardInfo.idNumber}
              />
            </FormCell>
          </FormRow>
        )}
      </FormBox>
      <div className="JDsmall-text JDstandard-margin-bottom">
        <div>{LANG("completing_this_card_registration_you_agree_to_the")}</div>
        <TextButton
          onClick={() => {}}
          color="primary"
          className="JDstandard-margin0"
          anchor
        >
          {LANG("use_conditions")},
        </TextButton>{" "}
        <TextButton color="primary" className="JDstandard-margin0" anchor>
          {LANG("privacy_policy")}
        </TextButton>
      </div>
      <div className="JDmodal__endSection">
        {isCreateMode ? (
          // 카드등록
          <Button
            onClick={() => {
              onCardRegistBtnClick();
            }}
            size="small"
            mode="flat"
            thema="primary"
            label={LANG("card_regist")}
          />
        ) : (
          <Fragment>
            {/* 카드삭제 */}
            {isUseingCard ? (
              // 정기결제 취소
              <Button
                onClick={() => {
                  handleDisContinueBtn("");
                }}
                size="small"
                mode="flat"
                thema="primary"
                label={LANG("bill_pay_cancle")}
              />
            ) : (
              <Fragment>
                <Button
                  onClick={() => {
                    handleDeleteBtn("");
                  }}
                  size="small"
                  mode="flat"
                  thema="primary"
                  label={LANG("card_delete")}
                />
                {/* // 정기결제 등록 */}
                <Button
                  onClick={() => {
                    handleContinueBtn({
                      param: {
                        billKey: viewInfo!.billKey,
                        productIds: []
                      }
                    });
                  }}
                  size="small"
                  mode="flat"
                  thema="primary"
                  label={LANG("bill_pay_regist")}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
      <RefundPolicyModal modalHook={refundPolicyModalHook} />
      <PrivacyPolicyModal modalHook={privacyPolicyModalHook} />
    </div>
  );
};

export default CardInfoForm;
