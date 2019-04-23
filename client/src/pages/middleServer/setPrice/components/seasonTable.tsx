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
  getAllSeasonTable_GetAllRoomType_roomTypes as IRoomType,
  getAllSeason_GetAllSeason_seasons as ISeason,
} from '../../../../types/api';
import { IPriceMap } from '../SetPriceWrap';
import CircleIcon from '../../../../atoms/circleIcon/CircleIcon';
import DayOfWeekModal from './dayOfWeekModal';

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

  const [tableValue, setTableValue] = useState(defaultTableData);

  const onInputBlur = (value: string, roomTypeId: string) => {
    const values = tableValue;
    const index = values.findIndex(inValue => inValue.id !== roomTypeId) - 1;
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
          className="number"
          defaultValue={original.defaultValue}
          onBlur={(e: any) => {
            onInputBlur(e.currentTarget.value, original.id);
          }}
        />
      ), // Custom cell components!
    },
    {
      Header: '요일별 가격',
      accessor: 'dayOfWeek',
      Cell: ({ original }: RowInfo) => (
        <div className="">
          <InputText className="number" defaultValue={original.defaultValue} onBlur={onInputBlur} />
          <CircleIcon
            onClick={() => {
              modalHook.openModal({ aplyWeek: original.dayOfWeek });
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
          <span className="JDlarge-text">
            <Icon hover icon="arrowUp" />
            <Icon hover icon="download" />
          </span>
          <InputText label="시즌명" validation={utils.isMaxOver} max={10} />
          <JDcolorPicker colorHook={colorHook} />
          <JDdayPicker {...dayPickerHook} onChange={onChangeDate} input label="input" isRange />
        </div>
        <div className="flex-grid__col col--full-6 col--lg-6 col--md-12">
        {add && (
          <JDTable
          className="seasonTable"
          {...ReactTableDefault}
          data={tableValue}
          columns={TableColumns}
          minRows={0}
          align="center"
          />
          )}
        </div>
      </div>
      <div className="JDmodal__EndSection">
        <Button label="생성하기" mode="flat" onClick={onCreateTable} />
        <Button label="수정하기" mode="flat" onClick={onUpdateTable} />
        <Button label="삭제하기" mode="flat" onClick={onDeleteTable} />
      </div>
      <DayOfWeekModal modalHook={modalHook} />
    </Card>
  );
};
export default SeasonModal;
