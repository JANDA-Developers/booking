import React from "react";
import {GenderKr, Gender as TGender} from "../../../../../types/enum";

interface IGenderProp {
  gender?: TGender | null;
  item?: {
    gender?: TGender;
    [key: string]: any;
  };
}
const Gender: React.FC<IGenderProp> = ({gender: propGender, item}) => {
  const gender = propGender || (item && item.gender);
  return gender ? (
    <span
      className={`assigItem__gender ${`assigItem__gender--${gender.toLowerCase()}`}`}
    >
      {`(${GenderKr[gender]}) `}
    </span>
  ) : (
    <span />
  );
};

export default Gender;
