import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import "./CircleIcon.scss";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element[] | JSX.Element;
  thema?: "white" | "greybg";
  onClick?: any;
  darkWave?: boolean;
  wave?: boolean;
  hover?: boolean;
  large?: boolean;
}

const CircleIcon: React.FunctionComponent<IProps> = ({
  children,
  thema,
  darkWave,
  wave,
  onClick,
  hover,
  large,
  className,
  ...prop
}) => {
  const handleOnclick = () => {
    onClick && onClick();
  };

  const classes = classNames("circleIcon", className, {
    "circleIcon--large": large,
    "circleIcon--noHover": !hover,
    "circleIcon--white": thema === "white",
    "circleIcon--greybg": thema === "greybg",
    "JDwaves-effect": wave || darkWave,
    "JDwaves-effect-dark": darkWave
  });

  return (
    <button {...prop} type="button" onClick={handleOnclick} className={classes}>
      {children}
    </button>
  );
};

CircleIcon.defaultProps = {
  darkWave: false,
  hover: true,
  wave: false,
  onClick: () => {}
};

export default ErrProtecter(CircleIcon);
