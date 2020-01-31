import React from "react";
import { Gender as TGender } from "../../../../../types/enum";
import { LANG } from "../../../../../hooks/hook";

interface IGenderProp {
  gender?: TGender | null;
  item?: {
    gender?: TGender;
    [key: string]: any;
  };
}
const Gender: React.FC<IGenderProp> = ({ gender: propGender, item }) => {
  const gender = propGender || (item && item.gender);
  return gender ? (
    <span
      className={`assigItem__gender ${`assigItem__gender--${gender.toLowerCase()}`}`}
    >
      {`(${LANG(gender)}) `}
    </span>
  ) : (
    <span />
  );
};

export const reversalGender = (gender: TGender) =>
  gender === TGender.FEMALE ? TGender.MALE : TGender.FEMALE;

export default Gender;
