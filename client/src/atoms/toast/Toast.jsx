import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, cssTransition } from 'react-toastify';
import './Toast.scss';

//  enter 와 exit 의 값은 css 에니메이션 이름입니다.
const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: [400, 400],
});

const JDtoast = ({ autoClose, ...props }) => <ToastContainer transition={Zoom} {...props} autoClose={autoClose} />;

JDtoast.propTypes = {
  autoClose: PropTypes.number || PropTypes.bool,
  position: PropTypes.string,
  props: PropTypes.any,
};

JDtoast.defaultProps = {
  autoClose: 4000,
  position: 'bottom-right',
  props: {},
};

export default JDtoast;
