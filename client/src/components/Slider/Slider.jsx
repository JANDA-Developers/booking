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
  nextArrow: (
    <div>
      <CircleIcon darkWave>
        <Icon icon="arrow_right" />
      </CircleIcon>
    </div>
  ),
  prevArrow: (
    <div>
      <CircleIcon darkWave>
        <Icon icon="arrow_left" />
      </CircleIcon>
    </div>
  ),
};

const JDSlider = ({ children, ...props }) => <Slider {...JDslideDefaultSettings}>{children}</Slider>;

export default JDSlider;
