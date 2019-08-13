import React from "react";
import JDSlider from "../../../../atoms/slider/Slider";
import houseMenualImg from "../../../../img/houseManual.png";
import Button from "../../../../atoms/button/Button";

const DashBoardHeader = () => {
  const sliderExampleSetting = {
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slider1Style = {
    backgroundImage: `url("https://res.cloudinary.com/stayjanda-com/image/upload/v1554030168/sdfdfeeee.jpg")`
  };

  const slider1Style2 = {
    backgroundImage: `url("https://res.cloudinary.com/stayjanda-com/image/upload/v1563973549/cube.png")`
  };

  const slider1Style3 = {
    backgroundImage: `url("https://res.cloudinary.com/stayjanda-com/image/upload/v1563974252/about-img-1.png")`
  };

  return (
    <JDSlider whiteIcon {...sliderExampleSetting} className="dashBoardHeader">
      <div className="JDslider__slide-wrap">
        <div style={slider1Style} className="JDslider__slide">
          <h5>온·오프라인 숙소 운영 솔루션, 잔다</h5>
          <span className="JDstandard-margin-bottom">
            {" "}
            서비스시작 : 2019/07/24{" "}
          </span>
          <span className="dashBoardHeader__bottom">
            <Button
              hrefOpen="https://stayjanda.com"
              size="small"
              mode="border"
              thema="primary"
              label="잔다 홈페이지 방문"
            />
          </span>
        </div>
      </div>
      {/* <div className="JDslider__slide-wrap">
        <div style={slider1Style2} className="JDslider__slide">
          <h5>
            <span>하우스메뉴얼로</span>
            <br />
            <span> 숙소설명끝</span>
          </h5>
          <span className="JDstandard-margin-bottom">
            게스트에게 숙소이용 방법 한번에 설명하기.
          </span>
          <span className="dashBoardHeader__bottom">
            <Button size="small" mode="border" label="하우스메뉴얼 사용법" />
            <Button
              size="small"
              mode="border"
              thema="primary"
              label="하우스메뉴얼 사용하기"
              hrefOpen={""}
            />
          </span>
        </div>
      </div> */}
      <div className="JDslider__slide-wrap">
        <div style={slider1Style3} className="JDslider__slide">
          <h5>잔다 호스트 닷컴</h5>
          <span className="JDstandard-margin-bottom">
            잔다 호스트 교육 오프라인 운영부터 온라인 까지
          </span>
          <span className="dashBoardHeader__bottom">
            <Button
              size="small"
              mode="border"
              thema="primary"
              label="호스트닷컴 방문"
              hrefOpen={"http://jandahost.com/"}
            />
          </span>
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
