import React from "react";
import classNames from "classnames";
import {TabsProps, Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "./tabs_.scss";
import {Children} from "react";
import {IDiv} from "../../types/interface";

// 👿 이건 그냥 모듈안에서 타입정의를 가져온것이다.  확장하려했으니 안되는 이유를 모르겠다.
interface IProps {
  styleMode?: "button";
  className?: string;
  defaultFocus?: boolean;
  defaultIndex?: number;
  disabledTabClassName?: string;
  domRef?: (node?: HTMLElement) => void;
  forceRenderTabPanel?: boolean;
  onSelect?: (index: number, last: number, event: Event) => boolean | void;
  selectedIndex?: number;
  selectedTabClassName?: string;
  selectedTabPanelClassName?: string;
}

const JDtabs: React.FC<IProps> = ({styleMode, className, ...props}) => {
  const classes = classNames("JDtabs", className, {
    "JDtabs--style_button": styleMode === "button",
    "JDtabs--normal": !styleMode
  });

  return <Tabs {...props} className={classes} />;
};

export {Tab, JDtabs, TabList, TabPanel};
