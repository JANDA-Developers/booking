import React from "react";
import classNames from "classnames";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Tabs_.scss";
import { mbClass } from "../../utils/autoClasses";
import { TMarginSize } from "../../types/enum";

interface IProps {
  styleMode?: "button";
  className?: string;
  defaultFocus?: boolean;
  defaultIndex?: number;
  tabsAlign?: "spaceAround" | "spaceBetween";
  disabledTabClassName?: string;
  domRef?: (node?: HTMLElement) => void;
  forceRenderTabPanel?: boolean;
  onSelect?: (index: number, last: number, event: Event) => boolean | void;
  selectedIndex?: number;
  selectedTabClassName?: string;
  selectedTabPanelClassName?: string;
  mb?: TMarginSize;
  breakTabs?: boolean;
}

const JDtabs: React.FC<IProps> = ({
  mb,
  breakTabs,
  tabsAlign,
  styleMode,
  className,
  ...props
}) => {
  const classes = classNames("JDtabs", className, {
    "JDtabs--style_button": styleMode === "button",
    "JDtabs--normal": !styleMode,
    "JDtabs--tabsAlign-spaceAround": tabsAlign === "spaceAround",
    "JDtabs--tabsAlign-spaceBetween": tabsAlign === "spaceBetween",
    "JDtabs--tabsAlign-normal": tabsAlign === undefined,
    ...mbClass("JDtabs", mb)
  });

  const Ch: any = props.children;

  if (breakTabs) return Ch;

  return <Tabs {...props} className={classes} />;
};

export { Tab, JDtabs, TabList, TabPanel };
