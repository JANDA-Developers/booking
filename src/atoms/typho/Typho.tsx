import React from "react";
import { TextSize, JDColor } from "../../types/enum";
import { IDiv, JDatomExtentionSet } from "../../types/interface";
import classNames from "classnames";
import {
  JDmbClass,
  JDmrClass,
  textSizeClass,
  colorClass
} from "../../utils/autoClasses";
import "./Typho.scss";

interface IProps extends IDiv, JDatomExtentionSet {
  size?: TextSize;
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  decoration?: "bar";
  color?: JDColor;
  hover?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}

const JDtypho: React.FC<IProps> = ({
  component,
  decoration,
  size,
  className,
  children,
  color,
  mb,
  weight,
  mr,
  hover,
  style,
  ...props
}) => {
  const classes = classNames("JDtypho", className, {
    "JDtypho--hover": hover,
    "JDtypho-deco--bar": decoration === "bar",
    ...JDmbClass(mb),
    ...JDmrClass(mr),
    ...textSizeClass("JDtypho", size),
    ...colorClass("JDtypho", color)
  });

  const commonProps = {
    className: classes,
    style: {
      fontWeight: weight,
      ...style
    },
    ...props
  };

  if (component) {
    if (component === "h6") return <h6 {...commonProps}>{children}</h6>;
    if (component === "h5") return <h5 {...commonProps}>{children}</h5>;
    if (component === "h4") return <h4 {...commonProps}>{children}</h4>;
    if (component === "h3") return <h3 {...commonProps}>{children}</h3>;
    if (component === "h2") return <h2 {...commonProps}>{children}</h2>;
    if (component === "h1") return <h1 {...commonProps}>{children}</h1>;
  }

  return <div {...commonProps}>{children}</div>;
};

export default JDtypho;
