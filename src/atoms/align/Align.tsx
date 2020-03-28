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
  column?: boolean;
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
  flex?: TFlex | boolean;
  grid?: TGrid | boolean;
  col?: TCol | boolean;
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
    if (typeof col === "object") {
      if (col.full) colString += `col--full-${col.full} `;
      if (col.lg) colString += `col--lg-${col.lg} `;
      if (col.md) colString += `col--md-${col.md} `;
      if (col.sm) colString += `col--sm-${col.sm} `;
      if (col.wlg) colString += `col--wlg-${col.wlg} `;
    }
  }

  let classes = classNames("JDAlign", className, {
    JDflex: flex,
    "flex-grid__col": col,
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  if (typeof flex === "object") {
    classes = classNames("", classes, {
      "JDflex--end": flex.end,
      "JDflex--between": flex.between,
      "JDflex--center": flex.center,
      "JDflex--vCenter": flex.vCenter,
      "JDflex--wrap": flex.wrap,
      "JDflex--oneone": flex.oneone,
      "JDflex--grow": flex.grow,
      "JDflex--column": flex.column
    });
  }

  if (grid) {
    classes = classNames("", classes, {
      "flex-grid-grow": typeof grid === "object" && grid.grow,
      "flex-grid": grid === true
    });
  }

  return (
    <div className={classes + " " + colString} {...props}>
      {children}
    </div>
  );
};
export default Align;
