import React from "react";
import {GenderKr} from "../../../../../types/enum";
import {IAssigItem} from "../assigIntrerface";

interface IGenderProp {
  item: IAssigItem;
}
const Gender: React.FC<IGenderProp> = ({item}) =>
  item.gender && (
    <span
      className={`assigItem__gender ${`assigItem__gender--${item.gender.toLowerCase()}`}`}
    >
      {`(${GenderKr[item.gender]}) `}
    </span>
  );

export default Gender;
