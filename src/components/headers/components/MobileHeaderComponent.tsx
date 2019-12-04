import React from "react";
import JDIcon from "../../../atoms/icons/Icons";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
interface Iprops {
  context: IContext;
  logOutMutation: any;
  phoneVerificationModalHook: any;
}

// icnlude: 앱아이콘
const MobileHeaderComponent: React.FC<Iprops> = () => {
  return (
    <div>
      <span>
        <span
          data-tip
          data-delay-hide={0}
          data-for="tooltip_user"
          data-event="click"
          className="header__apps"
          data-place="bottom"
          data-offset="{'top': -5, 'left': 35}"
        >
          <JDIcon className="header__mobileMenu" size={"normal"} icon="apps" />
        </span>
      </span>
    </div>
  );
};

export default MobileHeaderComponent;
