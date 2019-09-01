import React, {Children} from "react";
import {JDColor} from "../../types/enum";
import classNames from "classnames";
import "./dot.scss";
import {colorClass} from "../../utils/utils";

interface Iprops extends React.HTMLAttributes<HTMLSpanElement> {
  color: JDColor;
}

const Dot: React.FC<Iprops> = ({color, className, children, ...prop}) => {
  const classes = classNames("JDdot", className, {
    ...colorClass("JDdot", color)
  });

  return (
    <span className={classes} {...prop}>
      {children}
    </span>
  );
};

export default Dot;
