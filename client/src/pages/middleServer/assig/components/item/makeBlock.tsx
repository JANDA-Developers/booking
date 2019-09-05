import React from "react";
import Gender from "./gender";
import {Gender as TGender} from "../../../../../types/enum";
interface Iprops {
  isMobile: boolean;
  gender?: TGender | null;
}

const MakeBlock: React.FC<Iprops> = ({isMobile, gender}) => {
  return (
    <div className="assigItem__content JDtext-blink assigItem__content--make">
      <span className="assigItem__titleWrap">
        <Gender gender={gender} />
        <span className="assigItem__title">새로운예약</span>
      </span>
    </div>
  );
};

export default MakeBlock;
