import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, cssTransition } from 'react-toastify';
import './Toast.scss';

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: [500, 800],
});

const JDtoast = ({ autoClose, ...props }) => <ToastContainer transition={Zoom} {...props} autoClose={autoClose} />;

JDtoast.propTypes = {
  autoClose: PropTypes.number || PropTypes.bool,
  position: PropTypes.string,
  props: PropTypes.any,
};

JDtoast.defaultProps = {
  autoClose: 6000,
  position: 'bottom-right',
  props: {},
};

export default JDtoast;
