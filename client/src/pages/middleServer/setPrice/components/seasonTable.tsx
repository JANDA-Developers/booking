/* eslint-disable react/prop-types */
import React, { useEffect, useState, Fragment } from 'react';
import { TableProps, RowInfo } from 'react-table';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Button';
import JDTable, { ReactTableDefault } from '../../../../atoms/table/Table';
import JDcolorPicker from '../../../../atoms/colorPicker/ColorPicker';
import Icon from '../../../../atoms/icons/Icons';
import utils from '../../../../utils/utils';
import JDdayPicker from '../../../../components/dayPicker/DayPicker';
import Card from '../../../../atoms/cards/Card';
import { ISeasonValue, ITableData } from './seasonTableWrap';
import {
  IUseColor, IUseDayPicker, useModal, useModal2,
} from '../../../../actions/hook';
import {
  getAllSeasonTable_GetSeasonPrice_seasonPrices_dayOfWeekPrices as IDayOfWeek,
  getAllSeasonTable_GetAllRoomType_roomTypes as IRoomType,
  getAllSeason_GetAllSeason_seasons as ISeason,
  DayOfWeekPriceInput,
} from '../../../../types/api';
import { IPriceMap } from '../SetPriceWrap';
import CircleIcon from '../../../../atoms/circleIcon/CircleIcon';
import DayOfWeekModal from './dayOfWeekModal';
import JDbox from '../../../../atoms/box/JDbox';
import { numberToStrings } from '../../../../utils/dayOfweeks';
import { arraySum } from '../../../../utils/math';

interface ISetTableValue extends React.Dispatch<React.SetStateAction<ISeasonValue>> {}

interface IProps {
  priceMap?: IPriceMap | null;
  dayPickerHook: IUseDayPicker;
  colorHook: IUseColor;
  // roomTypes: IRoomType[]; 없어질듯
  defaultTableData: ITableData[];
  seasonData?: ISeason;
  seasonValue: ISeasonValue;
  setSeasonValue: ISetTableValue;
  updateSeasonMutation(): any;
  deleteSeasonMutation(): any;
  createSeasonMutation(): any;
  add?: boolean;
}

const SeasonModal: React.SFC<IProps> = ({
  priceMap,
  seasonValue,
  setSeasonValue,
  seasonData,
  // roomTypes, 없어질듯
  defaultTableData,
  colorHook,
  dayPickerHook,
  createSeasonMutation,
  deleteSeasonMutation,
  updateSeasonMutation,
  add,
}) => {
  const modalHook = useModal2(false);
  const validater = (): boolean => false;

  const onChangeDate = (from: string, to: string): void => {};

  const onDeleteTable = (): void => {
    deleteSeasonMutation();
  };

  const onCreateTable = async (): Promise<void> => {
    if (await validater()) {
      createSeasonMutation();
    }
  };

  const onUpdateTable = async (): Promise<void> => {
    if (await validater()) {
      updateSeasonMutation();
    }
  };

  const onIconClick = (foo: any) => {};

  const deleteDayOfWeek = () => {};

  const [tableValue, setTableValue] = useState(defaultTableData);

  const onWeekSubmit = (value: DayOfWeekPriceInput) => {
    const tableValueCopy = tableValue.slice();
    const roomTypeIndex = tableValueCopy.findIndex(tValue => tValue.id === modalHook.info.roomTypeId);
    if (roomTypeIndex !== -1) {
      const index = tableValueCopy[roomTypeIndex].dayOfWeek.findIndex(day => day.applyDays === value.applyDays);
      if (index !== -1) {
        // 수정일떄
        tableValueCopy[roomTypeIndex].dayOfWeek[index] = value;
      } else {
        // 생성일때
        tableValueCopy[roomTypeIndex].dayOfWeek.push(value);
      }
      setTableValue(tableValueCopy);
    }
  };

  const onDefaultBlur = (value: string, roomTypeId: string) => {
    const values = tableValue;
    const index = values.findIndex(inValue => inValue.id === roomTypeId);
    values[index] = {
      ...values[index],
      defaultValue: value,
    };

    setTableValue([...values]);
  };

  const onWeekBlur = (value: string, roomTypeId: string) => {
    const values = tableValue;
    const index = values.findIndex(inValue => inValue.id === roomTypeId);
    values[index] = {
      ...values[index],
      defaultValue: value,
    };

    setTableValue([...values]);
  };

  const TableColumns = [
    {
      Header: '룸타입명',
      accessor: 'name',
    },
    {
      Header: '가격',
      accessor: 'defaultValue',
      Cell: ({ original }: RowInfo) => (
        <InputText
          defaultValue={original.defaultValue}
          onBlur={(e: any) => {
            onDefaultBlur(e.currentTarget.value, original.id);
          }}
        />
      ), // Custom cell components!
    },
    {
      Header: '요일별 가격',
      accessor: 'dayOfWeek',
      Cell: ({ original }: RowInfo) => (
        <div className="seasonT__cell">
          {original.dayOfWeek.map((day: IDayOfWeek) => (
            <JDbox
              label={`${numberToStrings(day.applyDays)}`}
              iconOnClick={() => {
                onIconClick(day.applyDays);
              }}
              iconHover
              icon="eraser"
            >
              <span>{day.price}</span>
            </JDbox>
          ))}
          <CircleIcon
            onClick={() => {
              modalHook.openModal({
                applyedDays: arraySum(original.dayOfWeek.map((day: IDayOfWeek) => day.applyDays)),
                roomTypeId: original.id,
              });
            }}
            wave
          >
            <Icon icon="add" />
          </CircleIcon>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <div>
            <InputText label="시즌명" validation={utils.isMaxOver} max={10} />
          </div>
          <div>
            <JDdayPicker {...dayPickerHook} label="적용날자" onChange={onChangeDate} input isRange />
          </div>
          <div>
            <JDcolorPicker label="대표색상" colorHook={colorHook} />
            <span className="JDlarge-text">
              <Icon hover icon="arrowUp" />
              <Icon hover icon="download" />
            </span>
          </div>
          <div className="seasonT__pcController">
            <Button label="생성하기" mode="flat" thema="primary" onClick={onCreateTable} />
            <Button label="수정하기" mode="flat" thema="primary" onClick={onUpdateTable} />
            <Button label="삭제하기" mode="flat" thema="warn" onClick={onDeleteTable} />
          </div>
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
          <JDTable
            className="seasonTable"
            {...ReactTableDefault}
            data={tableValue}
            columns={TableColumns}
            minRows={0}
            align="center"
          />
        </div>
      </div>
      <div className="seasonT__mbController JDmodal__endSection">
        <Button label="생성하기" mode="flat" thema="primary" onClick={onCreateTable} />
        <Button label="수정하기" mode="flat" thema="primary" onClick={onUpdateTable} />
        <Button label="삭제하기" mode="flat" thema="warn" onClick={onDeleteTable} />
      </div>
      <DayOfWeekModal onSubmit={onWeekSubmit} modalHook={modalHook} />
    </Card>
  );
};
export default SeasonModal;
