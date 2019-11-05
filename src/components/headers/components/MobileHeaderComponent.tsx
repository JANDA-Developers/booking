import React, {Fragment} from "react";
import TooltipList, {
  ReactTooltip
} from "../../../atoms/tooltipList/TooltipList";
import Button from "../../../atoms/button/Button";
import {insideRedirect} from "../../../utils/utils";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {NavLink} from "react-router-dom";
import SharedHeaderComponent from "./SharedHeaderComponent";
import {IContext} from "../../../pages/MiddleServerRouter";
import {UserRole} from "../../../types/enum";
interface Iprops {
  context: IContext;
  logOutMutation: any;
  phoneVerificationModalHook: any;
}

const MobileHeaderComponent: React.FC<Iprops> = ({context}) => {
  const {user, isLogIn} = context;
  const {isPhoneVerified} = user;

  return (
    <div>
      <span className="JDdisplay-none--wmdUp">
        <span
          data-tip
          data-delay-hide={0}
          data-for="tooltip_user"
          data-event="click"
          className="header__apps"
          data-place="bottom"
          data-offset="{'top': -5, 'left': 35}"
        >
          <JDIcon
            className="header__mobileMenu"
            size={IconSize.MEDIUM}
            icon="apps"
          />
        </span>
      </span>
    </div>
  );
};

export default MobileHeaderComponent;
