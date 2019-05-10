import React from 'react';
import Slider from 'react-slick';
import CircleIcon from '../../atoms/circleIcon/CircleIcon';
import Icon from '../../atoms/icons/Icons';
import './Slider.scss';

const JDslideDefaultSettings = {
  className: 'JDslider',
  dotsClass: 'JDslider__dots',
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  slideCount: 1,
  nextArrow: (
    <CircleIcon darkWave>
      <Icon icon="arrowRight" />
    </CircleIcon>
  ),
  prevArrow: (
    <CircleIcon darkWave>
      <Icon icon="arrowLeft" />
    </CircleIcon>
  ),
};

const JDSlider = ({ children, ...props }) => (
  <Slider {...JDslideDefaultSettings} {...props}>
    {children}
  </Slider>
);

export default JDSlider;
