import OutReactTooltip from 'react-tooltip';
import React from 'react';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';
import './TooltipList.scss';

const ToolTipList = ({ children, ...props }) => {
  const defualtProps = {
    clickable: true,
    globalEventOff: 'click',
    effect: 'solid',
    border: true,
  };

  return (
    <OutReactTooltip className="tooltipList" {...props} {...defualtProps}>
      {children}
    </OutReactTooltip>
  );
};

ToolTipList.propTypes = {
  props: PropTypes.any,
};

ToolTipList.defaultProps = {
  props: {},
};

export default ErrProtecter(ToolTipList);
export const ReactTooltip = OutReactTooltip;
