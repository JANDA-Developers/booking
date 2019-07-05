import React from "react";
import JDSlider from "../../../../atoms/slider/Slider";

const DashBoardHeader = () => {
  const sliderExampleSetting = {
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <JDSlider {...sliderExampleSetting} className="dashBoardHeader">
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h3>실시간 예약솔루션잔다.</h3>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h3>하우스메뉴얼 소개</h3>
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
  );
};
export default DashBoardHeader;
