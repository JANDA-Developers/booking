import ReactTooltip from 'react-tooltip';
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
    <ReactTooltip className="tooltipList" {...props} {...defualtProps}>
      {children}
    </ReactTooltip>
  );
};

ToolTipList.propTypes = {
  props: PropTypes.any,
};

ToolTipList.defaultProps = {
  props: {},
};

export default ErrProtecter(ToolTipList);
