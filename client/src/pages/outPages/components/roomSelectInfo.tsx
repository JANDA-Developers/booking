import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import { CellInfo } from 'react-table';
import JDtable, { ReactTableDefault } from '../../../atoms/table/Table';
import JDbox from '../../../atoms/box/JDbox';
import { GuestPartInput } from '../../../types/api';
import { IRoomType } from '../../../types/interface';

interface IProps {
  className?: string;
  resvRooms: GuestPartInput[];
  from: Date | null;
  to: Date | null;
  roomTypeInfo: IRoomType[];
}

const RoomSelectInfo: React.FC<IProps> = ({
  className, resvRooms, from, to, roomTypeInfo,
}) => {
  const classes = classNames('JDselectInfo', className, {});

  console.log(resvRooms);
  const TableColumns = [
    {
      Header: '숙박일',
      accessor: 'roomTypeId',
      Cell: () => (from && to ? (
        <div>
          {moment(from).format('YYYY-MM-DD')}
{`~`}
          <br />
          {moment(to).format('YYYY-MM-DD')}
        </div>
      ) : (
        <div />
      )),
    },
    {
      Header: '객실정보',
      accessor: 'roomTypeId',
      Cell: ({ value }: CellInfo) => {
        const roomType = roomTypeInfo.find(inRoomType => inRoomType._id === value);
        if (roomType) return <div>{roomType.name}</div>;
        return <div />;
      },
    },
    {
      Header: '인원',
      accessor: 'count',
    },
    {
      Header: '이용금액',
      accessor: 'price',
    },
  ];

  return (
    <div className={classes}>
      <JDtable
        {...ReactTableDefault}
        columns={TableColumns}
        data={resvRooms}
        minRows={1}
        noDataText="선택사항이 없습니다."
      />
      <JDbox mode="border">
        <span>총가격 :</span>
        <span> /원</span>
      </JDbox>
    </div>
  );
};

export default RoomSelectInfo;
