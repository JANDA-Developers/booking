import React from "react";
import classNames from "classnames";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "./Tabs_.scss";

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
