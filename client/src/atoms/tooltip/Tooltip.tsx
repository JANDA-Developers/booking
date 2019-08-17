import OutReactTooltip from "react-tooltip";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import "./Tooltip.scss";

interface IProps extends OutReactTooltip.Props {
  children?: string | JSX.Element;
}

const ToolTip: React.FC<IProps> = ({children, ...props}) => (
  <OutReactTooltip class="JDtooltip" {...props}>
    {children}
  </OutReactTooltip>
);

export default ErrProtecter(ToolTip);
export const ReactTooltip = OutReactTooltip;
