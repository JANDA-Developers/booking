import classNames from "classnames";
import React, { useState } from "react";
import { IUseModal, LANG } from "../../../../hooks/hook";
import JDmodal from "../../../../atoms/modal/Modal";
import { autoComma, toNumber } from "../../../../utils/utils";
import Button from "../../../../atoms/button/Button";
import InputText from "../../../../atoms/forms/inputText/InputText";
import { dayarrEnToValueArr } from "../../../../utils/dayOfweeks";
import { priceMapResult } from "../SetPriceWrap";
import { WeekArrKr, WeekArrEn } from "../../../../types/enum";

export interface IDayOfWeekModalInfo {
  priceInput: priceMapResult;
  roomTypeId: string;
  seasonId: string;
}

interface IProps {
  modalHook: IUseModal<IDayOfWeekModalInfo>;
  setShouldSave: React.Dispatch<React.SetStateAction<boolean>>;
  setPriceMap: React.Dispatch<
    React.SetStateAction<Map<string, priceMapResult>>
  >;
  priceMap: Map<string, priceMapResult>;
}

const DayOfWeekModal: React.SFC<IProps> = ({
  modalHook,
  priceMap,
  setShouldSave,
  setPriceMap
}) => {
  if (!modalHook.isOpen) return <div />;
  const classes = classNames("dayOfWeekModal", "", {});
  const dayOfWeekPriceList = modalHook.info.priceInput.dayOfWeekPriceList;

  const { priceInput, seasonId, roomTypeId } = modalHook.info;
  const defaultPrice = priceInput.default;

  const [priceArr, setPriceArr] = useState<(number | null)[]>(
    dayarrEnToValueArr(dayOfWeekPriceList)
  );

  const handleClickCompleteBtn = () => {
    const dayOfWeekPriceList = priceArr
      .map((price, index) => {
        if (!price) return undefined;
        return {
          day: WeekArrEn[index],
          price: price
        };
      })
      .filter(price => price !== undefined);

    // @ts-ignore
    priceInput.dayOfWeekPriceList = dayOfWeekPriceList;
    priceMap.set(roomTypeId + seasonId, priceInput);
    setShouldSave(true);
    modalHook.closeModal();
  };

  return (
    <JDmodal {...modalHook} className={classes}>
      {priceArr.map((price, index) => (
        <InputText
          placeholder={autoComma(defaultPrice)}
          onChange={value => {
            priceArr[index] = toNumber(value);
            setPriceArr([...priceArr]);
          }}
          comma
          value={price}
          label={WeekArrKr[index]}
        />
      ))}
      <div className="JDmodal__endSection">
        <Button
          label={LANG("Apply")}
          size="small"
          onClick={() => {
            handleClickCompleteBtn();
          }}
          thema="primary"
        />
      </div>
    </JDmodal>
  );
};

export default DayOfWeekModal;
