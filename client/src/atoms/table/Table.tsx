import classNames from "classnames";
import "react-table/react-table.css";
import "./Table.scss";
import React from "react";
import ReactTable, {TableProps, ReactTableDefaults} from "react-table";

interface IProps<D = any> extends TableProps<D> {
  align?: "center";
  inClassNames?: string;
  // 기능은 HOC으로 구현해야하나 다음 boolean은 css 셋팅해줌
  isCheckable?: boolean;
}

const JDtable: React.SFC<IProps> = ({
  align,
  children,
  inClassNames,
  isCheckable,
  ...props
}) => {
  const classes = classNames("JDtable", inClassNames, {
    "JDtable--center ": align === "center",
    "JDtable--checkable": isCheckable
  });

  return <ReactTable {...props} className={classes} />;
};

export const ReactTableDefault = Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 3,
  showPagination: false,
  sortable: false,
  resizable: false,
  previousText: "이전",
  nextText: "다음",
  loadingText: "Loading...",
  noDataText: "정보가 존재하지 않습니다..",
  pageText: "페이지",
  ofText: "/",
  rowsText: "열"
});

export default JDtable;
