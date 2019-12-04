import React from "react";
import JDmenu, { JDsubMenu } from "../../../../atoms/menu/Menu";
import JDIcon from "../../../../atoms/icons/Icons";
import HMmenu, {
  IHMmenuPropsChain
} from "../../../outPages/HM/component/HMmenu";
import { getHM_GetHM_HM_menus } from "../../../../types/api";
import { Language } from "../../../../types/enum";
import { LANG } from "../../../../hooks/hook";

export interface IMenusprops extends IHMmenuPropsChain {
  menuData: getHM_GetHM_HM_menus[];
  currentLang: Language;
}

const Menus: React.FC<IMenusprops> = ({
  menuData,
  host,
  currentLang,
  ...props
}) => {
  return (
    <JDmenu customMode="dropDown" mode="inline">
      {menuData.map(menu => {
        return (
          <JDsubMenu
            key={menu.id}
            title={
              <div className="JDflex--vCenter">
                <JDIcon
                  className="JDstandard-space"
                  size={"small"}
                  icon={(menu.icon as any) || undefined}
                />
                <span>{menu.name[currentLang]}</span>
                {host && <span>{` ${LANG("config")}`}</span>}
              </div>
            }
          >
            <HMmenu
              menu={menu}
              host={host}
              menuData={menuData}
              currentLang={currentLang}
              {...props}
            />
          </JDsubMenu>
        );
      })}
    </JDmenu>
  );
};

export default Menus;
