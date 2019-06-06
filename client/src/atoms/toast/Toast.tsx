import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, cssTransition, ToastContainerProps } from 'react-toastify';
import './Toast.scss';

//  enter 와 exit 의 값은 css 에니메이션 이름입니다.
const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: [400, 400],
});

interface IProps extends ToastContainerProps {}

const JDtoast: React.FC<IProps> = ({ autoClose, position, ...props }) => (
  <ToastContainer position={position} transition={Zoom} {...props} autoClose={autoClose} />
);

JDtoast.defaultProps = {
  autoClose: 4000,
  position: 'bottom-right',
};

export default JDtoast;
