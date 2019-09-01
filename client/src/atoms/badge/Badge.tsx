import React from "react";
import "./Badge.scss";
import classnames from "classnames";
import {JDColor} from "../../types/enum";
import {colorClass} from "../../utils/utils";

export interface IJDbadge extends React.HTMLAttributes<HTMLSpanElement> {
  badgeSize?: "noraml" | "tiny";
  thema?: JDColor;
  hover?: boolean;
  className?: string;
}

const JDbadge: React.SFC<IJDbadge> = ({
  className,
  hover,
  badgeSize,
  thema,
  ...props
}) => {
  const classNames = classnames("JDbadge", className, {
    "JDbadge--tiny": badgeSize === "tiny",
    "JDbadge--hover": hover,
    ...colorClass("JDbadge", thema)
  });

  return <span className={classNames} {...props} />;
};

export default JDbadge;
