import classNames from 'classnames';
import React from 'react';
import { CellInfo } from 'react-table';
import JDtable, { ReactTableDefault } from '../../../atoms/table/Table';
import JDselect from '../../../atoms/forms/SelectBox';
import InputText from '../../../atoms/forms/InputText';
import EerrorProtect from '../../../utils/ErrProtecter';
import JDbox from '../../../atoms/box/JDbox';
import CircleIcon from '../../../atoms/circleIcon/CircleIcon';
import JDIcon from '../../../atoms/icons/Icons';

interface IProps {
  className?: string;
}

const RoomSelectInfoTable: React.FC<IProps> = ({ className }) => {
  const classes = classNames('roomSelectInfoTable', className, {});

  const data: any = []; // 임시
  //  주의 할점은 addbleData 는 TableColumns에 들어가기전에만 합류해야하는것이다.
  const addableData = [
    {
      roomInfo: 'add',
      person: 'add',
      price: 'add',
      value: 'add',
    },
  ];

  const tableData = data.concat(addableData);

  const TableColumns = [
    {
      Header: '객실정보',
      accessor: 'roomInfo',
      Cell: ({ value }: CellInfo) => (value === 'add' ? <JDselect className="roomSelectInfoTable__roomSelect" /> : <div />),
      minWidth: 70,
    },
    {
      Header: '인원',
      accessor: 'person',
      Cell: ({ value }: CellInfo) => (value === 'add' ? (
        <div className="flex-grid roomSelectInfoTable__personSelects">
          <JDselect mode="small" rightLabel="남" />
          <JDselect mode="small" rightLabel="여" />
        </div>
      ) : (
        <div />
      )),
    },
    {
      Header: '이용금액',
      accessor: 'price',
      Cell: ({ value }: CellInfo) => (value === 'add' ? (
        <div>
          <InputText />
        </div>
      ) : (
        <div />
      )),
      minWidth: 40,
    },
    {
      Header: '',
      accessor: 'controll',
      Cell: ({ value }: CellInfo) => (value === 'add' ? (
        <CircleIcon>
          <JDIcon icon="add" />
        </CircleIcon>
      ) : (
        <CircleIcon>
          <JDIcon icon="clear" />
        </CircleIcon>
      )),
      minWidth: 30,
    },
  ];

  return (
    <div className={classes}>
      <JDtable
        columns={TableColumns}
        {...ReactTableDefault}
        data={tableData}
        minRows={1}
        noDataText="선택사항이 없습니다."
      />
    </div>
  );
};

export default EerrorProtect(RoomSelectInfoTable);
