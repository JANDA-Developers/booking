import React, { useState, useEffect } from "react";
import {
  IUseModal,
  useDayPicker,
  useModal,
  LANG
} from "../../../../hooks/hook";
import JDmodal from "../../../../atoms/modal/Modal";
import { s4, autoComma, toNumber } from "../../../../utils/utils";
import Button from "../../../../atoms/button/Button";
import InputText from "../../../../atoms/forms/inputText/InputText";
import {
  getAllSeasonTable_GetAllRoomType_roomTypes,
  createSeason,
  createSeasonVariables,
  SeasonPriceInput
} from "../../../../types/api";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import JDbox from "../../../../atoms/box/JDbox";
import { MutationFn } from "react-apollo";
import { isName } from "../../../../utils/inputValidations";
import PriceWarnModal from "../../../../components/priceWarnModal.tsx/PriceWarnModal";
import { toast } from "react-toastify";
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
      toast.warn(LANG("not_a_valid_name"));
      return false;
    }
    if (prices.find(price => price === null || undefined || NaN)) {
      toast.warn(LANG("please_enter_a_base_price"));
      return false;
    }

    if (!dayPickerHook.from || !dayPickerHook.to) {
      toast.warn(LANG("please_specify_the_date"));
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
          label={LANG("season_name")}
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
          displayYear={false}
          label={LANG("season_period")}
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
                <th>{LANG("roomType")}</th>
                <th>{LANG("season_basic_price")}</th>
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
          mode="flat"
          onClick={() => {
            validation() && validation2();
          }}
          size="small"
          label={LANG("create_season")}
          thema="primary"
        />
      </div>
      <PriceWarnModal modalHook={priceWarnModal} />
    </JDmodal>
  );
};
export default CreateSeasonModal;

// CreateSeasonModal 과 UpdateSeasonModal이 분리되어 있음에 유의
