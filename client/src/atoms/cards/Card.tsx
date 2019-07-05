import PropTypes from "prop-types";
import classNames from "classnames";
import React from "react";
import {Node} from "unist";
import ErrProtecter from "../../utils/errProtect";
import "./Card.scss";
import {IDiv} from "../../types/interface";

interface IProps extends IDiv {
  children?: JSX.Element[] | JSX.Element | string;
  hoverDark?: boolean;
  fullHeight?: boolean;
  className?: string;
  selected?: boolean;
  fullWidth?: boolean;
  noMargin?: boolean;
  onClickCard?(): void;
}

export interface CardProps extends IProps {}

const JDcard: React.FC<IProps> = ({
  children,
  hoverDark,
  className,
  onClickCard,
  fullHeight,
  fullWidth,
  selected,
  noMargin,
  ...props
}) => {
  const classes = classNames("JDcard", className, {
    JDcard: true,
    "JDcard--hoverDark": hoverDark,
    "JDcard--selected": selected,
    "JDcard--fullHeight": fullHeight,
    "JDcard--fullWidth": fullWidth,
    "JDcard--noMargin": noMargin
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
  hoverDark: false
};

export default ErrProtecter<IProps>(JDcard);
