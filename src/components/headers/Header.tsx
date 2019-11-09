import React, {useEffect} from "react";
import "./Header.scss";
import {NavLink} from "react-router-dom";
import {ReactTooltip} from "../../atoms/tooltipList/TooltipList";
import Icon, {IconSize} from "../../atoms/icons/Icons";
import {ErrProtecter} from "../../utils/utils";
import logo from "../../img/logo/logo--white.png"; // with import
import {useModal} from "../../hooks/hook";
import {IDiv} from "../../types/interface";
import GuestSearchInputWrap from "../guestSearchInput/GuestSearchInputWrap";
import PhoneVerificationModalWrap from "../phoneVerificationModal/PhoneVerificationModalWrap";
import windowSize from "react-window-size";
import {WindowSize} from "../../types/enum";
import {IContext} from "../../pages/MiddleServerRouter";
import MobileHeaderComponent from "./components/MobileHeaderComponent";
import PcHeaderComponent from "./components/PcHeaderComponent";
import SharedHeaderComponent from "./components/SharedHeaderComponent";

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
  const {user} = context;
  const {house} = context;
  const {completeDefaultSetting} = house || {completeDefaultSetting: false};
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
        <NavLink to="/dashboard">
          <span
            className={`header__logoPlace ${completeDefaultSetting &&
              "JDdisplay-none--wmd"}`}
          >
            <img className="header__logo" src={logo} alt="" />
          </span>
        </NavLink>
        {/* 메뉴버튼 */}
        <span className="header__menueWrap">
          {completeDefaultSetting && (
            <span className="header__menue">
              <Icon
                onClick={() => {
                  setSideNavIsOpen();
                }}
                size={!sideNavIsOpen ? IconSize.LARGE : IconSize.MEDEIUM_SMALL}
                icon={!sideNavIsOpen ? "menue" : "clear"}
              />
            </span>
          )}
        </span>
      </div>
      {/* space between 2번째 */}
      {/* 게스트 서치용 */}
      {house && (
        <div className="header__center">
          <GuestSearchInputWrap context={context} />
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
