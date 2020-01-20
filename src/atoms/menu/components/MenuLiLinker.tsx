import React from "react";
import { NavLink } from "react-router-dom";
import { IIcons } from "../../icons/declation";
import JDIcon from "../../icons/Icons";

// 네비 메뉴 그룹
export interface IMenusItem {
  key: string;
  to: string;
  label: string;
  icon: IIcons;
  disabled: boolean;
}

interface Iprops {
  menu: IMenusItem;
  className?: string;
}

const JDmenuLinker: React.FC<Iprops> = ({ menu, className }) => {
  return (
    <NavLink
      key={`JDsideMenu${menu.label}`}
      to={menu.to || "a"}
      className={`JDmenuLinker ${className}`}
    >
      <JDIcon size="small" icon={menu.icon} />
      <span className="JDsideNav__title">{menu.label}</span>
    </NavLink>
  );
};

export default JDmenuLinker;
