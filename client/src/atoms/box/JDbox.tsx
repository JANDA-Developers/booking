import classNames from "classnames";
import React, {Fragment} from "react";
import ErrProtecter from "../../utils/errProtect";
import "./JDbox.scss";
import JDIcon, {IIcons} from "../icons/Icons";
import {IDiv} from "../../types/interface";
import JDLabel from "../label/JDLabel";

interface IProps extends IDiv {
  className?: string;
  mode?: "table" | "border" | "photoFrame";
  label?: JSX.Element | string;
  icon?: IIcons;
  photo?: string;
  topLabel?: string;
  iconHover?: boolean;
  standard?: boolean;
  iconOnClick?: any;
  align?: "center";
}

const JDbox: React.FC<IProps> = ({
  children,
  className,
  label,
  iconOnClick,
  icon,
  iconHover,
  mode,
  topLabel,
  standard,
  photo,
  align,
  ...props
}) => {
  const classes = classNames("JDbox", className, {
    "JDbox--normal": mode === undefined,
    "JDbox--table": mode === "table",
    "JDbox--photoFrame": mode === "photoFrame",
    "JDbox--border": mode === "border",
    "JDbox--center": align === "center",
    "JDbox--standard": standard,
    "JDbox--withIcon": typeof icon === "string"
  });

  return (
    <Fragment>
      {topLabel && <JDLabel txt={topLabel} />}
      <div className={classes} {...props}>
        {label && <div className="JDbox__label">{label}</div>}
        <div className="JDbox__content">
          {photo && <img src={photo} />}
          {children}
          <span>
            {icon && (
              <JDIcon
                className="JDbox__icon"
                onClick={iconOnClick}
                icon={icon}
                hover={iconHover}
              />
            )}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default ErrProtecter<IProps>(JDbox);
