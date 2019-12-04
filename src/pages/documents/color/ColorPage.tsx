import React from "react";
import "./ColorPage.scss";
import ColorBox from "./components/ColorBox";

export type TUseingColor = {
  name: string;
  value: string;
  dec?: string;
};

const colors: TUseingColor[] = [
  {
    name: "grey-level0",
    value: "#eee"
  },
  {
    name: "grey-level1",
    value: "#CFCFCF"
  },
  {
    name: "grey-level2",
    value: "#b8b8b8"
  },
  {
    name: "grey-level3",
    value: "#989898"
  },
  {
    name: "grey-level4",
    value: "#787878"
  },
  {
    name: "grey-level5",
    value: "#585858"
  },
  {
    name: "grey-opacity1",
    value: "rgba(0,0,0,.068)"
  },
  {
    name: "grey-opacity2",
    value: "rgba(0,0,0,.18)"
  },
  {
    name: "grey-opacity3",
    value: "rgba(0,0,0,.25)"
  },
  {
    name: "html-color",
    value: "#343434"
  },
  {
    name: "background-color",
    value: "#FBFBFB"
  },
  {
    name: "point-color",
    value: "#D5673A"
  },
  {
    name: "new-color",
    value: "#FFD821"
  },
  {
    name: "green-color",
    value: "rgb(0, 147, 100)"
  },
  {
    name: "error-color",
    value: "#ff6760"
  },
  {
    name: "orange-color",
    value: "#FF6E16"
  },
  {
    name: "blue-color",
    value: "rgba(0,0,255,1)"
  },
  {
    name: "male-color",
    value: "navy"
  },
  {
    name: "female-color",
    value: "maroon"
  }
];

const ColorPage = () => (
  <div className="colorPage">
    <div className="container ">
      <div className="docs-section">
        <div className="JDflex">
          <ColorBox colors={colors} />
        </div>
      </div>
    </div>
  </div>
);

export default ColorPage;
