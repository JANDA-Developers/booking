import React from "react";
import {GenderKr, Gender as TGender} from "../../../../../types/enum";

interface IGenderProp {
  gender?: TGender | null;
}
const Gender: React.FC<IGenderProp> = ({gender}) =>
  gender ? (
    <span
      className={`assigItem__gender ${`assigItem__gender--${gender.toLowerCase()}`}`}
    >
      {`(${GenderKr[gender]}) `}
    </span>
  ) : (
    <span />
  );

export default Gender;
