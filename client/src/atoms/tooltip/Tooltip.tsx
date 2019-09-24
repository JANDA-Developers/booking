import OutReactTooltip from "react-tooltip";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import "./Tooltip.scss";

interface IProps extends OutReactTooltip.Props {
  children?: string | JSX.Element;
}

const JDToolTip: React.FC<IProps> = ({children, ...props}) => (
  <OutReactTooltip class="JDtooltip" {...props}>
    {children}
  </OutReactTooltip>
);

export default JDToolTip;
export const ReactTooltip = OutReactTooltip;
