/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from "react";
import {ErrProtecter} from "../../../utils/utils";
import {getBookingForPublic_GetBookingForPublic_booking} from "../../../types/api";
import JDtable, {JDcolumn} from "../../../atoms/table/Table";
import {ReactTableDefaults} from "react-table";
import {IRoomType} from "../../../types/interface";
import JDbox from "../../../atoms/box/JDbox";
import {PricingType} from "../../../types/enum";
import moment from "moment";
import {getRoomSelectInfo} from "../../../utils/typeChanger";
import {LANG} from "../../../hooks/hook";

export interface IProps {
  tableData: getBookingForPublic_GetBookingForPublic_booking[] | undefined;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const CheckTable: React.FC<IProps> = ({tableData}) => {
  const TableColumns: JDcolumn<
    getBookingForPublic_GetBookingForPublic_booking
  >[] = [
    {
      Header: LANG("checkIn"),
      accessor: "_id",
      Cell: ({original}) => (
        <div>
          <span>{moment(original.checkIn).format("YYYY-MM-DD")}</span>
        </div>
      )
    },
    {
      Header: LANG("checkOut"),
      accessor: "_id",
      Cell: ({original}) => (
        <div>
          <span>{moment(original.checkOut).format("YYYY-MM-DD")}</span>
        </div>
      )
    },
    {
      Header: LANG("Rooms") + LANG("personnel"),
      accessor: "roomTypes",
      Cell: ({value, original}) => {
        const roomTypes: IRoomType[] = value;
        const roomSelectInfo = getRoomSelectInfo(original.guests, roomTypes);
        return roomSelectInfo.map(selectInfo => (
          <JDbox size="small">
            {selectInfo.roomTypeName}
            <br />
            <span>
              {(() => {
                const {female, male, roomCount} = selectInfo.count;
                return (
                  <span>
                    {selectInfo.pricingType === PricingType.DOMITORY ? (
                      <Fragment>
                        {female && (
                          <span>
                            {female}
                            {LANG("female")}{" "}
                          </span>
                        )}
                        {male && (
                          <span>
                            {male}
                            {LANG("male")}
                          </span>
                        )}
                      </Fragment>
                    ) : (
                      <span>{roomCount}</span>
                    )}
                  </span>
                );
              })()}
            </span>
          </JDbox>
        ));
      }
    },
    {
      Header: LANG("usage_amount"),
      accessor: "payment",
      Cell: ({value, original}) => (
        <div>
          {value.price} <br />
          {LANG(original.payment.status)}
        </div>
      )
    },
    {
      Header: LANG("status"),
      accessor: "status",
      Cell: ({value, original}) => <span>{LANG(value)}</span>
    }
  ];

  return (
    <JDtable
      {...ReactTableDefaults}
      data={tableData || []}
      minRows={1}
      columns={TableColumns}
    />
  );
};

export default ErrProtecter(CheckTable);
