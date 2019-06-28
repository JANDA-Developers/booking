import React, {Fragment} from "react";
import {getSmsHistory_GetSmsHistory_smsHistories} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import "./SmsHistory.scss";
import JDPagination from "../../../atoms/pagination/Pagination";
import {IPageInfo} from "../../../types/interface";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import {CellInfo} from "react-table";
import JDbadge, {BADGE_THEMA} from "../../../atoms/badge/Badge";
import JDbox from "../../../atoms/box/JDbox";
import {s4} from "../../../utils/utils";

interface Iprops {
  setPage: any;
  smsData: getSmsHistory_GetSmsHistory_smsHistories[];
  loading: boolean;
  pageData: IPageInfo | undefined | null;
}

const SmsHistory: React.SFC<Iprops> = ({
  setPage,
  pageData,
  smsData,
  loading
}) => {
  const TableColumns = [
    {
      Header: "번호",
      accessor: "index",
      Cell: ({index}: CellInfo) => <span>{index}</span>
    },
    {
      Header: "전송시간",
      accessor: "createAt"
    },
    {
      Header: "수신자",
      accessor: "receivers",
      Cell: ({value}: CellInfo) =>
        value.map((receiver: string) => (
          <JDbox align="center" key={s4()}>
            {receiver}
          </JDbox>
        ))
    },
    {
      Header: "발신내용",
      accessor: "msg",
      minWidth: 200,
      Cell: ({value}: CellInfo) => (
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
      Header: "자동발신 여부",
      accessor: "autoSendCase",
      minWidth: 200,
      Cell: ({value}: CellInfo) => (
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
      Header: "발신상태",
      accessor: "sendResult",
      Cell: ({value}: CellInfo) => (
        <span>
          {value ? (
            <JDbadge thema={BADGE_THEMA.PRIMARY}>송신완료</JDbadge>
          ) : (
            <JDbadge thema={BADGE_THEMA.ERROR}>송신실패</JDbadge>
          )}
        </span>
      )
    }
  ];

  return (
    <div id="smsHistory" className="smsHistory container container--lg">
      <div className="docs-section">
        <Fragment>
          {loading && <Preloader />}
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
