import React from "react";
import JDmenu, { JDsubMenu as HMmenuTitle } from "../../../../atoms/menu/Menu";
import JDIcon from "../../../../atoms/icons/Icons";
import MenuContent, {
  IHMmenuPropsChain
} from "../../../outPages/HM/component/HMmenu";
import { getHM_GetHM_HM_menus } from "../../../../types/api";
import { Language } from "../../../../types/enum";
import { LANG } from "../../../../hooks/hook";
import JDswitch from "../../../../atoms/forms/switch/Switch";

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
    <JDmenu className="THMmenu" customMode="dropDown" mode="inline">
      {menuData.map(menu => {
        return (
          <HMmenuTitle
            key={menu.id}
            title={
              <div className="HM__menuTitle JDflex--between JDflex--vCenter">
                <div>
                  <JDIcon
                    className="JDstandard-space"
                    size={"small"}
                    icon={(menu.icon as any) || undefined}
                  />
                  <span>{menu.name[currentLang]}</span>
                  {host && <span>{` ${LANG("config")}`}</span>}
                </div>
                <div>
                  {host && (
                    <span
                      className="JDflex--vCenter"
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      <JDswitch
                        mb="no"
                        checked={menu.isEnable}
                        onChange={flag => {
                          menu.isEnable = flag;
                          host.setMenuData([...menuData]);
                        }}
                        className="ThmEnableSwitch"
                      />
                    </span>
                  )}
                </div>
              </div>
            }
          >
            <MenuContent
              menu={menu}
              host={host}
              menuData={menuData}
              currentLang={currentLang}
              {...props}
            />
          </HMmenuTitle>
        );
      })}
    </JDmenu>
  );
};

export default Menus;
