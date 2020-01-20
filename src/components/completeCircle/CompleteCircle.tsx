import React from "react";
import JDanimation, { Animation } from "../../atoms/animation/Animations";
import JDIcon from "../../atoms/icons/Icons";

const CompleteCircle: React.FC = () => (
  <JDanimation animation={[Animation.tada]}>
    <JDIcon color="positive" size={"largest"} icon="circleCheckIn"></JDIcon>
  </JDanimation>
);

export default CompleteCircle;
