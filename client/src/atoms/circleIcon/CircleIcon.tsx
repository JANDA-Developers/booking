import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import "./CircleIcon.scss";
import {IconSize} from "../icons/Icons";
import JDLabel from "../label/JDLabel";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element[] | JSX.Element;
  thema?: "white" | "greybg";
  onClick?: any;
  darkWave?: boolean;
  wave?: boolean;
  hover?: boolean;
  large?: boolean;
  size?: IconSize;
  label?: string;
}

const CircleIcon: React.FunctionComponent<IProps> = ({
  children,
  thema,
  darkWave,
  label,
  wave,
  onClick,
  hover,
  large,
  size,
  className,
  ...prop
}) => {
  const handleOnclick = () => {
    onClick && onClick();
  };

  const circleSize = parseFloat(size || "1em") * 2 + "em";

  const classes = classNames("circleIcon", className, {
    "circleIcon--large": large,
    "circleIcon--noHover": !hover,
    "circleIcon--white": thema === "white",
    "circleIcon--greybg": thema === "greybg",
    "JDwaves-effect": wave || darkWave,
    "JDwaves-effect-dark": darkWave
  });

  const style = {
    width: circleSize,
    height: circleSize
  };

  return (
    <span className="circleIcon-Wrap">
      {label && <JDLabel txt={label} />}
      <button
        style={style}
        {...prop}
        type="button"
        onClick={handleOnclick}
        className={classes}
      >
        {children}
      </button>
    </span>
  );
};

CircleIcon.defaultProps = {
  darkWave: false,
  hover: true,
  wave: false,
  onClick: () => {}
};

export default ErrProtecter(CircleIcon);
