/* eslint-disable max-len */
import React, { Fragment } from "react";
import classNames from "classnames";
import "./Icons.scss";
import { s4, colorClass } from "../../utils/utils";
import Tooltip from "../tooltip/Tooltip";
import { iconSizeClass, JDmbClass, JDmrClass } from "../../utils/autoClasses";
import { IIcons, IconConifgProps, JDicons } from "./declation";
import { JDatomExtentionSet } from "../../types/interface";

export interface IConProps
  extends React.HTMLAttributes<HTMLOrSVGElement>,
    JDatomExtentionSet {
  icon: IIcons;
}

const JDicon: React.FC<IConProps & IconConifgProps> = ({
  label,
  icon,
  hover = false,
  onClick,
  size = undefined,
  tooltip,
  color,
  labelSize,
  className,
  selected,
  dots,
  mb,
  mr,
  ...props
}) => {
  const classes = classNames("JDicon", className, {
    JDicon__svg: true,
    "JDicon__svg--hover": hover,
    "JDicon__svg--selected": selected,
    ...colorClass("JDicon", color),
    ...iconSizeClass("JDicon", size),
    ...JDmbClass(mb),
    ...JDmrClass(mr)
  });

  const newId = s4();

  return (
    <Fragment>
      <svg
        {...props}
        alignmentBaseline="central"
        className={classes}
        version="1.1"
        viewBox="0 0 24 24 "
        onClick={onClick}
        data-tip={tooltip ? true : false}
        data-for={tooltip && `btnTooltip${newId}`}
      >
        <g>
          <path d={JDicons[icon]} />
        </g>
      </svg>
      {tooltip && (
        <Tooltip type="dark" effect="solid" id={`btnTooltip${newId}`}>
          <span>{tooltip}</span>
        </Tooltip>
      )}
      {dots && <span className="JDicon__dots">{dots.map(Dot => Dot)}</span>}
      {label && (
        <span
          className={`Icon__label ${labelSize === "large" &&
            "Icon__label--large"}`}
        >
          {label}
        </span>
      )}
    </Fragment>
  );
};

export { JDicons };

const JDIcon = React.memo(JDicon);
export default JDIcon;
