import React, { Fragment } from "react";
import "./Vtable.scss";
import JDLabel from "../label/JDLabel";
import classNames from "classnames";

interface IProps {
  columns: TVtableColumns[];
  header?: Vheader;
  className?: string;
  border?: "none";
}

export type Vheader = {
  title: JSX.Element | string;
  desc?: JSX.Element | string;
};

export type TVtableColumns = {
  display?: boolean;
  label: string | string[];
  content: JSX.Element | string | number | JSX.Element[] | string[];
};

interface IColumnPorp {
  column: TVtableColumns;
}

const Vtable: React.FC<IProps> = ({ columns, className, header, border }) => {
  const classes = classNames("vtable", className, {
    "vtable--noHeader": !header,
    "vtable--unBorder": border === "none"
  });

  columns.forEach(column => {
    if (column.display === undefined) column.display = true;
  });

  const Column = ({ column }: IColumnPorp) => {
    if (column.display === false) return <div />;

    const Row = ({
      label,
      content,
      style
    }: {
      style?: React.CSSProperties;
      label: string;
      content: string | JSX.Element | number;
    }) => (
      <Fragment key={label + content}>
        <div style={style} className="vtable__label">
          <JDLabel txt={label} />
        </div>
        <div style={style} className="vtable__content">
          {content}
        </div>
      </Fragment>
    );

    if (typeof column.label !== "object") {
      return (
        <div className="vtable__column">
          <Row label={column.label} content={column.content.toString()} />
        </div>
      );
    } else {
      const width =
        100 / (column.label.length * 2 + column.label.length - 1) + "%";

      return (
        <div className="vtable__column">
          {column.label.map((label, index) => (
            <Row
              key={label}
              style={{ width: width }}
              label={label}
              // @ts-ignore
              content={column.content[index]}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className={classes}>
      {header && (
        <div className="vtable__header">
          <h5>{header.title}</h5>
          {header.desc}
        </div>
      )}
      <div className="vtable__body">
        {columns.map(column => (
          <Column key={`Column${column.label}`} column={column} />
        ))}
      </div>
    </div>
  );
};

export default Vtable;
