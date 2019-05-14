import React, { useState } from 'react';
import { CellInfo } from 'react-table';
import selectTableHOC, {
  SelectInputComponentProps,
  SelectAllInputComponentProps,
} from 'react-table/lib/hoc/selectTable';
import JDtable, { ReactTableDefault } from '../../../atoms/table/Table';
import JDselect from '../../../atoms/forms/selectBox/SelectBox';
import CheckBox from '../../../atoms/forms/checkBox/CheckBox';
import Button from '../../../atoms/button/Button';
import JDIcon, { IconSize } from '../../../atoms/icons/Icons';
import { useModal } from '../../../actions/hook';
import BookerModalWrap from '../../../components/bookerInfo/BookerModalWrap';
import { IPageInfo, IBooker, IBooking } from '../../../types/interface';
import JDbox from '../../../atoms/box/JDbox';
import { arraySum } from '../../../utils/elses';
import { setYYYYMMDD } from '../../../utils/setMidNight';

interface IProps {
  pageInfo: IPageInfo | undefined;
  bookersData: IBooker[];
  loading: boolean;
}

const ResvList: React.SFC<IProps> = ({ pageInfo, bookersData, loading }) => {
  //   ❔ 두개 합치는게 좋을까?
  const [checkedIds, setCheckedIds]: any = useState({});
  const [selectAll, setSelectAll]: any = useState(false);
  const bookerModalHook = useModal(false);

  //   여기에 key가 들어오면 id배열에서 찾아서 넣거나 제거해줌
  const onToogleRow = (key: string) => {
    const newSelected: any = Object.assign({}, checkedIds);
    newSelected[key] = checkedIds[key] ? undefined : key;
    setCheckedIds(newSelected);
  };

  //    모든 라인들에대한 아이디를 투글함
  const onToogleAllRow = (flag: boolean) => {
    const newSelected: any = {};
    bookersData.forEach((booker) => {
      newSelected[booker._id] = checkedIds[booker._id] ? undefined : booker._id;
    });
    setCheckedIds(newSelected);
    setSelectAll(flag);
  };

  const TableColumns = [
    {
      Header: '예약일자',
      accessor: 'createdAt',
      Cell: ({ value }: CellInfo) => <div>{setYYYYMMDD(value.createdAt)}</div>,
    },
    {
      Header: '숙박정보',
      accessor: 'bookings',
      Cell: ({ value }: CellInfo) => {
        const bookings: IBooking[] = value;
        return bookings.map((booking: IBooking) => (
          <JDbox>
            {booking.roomType.name}
            <br />
            {/* 🚩인원곧 받음 */}
          </JDbox>
        ));
      },
    },
    {
      Header: '숙박일자',
      accessor: 'bookings',
      Cell: ({ value }: CellInfo) => {
        const bookings: IBooking[] = value;
        return (
          <div>
            {setYYYYMMDD(bookings[0].start)}
            <br />
            {setYYYYMMDD(bookings[0].end)}
          </div>
        );
      },
    },
    {
      Header: () => (
        <div>
          {'예약자명'}
          <br />
          {'연락처'}
        </div>
      ),
      accessor: 'name',
      Cell: ({ original }: CellInfo) => {
        const Booker: IBooker = original;
        return (
          <div>
            {Booker.name}
            <br />
            {Booker.phoneNumber}
          </div>
        );
      },
    },
    {
      Header: () => (
        <div>
          {'이용금액'}
          <br />
          {'결제상태'}
        </div>
      ),
      accessor: 'bookings',
      Cell: ({ original }: CellInfo) => {
        const booker: IBooker = original;
        return (
          <div>
            {arraySum(booker.bookings ? booker.bookings.map(booking => booking.price) : [0])}
            <br />
            {/* 🚩 곧 가격 관련 들어올것 */}
          </div>
        );
      },
    },
    {
      Header: '메모',
      accessor: 'memo',
      minWidth: 200,
      Cell: ({ value }: CellInfo) => <div>{value}</div>,
    },
    {
      Header: '상세',
      accessor: 'email',
      minWidth: 50,
      Cell: () => <JDIcon onClick={bookerModalHook.openModal} size={IconSize.MEDIUM} hover icon="person" />,
    },
  ];

  const selectInputCompoent = ({
    selectType, onClick, checked, id, row,
  }: SelectInputComponentProps) => {
    const inId = id.replace('select-', '');
    const onChange = (flag: boolean) => {
      onToogleRow(inId);
    };

    return <CheckBox onChange={onChange} checked={checked} />;
  };

  const selectAllInputComponentProps = ({ selectType, onClick, checked }: SelectAllInputComponentProps) => (
    <CheckBox onChange={onToogleAllRow} checked={checked} />
  );

  const SelectableJDtable = selectTableHOC(JDtable);
  return (
    <div id="seasonTable" className="seasonT container container--lg">
      <div className="docs-section">
        <h3>예약목록</h3>
        <div>
          <Button size="small" thema="primary" label="예약확정" />
          <Button size="small" thema="primary" label="예약대기" />
          <Button size="small" thema="primary" label="예약취소" />
          <Button size="small" thema="warn" label="예약삭제" />
        </div>
        <SelectableJDtable
          {...ReactTableDefault}
          toggleAll={() => {}}
          toggleSelection={onToogleRow}
          SelectAllInputComponent={selectAllInputComponentProps}
          SelectInputComponent={selectInputCompoent}
          isCheckable
          data={bookersData}
          selectAll={selectAll}
          isSelected={(key: string) => checkedIds[key] !== undefined}
          columns={TableColumns}
          keyField="_id"
        />
        <BookerModalWrap
          key={`${bookerModalHook.info.bookerId || 'BookerModaldefaultId'}`}
          modalHook={bookerModalHook}
        />
      </div>
    </div>
  );
};

export default ResvList;
