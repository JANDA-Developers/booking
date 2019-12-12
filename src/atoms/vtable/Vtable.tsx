import React, { Fragment } from "react";
import "./Vtable.scss";
import JDLabel from "../label/JDLabel";
import classNames from "classnames";
import { s4 } from "../../utils/utils";
import { IDiv } from "../../types/interface";

interface IProps {
  headerRgiht?: JSX.Element | JSX.Element[];
  header?: Vheader;
  className?: string;
  border?: "none";
  mode?: "unStyle";
  headerMode?: "bottomBorder";
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
  mode
}) => {
  const classes = classNames("vtable", className, {
    "vtable--noHeader": !header,
    "vtable--unBorder": border === "none",
    "vtable--unStyle": mode === "unStyle"
  });
  const headerClasses = classNames("vtable__header", undefined, {
    "vtable__header--borderBottom": headerMode === "bottomBorder"
  });

  return (
    <div className={classes}>
      {header && (
        <div className={headerClasses}>
          <div className="vtable__titleSection">
            <h6 className="vtable__title">
              <b>{header.title}</b>
            </h6>
            {header.desc}
            <div className="vtable__titleRightWrap">{headerRgiht}</div>
          </div>
        </div>
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

export default Vtable;
