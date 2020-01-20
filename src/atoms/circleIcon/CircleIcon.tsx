import React from "react";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import "./CircleIcon.scss";
import JDLabel from "../label/JDLabel";
import { IconSize } from "../../types/enum";
import { iconSizeClass } from "../../utils/autoClasses";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: JSX.Element[] | JSX.Element;
  thema?: "white" | "greybg" | "border";
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

  const classes = classNames("circleIcon", className, {
    "circleIcon--large": large,
    "circleIcon--noHover": !hover,
    "circleIcon--white": thema === "white",
    "circleIcon--greybg": thema === "greybg",
    "circleIcon--border": thema === "border",
    "JDwaves-effect": wave || darkWave,
    "JDwaves-effect-dark": darkWave,
    ...iconSizeClass("circleIcon", size)
  });

  return (
    <span className="circleIcon-Wrap">
      {label && <JDLabel txt={label} />}
      <span {...prop} onClick={handleOnclick} className={classes}>
        {children}
      </span>
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
