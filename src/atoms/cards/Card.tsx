import classNames from "classnames";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import "./Card.scss";
import { IDiv, JDatomExtentionSet } from "../../types/interface";
import { JDmbClass, JDmrClass } from "../../utils/autoClasses";

interface IProps extends IDiv {
  children?: JSX.Element[] | JSX.Element | string;
  hover?: boolean;
  fullHeight?: boolean;
  className?: string;
  selected?: boolean;
  fullWidth?: boolean;
  align?: "center";
  noMargin?: boolean;
  onClickCard?(): void;
}

export interface CardProps extends IProps {}

const JDcard: React.FC<IProps & JDatomExtentionSet> = ({
  children,
  hover,
  align,
  className,
  onClickCard,
  fullHeight,
  fullWidth,
  selected,
  noMargin,
  mb,
  mr,
  ...props
}) => {
  const classes = classNames("JDcard", className, {
    JDcard: true,
    "JDcard--hover": hover,
    "JDcard--selected": selected,
    "JDcard--fullHeight": fullHeight,
    "JDcard--fullWidth": fullWidth,
    "JDcard--noMargin": noMargin,
    "JDcard--center": align === "center",
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  const handleClickCard = () => {
    onClickCard && onClickCard();
  };

  return (
    <div onClick={handleClickCard} {...props} className={classes}>
      {children}
    </div>
  );
};

JDcard.defaultProps = {
  hover: false
};

export default JDcard;
