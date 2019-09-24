import React, {Children} from "react";
import {JDColor} from "../../types/enum";
import classNames from "classnames";
import "./dot.scss";
import {colorClass, s4} from "../../utils/utils";
import Tooltip from "../tooltip/Tooltip";

interface Iprops extends React.HTMLAttributes<HTMLSpanElement> {
  color: JDColor;
  tooltip?: string;
  show?: boolean;
}

// 🔴 will be depreacte
const JDdot: React.FC<Iprops> = ({
  color,
  className,
  children,
  show,
  tooltip,
  ...prop
}) => {
  if (!show) return <span />;
  const classes = classNames("JDdot", className, {
    ...colorClass("JDdot", color)
  });

  const newId = s4();

  return (
    <span
      data-tip={tooltip ? true : undefined}
      data-for={tooltip ? `btnTooltip${newId}` : undefined}
      className={classes}
      {...prop}
    >
      {children}
      {tooltip && (
        <Tooltip type="dark" effect="solid" id={`btnTooltip${newId}`}>
          <span>{tooltip}</span>
        </Tooltip>
      )}
    </span>
  );
};

export default JDdot;
