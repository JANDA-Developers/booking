import classNames from "classnames";
import moment from "moment";
import React from "react";
import JDtable, {
  ReactTableDefault,
  JDcolumn
} from "../../../../atoms/table/Table";
import JDbox from "../../../../atoms/box/JDbox";
import {IRoomType} from "../../../../types/interface";
import {PricingType} from "../../../../types/enum";
import {autoComma} from "../../../../utils/utils";
import {IRoomSelectInfo} from "../../../../components/bookingModal/BookingModal";

export interface IBookingInfoBoxProps {
  className?: string;
  roomSelectInfo: IRoomSelectInfo[];
  from: Date | null;
  to: Date | null;
  roomTypeInfo: IRoomType[];
  totalPrice: number;
}

const BookingInfoBox: React.FC<IBookingInfoBoxProps> = ({
  className,
  roomSelectInfo,
  from,
  to,
  roomTypeInfo,
  totalPrice
}) => {
  const classes = classNames("JDselectInfo", className, {});

  const TableColumns: JDcolumn<IRoomSelectInfo>[] = [
    {
      Header: "체크인",
      accessor: "roomTypeId",
      Cell: () =>
        from && to ? <div>{moment(from).format("YYYY-MM-DD")}</div> : <div />
    },
    {
      Header: "체크아웃",
      accessor: "roomTypeId",
      Cell: () =>
        from && to ? <div>{moment(to).format("YYYY-MM-DD")}</div> : <div />
    },
    {
      Header: "객실정보",
      accessor: "roomTypeId",
      Cell: ({value}) => {
        const roomType = roomTypeInfo.find(
          inRoomType => inRoomType._id === value
        );
        if (roomType) return <div>{roomType.name}</div>;
        return <div />;
      }
    },
    {
      Header: "인원",
      accessor: "roomTypeId",
      Cell: ({original}) => {
        original.pricingType === PricingType.DOMITORY ? (
          <div>
            <span>{`${original.count.male}남 `}</span>
            <span>{`${original.count.female}여 `}</span>
          </div>
        ) : (
          <div>
            <span>{`${original.count.roomCount}개`}</span>
          </div>
        );
      }
    },
    {
      Header: "이용금액",
      accessor: "discountedPrice",
      Cell: ({value}) => autoComma(value)
    }
  ];

  return (
    <div className={classes}>
      <JDtable
        {...ReactTableDefault}
        columns={TableColumns}
        data={roomSelectInfo}
        minRows={1}
        noDataText="선택사항이 없습니다."
      />
      <JDbox className="JDmargin-bottom0--wmdUp" mode="border">
        <span>총가격 : {autoComma(totalPrice)}</span>
        <span> /원</span>
      </JDbox>
    </div>
  );
};

export default BookingInfoBox;
