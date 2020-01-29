import React from "react";
import { ErrProtecter, s4 } from "../../utils/utils";
import JDIcon from "../icons/Icons";
import Tooltip from "../tooltip/Tooltip";
import "./Help.scss";
import { IconSize } from "../../types/enum";

interface IProps {
  icon?: "info" | "help";
  tooltip?: string | JSX.Element | JSX.Element[] | Element;
  className?: string;
  size?: IconSize;
}

const Help: React.FC<IProps> = ({
  tooltip,
  className,
  size,
  icon = "help"
}) => {
  const newId = s4();

  return (
    <span
      className={`JDhelp ${className}`}
      data-tip={tooltip}
      >
      data-for={tooltip ? `btnTooltip${newId}` : undefined}
      <JDIcon size={size} icon={icon} />
      {tooltip && (
        <Tooltip
          eventOff="click"
          type="dark"
          effect="solid"
          id={`btnTooltip${newId}`}
        >
          <div className="JDhelp__content">{tooltip}</div>
        </Tooltip>
      )}
    </span>
  );
};
export default ErrProtecter<IProps>(Help);
