import React from 'react';
import Slider from 'react-slick';
import CircleIcon from '../../atoms/CircleIcon';
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
      <Icon icon="arrow_right" />
    </CircleIcon>
  ),
  prevArrow: (
    <CircleIcon darkWave>
      <Icon icon="arrow_left" />
    </CircleIcon>
  ),
};

const JDSlider = ({ children, ...props }) => (
  <Slider {...JDslideDefaultSettings} {...props}>
    {children}
  </Slider>
);

export default JDSlider;
