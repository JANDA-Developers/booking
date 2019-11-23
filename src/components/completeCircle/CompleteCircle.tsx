import React from "react";
import JDanimation, { Animation } from "../../atoms/animation/Animations";
import JDIcon, { IconSize } from "../../atoms/icons/Icons";

const CompleteCircle: React.FC = () => (
  <JDanimation animation={[Animation.tada]}>
    <JDIcon
      color="positive"
      size={IconSize.SUPER_LARGE}
      icon="circleCheckIn"
    ></JDIcon>
  </JDanimation>
);

export default CompleteCircle;
