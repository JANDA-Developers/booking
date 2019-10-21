import classNames from "classnames";
import React from "react";
import JDtable, {ReactTableDefault, JDcolumn} from "../../../atoms/table/Table";
import EerrorProtect from "../../../utils/errProtect";
import {IRoomSelectInfo} from "../BookingModal";
import {PricingType} from "../../../types/enum";
import {s4, isEmpty} from "../../../utils/utils";
import {LANG} from "../../../hooks/hook";

interface IProps {
  className?: string;
  roomSelectInfo: IRoomSelectInfo[];
}

const RoomSelectInfoTable: React.FC<IProps> = ({className, roomSelectInfo}) => {
  const classes = classNames("roomSelectInfoTable", className, {});
  const haveRoomNames = roomSelectInfo.find(V => !isEmpty(V.roomNames));

  const TableColumns: JDcolumn<IRoomSelectInfo>[] = [
    {
      Header: LANG("room_info"),
      accessor: "roomTypeName",
      Cell: ({original}) => <div>{original.roomTypeName}</div>
    },
    {
      Header: LANG("Headcount"),
      accessor: "count",
      Cell: ({value, original}) =>
        original.pricingType === PricingType.DOMITORY ? (
          <div>
            <span>{`${value.male}${LANG("male")} `}</span>
            <span>{`${value.female}${LANG("female")} `}</span>
          </div>
        ) : (
          <div>
            <span>{`${value.roomCount}${LANG("people")}`}</span>
          </div>
        )
    }
  ];

  return (
    <div className={classes}>
      <JDtable
        columns={TableColumns}
        {...ReactTableDefault}
        data={roomSelectInfo}
        minRows={1}
        noDataText={LANG("no_choosen_option")}
      />
    </div>
  );
};

export default EerrorProtect(RoomSelectInfoTable);
