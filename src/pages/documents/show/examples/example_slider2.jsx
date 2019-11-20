import React from 'react';
import Slider from '../../../../atoms/slider/Slider';
import './example_slider.scss';

const SliderExample2 = () => {
  const sliderExampleSetting = {
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <Slider {...sliderExampleSetting}>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h3>1</h3>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h3>2</h3>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h3>3</h3>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h3>4</h3>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h3>5</h3>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h3>6</h3>
        </div>
      </div>
    </Slider>
  );
};

export default SliderExample2;
