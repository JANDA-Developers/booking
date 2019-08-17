import React from "react";
import {ErrProtecter, s4} from "../../utils/utils";
import JDIcon, {IIcons, IconSize} from "../icons/Icons";
import {Fragment} from "react";
import Tooltip from "../tooltip/Tooltip";
import "./Help.scss";

interface IProps {
  tooltip?: string | JSX.Element | JSX.Element[] | Element;
  className?: string;
  size?: IconSize;
}

const Help: React.FC<IProps> = ({tooltip, className, size}) => {
  const newId = s4();

  return (
    <span
      className={`JDhelp ${className}`}
      data-tip={tooltip}
      data-for={tooltip ? `btnTooltip${newId}` : undefined}
    >
      <JDIcon size={size} icon="help" />
      {tooltip && (
        <Tooltip type="dark" effect="solid" id={`btnTooltip${newId}`}>
          <span>{tooltip}</span>
        </Tooltip>
      )}
    </span>
  );
};
export default ErrProtecter<IProps>(Help);
