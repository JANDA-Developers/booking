import React from "react";
import "./Vtable.scss";
import JDLabel from "../label/JDLabel";

interface IProps {
  columns: VtableColumns[];
  header: Vheader;
}

export type Vheader = {
  title: JSX.Element | string;
  desc?: JSX.Element | string;
};

export type VtableColumns = {
  display?: boolean;
  label: string;
  content: JSX.Element | string | number;
};

const Vtable: React.FC<IProps> = ({ columns, header }) => {
  columns.forEach(column => {
    if (column.display === undefined) column.display = true;
  });

  return (
    <div className="vtable">
      <div className="vtable__header">
        <h5>{header.title}</h5>
        {header.desc}
      </div>
      <div className="vtable__body">
        {columns.map(column =>
          column.display !== false ? (
            <div className="vtable__column">
              <div className="vtable__label">
                <JDLabel txt={column.label} />
              </div>
              <div className="vtable__content">{column.content}</div>
            </div>
          ) : (
            <div />
          )
        )}
      </div>
    </div>
  );
};

export default Vtable;
