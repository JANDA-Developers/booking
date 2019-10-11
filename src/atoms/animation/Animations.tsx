import React, {CSSTransitionGroupProps} from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./ComponentAnimations.scss";

export enum Animation {
  zoomOut = "zoomOut",
  zoomIn = "zoomIn",
  fadeOutRight = "fadeOutRight",
  fadeInDown = "fadeInDown",
  fadeInRightShow = "fadeInRightShow",
  fadeOut = "fadeOut",
  tada = "tada"
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
  // zoomIn
  if (animation.includes(Animation.zoomIn)) {
    animationProp.transitionName.appear = Animation.zoomIn;
    animationProp.transitionName.appearActive = Animation.zoomIn;
    animationProp.transitionName.enter = Animation.zoomIn;
    animationProp.transitionName.enterActive = Animation.zoomIn;
    animationProp.transitionAppear = true;
    animationProp.transitionEnter = true;
  }

  // fadeInDown
  if (animation.includes(Animation.fadeInDown)) {
    animationProp.transitionName.enter = Animation.fadeInDown;
    animationProp.transitionEnter = true;
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

  // fadeOut
  if (animation.includes(Animation.fadeOut)) {
    animationProp.transitionName.leave = Animation.fadeOut;
    animationProp.transitionLeave = true;
    animationProp.transitionLeaveTimeout = 300;
  }

  // fadeOut
  if (animation.includes(Animation.tada)) {
    animationProp.transitionName.appear = Animation.tada;
    animationProp.transitionAppear = true;
    animationProp.transitionAppearTimeout = 2300;
  }

  return (
    <ReactCSSTransitionGroup
      className={"animationWrap"}
      {...props}
      {...animationProp}
    >
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default JDanimation;
