import React, { useEffect } from "react";
import "./Header.scss";
import { ReactTooltip } from "../../atoms/tooltipList/TooltipList";
import { ErrProtecter, isEmpty } from "../../utils/utils";
import { IDiv } from "../../types/interface";
import GuestSearchInputWrap from "../guestSearchInput/GuestSearchInputWrap";
import { WindowSize } from "../../types/enum";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import MobileHeaderComponent from "./components/MobileHeaderComponent";
import PcHeaderComponent from "./components/PcHeaderComponent";
import SharedHeaderComponent from "./components/SharedHeaderComponent";
import Logo from "./components/Logo";
import HeaderMenu from "./components/HeaderMenu";
import { JDbutton, useWindowSize } from "@janda-com/front";
import { Link } from "react-router-dom";

type ITempProps = IDiv & {
  context: IContext;
  logOutMutation: any;
  [key: string]: any;
};

type IProps = ITempProps;

const Header: React.FC<IProps> = ({ context, logOutMutation }) => {
  const { width: windowWidth, height } = useWindowSize();
  const { house } = context;
  const doneHouseInit = !isEmpty(house);
  const isPhabletDown = windowWidth < WindowSize.TABLET;

  useEffect(() => {
    ReactTooltip.hide();
    ReactTooltip.rebuild();
  });

  // 🍰 메인리턴
  return (
    <div className="header">
      <div className="header__left">
        <Logo completeDefaultSetting={doneHouseInit} />
      </div>
      <div>
        <Link to="/smsTemplate">
          <JDbutton mb="no" mode="flat">SMS설정</JDbutton>
        </Link>
        <Link to="/resvList">
          <JDbutton mb="no" mr="no" mode="flat">예약목록</JDbutton>
        </Link>
      </div>
      {house && (
        <div className="header__center">
          <GuestSearchInputWrap context={context} />
        </div>
      )}
    </div>
  );
};

export default Header;
