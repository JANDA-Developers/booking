import OutReactTooltip from 'react-tooltip';
import React from 'react';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';
import './Tooltip.scss';

const ToolTip = ({ children, ...props }) => (
  <OutReactTooltip class="JDtooltip" {...props}>
    {children}
  </OutReactTooltip>
);

ToolTip.propTypes = {
  props: PropTypes.any,
};

ToolTip.defaultProps = {
  props: {},
};

export default ErrProtecter(ToolTip);
export const ReactTooltip = OutReactTooltip;
