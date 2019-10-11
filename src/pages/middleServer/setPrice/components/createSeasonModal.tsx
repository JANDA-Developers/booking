import PropTypes from "prop-types";
import classNames from "classnames";
import React, {useState, useEffect} from "react";
import {Node} from "unist";
import {
  IUseModal,
  useInput,
  useDayPicker,
  useModal
} from "../../../../hooks/hook";
import JDmodal from "../../../../atoms/modal/Modal";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import {
  JDWeekChanger,
  ErrProtecter,
  stringToPrice,
  s4,
  autoComma,
  toNumber
} from "../../../../utils/utils";
import Button from "../../../../atoms/button/Button";
import InputText from "../../../../atoms/forms/inputText/InputText";
import {
  DayOfWeekPriceInput,
  getAllSeasonTable_GetAllRoomType_roomTypes,
  createSeason,
  createSeasonVariables,
  SeasonPriceInput
} from "../../../../types/api";
import {arrToApplyDays, applyDaysToArr} from "../../../../utils/dayOfweeks";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import JDbox from "../../../../atoms/box/JDbox";
import {MutationFn} from "react-apollo";
import {isName} from "../../../../utils/inputValidations";
import PriceWarnModal from "../../../../components/priceWarnModal.tsx/PriceWarnModal";
import {toast} from "react-toastify";
import moment from "moment";

export interface ICreateSeasonModalInfo {
  applyedDays: number;
}

interface IProps {
  modalHook: IUseModal;
  roomTypes: getAllSeasonTable_GetAllRoomType_roomTypes[];
  createSeasonMu: MutationFn<createSeason, createSeasonVariables>;
  houseId: string;
}

const CreateSeasonModal: React.FC<IProps> = ({
  createSeasonMu,
  modalHook,
  roomTypes,
  houseId
}) => {
  const dayPickerHook = useDayPicker(null, null);
  const priceWarnModal = useModal(false);
  const [name, setName] = useState("");
  const [prices, setPrices] = useState<number[]>(
    roomTypes.map(roomType => roomType.defaultPrice || 0)
  );

  const createSeasonPriceInputs = (): SeasonPriceInput[] =>
    prices.map((price, index) => ({
      roomTypeId: roomTypes[index]._id,
      defaultPrice: price
    }));

  const validation = (): boolean => {
    if (!isName(name)) {
      toast.warn("올바른 이름이 아닙니다.");
      return false;
    }
    if (prices.find(price => price === null || undefined || NaN)) {
      toast.warn("기본가격을 입력바랍니다.");
      return false;
    }

    if (!dayPickerHook.from || !dayPickerHook.to) {
      toast.warn("날자를 지정해주세요.");
      return false;
    }

    return true;
  };

  const validation2 = () => {
    if (!prices.every(price => price > 1000)) {
      priceWarnModal.openModal({
        confirmCallBackFn: handleClickSeasonCreate
      });
    } else {
      handleClickSeasonCreate(true);
    }
  };

  const handleClickSeasonCreate = (flag: boolean) => {
    if (!flag) return;
    createSeasonMu({
      variables: {
        start: dayPickerHook.from,
        end: moment(dayPickerHook.to!)
          .add(1, "day")
          .toDate(),
        name,
        seasonPrices: createSeasonPriceInputs(),
        houseId
      }
    });
    modalHook.closeModal();
  };

  return (
    <JDmodal className="createSeasonModal" visibleOverflow {...modalHook}>
      <div>
        <InputText
          label="시즌명"
          defaultValue={name}
          onBlur={e => {
            setName(e.currentTarget.value);
          }}
        />
      </div>
      <div>
        <JDdayPicker
          canSelectBeforeDay={true}
          calenaderPosition="center"
          label="시즌기간"
          input
          isRange
          {...dayPickerHook}
        />
      </div>
      <div className="createSeasonModal__table">
        <JDbox mode="table">
          <table className="JDtable">
            <thead>
              <tr>
                <th>방타입</th>
                <th>시즌 기본가격</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => (
                <tr key={s4()}>
                  <td>{roomTypes[index].name}</td>
                  <td>
                    <InputText
                      placeholder={autoComma(
                        roomTypes[index].defaultPrice || 0
                      )}
                      defaultValue={autoComma(price)}
                      onBlur={e => {
                        prices[index] = toNumber(e.currentTarget.value);
                        setPrices([...prices]);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </JDbox>
      </div>
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            validation() && validation2();
          }}
          size="small"
          label="시즌생성"
          thema="primary"
        />
      </div>
      <PriceWarnModal modalHook={priceWarnModal} />
    </JDmodal>
  );
};
export default CreateSeasonModal;
