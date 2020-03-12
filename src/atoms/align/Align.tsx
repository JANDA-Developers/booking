import React from "react";
import { IDiv, JDatomExtentionSet } from "../../types/interface";
import { JDmbClass, JDmrClass } from "../../utils/autoClasses";
import classNames from "classnames";

type TFlex = {
  center?: boolean;
  vCenter?: boolean;
  between?: boolean;
  around?: boolean;
  wrap?: boolean;
  end?: boolean;
  oneone?: boolean;
  grow?: boolean;
};

type TCol = {
  wlg?: number;
  lg?: number;
  md?: number;
  sm?: number;
  full?: number;
};

type TGrid = {
  grow?: boolean;
};

interface IProps extends IDiv, JDatomExtentionSet {
  flex?: TFlex;
  grid?: TGrid;
  col?: TCol;
}

const Align: React.FC<IProps> = ({
  mb,
  flex,
  mr,
  className,
  children,
  grid,
  col,
  ...props
}) => {
  let colString = "";
  if (col) {
    if (col.full) colString += `col--full-${col.full} `;
    if (col.lg) colString += `col--lg-${col.lg} `;
    if (col.md) colString += `col--md-${col.md} `;
    if (col.sm) colString += `col--sm-${col.sm} `;
    if (col.wlg) colString += `col--wlg-${col.wlg} `;
  }

  const classes = classNames("JDAlign", className, {
    JDflex: flex,
    "JDflex--end": flex?.end,
    "JDflex--between": flex?.between,
    "JDflex--center": flex?.center,
    "JDflex--vCenter": flex?.vCenter,
    "JDflex--wrap": flex?.wrap,
    "JDflex--oneone": flex?.oneone,
    "JDflex--grow": flex?.grow,
    "flex-grid-grow": grid && grid.grow,
    "flex-grid": grid && !grid.grow,
    "flex-grid__col": col,
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  return (
    <div className={classes + " " + colString} {...props}>
      {children}
    </div>
  );
};

export default Align;
