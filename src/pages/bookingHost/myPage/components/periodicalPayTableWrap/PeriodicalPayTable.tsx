import React from "react";
import ReactDOMServer from "react-dom/server";
import { IContext } from "../../../BookingHostRouter";
import { LANG, useCheckBoxTable, useModal } from "../../../../../hooks/hook";
import { JDcolumn, ReactTableDefault } from "../../../../../atoms/table/Table";
import moment from "moment";
import { JDSelectableJDtable } from "../../../../../atoms/table/SelectTable";
import { DateFormat } from "../../../../../types/enum";
import { IPayHistroy, IPageInfo } from "../../../../../types/interface";
import JDPagination from "../../../../../atoms/pagination/Pagination";
import Button from "../../../../../atoms/button/Button";
import CardRecipt from "../../../../../docs/print/CreditCardReceipt";
import { FAVI_URL } from "../../../../../types/const";

interface Iprops {
  context: IContext;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  historyData: IPayHistroy[];
  pageInfo: IPageInfo;
  loading: boolean;
}

const PeriodicalPayTable: React.FC<Iprops> = ({
  historyData,
  pageInfo,
  setPage
}) => {
  // TODO: 아래세줄들을 hook으로 치환
  const checkBoxTableHook = useCheckBoxTable(
    [],
    historyData.map(data => data._id)
  );

  const handlePrintBill = (data: any) => {
    const w = window.open("", "JD-receipt");
    if (!w) return;
    w.document.title = "JD-receipt";
    w.document.body.innerHTML = ReactDOMServer.renderToStaticMarkup(
      CardRecipt({
        name: "ez",
        phoneNumber: "ez2",
        bookerName: "ez3",
        bookingNumber: "010"
      })
    );
    $("head", w.document).append(`<link rel="icon" href=${FAVI_URL}>`);
  };

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
      Cell: ({ value, original }) => {
        return (
          <div>
            <Button
              onClick={() => {
                handlePrintBill(original);
              }}
              mr="no"
              label={LANG("bill")}
              mode="flat"
              thema="primary"
            />
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
      <JDPagination setPage={setPage} pageInfo={pageInfo} />
    </div>
  );
};

export default PeriodicalPayTable;
