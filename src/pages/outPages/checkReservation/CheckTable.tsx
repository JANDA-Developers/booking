/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from "react";
import {ErrProtecter} from "../../../utils/utils";
import {getBookingForPublic_GetBookingForPublic_booking} from "../../../types/api";
import JDtable, {JDcolumn} from "../../../atoms/table/Table";
import {ReactTableDefaults} from "react-table";
import {IRoomType} from "../../../types/interface";
import JDbox from "../../../atoms/box/JDbox";
import {
  PricingType,
  BookingStatusKr,
  PaymentStatusKr
} from "../../../types/enum";
import moment from "moment";
import {getRoomSelectInfo} from "../../../utils/guestCountByRoomType";

export interface IProps {
  tableData: getBookingForPublic_GetBookingForPublic_booking[] | undefined;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const CheckTable: React.FC<IProps> = ({tableData}) => {
  const TableColumns: JDcolumn<
    getBookingForPublic_GetBookingForPublic_booking
  >[] = [
    {
      Header: {LANG('checkIn')},
      accessor: "_id",
      Cell: ({original}) => (
        <div>
          <span>{moment(original.checkIn).format("YYYY-MM-DD")}</span>
        </div>
      )
    },
    {
      Header: {LANG('checkOut')},
      accessor: "_id",
      Cell: ({original}) => (
        <div>
          <span>{moment(original.checkOut).format("YYYY-MM-DD")}</span>
        </div>
      )
    },
    {
      Header: "객실/인원",
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
                        {female && <span>{female}여 </span>}
                        {male && <span>{male}남</span>}
                      </Fragment>
                    ) : (
                      <span>{roomCount}개</span>
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
      Header: "이용금액",
      accessor: "payment",
      Cell: ({value, original}) => (
        <div>
          {value.price} <br />
          {
            // @ts-ignore
            PaymentStatusKr[original.paymentStatus]
          }
        </div>
      )
    },
    {
      Header: "상태",
      accessor: "status",
      Cell: ({value, original}) => (
        <span>
          {
            // @ts-ignore
            BookingStatusKr[value]
          }
        </span>
      )
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
