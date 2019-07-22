import React from "react";
import JDSlider from "../../../../atoms/slider/Slider";

const DashBoardHeader = () => {
  const sliderExampleSetting = {
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slider1Style = {
    // backgroundImage: `url("https://res.cloudinary.com/stayjanda-com/image/upload/v1554030168/sdfdfeeee.jpg")`
  };
  return (
    <JDSlider {...sliderExampleSetting} className="dashBoardHeader">
      <div className="JDslider__slide-wrap">
        <div style={slider1Style} className="JDslider__slide">
          <h4>실시간 예약솔루션잔다.</h4>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h4>하우스메뉴얼 소개</h4>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h4>잔다 호스트 닷컴</h4>
        </div>
      </div>
      {/* <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h4>4</h4>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h4>5</h4>
        </div>
      </div>
      <div className="JDslider__slide-wrap">
        <div className="JDslider__slide">
          <h4>6</h4>
        </div>
      </div> */}
    </JDSlider>
  );
};
export default DashBoardHeader;
