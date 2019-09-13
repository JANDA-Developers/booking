/* eslint-disable react/button-has-type */
import React, {Fragment, useState} from "react";
import "./Button.scss";
import PropTypes from "prop-types";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import Icon, {IIcons} from "../icons/Icons";
import Preloader from "../preloader/Preloader";
import {s4, colorClass} from "../../utils/utils";
import Tooltip from "../tooltip/Tooltip";
import {Redirect, Router, withRouter} from "react-router";
import {JDColor} from "../../types/enum";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  label?: string;
  icon?: IIcons;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  iconClasses?: string[];
  dataTip?: any;
  dataFor?: any;
  mode?: "flat" | "normal" | "border";
  size?: "small" | "large" | "long" | "longLarge";
  flat?: boolean;
  float?: string;
  type?: "button" | "submit" | "reset" | undefined;
  color?: string;
  thema?: JDColor | null;
  pulse?: boolean;
  blink?: boolean;
  toggle?: boolean;
  preloader?: boolean;
  transparent?: boolean;
  className?: string;
  hrefOpen?: string;
  tooltip?: string;
  redirect?: string;
}

const Button: React.FC<IProps> = ({
  disabled,
  label,
  icon,
  tooltip,
  onClick,
  iconClasses,
  dataTip,
  dataFor,
  flat,
  mode,
  float,
  type,
  color,
  thema,
  redirect,
  pulse,
  blink,
  preloader,
  className,
  transparent,
  size,
  // 내부적인 링크는 LINK 태그를 사용하세요.
  hrefOpen,
  // 투글은 클래스만 바꾸어 줍니다.
  toggle,
  ...props
}) => {
  const classes = classNames("JDbtn", className, {
    "JDbtn--flat": mode === "flat" || flat,
    "JDbtn--small": size === "small",
    "JDbtn--large": size === "large" || size === "longLarge",
    "JDbtn--long": size === "long" || size === "longLarge",
    "JDbtn--border": mode === "border",
    "JDbtn--left": float === "left",
    "JDbtn--right": float === "right",
    "JDbtn--text-white": color === "white",
    "JDbtn--transparent": transparent,
    ...colorClass("JDbtn", thema),
    "JDwaves-effect-dark": mode === "flat" && thema === "normal",
    "JDbtn--pulse": pulse,
    "JDbtn--toogleOn": toggle === true,
    "JDbtn--toogle111Off": toggle === false,
    "JDtext-blink": blink
  });

  const handleClickButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    hrefOpen && window.open(hrefOpen);
    if (redirect) window.location.href = redirect;
    onClick && onClick(event);
  };

  const handleKeyPress = () => {};

  const newId = s4();

  return (
    <Fragment>
      <button
        {...props}
        type={type}
        disabled={disabled}
        className={`JDbtn JDwaves-effect ${classes}`}
        onClick={handleClickButton}
        onKeyPress={handleKeyPress}
        data-tip={tooltip ? true : dataTip}
        data-for={tooltip ? `btnTooltip${newId}` : dataFor}
      >
        {preloader ? <Preloader loading={true} /> : label}
        {!preloader && icon && (
          <i className={`JDbtn__icon ${iconClasses && iconClasses.join(" ")}`}>
            {icon && <Icon icon={icon} />}
          </i>
        )}
      </button>
      {tooltip && (
        <Tooltip type="dark" effect="solid" id={`btnTooltip${newId}`}>
          <span>{tooltip}</span>
        </Tooltip>
      )}
    </Fragment>
  );
};

Button.defaultProps = {
  disabled: false,
  label: "",
  onClick: () => {},
  iconClasses: [""],
  dataTip: false,
  dataFor: "",
  pulse: false,
  blink: false,
  float: "",
  color: "",
  thema: "normal",
  type: "button",
  preloader: false
};

export default ErrProtecter(Button);
