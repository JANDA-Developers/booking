/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import InputText from '../../../../atoms/forms/InputText';
import Button from '../../../../atoms/button/Button';
import JDTable from '../../../../atoms/table/Table';
import JDcolorPicker from '../../../../atoms/colorPicker/ColorPicker';
import Icon from '../../../../atoms/icons/Icons';
import utils from '../../../../utils/utils';
import JDdayPicker from '../../../../components/dayPicker/DayPicker';
import Card from '../../../../atoms/cards/Card';
import { ITableValue } from './seasonTableWrap';
import { IUseColor } from '../../../../actions/hook';

interface ISetTableValue extends React.Dispatch<React.SetStateAction<ITableValue>> {}

interface IProps {
  colorHook: IUseColor;
  tableValue: ITableValue;
  setTableValue: ISetTableValue;
  updateSeasonMutation(): any;
  deleteSeasonMutation(): any;
  createSeasonMutation(): any;
}

const SeasonModal: React.SFC<IProps> = ({
  colorHook,
  tableValue,
  setTableValue,
  createSeasonMutation,
  deleteSeasonMutation,
  updateSeasonMutation,
}) => {
  const validater = (): boolean => false;

  const onChangeDate = (from: string, to: string): void => {
    console.log(from);
    console.log(to);
  };

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

  const TableData = [
    { color: 'blue', food: 'food', actor: 'i' },
    { color: 'blue', food: 'food', actor: 'i' },
    { color: 'blue', food: 'food', actor: 'i' },
  ];

  const TableColumns = [
    {
      Header: '룸타입명',
      accessor: 'index',
    },
    {
      Header: '가격',
      accessor: 'priority',
    },
    {
      Header: '요일별 가격',
      accessor: 'dayOfWeek',
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
          <JDdayPicker onChange={onChangeDate} input label="input" isRange />
        </div>
        <JDTable
          columns={TableColumns}
          data={TableData}
          showPagination={false}
          loading={false}
          align="center"
          minRows={0}
        />
      </div>
      <div className="ReactModal__EndSection">
        <Button label="생성하기" mode="flat" onClick={onCreateTable} />
        <Button label="수정하기" mode="flat" onClick={onUpdateTable} />
        <Button label="삭제하기" mode="flat" onClick={onDeleteTable} />
      </div>
    </Card>
  );
};
export default SeasonModal;
