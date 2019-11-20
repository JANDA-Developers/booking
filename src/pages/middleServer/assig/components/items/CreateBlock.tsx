import React from "react";
import Gender from "./Gender";
import { Gender as TGender } from "../../../../../types/enum";
import { LANG } from "../../../../../hooks/hook";
interface Iprops {
  isMobile: boolean;
  gender?: TGender | null;
}

const CreateBlock: React.FC<Iprops> = ({ isMobile, gender }) => {
  return (
    <div className="assigItem__content JDtext-blink assigItem__content--create">
      <span className="assigItem__titleWrap">
        <Gender gender={gender} />
        <span className="assigItem__title">{LANG("new_booking")}</span>
      </span>
    </div>
  );
};

export default CreateBlock;
