import classNames from "classnames";
import React from "react";
import JDtable, {ReactTableDefault, JDcolumn} from "../../../atoms/table/Table";
import EerrorProtect from "../../../utils/errProtect";
import {IRoomSelectInfo} from "../BookingModal";
import {PricingType} from "../../../types/enum";
import {s4, isEmpty} from "../../../utils/utils";

interface IProps {
  className?: string;
  roomSelectInfo: IRoomSelectInfo[];
}

const RoomSelectInfoTable: React.FC<IProps> = ({className, roomSelectInfo}) => {
  const classes = classNames("roomSelectInfoTable", className, {});
  const haveRoomNames = roomSelectInfo.find(V => !isEmpty(V.roomNames));

  const TableColumns: JDcolumn<IRoomSelectInfo>[] = [
    {
      Header: "객실정보",
      accessor: "roomTypeName",
      Cell: ({original}) => <div>{original.roomTypeName}</div>
    },
    {
      Header: "인원",
      accessor: "count",
      Cell: ({value, original}) =>
        original.pricingType === PricingType.DOMITORY ? (
          <div>
            <span>{`${value.male}남 `}</span>
            <span>{`${value.female}여 `}</span>
          </div>
        ) : (
          <div>
            <span>{`${value.roomCount}명`}</span>
          </div>
        )
    }
  ];

  haveRoomNames &&
    TableColumns.push({
      Header: "배정",
      accessor: "roomNames",
      Cell: ({value}) =>
        value.map((roomName: string) => <span key={s4()}>{roomName}</span>)
    });

  return (
    <div className={classes}>
      <JDtable
        columns={TableColumns}
        {...ReactTableDefault}
        data={roomSelectInfo}
        minRows={1}
        noDataText="선택사항이 없습니다."
      />
    </div>
  );
};

export default EerrorProtect(RoomSelectInfoTable);
