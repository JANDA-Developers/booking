import PropTypes from "prop-types";
import classNames from "classnames";
import React, {useState, useEffect} from "react";
import {Node} from "unist";
import {IUseModal, useInput} from "../../../../actions/hook";
import JDmodal from "../../../../atoms/modal/Modal";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import {
  JDWeekChanger,
  ErrProtecter,
  stringToPrice,
  dayarrEnToBooleanArr,
  s4,
  autoComma,
  toNumber
} from "../../../../utils/utils";
import Button from "../../../../atoms/button/Button";
import InputText from "../../../../atoms/forms/inputText/InputText";
import {
  DayOfWeekPriceInput,
  getAllSeasonTable_GetSeasonPrice_seasonPrices_dayOfWeekPriceList
} from "../../../../types/api";
import {
  arrToApplyDays,
  applyDaysToArr,
  dayarrEnToValueArr,
  DayOfWeekEnum
} from "../../../../utils/dayOfweeks";
import JDbox from "../../../../atoms/box/JDbox";
import {priceMapResult} from "../SetPriceWrap";
import {WeekArrKr, WeekArrEn} from "../../../../types/enum";

export interface IDayOfWeekModalInfo {
  priceInput: priceMapResult;
  roomTypeId: string;
  seasonId: string;
}

interface IProps {
  modalHook: IUseModal<IDayOfWeekModalInfo>;
  setPriceMap: React.Dispatch<
    React.SetStateAction<Map<string, priceMapResult>>
  >;
  priceMap: Map<string, priceMapResult>;
}

const DayOfWeekModal: React.SFC<IProps> = ({
  modalHook,
  priceMap,
  setPriceMap
}) => {
  if (!modalHook.isOpen) return <div />;
  const classes = classNames("dayOfWeekModal", "", {});
  const dayOfWeekPriceList = modalHook.info.priceInput.dayOfWeekPriceList;

  const {priceInput, seasonId, roomTypeId} = modalHook.info;
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
          label="적용"
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
