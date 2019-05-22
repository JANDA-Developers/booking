/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {Mutation, ApolloConsumer} from "react-apollo";
import {withRouter, RouteComponentProps} from "react-router";
import CheckReservation from "./CheckReservation";
import {ErrProtecter, queryDataFormater} from "../../../utils/utils";
import {FIND_BOOKER} from "../../../queries";
import {
  findBookerVariables,
  findBooker_FindBooker_booker
} from "../../../types/api";
import JDtable from "../../../atoms/table/Table";
import {ReactTableDefaults} from "react-table";
import {getRoomTypePerGuests} from "../../../utils/booking";

export interface IProps {
  tableData: findBooker_FindBooker_booker | undefined;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const CheckTable: React.FC<IProps> = ({tableData}) => {
  const TableColumns = [
    {
      Header: "숙박일",
      accessor: "day"
    },
    {
      Header: "객실/인원",
      accessor: "resvInfo"
    },
    {
      Header: "이용금액",
      accessor: "price"
    },
    {
      Header: "상태",
      accessor: "statue"
    }
  ];

  const formatTableData = (() => {
    if (tableData) {
      return [
        {
          day: {
            start: tableData.start,
            end: tableData.end
          },
          price: {price: 0, payStatus: tableData.paymentStatus},
          statue: tableData.bookingStatus,
          resvInfo: getRoomTypePerGuests(tableData)
        }
      ];
    } else {
      return undefined;
    }
  })();

  return (
    <JDtable
      {...ReactTableDefaults}
      data={formatTableData || []}
      minRows={1}
      columns={TableColumns}
    />
  );
};

export default ErrProtecter(CheckTable);
