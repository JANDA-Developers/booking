import React from "react";
import "./MockUp.scss";
import { IMG_REPO } from "../../types/enum";

interface Iprops {
  mockup?: boolean;
}

const MockUp: React.FC<Iprops> = ({ children, mockup = true }) => {
  const backgroundUrl = IMG_REPO + "mockup/iPhoneX_Mockup.gif";
  const style = {
    backgroundImage: `url("${backgroundUrl}")`
  };

  const wrapProps = mockup
    ? {
        className: "mockUp"
      }
    : {};
  const mocProps = mockup
    ? {
        style,
        className: "mockUp__img"
      }
    : {};

  return (
    <div {...wrapProps}>
      <div {...mocProps}></div>
      {children}
    </div>
  );
};

export default MockUp;
