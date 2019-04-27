import React, { useState } from 'react';
import { CellInfo } from 'react-table';
import selectTableHOC, {
  SelectInputComponentProps,
  SelectAllInputComponentProps,
} from 'react-table/lib/hoc/selectTable';
import JDtable, { ReactTableDefault } from '../../../atoms/table/Table';
import JDselect from '../../../atoms/forms/SelectBox';
import CheckBox from '../../../atoms/forms/CheckBox';
import Button from '../../../atoms/button/Button';
import JDIcon from '../../../atoms/icons/Icons';
import { useModal2 } from '../../../actions/hook';

interface IProps {}

const ResvList: React.SFC<IProps> = () => {
  const datas = [
    {
      number: '1',
      phoneNumber: '1',
      resvInfo: '1',
      date: '1',
      bookerInfo: '1',
      payment: '1',
      memo: '1',
      id: '응?',
    },
    {
      number: '1',
      phoneNumber: '1',
      resvInfo: '1',
      date: '1',
      bookerInfo: '1',
      payment: '1',
      memo: '1',
      id: '오?',
    },
    {
      number: '1',
      phoneNumber: '1',
      resvInfo: '1',
      date: '1',
      bookerInfo: '1',
      payment: '1',
      memo: '1',
      id: '헿?',
    },
  ];

  //   ❔ 두개 합치는게 좋을까?
  const [checkedIds, setCheckedIds]: any = useState({});
  const [selectAll, setSelectAll]: any = useState(false);
  const bookerModalHook = useModal2(false);

  //   여기에 key가 들어오면 id배열에서 찾아서 넣거나 제거해줌
  const onToogleRow = (key: string) => {
    console.log(key);
    const newSelected: any = Object.assign({}, checkedIds);
    newSelected[key] = checkedIds[key] ? undefined : key;
    setCheckedIds(newSelected);
  };

  //    모든 라인들에대한 아이디를 투글함
  const onToogleAllRow = (flag: boolean) => {
    const newSelected: any = {};
    datas.forEach((data) => {
      newSelected[data.id] = checkedIds[data.id] ? undefined : data.id;
    });
    setCheckedIds(newSelected);
    setSelectAll(flag);
  };

  const TableColumns = [
    {
      Header: '번호',
      accessor: 'number',
    },
    {
      Header: '예약일자',
      accessor: 'phoneNumber',
    },
    {
      Header: '숙박정보',
      accessor: 'resvInfo',
    },
    {
      Header: '숙박일자',
      accessor: 'date',
    },
    {
      Header: () => (
        <div>
          {'예약자명'}
          <br />
          {'연락처'}
        </div>
      ),
      accessor: 'bookerInfo',
    },
    {
      Header: () => (
        <div>
          {'이용금액'}
          <br />
          {'결제상태'}
        </div>
      ),
      accessor: 'payment',
    },
    {
      Header: '메모',
      accessor: 'memo',
      minWidth: 200,
    },
    {
      Header: '상세',
      accessor: 'id',
      minWidth: 50,
      Cell: () => <JDIcon size="1.5rem" hover icon="person" />,
    },
  ];

  const selectInputCompoent = ({
    selectType, onClick, checked, id, row,
  }: SelectInputComponentProps) => {
    const inId = id.replace('select-', '');
    const onChange = (flag: boolean) => {
      onToogleRow(inId);
    };

    console.log(checkedIds);
    return <CheckBox onChange={onChange} checked={checked} />;
  };

  const selectAllInputComponentProps = ({ selectType, onClick, checked }: SelectAllInputComponentProps) => {
    console.log(onClick);
    console.log(checked);

    return <CheckBox onChange={onToogleAllRow} checked={checked} />;
  };

  const SelectableJDtable = selectTableHOC(JDtable);
  return (
    <div id="seasonTable" className="seasonT container container--lg">
      <div className="docs-section">
        <h3>예약목록</h3>
        <div>
          <Button thema="primary" label="예약확정" />
          <Button thema="primary" label="예약대기" />
          <Button thema="primary" label="예약취소" />
          <Button thema="warn" label="예약삭제" />
        </div>
        <SelectableJDtable
          {...ReactTableDefault}
          keyField="id"
          toggleAll={() => {}}
          toggleSelection={onToogleRow}
          SelectAllInputComponent={selectAllInputComponentProps}
          SelectInputComponent={selectInputCompoent}
          isCheckable
          data={datas}
          selectAll={selectAll}
          isSelected={(key: string) => checkedIds[key] !== undefined}
          columns={TableColumns}
        />
      </div>
    </div>
  );
};

export default ResvList;
