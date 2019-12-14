import React, { useState } from "react";
import { IContext } from "../../../BookingHostRouter";
import { LANG, useCheckBoxTable, useModal } from "../../../../../hooks/hook";
import { JDcolumn, ReactTableDefault } from "../../../../../atoms/table/Table";
import moment from "moment";
import { JDSelectableJDtable } from "../../../../../atoms/table/SelectTable";
import { DateFormat } from "../../../../../types/enum";
import Button from "../../../../../atoms/button/Button";
import { IPayHistroy, IPageInfo } from "../../../../../types/interface";
import { inOr } from "../../../../../utils/C";
import JDPagination from "../../../../../atoms/pagination/Pagination";

interface Iprops {
  context: IContext;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  historyData: IPayHistroy[];
  pageInfo: IPageInfo;
  loading: boolean;
}

const PeriodicalPayTable: React.FC<Iprops> = ({
  context,
  historyData,
  loading,
  pageInfo,
  setPage
}) => {
  // TODO: 아래세줄들을 hook으로 치환

  const checkBoxTableHook = useCheckBoxTable(
    [],
    historyData.map(data => data._id)
  );

  const TableColumns: JDcolumn<IPayHistroy>[] = [
    {
      // 청구 년월
      Header: LANG("reservation_did_date"),
      accessor: "createdAt",
      Cell: ({ value }) => {
        return (
          <div className="resvList__createdAt">
            {moment(value)
              .local()
              .format(DateFormat.YYMMDD)}
          </div>
        );
      }
    },
    {
      // 이용 요금
      Header: LANG("payment_fee"),
      accessor: "amt",
      Cell: ({ value }) => {
        return <div className="resvList__createdAt">{value}</div>;
      }
    },
    {
      // 납부 방법
      Header: LANG("paymethod"),
      accessor: "payMethod",
      Cell: ({ value }) => {
        return <div>{value}</div>;
      }
    },
    {
      // 납부 일자
      Header: LANG("pay_date"),
      accessor: "createdAt",
      Cell: ({ value }) => {
        return (
          <div>
            {moment(value)
              .local()
              .format(DateFormat.YYMMDD)}
          </div>
        );
      }
    },
    {
      // 영수증
      Header: LANG("bill"),
      accessor: "_id",
      Cell: ({ value }) => {
        return (
          <div>
            <Button mr="no" label={LANG("bill")} mode="flat" thema="primary" />
          </div>
        );
      }
    }
  ];

  return (
    <div>
      <JDSelectableJDtable
        {...ReactTableDefault}
        // 아래 숫자는 요청하는 쿼리와 같아야합니다.
        defaultPageSize={20}
        isCheckable
        align="center"
        data={historyData}
        columns={TableColumns}
        {...checkBoxTableHook}
        keyField="_id"
      />
      <JDPagination
        onPageChange={({ selected }: { selected: number }) => {
          setPage(selected + 1);
        }}
        pageCount={inOr(pageInfo, "totalPage", 1)}
        pageRangeDisplayed={1}
        marginPagesDisplayed={4}
      />
    </div>
  );
};

export default PeriodicalPayTable;
