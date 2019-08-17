import classNames from "classnames";
import React from "react";
// @ts-ignore
import Menu, {SubMenu as JDsubMenu, MenuItem as JDmenuItem} from "rc-menu";
import "rc-menu/assets/index.css";
import "./Menu.scss";
// @ts-ignore
import animate from "css-animation";

const animation = {
  // @ts-ignore
  enter(node, done) {
    // @ts-ignore
    let height;
    return animate(node, "rc-menu-collapse", {
      start() {
        height = node.offsetHeight;
        node.style.height = 0;
      },
      active() {
        // @ts-ignore
        node.style.height = `${height}px`;
      },
      end() {
        node.style.height = "";
        done();
      }
    });
  },

  appear() {
    // @ts-ignore
    return this.enter.apply(this, arguments);
  },
  // @ts-ignore
  leave(node, done) {
    return animate(node, "rc-menu-collapse", {
      start() {
        node.style.height = `${node.offsetHeight}px`;
      },
      active() {
        node.style.height = 0;
      },
      end() {
        node.style.height = "";
        done();
      }
    });
  }
};

interface IProps {
  customMode?: "sideNav" | "dropDown";
  [key: string]: any;
}

const JDmenu: React.FC<IProps> = ({customMode, className, ...prop}) => {
  const classes = classNames("JDmenu", className, {
    "JDmenu--sideNav": customMode === "sideNav",
    "JDmenu--dropDown": customMode === "dropDown"
  });
  return <Menu className={classes} openAnimation={animation} {...prop} />;
};

export default JDmenu;
export {JDsubMenu, JDmenuItem};
