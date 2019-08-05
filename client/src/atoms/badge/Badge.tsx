import React from "react";
import "./Badge.scss";
import classnames from "classnames";

export enum BADGE_THEMA {
  PRIMARY = "primary",
  point = "point",
  ERROR = "error",
  NEW = "new",
  WHITE = "white",
  BLACK = "black",
  POSITIVE = "positive"
}

export interface IJDbadge extends React.HTMLAttributes<HTMLSpanElement> {
  badgeSize?: "noraml" | "tiny";
  thema?: BADGE_THEMA;
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
    "JDbadge--positive": thema === BADGE_THEMA.POSITIVE,
    "JDbadge--black": thema === BADGE_THEMA.BLACK,
    "JDbadge--white": thema === BADGE_THEMA.WHITE,
    "JDbadge--primary": thema === BADGE_THEMA.PRIMARY,
    "JDbadge--point": thema === BADGE_THEMA.point,
    "JDbadge--error": thema === BADGE_THEMA.ERROR,
    "JDbadge--new": thema === BADGE_THEMA.NEW
  });

  return <span className={classNames} {...props} />;
};

export default JDbadge;
