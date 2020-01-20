import React from "react";
import { NavLink } from "react-router-dom";
import { IMG_REPO } from "../../../types/const";
interface Iprops {
  completeDefaultSetting: boolean;
}

const Logo: React.FC<Iprops> = ({ completeDefaultSetting }) => {
  return (
    <NavLink to="/dashboard">
      <span
        className={`header__logoPlace ${completeDefaultSetting &&
          "JDdisplay-none--wmd"}`}
      >
        <img
          className="header__logo"
          src={`${IMG_REPO}logo/logo--white.png`}
          alt=""
        />
      </span>
    </NavLink>
  );
};

export default Logo;
