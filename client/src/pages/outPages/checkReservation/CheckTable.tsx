/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from "react";
import {Mutation, ApolloConsumer} from "react-apollo";
import {withRouter, RouteComponentProps} from "react-router";
import CheckReservation from "./CheckReservation";
import {ErrProtecter, queryDataFormater} from "../../../utils/utils";
import {FIND_BOOKING_FOR_BOOKER} from "../../../queries";
import {
  findBookingVariables,
  findBooking_FindBooking_bookings
} from "../../../types/api";
import JDtable from "../../../atoms/table/Table";
import {ReactTableDefaults, CellInfo} from "react-table";
import {getRoomTypePerGuests, bookingGuestsMerge} from "../../../utils/booking";
import {IRoomType} from "../../../types/interface";
import JDbox from "../../../atoms/box/JDbox";
import {
  PricingType,
  BookingStatusKr,
  PaymentStatusKr
} from "../../../types/enum";

export interface IProps {
  tableData: findBooking_FindBooking_bookings[] | undefined;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const CheckTable: React.FC<IProps> = ({tableData}) => {
  const TableColumns = [
    {
      Header: "숙박일",
      accessor: "_id",
      Cell: ({original}: CellInfo) => (
        <div>
          <span>{original.start.split("T")[0]} 체크인</span>
          <br />
          <span>{original.end.split("T")[0]} 체크아웃</span>
        </div>
      )
    },
    {
      Header: "객실/인원",
      accessor: "roomTypes",
      Cell: ({value, original}: CellInfo) => {
        const roomTypes: IRoomType[] = value;
        return roomTypes.map(roomType => (
          <JDbox size="small">
            {roomType.name}
            <br />
            <span>
              {(() => {
                const guestsCount = bookingGuestsMerge(
                  original.guests,
                  roomType._id
                );
                return (
                  <span>
                    {roomType.pricingType === PricingType.DOMITORY ? (
                      <Fragment>
                        {guestsCount.female ? (
                          <span>{guestsCount.female}여 </span>
                        ) : null}
                        {guestsCount.male ? (
                          <span>{guestsCount.male}남</span>
                        ) : null}
                      </Fragment>
                    ) : (
                      <span>{guestsCount.count}개</span>
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
      accessor: "price",
      Cell: ({value, original}: CellInfo) => (
        <div>
          {value} <br />
          {PaymentStatusKr[original.paymentStatus]}
        </div>
      )
    },
    {
      Header: "상태",
      accessor: "bookingStatus",
      Cell: ({value, original}: CellInfo) => (
        <span>{BookingStatusKr[value]}</span>
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
