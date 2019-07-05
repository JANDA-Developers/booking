import React from "react";
import {ErrProtecter} from "../../../utils/utils";
import JDSlider from "../../../atoms/slider/Slider";

// eslint-disable-next-line react/prop-types
const DashBoardWrap = ({}) => {
  const sliderExampleSetting = {
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
      <DashBoard />
    </div>
  );
};

export default ErrProtecter(DashBoardWrap);
