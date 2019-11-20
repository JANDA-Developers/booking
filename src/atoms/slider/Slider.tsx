import React from "react";
import Slider, {Settings} from "react-slick";
import CircleIcon from "../circleIcon/CircleIcon";
import Icon from "../icons/Icons";
import "./Slider.scss";
import classnames from "classnames";

interface IProps extends Settings {
  whiteIcon?: boolean;
  displayArrow?: boolean;
}

const JDSlider: React.FC<IProps> = ({
  children,
  whiteIcon,
  displayArrow = true,
  className,
  ...props
}) => {
  const JDslideDefaultSettings = {
    className: "JDslider",
    dotsClass: "JDslider__dots",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slideCount: 1,
    nextArrow: displayArrow ? (
      <CircleIcon
        thema={whiteIcon ? "white" : undefined}
        className="JDslider__arrow"
        darkWave
      >
        <Icon icon="arrowRight" />
      </CircleIcon>
    ) : (
      undefined
    ),
    prevArrow: displayArrow ? (
      <CircleIcon
        thema={whiteIcon ? "white" : undefined}
        className="JDslider__arrow"
        darkWave
      >
        <Icon icon="arrowLeft" />
      </CircleIcon>
    ) : (
      undefined
    )
  };

  const classes = classnames(JDslideDefaultSettings.className, className, {
    "JDslider--unDisplayArrow": displayArrow === false
  });

  const settings = Object.assign(JDslideDefaultSettings, {
    className: classes
  });

  return (
    <Slider {...settings} {...props}>
      {children}
    </Slider>
  );
};

export default JDSlider;
