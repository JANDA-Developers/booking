import React from "react";
import { IUseSideNav } from "../../../hooks/hook";
import JDIcon from "../../../atoms/icons/Icons";
import { sideNavToggler } from "../../sideNav/SideNav";

interface Iprops {
  doneHouseInit: boolean;
}

const HeaderMenu: React.FC<Iprops> = ({ doneHouseInit }) => {
  return (
    <div className="header__menueWrap">
      {doneHouseInit && (
        <span className="header__menue">
          <JDIcon
            id="sideNavControlIconOpend"
            onClick={() => {
              sideNavToggler();
            }}
            size={"large"}
            icon={"menue"}
          />
          <JDIcon
            style={{
              display: "none"
            }}
            id="sideNavControlIconClosed"
            onClick={() => {
              sideNavToggler();
            }}
            size={"small"}
            icon={"clear"}
          />
        </span>
      )}
    </div>
  );
};

export default HeaderMenu;
