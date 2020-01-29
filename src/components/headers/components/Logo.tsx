import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { IMG_REPO } from "../../../types/const";

interface Iprops {
  completeDefaultSetting: boolean;
}

const Logo: React.FC<Iprops> = ({ completeDefaultSetting }) => {
  const isLogin = localStorage.getItem("jwt");

  const child = (
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
  );

  const RedirectWrap = () => <NavLink to="/dashboard">{child}</NavLink>;

  const LinkWrap = () => (
    <Fragment>
      <span
        onClick={() => {
          location.href = "https://stayjanda.com/";
        }}
      >
        {child}
      </span>
    </Fragment>
  );

  return isLogin ? <RedirectWrap /> : <LinkWrap />;
};

export default Logo;
