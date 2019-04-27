import classNames from 'classnames';
import React from 'react';
import JDtable, { ReactTableDefault } from '../../../atoms/table/Table';
import JDselect from '../../../atoms/forms/SelectBox';
import InputText from '../../../atoms/forms/InputText';
import EerrorProtect from '../../../utils/ErrProtecter';

interface IProps {
  className?: string;
}

const RoomSelectInfoTable: React.FC<IProps> = ({ className }) => {
  const classes = classNames('JDselectInfo', className, {});

  const TableColumns = [
    {
      Header: '객실정보',
      accessor: '---',
      Cell: () => <JDselect label="객실정보" />,
    },
    {
      Header: '인원',
      accessor: '---',
      Cell: () => (
        <div>
          <JDselect label="남" />
          <JDselect mode="small" label="여" />
        </div>
      ),
    },
    {
      Header: '이용금액',
      accessor: '---',
    },
  ];

  return (
    <div className={classes}>
      <JDtable columns={TableColumns} {...ReactTableDefault} minRows={1} noDataText="선택사항이 없습니다." />
      <div className="JDselectInfo__priceResultBox">
        <span>총가격 :</span>
        <span> /원</span>
      </div>
      <JDselect label="결제상태 및 수단" />
    </div>
  );
};

export default EerrorProtect(RoomSelectInfoTable);
