import React from "react";
import {ErrProtecter} from "../../../utils/utils";
import JDSlider from "../../../atoms/slider/Slider";
import Card from "../../../atoms/cards/Card";
import JDbox from "../../../atoms/box/JDbox";
import {IUser} from "../../../types/interface";

interface Iprops {
  userData: IUser;
}

// eslint-disable-next-line react/prop-types
const DashBoard: React.SFC<Iprops> = ({userData}) => {
  const sliderExampleSetting = {
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div id="DashBoard">
      <JDSlider {...sliderExampleSetting}>
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
      <div className="container">
        <div className="flex-grid-grow">
          <div className="flex-grid__col">
            <Card>
              <JDbox mode="border">{userData.name}님 안녕하세요!</JDbox>
            </Card>
          </div>
          <div className="flex-grid__col">
            <Card>
              <span>....</span>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(DashBoard);
