import React, {CSSTransitionGroupProps} from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./ComponentAnimations.scss";

export enum Animation {
  zoomOut = "zoomOut",
  fadeOutRight = "fadeOutRight",
  fadeInDown = "fadeInDown",
  fadeInRightShow = "fadeInRightShow"
}

interface IProps {
  animation: Array<Animation>;
}

const JDanimation: React.FC<IProps> = ({children, animation, ...props}) => {
  const animationProp = {
    transitionName: {
      enter: "",
      enterActive: "",
      leave: "",
      leaveActive: "",
      appear: "",
      appearActive: ""
    },
    transitionAppear: false,
    transitionAppearTimeout: 1000,
    transitionEnter: false,
    transitionEnterTimeout: 1000,
    transitionLeave: false,
    transitionLeaveTimeout: 1000
  };

  // fadeInRightShow
  if (animation.includes(Animation.fadeInRightShow)) {
    animationProp.transitionName.appear = Animation.fadeInRightShow;
    animationProp.transitionAppear = true;
  }

  // fadeInDown
  if (animation.includes(Animation.fadeInDown)) {
    animationProp.transitionName.enter = Animation.fadeInDown;
    animationProp.transitionEnter = true;
  }

  // fadeOutRight
  if (animation.includes(Animation.fadeOutRight)) {
    animationProp.transitionName.leave = Animation.fadeOutRight;
    animationProp.transitionLeave = true;
  }

  // zoomOut
  if (animation.includes(Animation.zoomOut)) {
    animationProp.transitionName.leave = Animation.zoomOut;
    animationProp.transitionLeave = true;
    animationProp.transitionLeaveTimeout = 500;
  }

  return (
    <ReactCSSTransitionGroup {...animationProp} {...props}>
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default JDanimation;

// ⭐️ animation From [https://raw.githubusercontent.com/daneden/animate.css/master/animate.css]
