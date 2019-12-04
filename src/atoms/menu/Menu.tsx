import classNames from "classnames";
import React, { useRef, useEffect } from "react";
// @ts-ignore
import Menu, { SubMenu as JDsubMenu, MenuItem as JDmenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import "./Menu.scss";
// @ts-ignore
import animate from "css-animation";
import { MotionType } from "rc-menu/lib/interface";

const animation: MotionType = {
  onEnterStart(node, done) {
    let height: any;
    return animate(node, "rc-menu-collapse", {
      start() {
        height = node.offsetHeight;
        // @ts-ignore
        node.style.height = 0;
      },
      active() {
        // @ts-ignore
        node.style.height = `${height}px`;
      },
      end() {
        node.style.height = "";
        // @ts-ignore
        done();
      }
    });
  },

  onAppearStart() {
    // @ts-ignore
    return this.enter.apply(this, arguments);
  },
  onLeaveStart(node, done) {
    return animate(node, "rc-menu-collapse", {
      start() {
        node.style.height = `${node.offsetHeight}px`;
      },
      active() {
        //@ts-ignore
        node.style.height = 0;
      },
      end() {
        node.style.height = "";
        //@ts-ignore
        done();
      }
    });
  }
};

interface IProps {
  customMode?: "sideNav" | "dropDown";
  [key: string]: any;
}

const JDmenu: React.FC<IProps> = ({ customMode, className, ...prop }) => {
  const menu = useRef(null);

  const classes = classNames("JDmenu", className, {
    "JDmenu--sideNav": customMode === "sideNav",
    "JDmenu--dropDown": customMode === "dropDown"
  });

  return (
    <Menu
      ref={menu}
      selectable={false}
      className={classes}
      motion={animation}
      {...prop}
    />
  );
};

export default JDmenu;
export { JDsubMenu, JDmenuItem };
