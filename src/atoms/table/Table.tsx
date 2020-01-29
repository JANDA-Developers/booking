import classNames from "classnames";
import "react-table/react-table.css";
import "./Table.scss";
import React from "react";
import ReactTable, {
  TableProps,
  ReactTableDefaults,
  RowRenderProps
} from "react-table";
import { LANG } from "../../hooks/hook";

interface JDrowInfo<T> extends RowRenderProps {
  original: T;
}

export interface JDcolumn<T> {
  [key: string]: any;
  accessor?: keyof T;
  Cell?: (props: JDrowInfo<T>) => string | JSX.Element | JSX.Element[] | void;
}

export interface IJDTableProps<D = any> extends TableProps<D> {
  align?: "center";
  inClassNames?: string;
  isCheckable?: boolean;
  marginAtuo?: boolean;
  visibleOver?: boolean;
}

const JDtable: React.FC<IJDTableProps> = ({
  align,
  children,
  visibleOver,
  inClassNames,
  marginAtuo = true,
  isCheckable,
  ...props
}) => {
  const classes = classNames("JDtable", inClassNames, {
    "JDtable--center ": align === "center",
    "JDtable--checkable": isCheckable,
    "JDtable--marginAtuo": marginAtuo,
    "JDtable--visibleOver": visibleOver
  });

  return <ReactTable {...props} className={classes} />;
};

export const ReactTableDefault = Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 3,
  showPagination: false,
  sortable: false,
  resizable: false,
  previousText: LANG("prev"),
  nextText: LANG("next"),
  loadingText: "Loading...",
  noDataText: LANG("information_does_not_exist"),
  pageText: LANG("page"),
  ofText: "/",
  rowsText: LANG("row")
});

export default JDtable;
