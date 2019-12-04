import React, { useEffect } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { ReactTooltip } from "../../atoms/tooltipList/TooltipList";
import Icon from "../../atoms/icons/Icons";
import { ErrProtecter } from "../../utils/utils";
import { useModal } from "../../hooks/hook";
import { IDiv } from "../../types/interface";
import GuestSearchInputWrap from "../guestSearchInput/GuestSearchInputWrap";
import PhoneVerificationModalWrap from "../phoneVerificationModal/PhoneVerificationModalWrap";
import windowSize from "react-window-size";
import { WindowSize, IMG_REPO } from "../../types/enum";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import MobileHeaderComponent from "./components/MobileHeaderComponent";
import PcHeaderComponent from "./components/PcHeaderComponent";
import SharedHeaderComponent from "./components/SharedHeaderComponent";
import CircleIcon from "../../atoms/circleIcon/CircleIcon";
import JDIcon from "../../atoms/icons/Icons";
import Logo from "./components/Logo";
import HeaderMenu from "./components/HeaderMenu";

type ITempProps = IDiv & {
  context: IContext;
  logOutMutation: any;
  setSideNavIsOpen: any;
  sideNavIsOpen: any;
  [key: string]: any;
};

type IProps = ITempProps;

const Header: React.FC<IProps> = ({
  context,
  logOutMutation,
  windowWidth,
  sideNavIsOpen,
  setSideNavIsOpen
}) => {
  const { user } = context;
  const { house } = context;
  const { completeDefaultSetting } = house || { completeDefaultSetting: false };
  const isPhabletDown = windowWidth < WindowSize.TABLET;

  useEffect(() => {
    ReactTooltip.hide();
    ReactTooltip.rebuild();
  });

  const phoneVerificationModalHook = useModal(false);

  // 🍰 메인리턴
  return (
    <div className="header">
      {/* 로고 */}
      <div className="header__left">
        <Logo completeDefaultSetting={completeDefaultSetting} />
        {/* 메뉴버튼 */}
        <HeaderMenu
          setSideNavIsOpen={setSideNavIsOpen}
          sideNavIsOpen={sideNavIsOpen}
          completeDefaultSetting={completeDefaultSetting}
        />
      </div>
      {/* space between 2번째 */}
      {/* 게스트 서치용 */}
      {isPhabletDown ||
        (house && (
          <div className="header__center">
            <GuestSearchInputWrap context={context} />
          </div>
        ))}
      {/* 모바일 이하 게스트 서치용 */}
      {isPhabletDown && (
        <div>
          <CircleIcon size="normal">
            <JDIcon color="white" size="normal" icon="magnifier" />
          </CircleIcon>
        </div>
      )}
      {/* space between 3번째 */}
      <div className="header__right">
        {/* PC와 모바일에 관계없는 헤더 컴포넌트 */}
        <SharedHeaderComponent
          logOutMutation={logOutMutation}
          phoneVerificationModalHook={phoneVerificationModalHook}
          context={context}
        />
        {/* 모바일과 PC 각각의 헤더 컴포넌트*/}
        {isPhabletDown ? (
          <MobileHeaderComponent
            logOutMutation={logOutMutation}
            phoneVerificationModalHook={phoneVerificationModalHook}
            context={context}
          />
        ) : (
          <PcHeaderComponent
            phoneVerificationModalHook={phoneVerificationModalHook}
            context={context}
          />
        )}
      </div>
      {/* 핸드폰 인증모달 */}
      <PhoneVerificationModalWrap
        phoneNumber={user.phoneNumber}
        modalHook={phoneVerificationModalHook}
      />
    </div>
  );
};

export default windowSize<IProps>(ErrProtecter<any>(Header));
