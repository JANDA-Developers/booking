import React from "react";
import "./ColorBox.scss";
import ErrProtecter from "../../../../utils/errProtect";
import { TUseingColor } from "../ColorPage";
import JDLabel from "../../../../atoms/label/JDLabel";

interface IProp {
  colors: TUseingColor[];
}

const ColorBox: React.FC<IProp> = ({ colors }) => (
  <div className="colorPage-boxs-wrap">
    {colors.map(color => (
      <div className="colorPage-box-wrap">
        <JDLabel txt={color.name} />
        <div
          style={{ backgroundColor: color.value }}
          className="colorPage-box"
        />
      </div>
    ))}
  </div>
);
export default ErrProtecter(ColorBox);
