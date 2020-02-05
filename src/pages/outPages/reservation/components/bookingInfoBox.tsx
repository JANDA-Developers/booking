import classNames from "classnames";
import moment from "moment";
import React from "react";
import JDtable, {
  ReactTableDefault,
  JDcolumn
} from "../../../../atoms/table/Table";
import JDbox from "../../../../atoms/box/JDbox";
import { IRoomType } from "../../../../types/interface";
import { PricingType } from "../../../../types/enum";
import { autoComma, toNumber } from "../../../../utils/utils";
import { LANG } from "../../../../hooks/hook";
import { IRoomSelectInfo } from "../../../../components/bookingModal/declaration";

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
      Header: LANG("checkIn"),
      accessor: "roomTypeId",
      Cell: () =>
        from && to ? <div>{moment(from).format("YYYY-MM-DD")}</div> : <div />
    },
    {
      Header: LANG("checkOut"),
      accessor: "roomTypeId",
      Cell: () =>
        from && to ? <div>{moment(to).format("YYYY-MM-DD")}</div> : <div />
    },
    {
      Header: LANG("room_info"),
      accessor: "roomTypeId",
      Cell: ({ value }) => {
        const roomType = roomTypeInfo.find(
          inRoomType => inRoomType._id === value
        );
        if (roomType) return <div>{roomType.name}</div>;
        return <div />;
      }
    },
    {
      Header: LANG("personnel"),
      accessor: "roomTypeId",
      Cell: ({ original }) =>
        original.pricingType === PricingType.DOMITORY ? (
          <div>
            <span>{`${original.count.male}${LANG("male")}`}</span>
            <span>{`${original.count.female}${LANG("female")} `}</span>
          </div>
        ) : (
          <div>
            <span>{`${LANG("room_count")}:${original.count.roomCount}`}</span>
          </div>
        )
    }
  ];

  return (
    <div className={classes}>
      <JDtable
        {...ReactTableDefault}
        columns={TableColumns}
        data={roomSelectInfo}
        minRows={1}
        noDataText={LANG("no_choosen_option")}
      />
      <JDbox className="JDmargin-bottom0--wmdUp" mode="border">
        <span>
          {LANG("total_price")}: {autoComma(toNumber(totalPrice))}
        </span>
        <span> /{LANG("money_unit")}</span>
      </JDbox>
    </div>
  );
};

export default BookingInfoBox;
