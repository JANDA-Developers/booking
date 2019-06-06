/* eslint-disable react/prop-types */
import React, {useState, Fragment} from "react";
import {CellInfo} from "react-table";
import {MutationFn} from "react-apollo";
import _ from "lodash";
import moment from "moment";
import Button from "../../../../atoms/button/Button";
import JDTable, {ReactTableDefault} from "../../../../atoms/table/Table";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Icon from "../../../../atoms/icons/Icons";
import utils, {isEmpty, stringToNumber} from "../../../../utils/utils";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import Card from "../../../../atoms/cards/Card";
import {
  IUseColor,
  useModal,
  useColorPicker,
  useDayPicker
} from "../../../../actions/hook";
import {
  DayOfWeekPriceInput,
  createSeason,
  createSeasonVariables,
  updateSeason,
  updateSeasonVariables,
  deleteSeason,
  deleteSeasonVariables,
  SeasonPriceInput,
  changePriority,
  changePriorityVariables
} from "../../../../types/api";
import CircleIcon from "../../../../atoms/circleIcon/CircleIcon";
import DayOfWeekModal from "./dayOfWeekModal";
import JDbox from "../../../../atoms/box/JDbox";
import {numberToStrings} from "../../../../utils/dayOfweeks";
import {arraySum} from "../../../../utils/elses";
import {ITableValue} from "./seasonTableWrap";
import {IDefaultSeason} from "../SetPrice";
import {setYYYYMMDD} from "../../../../utils/setMidNight";
import {JDtoastModal} from "../../../../atoms/modal/Modal";
import JDselect, {
  IselectedOption
} from "../../../../atoms/forms/selectBox/SelectBox";
import {ISeason} from "../../../../types/interface";

interface IProps {
  defaultTableValue: ITableValue;
  seasonData: ISeason | IDefaultSeason;
  updateSeasonMutation: MutationFn<updateSeason, updateSeasonVariables>;
  deleteSeasonMutation: MutationFn<deleteSeason, deleteSeasonVariables>;
  createSeasonMutation: MutationFn<createSeason, createSeasonVariables>;
  changePriorityMutation: MutationFn<changePriority, changePriorityVariables>;
  houseId: string;
  seasonCount: number;
  seasonIndex: number;
}

const SeasonModal: React.SFC<IProps> = ({
  seasonData,
  defaultTableValue,
  createSeasonMutation,
  deleteSeasonMutation,
  updateSeasonMutation,
  changePriorityMutation,
  houseId,
  seasonCount,
  seasonIndex
}) => {
  const [tableValue, setTableValue] = useState(defaultTableValue);
  const defaultStart = isEmpty(defaultTableValue.start)
    ? null
    : moment(defaultTableValue.start).toDate();
  const defaultEnd = isEmpty(defaultTableValue.end)
    ? null
    : moment(defaultTableValue.end).toDate();
  const dayPickerHook = useDayPicker(defaultStart, defaultEnd);
  const colorHook: IUseColor = useColorPicker(null);
  const modalHook = useModal(false);
  const confirmModalHook = useModal(false);
  const alertModalHook = useModal(false);

  const priorityOP = Array(seasonCount)
    .fill(0)
    .map((value, index) => ({
      value: seasonCount - index,
      label: `${index + 1}순위`
    }));
  const isForAdd = seasonData._id === "-1";

  const validater = (): boolean => {
    if (isEmpty(dayPickerHook.to)) {
      alertModalHook.openModal("날자를 선택해주세요.");
      return false;
    }
    if (isEmpty(tableValue.name)) {
      alertModalHook.openModal("시즌명을 입력해주세요.");
      return false;
    }
    return true;
  };

  const deleteModalCallBackFn = (flag: boolean) => {
    if (flag) deleteSeasonMutation();
  };

  const handleDeleteTable = (): void => {
    confirmModalHook.openModal({
      txt: "시즌을 삭제하시겠습니까?",
      thema: "warn"
    });
  };

  const handlePriorityChange = (flag: IselectedOption): void => {
    changePriorityMutation({
      variables: {
        houseId,
        seasonId: seasonData._id,
        priority: flag.value - 1
      }
    });
  };

  const updateFormChanger = () => {
    const tempValueCopy = _.cloneDeep(tableValue);

    const tableValueCopy = _.assign(tempValueCopy, {
      start: setYYYYMMDD(dayPickerHook.from),
      end: setYYYYMMDD(dayPickerHook.to),
      color: colorHook.color
    });

    tableValueCopy.seasonPrices.forEach(seasonPrice => {
      delete seasonPrice.name;
    });

    return tableValueCopy;
  };

  const handleCreateTable = (): void => {
    if (validater()) {
      const tableValueCopy = updateFormChanger();

      createSeasonMutation({
        variables: tableValueCopy
      });
    }
  };

  const handleUpdateTable = (): void => {
    if (validater()) {
      const tableValueCopy = updateFormChanger();

      updateSeasonMutation({
        variables: {...tableValueCopy, seasonId: seasonData._id}
      });
    }
  };

  const handleIconClick = (applayDays: number, roomTypeId: string) => {
    const copyValue = _.assign(tableValue, {});
    const seasonPrice = copyValue.seasonPrices.find(
      value => value.roomTypeId === roomTypeId
    );
    if (seasonPrice && seasonPrice.dayOfWeekPrices) {
      _.remove(seasonPrice.dayOfWeekPrices, {applyDays: applayDays});
      setTableValue({...copyValue});
    }
  };

  const deleteDayOfWeek = () => {};

  // 요일별가격을 생성할때
  const handleWeekSubmit = (value: DayOfWeekPriceInput) => {
    // 1: 정보카피
    const tableValueCopy = Object.assign(tableValue, {});
    const {seasonPrices} = tableValueCopy;
    const roomTypeIndex = seasonPrices.findIndex(
      tValue => tValue.roomTypeId === modalHook.info.roomTypeId
    );
    // 실존하는 룸타입이면

    if (roomTypeIndex !== -1) {
      const {dayOfWeekPrices} = seasonPrices[roomTypeIndex];
      if (dayOfWeekPrices) {
        const index = dayOfWeekPrices.findIndex(
          day => day.applyDays === value.applyDays
        );
        // 수정일떄
        if (index !== -1) {
          dayOfWeekPrices[index] = value;
          // 생성일때
        } else {
          dayOfWeekPrices.push(value);
        }

        setTableValue(tableValueCopy);
      }
    }
  };

  const handleDefaultBlur = (value: string, roomTypeId: string) => {
    const tableValueCopy = Object.assign(tableValue, {});
    const {seasonPrices} = tableValueCopy;
    const index = seasonPrices.findIndex(
      inValue => inValue.roomTypeId === roomTypeId
    );
    seasonPrices[index] = {
      ...seasonPrices[index],
      defaultPrice: stringToNumber(value)
    };

    setTableValue(tableValueCopy);
  };

  const TableColumns = [
    {
      Header: "룸타입명",
      accessor: "name"
    },
    {
      Header: "가격",
      accessor: "defaultPrice",
      Cell: ({value, original}: CellInfo) => (
        <InputText
          defaultValue={value}
          comma
          onBlur={(e: any) => {
            handleDefaultBlur(e.currentTarget.value, original.roomTypeId);
          }}
        />
      )
    },
    {
      Header: "요일별 가격",
      accessor: "dayOfWeekPrices",
      Cell: ({original, value}: CellInfo) => {
        const seasonPriceInput: SeasonPriceInput = original;
        const dayOfWeekPrices: DayOfWeekPriceInput[] = value;

        return (
          <div className="seasonT__cell">
            {dayOfWeekPrices.map(dayOfWeek => (
              <JDbox
                key={
                  seasonData._id +
                  seasonPriceInput.roomTypeId +
                  dayOfWeek.applyDays
                }
                label={`${numberToStrings(dayOfWeek.applyDays)}`}
                iconOnClick={() => {
                  handleIconClick(
                    dayOfWeek.applyDays,
                    seasonPriceInput.roomTypeId
                  );
                }}
                iconHover
                icon="eraser"
              >
                <span>{dayOfWeek.price}</span>
              </JDbox>
            ))}
            <CircleIcon
              onClick={() => {
                modalHook.openModal({
                  applyedDays: arraySum(
                    dayOfWeekPrices.map(day => day.applyDays)
                  ),
                  roomTypeId: seasonPriceInput.roomTypeId
                });
              }}
              wave
            >
              <Icon icon="add" />
            </CircleIcon>
          </div>
        );
      }
    }
  ];

  const SeasonController = () => (
    <Fragment>
      {isForAdd && (
        <Button
          label="추가하기"
          mode="flat"
          thema="primary"
          onClick={handleCreateTable}
        />
      )}
      {!isForAdd && (
        <Fragment>
          <Button
            label="수정하기"
            mode="flat"
            thema="primary"
            onClick={handleUpdateTable}
          />
          <Button
            label="삭제하기"
            mode="flat"
            thema="warn"
            onClick={handleDeleteTable}
          />
        </Fragment>
      )}
    </Fragment>
  );

  return (
    <Card>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-12 col--wmd-12">
          <div>
            <InputText
              onChange={(value: string) => {
                const tableValueCopy = Object.assign(tableValue, {});
                tableValueCopy.name = value;
                setTableValue({...tableValueCopy});
              }}
              value={tableValue.name}
              label="시즌명"
              placeholder="EX)성수기 또는 비수기"
              validation={utils.isMaxOver}
              max={10}
            />
          </div>
          <div className="flex-grid-grow">
            <div className="flex-grid__col col--grow-4">
              <JDdayPicker
                {...dayPickerHook}
                displayYear={false}
                format="MM-DD"
                canSelectBeforeDays
                label="적용날자"
                input
              />
            </div>
            {/* <JDcolorPicker label="대표색상" colorHook={colorHook} /> */}
            <div className="flex-grid__col col--grow-1 seasonT__JDboxWrap">
              {!isForAdd ? (
                <JDselect
                  label="우선순위"
                  selectedOption={priorityOP[seasonIndex]}
                  options={priorityOP}
                  onChange={handlePriorityChange}
                />
              ) : (
                <JDbox topLabel="우선순위" standard mode="border">
                  {"최우선"}
                </JDbox>
              )}
            </div>
          </div>
        </div>
        <div className="flex-grid__col col--full-12 col--wmd-12">
          <JDTable
            className="seasonTable"
            {...ReactTableDefault}
            data={tableValue.seasonPrices}
            columns={TableColumns}
            minRows={0}
            align="center"
          />
        </div>
      </div>
      <div className="seasonT__controller">
        <SeasonController />
      </div>
      <DayOfWeekModal onSubmit={handleWeekSubmit} modalHook={modalHook} />
      <JDtoastModal
        confirm
        confirmCallBackFn={deleteModalCallBackFn}
        {...confirmModalHook}
      />
      <JDtoastModal isAlert {...alertModalHook} />
    </Card>
  );
};
export default SeasonModal;
