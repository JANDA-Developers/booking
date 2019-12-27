import React, { Fragment } from "react";
import "./Vtable.scss";
import JDLabel from "../label/JDLabel";
import classNames from "classnames";
import { s4 } from "../../utils/utils";
import { IDiv, JDatomExtentionSet, TElements } from "../../types/interface";
import { JDmrClass, JDmbClass } from "../../utils/autoClasses";
import BaseHeader from "../base/BaseHeader";

interface IProps extends JDatomExtentionSet {
  headerRgiht?: JSX.Element | JSX.Element[];
  header?: Vheader;
  className?: string;
  border?: "none";
  mode?: "unStyle";
  cellColumn?: boolean;
  headerMode?: "bottomBorder";
  mobileReAssign?: "topLabel";
}

export type Vheader = {
  title: JSX.Element | string;
  desc?: JSX.Element | string;
};

const Vtable: React.FC<IProps> = ({
  className,
  headerMode,
  header,
  border,
  children,
  headerRgiht,
  cellColumn,
  mode,
  mb,
  mr
}) => {
  const classes = classNames("vtable", className, {
    "vtable--noHeader": !header,
    "vtable--unBorder": border === "none",
    "vtable--unStyle": mode === "unStyle",
    "vtable--cellColumn": cellColumn,
    ...JDmrClass(mr),
    ...JDmbClass(mb)
  });
  const headerClasses = classNames("vtable__header", undefined, {
    "vtable__header--borderBottom": headerMode === "bottomBorder"
  });

  return (
    <div className={classes}>
      {header && (
        <BaseHeader
          titleElement={
            <h6>
              <b>{header.title}</b>
            </h6>
          }
          desc={header.desc}
          headerRgiht={headerRgiht}
          className={headerClasses}
        />
      )}
      <div className="vtable__body" children={children} />
    </div>
  );
};

export const VtableColumn: React.FC<IDiv> = ({ children }) => {
  return <div className="vtable__column flex-grid-grow" children={children} />;
};

interface IVtableCellProp {
  label: string;
}

export const VtableCell: React.FC<IVtableCellProp> = ({ label, children }) => (
  <div className="vtable__cell flex-grid">
    <div className="vtable__label">
      <JDLabel txt={label} />
    </div>
    <div className="vtable__content" children={children} />
  </div>
);

interface IColumnCellsProps {
  datas: {
    label: string;
    Component: () => TElements;
  }[];
}

export const ColumnCells: React.FC<IColumnCellsProps> = ({ datas }) => (
  <Fragment>
    {datas.map(d => (
      <VtableColumn key={d.label}>
        <VtableCell label={d.label}>{d.Component()}</VtableCell>
      </VtableColumn>
    ))}
  </Fragment>
);
export default Vtable;
