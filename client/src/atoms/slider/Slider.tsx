import React from "react";
import Slider, {Settings} from "react-slick";
import CircleIcon from "../circleIcon/CircleIcon";
import Icon from "../icons/Icons";
import "./Slider.scss";

const JDslideDefaultSettings = {
  className: "JDslider",
  dotsClass: "JDslider__dots",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  slideCount: 1,
  nextArrow: (
    <CircleIcon className="JDslider__arrow" darkWave>
      <Icon icon="arrowRight" />
    </CircleIcon>
  ),
  prevArrow: (
    <CircleIcon className="JDslider__arrow" darkWave>
      <Icon icon="arrowLeft" />
    </CircleIcon>
  )
};

interface IProps extends Settings {}

const JDSlider: React.FC<IProps> = ({children, className, ...props}) => {

  const settings = Object.assign(JDslideDefaultSettings, {className: className + " " + JDslideDefaultSettings.className});

  return (
  <Slider {...settings} {...props}>
    {children}
  </Slider>
)};

export default JDSlider;
