import React from "react";
import { LANG } from "../../../../hooks/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import { TCardRegistInfo } from "../../../../components/bilingModal/BillingModal";
import Button from "../../../../atoms/button/Button";
import { cardExpire } from "../../../../utils/autoFormat";

interface IProps {
  column?: "2";
  cardInfo: TCardRegistInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<TCardRegistInfo>>;
}

const CardInfoForm: React.FC<IProps> = ({ cardInfo, column, setCardInfo }) => {
  function set<T extends keyof TCardRegistInfo>(
    key: T,
    value: TCardRegistInfo[T]
  ) {
    setCardInfo({ ...cardInfo, [key]: value });
  }

  const classForWrap = column ? "flex-grid" : "";
  const commonClass = "flex-grid__col col--full-6";

  return (
    <form>
      <div className={classForWrap}>
        <div className={commonClass}>
          <InputText
            label={LANG("card_number")}
            id="CardModal__CardNumber"
            card
            value={cardInfo["cardNumber"]}
            onChange={v => {
              set("cardNumber", v);
            }}
            placeholder={"**** **** **** ****"}
          />
        </div>
        <div className={commonClass}>
          <InputText
            label={LANG("expiration_date")}
            id="CardModal__ExpireDate"
            placeholder="MM/YY"
            maxLength={5}
            value={cardInfo.exp}
            onChange={(v: any) => {
              set("exp", cardExpire(v));
            }}
          />
        </div>
      </div>
      <div className={classForWrap}>
        <div className={commonClass}>
          <InputText
            label={LANG("card_pasword_front_two_digits")}
            id="CardModal__CardPW"
            placeholder="**XX"
            maxLength={2}
            value={cardInfo.cardPassword}
            onChange={v => {
              set("cardPassword", v);
            }}
            type="password"
          />
        </div>
        <div className={commonClass}>
          <InputText
            label={LANG("idnumber_6front")}
            placeholder={LANG("idnumber_6front")}
            id="CardModal__IdNum"
            type="password"
            value={cardInfo.idNumber}
            onChange={v => {
              set("idNumber", v);
            }}
          />
        </div>
      </div>
      <Button hidden type="submit" />
    </form>
  );
};

export default CardInfoForm;
