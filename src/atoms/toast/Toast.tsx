import React from "react";
import PropTypes from "prop-types";
import {
  ToastContainer,
  cssTransition,
  ToastContainerProps
} from "react-toastify";
import "./Toast.scss";

//  enter 와 exit 의 값은 css 에니메이션 이름입니다.
const Zoom = cssTransition({
  enter: "zoomIn",
  exit: "zoomOut",
  duration: [400, 400]
});

interface IProps extends ToastContainerProps {}

const JDtoast: React.FC<IProps> = ({...props}) => (
  <ToastContainer
    position={"bottom-right"}
    transition={Zoom}
    {...props}
    autoClose={3000}
  />
);

export default JDtoast;
