import React from "react";
import { IUseSideNav } from "../../../hooks/hook";
import JDIcon from "../../../atoms/icons/Icons";

interface Iprops extends IUseSideNav {
  completeDefaultSetting: boolean;
}

const HeaderMenu: React.FC<Iprops> = ({
  completeDefaultSetting,
  setSideNavIsOpen,
  sideNavIsOpen
}) => {
  return (
    <div className="header__menueWrap">
      {completeDefaultSetting && (
        <span className="header__menue">
          <JDIcon
            onClick={() => {
              setSideNavIsOpen();
            }}
            size={!sideNavIsOpen ? "large" : "small"}
            icon={!sideNavIsOpen ? "menue" : "clear"}
          />
        </span>
      )}
    </div>
  );
};

export default HeaderMenu;
