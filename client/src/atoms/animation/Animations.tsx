import React, { CSSTransitionGroupProps } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Animations.scss';

export enum Animation {
  fadeOutRight = 'fadeOutRight',
  fadeInDown = 'fadeInDown',
}

interface IProps {
  animation: Array<Animation>;
}

const JDanimation: React.FC<IProps> = ({ children, animation, ...props }) => {
  const animationProp = {
    transitionName: {
      enter: '',
      enterActive: '',
      leave: '',
      leaveActive: '',
      appear: '',
      appearActive: '',
    },
    transitionAppear: false,
    transitionAppearTimeout: 1000,
    transitionEnter: false,
    transitionEnterTimeout: 1000,
    transitionLeave: true,
    transitionLeaveTimeout: 1000,
  };

  if (animation.includes(Animation.fadeInDown)) {
    animationProp.transitionName.enter = Animation.fadeInDown;
    animationProp.transitionEnter = true;
  }
  if (animation.includes(Animation.fadeOutRight)) {
    animationProp.transitionName.leave = Animation.fadeOutRight;
    animationProp.transitionLeave = true;
  }
  return (
    <ReactCSSTransitionGroup {...animationProp} {...props}>
      {children}
    </ReactCSSTransitionGroup>
  );
};

export default JDanimation;

//  animation From [https://raw.githubusercontent.com/daneden/animate.css/master/animate.css]
