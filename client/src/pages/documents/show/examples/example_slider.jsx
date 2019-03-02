import React from 'react';
import Slider from '../../../../components/Slider/Slider';
import './example_slider.scss';

const SliderExample = () => {
  const sliderExampleSetting = {
    centerPadding: '300px',
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

export default SliderExample;
