import React, { Fragment } from "react";
import Preloader from "../../../atoms/preloader/Preloader";
import "./SmsHistory.scss";
import JDPagination from "../../../atoms/pagination/Pagination";
import { IPageInfo, ISmsH } from "../../../types/interface";
import JDtable, { ReactTableDefault } from "../../../atoms/table/Table";
import { CellInfo } from "react-table";
import JDbadge from "../../../atoms/badge/Badge";
import JDbox from "../../../atoms/box/JDbox";
import { s4, autoHypen } from "../../../utils/utils";
import moment from "moment";
import { FLOATING_PRELOADER_SIZE } from "../../../types/const";
import { DateFormat } from "../../../types/enum";
import { LANG } from "../../../hooks/hook";

interface Iprops {
  setPage: any;
  smsData: ISmsH[];
  loading: boolean;
  pageData: IPageInfo | undefined | null;
}

const SmsHistory: React.FC<Iprops> = ({
  setPage,
  pageData,
  smsData,
  loading
}) => {
  const TableColumns = [
    {
      Header: LANG("index"),
      accessor: "index",
      Cell: ({ index }: CellInfo) => <span>{index + 1}</span>
    },
    {
      Header: LANG("transmission_time"),
      accessor: "createdAt",
      Cell: ({ value }: CellInfo) => (
        <span>
          {moment(value)
            .local()
            .format(DateFormat.WITH_TIME)}
        </span>
      )
    },
    {
      Header: LANG("receiver"),
      accessor: "receivers",
      Cell: ({ value }: CellInfo) =>
        value.map((receiver: string) => (
          <JDbox size="small" textAlign="center" key={s4()}>
            {autoHypen(receiver)}
          </JDbox>
        ))
    },
    {
      Header: LANG("msg_content"),
      accessor: "msg",
      minWidth: 300,
      Cell: ({ value }: CellInfo) => (
        <div
          className={`JDscrool resvList__memo ${value &&
            value.length > 20 &&
            "resvList__memo--full"}`}
        >
          {value}
        </div>
      )
    },
    {
      Header: LANG("send_type"),
      accessor: "msgType",
      minWidth: 200
    },
    {
      Header: LANG("auto_send_whether"),
      accessor: "autoSendCase",
      Cell: ({ value }: CellInfo) => (
        <div
          className={`JDscrool smsHistory__msg ${value &&
            value.length > 20 &&
            "smsHistory__msg--full"}`}
        >
          {value ? "Y" : "N"}
        </div>
      )
    },
    {
      Header: LANG("send_status"),
      accessor: "sendResult",
      Cell: ({ value }: CellInfo) => (
        <span>
          {value ? (
            <JDbadge thema={"primary"}>{LANG("send_complete")}</JDbadge>
          ) : (
            <JDbadge thema={"error"}>{LANG("send_fail")}</JDbadge>
          )}
        </span>
      )
    }
  ];

  return (
    <div id="smsHistory" className="smsHistory container container--full">
      <div className="docs-section">
        <Fragment>
          <h3>{LANG("sms_history")}</h3>
          <Preloader
            size={FLOATING_PRELOADER_SIZE}
            floating
            loading={loading}
          />
          <JDtable
            {...ReactTableDefault}
            columns={TableColumns}
            data={smsData}
            showPagination={false}
            loading={false}
            align="center"
            minRows={3}
          />
          <JDPagination
            onPageChange={selectedItem => {
              setPage(selectedItem.selected + 1);
            }}
            pageCount={pageData ? pageData.totalPage : 1}
            pageRangeDisplayed={1}
            marginPagesDisplayed={4}
          />
        </Fragment>
      </div>
    </div>
  );
};

export default SmsHistory;
