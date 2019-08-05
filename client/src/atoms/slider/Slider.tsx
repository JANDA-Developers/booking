import React from "react";
import Slider, {Settings} from "react-slick";
import CircleIcon from "../circleIcon/CircleIcon";
import Icon from "../icons/Icons";
import "./Slider.scss";

interface IProps extends Settings {
  whiteIcon?: boolean;
}

const JDSlider: React.FC<IProps> = ({
  children,
  whiteIcon,
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
    nextArrow: (
      <CircleIcon
        thema={whiteIcon ? "white" : undefined}
        className="JDslider__arrow"
        darkWave
      >
        <Icon icon="arrowRight" />
      </CircleIcon>
    ),
    prevArrow: (
      <CircleIcon
        thema={whiteIcon ? "white" : undefined}
        className="JDslider__arrow"
        darkWave
      >
        <Icon icon="arrowLeft" />
      </CircleIcon>
    )
  };

  const settings = Object.assign(JDslideDefaultSettings, {
    className: className + " " + JDslideDefaultSettings.className
  });

  return (
    <Slider {...settings} {...props}>
      {children}
    </Slider>
  );
};

export default JDSlider;
