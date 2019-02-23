import ReactTooltip from 'react-tooltip';
import React from 'react';
import PropTypes from 'prop-types';
import ErrProtecter from '../utils/ErrProtecter';
import './tooltip.scss';

const ToolTip = ({ children, ...props }) => <ReactTooltip {...props}>{children}</ReactTooltip>;

ToolTip.propTypes = {
  props: PropTypes.object.isRequired,
};

ToolTip.defaultProps = {
  className: {},
};

export default ErrProtecter(ToolTip);
