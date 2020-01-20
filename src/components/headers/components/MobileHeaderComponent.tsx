import React from "react";
import JDIcon from "../../../atoms/icons/Icons";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
interface Iprops {
  context: IContext;
}

// icnlude: 앱아이콘
const MobileHeaderComponent: React.FC<Iprops> = () => {
  return (
    <div>
      <div>
        <div
          data-tip
          data-delay-hide={0}
          data-for="tooltip_user"
          data-event="click"
          className="header__apps"
          data-place="bottom"
          data-offset="{'top': -5, 'left': 35}"
        >
          <JDIcon className="header__mobileMenu" size={"normal"} icon="apps" />
        </div>
      </div>
    </div>
  );
};

export default MobileHeaderComponent;
