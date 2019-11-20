import classNames from "classnames";
import React, {Fragment} from "react";
import ErrProtecter from "../../utils/errProtect";
import "./JDbox.scss";
import JDIcon, {IIcons} from "../icons/Icons";
import {IDiv} from "../../types/interface";
import JDLabel from "../label/JDLabel";
import Tooltip from "../tooltip/Tooltip";
import {s4} from "../../utils/utils";
import {TextAlign, JDColor} from "../../types/enum";
import {textAlignClass, colorClass} from "../../utils/autoClasses";

interface IProps extends IDiv {
  className?: string;
  mode?: "table" | "border" | "photoFrame" | "dashBorder";
  thema?: JDColor | null;
  label?: JSX.Element | string;
  icon?: IIcons;
  photo?: string;
  topLabel?: string;
  iconHover?: boolean;
  standard?: boolean;
  size?: "small";
  tooltip?: string;
  tooltipDirection?: "top" | "left" | "bottom" | "right";
  clickable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  iconOnClick?: any;
  align?: "flex" | "flexVcenter";
  textAlign?: TextAlign;
  float?: boolean;
}

const JDbox: React.FC<IProps> = ({
  children,
  className,
  label,
  tooltip,
  tooltipDirection,
  clickable,
  iconOnClick,
  icon,
  iconHover,
  mode,
  float,
  topLabel,
  standard,
  photo,
  size,
  align,
  textAlign,
  onClick,
  thema,
  ...props
}) => {
  const classes = classNames("JDbox", className, {
    "JDbox--normal": mode === undefined,
    "JDbox--table": mode === "table",
    "JDbox--dashBorder": mode === "dashBorder",
    "JDbox--photoFrame": mode === "photoFrame",
    "JDbox--border": mode === "border",
    ...textAlignClass("JDbox", textAlign),
    "JDbox--flexVcenter": align === "flexVcenter",
    "JDbox--center": textAlign === "center",
    "JDbox--clickable": clickable,
    ...colorClass("JDbox", thema),
    "JDbox--standard": standard,
    "JDbox--withIcon": typeof icon === "string",
    "JDbox--small": size === "small",
    "JDbox--float": float
  });

  const newId = s4();

  return (
    <Fragment>
      {topLabel && <JDLabel txt={topLabel} />}
      <div
        data-tip={tooltip ? true : false}
        data-for={tooltip && `boxTooltip${newId}`}
        onClick={onClick}
        className={classes}
        {...props}
      >
        {label && <div className="JDbox__label">{label}</div>}
        <div className="JDbox__content">
          {photo && <img src={photo} />}
          {children}
          {icon && (
            <span>
              <JDIcon
                className="JDbox__icon"
                onClick={iconOnClick}
                icon={icon}
                hover={iconHover}
              />
            </span>
          )}
          {tooltip && (
            <Tooltip
              place={tooltipDirection}
              type="dark"
              effect="solid"
              id={`boxTooltip${newId}`}
            >
              <span>{tooltip}</span>
            </Tooltip>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ErrProtecter<IProps>(JDbox);
