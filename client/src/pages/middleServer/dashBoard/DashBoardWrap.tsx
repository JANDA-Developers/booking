import React from "react";
import {ErrProtecter} from "../../../utils/utils";
import JDSlider from "../../../atoms/slider/Slider";

// eslint-disable-next-line react/prop-types
const DashBoard = ({}) => {
  const sliderExampleSetting = {
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div id="DashBoard">
      <JDSlider {...sliderExampleSetting}>
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
      </JDSlider>
      <div className="container container--centerlize" />
    </div>
  );
};

export default ErrProtecter(DashBoard);
