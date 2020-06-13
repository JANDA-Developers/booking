import React, { useState, useRef, Fragment } from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import CreaditCard from "./components/CreaditCard";
import { LANG, useModal, IUseModal } from "../../hooks/hook";
import JDIcon from "../../atoms/icons/Icons";
import "./CardModal.scss";
import "./CardViewer.scss";
import {
  getMyProfile_GetMyProfile_user_paymentInfos,
  registerBillKey,
  registerBillKeyVariables,
  unregisterBillKey,
  unregisterBillKeyVariables,
  updateProductBillInfo_UpdateProductBillInfo,
  updateProductBillInfo,
  updateProductBillInfoVariables
} from "../../types/api";
import { isEmpty, cardValidate } from "../../utils/utils";
import { getTargetsWithBillKey } from "../../utils/getTargetsWithBillKey";
import { TBillInfo, IMu } from "../../types/interface";
import RefundPolicyModal from "../policyModal/RefundPolicyModal";
import PrivacyPolicyModal from "../policyModal/PrivacyPolicyModal";
import Button from "../../atoms/button/Button";
import TextButton from "../../atoms/textButton/TextButton";
import FormBox, {
  FormHeader,
  FormRow,
  FormCell
} from "../../atoms/forms/formBox/FormBox";
import InputText from "../../atoms/forms/inputText/InputText";
import { DEFAULT_CARD_INFO } from "../../types/defaults";
import { toast } from "react-toastify";
import { scrollSlider } from "./helper";
import { cardExpire, cardExpToObj } from "../../utils/autoFormat";
import { TCardRegistInfo, ICardModalPropShareWrap } from "./declare";
import JDmodal from "../../atoms/modal/Modal";
import moment from "moment";

interface Iprops extends ICardModalPropShareWrap {
  context: IContext;
  createMu: IMu<registerBillKey, registerBillKeyVariables>;
  deleteMu: IMu<unregisterBillKey, unregisterBillKeyVariables>;
  pChangeMu: IMu<updateProductBillInfo, updateProductBillInfoVariables>;
  loading: boolean;
}

const CardModal: React.FC<Iprops> = ({
  context,
  createMu,
  pChangeMu,
  deleteMu,
  modalHook,
  loading
}) => {
  const { mode, onSubmit, unPadding } = modalHook.info;
  const { user } = context;
  const { paymentInfos } = user;
  const scrollContainer = useRef<HTMLDivElement>(null);
  const refundPolicyModalHook = useModal();
  const privacyPolicyModalHook = useModal();
  const [newCardInfo, setNewCardInfo] = useState<TCardRegistInfo>(
    DEFAULT_CARD_INFO
  );
  const [
    selecteCard,
    setSelecteCard
  ] = useState<getMyProfile_GetMyProfile_user_paymentInfos | null>(
    paymentInfos?.[0] || null
  );

  const isCreateMode = mode === "modify" || mode === "all";
  const periodicalPayMode = mode === "changePer";
  const isCreatable = isCreateMode && selecteCard === null;

  const create = (newCardInfo: TCardRegistInfo) => {
    createMu({
      variables: {
        param: {
          addBillInfoToUser: true,
          createBillKeyInput: {
            ...newCardInfo
          }
        }
      }
    });
  };

  const deleteFn = (billKey: string) => {
    deleteMu({
      variables: {
        billKey
      }
    });
  };

  const pChangeFn = (billKey: string) => {
    if (!modalHook.info.productIds) {
      throw Error("mode 가 periodicalChange 일경우 productIds를 모달 Info에 전달해야합니다.");
    }
    pChangeMu({
      variables: {
        param: {
          billKey,
          productIds: modalHook.info.productIds
        }
      }
    })

  }

  const handleDeleteBtn = (billKey: string) => {
    deleteFn(billKey);
  };

  const handleSubmit = () => {
    if (!onSubmit) return;
    if (!selecteCard) {
      toast.warn(LANG("there_is_no_selected_card"));
    }
    if (selecteCard) {
      onSubmit(selecteCard);
    }
  };

  const handleCreateBtn = () => {
    const validateResult = cardValidate(newCardInfo);
    if (validateResult.result) create(newCardInfo);
    else {
      toast.warn(validateResult.msg);
    }
  };

  const set = (v: string, key: keyof TCardRegistInfo) => {
    if (key === "expMonth") {
      const { month, year } = cardExpToObj(v);
      newCardInfo["expMonth"] = month;
      newCardInfo["expYear"] = year;
    } else {
      newCardInfo[key] = v;
    }
    setNewCardInfo({ ...newCardInfo });
  };

  const CardUnExsist = () => (
    <div className={`creaditCard creaditCard--unExsist`}>
      <div>{LANG("no_card")}</div>
      <span className="creaditCard__add-dec">{LANG("there_is_no_card")}</span>
    </div>
  );

  const CreaditCardAdd = () => (
    <div
      onClick={() => {
        setSelecteCard(null);
        scrollSlider(
          paymentInfos ? paymentInfos.length + 1 : 0,
          scrollContainer
        );
      }}
      className={`creaditCard creaditCard__add ${selecteCard === null &&
        "creaditCard__add--selected"}`}
    >
      <JDIcon icon="addCircle" size="large" />
      <div>{LANG("add_card")}</div>
      <span className="creaditCard__add-dec">{LANG("add_card_dec")}</span>
    </div>
  );

  // GET USING-BILLKEY -  WITH TARGET-NAME
  const payTargets = getTargetsWithBillKey(context);

  return (
    <JDmodal loading={loading} id="CardModal" className="cardModal" {...modalHook}>
      <div
        id="CardViewr"
        className={`CardViewer ${unPadding && "CardViewer--unPadding"}`}
      >
        <div className="CardViewer__sliderWrap">
          <div className="CardViewer__slider">
            <div ref={scrollContainer} className="CardViewer__cardsWrap">
              {paymentInfos?.map((card, index) => {
                const payTaget = payTargets.filter(
                  paytaget => paytaget.billKey === card.billKey
                );
                return (
                  <CreaditCard
                    payTargets={payTaget}
                    key={`card:${card.billKey}`}
                    isSelected={selecteCard?.billKey === card.billKey || false}
                    onCardClick={info => {
                      setSelecteCard(info);
                      scrollSlider(index, scrollContainer);
                    }}
                    payment={card}
                  />
                );
              })}
              {isCreateMode && <CreaditCardAdd />}
              {isEmpty(paymentInfos) && <CardUnExsist />}
            </div>
          </div>
        </div>
        <div className="CardViewer__infoFromWrap">
          <div>
            {isCreatable ? (
              <FormBox>
                <FormHeader />
                <FormRow className="JDflex">
                  <FormCell label={LANG("card_number")}>
                    {/* 카드번호 */}
                    <InputText
                      id="CardModal__CardNumber"
                      card
                      placeholder={"**** **** **** ****"}
                      onChange={(v: any) => {
                        set(v, "cardNo");
                      }}
                      value={newCardInfo.cardNo}
                    />
                  </FormCell>
                  <FormCell label={LANG("expiration_date")}>
                    <InputText
                      id="CardModal__ExpireDate"
                      onChange={(v: any) => {
                        set(cardExpire(v), "expMonth");
                      }}
                      placeholder="MM/YY"
                      value={newCardInfo.expMonth + newCardInfo.expYear}
                      maxLength={5}
                    />
                  </FormCell>
                </FormRow>
                <FormRow className="JDflex">
                  <FormCell label={LANG("card_pasword_front_two_digits")}>
                    {/* 카드 비밀번호 */}
                    <InputText
                      id="CardModal__CardPW"
                      placeholder="**XX"
                      onChange={(v: any) => {
                        set(v, "cardPw");
                      }}
                      value={newCardInfo.cardPw}
                      maxLength={2}
                      type="password"
                    />
                  </FormCell>
                  <FormCell label={LANG("idnumber_or_business_number")}>
                    {/* 아이디 넘버 */}
                    <InputText
                      id="CardModal__IdNum"
                      placeholder={LANG("idnumber_or_business_number")}
                      readOnly={!isCreatable}
                      type="password"
                      onChange={(v: any) => {
                        set(v, "idNo");
                      }}
                      value={newCardInfo.idNo}
                    />
                  </FormCell>
                </FormRow>
              </FormBox>
            ) : (
                <FormBox>
                  <FormHeader />
                  <FormCell label={LANG("card_name")}>
                    <InputText value={selecteCard?.cardName} />
                  </FormCell>
                  <FormCell label={LANG("card_number")}>
                    <InputText card value={selecteCard?.cardNo} />
                  </FormCell>
                  <FormCell label={LANG("regi_date")}>
                    <InputText value={moment(selecteCard?.authDate).format("YYYY-MM-DD")} />
                  </FormCell>
                </FormBox>
              )}

            {isCreatable && (
              <Fragment>
                <div className="JDsmall-text JDstandard-margin-bottom">
                  <div>
                    {LANG("completing_this_card_registration_you_agree_to_the")}
                  </div>
                  <TextButton
                    id="CardModalSubmit"
                    onClick={() => { }}
                    color="primary"
                    className="JDstandard-margin0"
                    anchor
                  >
                    {LANG("use_conditions")},
                  </TextButton>{" "}
                  <TextButton
                    color="primary"
                    className="JDstandard-margin0"
                    anchor
                  >
                    {LANG("privacy_policy")}
                  </TextButton>
                </div>
                <RefundPolicyModal modalHook={refundPolicyModalHook} />
                <PrivacyPolicyModal modalHook={privacyPolicyModalHook} />
              </Fragment>
            )}
          </div>
          <Fragment>
            {!periodicalPayMode && mode !== "modify" && !isCreatable && (
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                mb="no"
                size="small"
                mode="flat"
                thema="primary"
                label={LANG("select_this_card")}
              />
            )}
            {!periodicalPayMode && isCreatable && (
              <Button
                id="CardModal__CardRegistBtn"
                onClick={() => {
                  handleCreateBtn();
                }}
                mb="no"
                size="small"
                mode="flat"
                thema="primary"
                label={LANG("card_regist")}
              />
            )}
            {periodicalPayMode && (
              <Button
                id="CardModal__PeriodicalPayBtn"
                onClick={() => {
                  pChangeFn(selecteCard?.billKey || "");
                }}
                mb="no"
                size="small"
                mode="flat"
                thema="primary"
                label={LANG("bill_pay_regist_change_width_this_card")}
              />
            )}
            {mode !== "onlyGet" && (
              <Button
                mb="no"
                onClick={() => {
                  handleDeleteBtn(selecteCard?.billKey || "");
                }}
                size="small"
                mode="flat"
                thema="error"
                label={LANG("card_delete")}
              />
            )}
          </Fragment>
        </div>
      </div>
    </JDmodal>
  );
};

export default CardModal;
