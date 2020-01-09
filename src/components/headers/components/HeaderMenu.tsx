import React from "react";
import { IUseSideNav } from "../../../hooks/hook";
import JDIcon from "../../../atoms/icons/Icons";

interface Iprops extends IUseSideNav {
  doneHouseInit: boolean;
}

const HeaderMenu: React.FC<Iprops> = ({
  doneHouseInit,
  setSideNavIsOpen,
  sideNavIsOpen
}) => {
  return (
    <div className="header__menueWrap">
      {doneHouseInit && (
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
