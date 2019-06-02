import classNames from "classnames";
import React from "react";
import {CellInfo} from "react-table";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import InputText from "../../../atoms/forms/inputText/InputText";
import EerrorProtect from "../../../utils/errProtect";
import JDbox from "../../../atoms/box/JDbox";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDIcon from "../../../atoms/icons/Icons";
import {IroomSelectInfoTable} from "../BookerModal";
import {PricingType} from "../../../types/enum";

interface IProps {
  className?: string;
  resvInfo: IroomSelectInfoTable[];
}

const RoomSelectInfoTable: React.FC<IProps> = ({className, resvInfo}) => {
  const classes = classNames("roomSelectInfoTable", className, {});

  const TableColumns = [
    {
      Header: "객실정보",
      accessor: "roomTypeName",
      // 여기다 모든 roomType 을 넣어주어야함.
      Cell: ({value}: CellInfo<any>) => <div>{value}</div>
    },
    {
      Header: "인원",
      accessor: "count",
      Cell: ({value, original}: CellInfo<any>) =>
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

  return (
    <div className={classes}>
      <JDtable
        columns={TableColumns}
        {...ReactTableDefault}
        data={resvInfo}
        minRows={1}
        noDataText="선택사항이 없습니다."
      />
    </div>
  );
};

export default EerrorProtect(RoomSelectInfoTable);
