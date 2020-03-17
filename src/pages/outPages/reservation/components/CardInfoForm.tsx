import React from "react";
import { LANG } from "../../../../hooks/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Button from "../../../../atoms/button/Button";
import { cardExpire, cardExpToObj } from "../../../../utils/autoFormat";
import { TCardRegistInfo } from "../../../../components/cardModal/declare";

interface IProps {
  forHost?: boolean;
  column?: "2";
  cardInfo: TCardRegistInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<TCardRegistInfo>>;
}

const spliter = (str: string) => {
  if (str) {
    const frontTwo = str.slice(0, 2);
    const beforeTwo = str.slice(2, 4);
    if (beforeTwo) {
      return frontTwo + "/" + beforeTwo;
    }
    return frontTwo;
  }
};

const CardInfoForm: React.FC<IProps> = ({
  cardInfo,
  column,
  setCardInfo,
  forHost
}) => {
  function set<T extends keyof TCardRegistInfo>(
    key: T,
    value: TCardRegistInfo[T]
  ) {
    if (key === "expMonth") {
      const { month, year } = cardExpToObj(value);
      cardInfo["expMonth"] = month;
      cardInfo["expYear"] = year;
      console.log(cardInfo);
    } else {
      cardInfo[key] = value;
    }
    setCardInfo({ ...cardInfo });
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
            value={cardInfo["cardNo"]}
            onChange={v => {
              set("cardNo", v);
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
            value={spliter(cardInfo.expMonth + cardInfo.expYear)}
            onChange={(v: any) => {
              set("expMonth", cardExpire(v));
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
            value={cardInfo.cardPw}
            onChange={v => {
              set("cardPw", v);
            }}
            type="password"
          />
        </div>
        <div className={commonClass}>
          <InputText
            label={LANG(
              forHost ? "idnumber_or_business_number" : "idnumber_6front"
            )}
            placeholder={LANG("idnumber_6front")}
            id="CardModal__IdNum"
            type="password"
            value={cardInfo.idNo}
            onChange={v => {
              set("idNo", v);
            }}
          />
        </div>
      </div>
      <Button hidden type="submit" />
    </form>
  );
};

export default CardInfoForm;
