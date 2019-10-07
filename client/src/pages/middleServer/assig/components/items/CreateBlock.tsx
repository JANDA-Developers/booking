import React from "react";
import Gender from "./Gender";
import {Gender as TGender} from "../../../../../types/enum";
interface Iprops {
  isMobile: boolean;
  gender?: TGender | null;
}

const CreateBlock: React.FC<Iprops> = ({isMobile, gender}) => {
  return (
    <div className="assigItem__content JDtext-blink assigItem__content--create">
      <span className="assigItem__titleWrap">
        <Gender gender={gender} />
        <span className="assigItem__title">새로운예약</span>
      </span>
    </div>
  );
};

export default CreateBlock;
