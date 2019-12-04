import React from "react";
import "./MockUp.scss";
import { IMG_REPO } from "../../types/enum";
import classNames from "classnames";

interface Iprops {
  mockup?: boolean;
  frame?: "iphoneX" | "JDmocUp";
  className?: string;
  width?: number;
}
// 대상 / 가로
type MockInfo = {
  defaultWdith: number;
  heightRatio: number;
  innerRatio: number | number[];
  imgUrl: string;
};

type MockInfos = {
  [key: string]: MockInfo;
};

const MOCK_INFOES: MockInfos = {
  iphoneX: {
    defaultWdith: 370,
    heightRatio: 2.04,
    innerRatio: 0.052,
    imgUrl: IMG_REPO + "mockup/iPhoneX_Mockup.gif"
  },
  JDmocUp: {
    defaultWdith: 370,
    heightRatio: 2.04,
    innerRatio: [0.18, 0.052, 0.15, 0.052],
    imgUrl: IMG_REPO + "mockup/JDmocUp.png"
  }
};

const MockUp: React.FC<Iprops> = ({
  children,
  className,
  mockup = true,
  frame = "iphoneX",
  width: widthProp
}) => {
  const width: number = widthProp || MOCK_INFOES[frame].defaultWdith;

  const innerPadding = (() => {
    const innerRatio = MOCK_INFOES[frame].innerRatio;

    if (typeof innerRatio === "string") {
      return width * innerRatio + "px";
    } else if (typeof innerRatio === "object") {
      return innerRatio
        .map((ratio, index) => width * innerRatio[index] + "px")
        .join(" ");
    }
    return 0;
  })();

  console.log("innerPadding");
  console.log(innerPadding);
  const style = {
    padding: innerPadding,
    height: width * MOCK_INFOES[frame].heightRatio,
    width
  };

  const imgStyle = {
    backgroundImage: `url("${MOCK_INFOES[frame].imgUrl}")`
  };

  const classes = classNames("mockUp", className, {
    "mockUp--iphone": frame === "iphoneX"
  });

  const wrapProps = mockup
    ? {
        style,
        className: classes
      }
    : {};

  const mocProps = mockup
    ? {
        style: imgStyle,
        className: "mockUp__img"
      }
    : {};

  return (
    <div {...wrapProps}>
      <div {...mocProps}></div>
      <div className="mockUp__framWrap">{children}</div>
    </div>
  );
};

export default MockUp;
