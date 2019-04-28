import classNames from 'classnames';
import React from 'react';
import JDtable, { ReactTableDefault } from '../../../atoms/table/Table';
import JDbox from '../../../atoms/box/JDbox';

interface IProps {
  className?: string;
}

const RoomSelectInfo: React.FC<IProps> = ({ className }) => {
  const classes = classNames('JDselectInfo', className, {});

  const TableColumns = [
    {
      Header: '숙박일',
      accessor: '---',
    },
    {
      Header: '객실정보',
      accessor: '---',
    },
    {
      Header: '인원',
      accessor: '---',
    },
    {
      Header: '이용금액',
      accessor: '---',
    },
  ];

  return (
    <div className={classes}>
      <JDtable columns={TableColumns} {...ReactTableDefault} minRows={1} noDataText="선택사항이 없습니다." />
      <JDbox mode="border">
        <span>총가격 :</span>
        <span> /원</span>
      </JDbox>
    </div>
  );
};

export default RoomSelectInfo;
