import React, {useEffect} from "react";
import "./Header.scss";
import {NavLink, withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {ReactTooltip} from "../../atoms/tooltipList/TooltipList";
import Icon, {IconSize} from "../../atoms/icons/Icons";
import {ErrProtecter} from "../../utils/utils";
import logo from "../../img/logo/logo--white.png"; // with import
import {useModal, useToggle} from "../../actions/hook";
import {IHouse, IDiv} from "../../types/interface";
import GuestSearchInputWrap from "../guestSearchInput/guestSearchInputWrap";
import PhoneVerificationModalWrap from "../phoneVerificationModal/PhoneVerificationModalWrap";
import SideNav from "../sideNav/SideNav";
import windowSize, {WindowSizeProps} from "react-window-size";
import {WindowSize} from "../../types/enum";
import {IContext} from "../../pages/MiddleServerRouter";
import MobileHeaderComponent from "./components/mobileHeaderComponent";
import PcHeaderComponent from "./components/pcHeaderComponent";
import SharedHeaderComponent from "./components/sharedComponent";
import JDIcon from "../../atoms/icons/Icons";

type ITempProps = IDiv & {
  context: IContext;
  logOutMutation: any;
  [key: string]: any;
};

type IProps = RouteComponentProps<any> & ITempProps & WindowSizeProps;

const Header: React.FC<IProps> = ({
  context,
  logOutMutation,
  windowHeight,
  windowWidth
}) => {
  const {user} = context;
  const {house} = context;
  const [sideNavIsOpen, setSideNavIsOpen] = useToggle(false);
  const isMobile = windowWidth < WindowSize.PHABLET;

  useEffect(() => {
    ReactTooltip.hide();
    ReactTooltip.rebuild();
  });

  const phoneVerificationModalHook = useModal(false);

  // 🍰 메인리턴
  return (
    <div className="header">
      {/* 로고 */}
      {/* space between 1번째 */}
      <div className="header__left">
        <NavLink to="/">
          <span className="header__logoPlace JDdisplay-none--wmd">
            <img className="header__logo" src={logo} alt="" />
          </span>
        </NavLink>
        {/* 메뉴버튼 */}
        <span className="header__menueWrap">
          <span className="header__menue">
            <Icon
              onClick={() => {
                setSideNavIsOpen();
              }}
              size={IconSize.LARGE}
              icon="menue"
            />
          </span>
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
        <SharedHeaderComponent
          logOutMutation={logOutMutation}
          phoneVerificationModalHook={phoneVerificationModalHook}
          context={context}
        />
        {!isMobile ? (
          <PcHeaderComponent
            phoneVerificationModalHook={phoneVerificationModalHook}
            context={context}
          />
        ) : (
          <MobileHeaderComponent
            logOutMutation={logOutMutation}
            phoneVerificationModalHook={phoneVerificationModalHook}
            context={context}
          />
        )}
      </div>

      <PhoneVerificationModalWrap
        phoneNumber={user.phoneNumber}
        modalHook={phoneVerificationModalHook}
      />
      {/* 사이드 네비 */}
      <SideNav
        context={context}
        isOpen={sideNavIsOpen}
        setIsOpen={setSideNavIsOpen}
      />
    </div>
  );
};

//  👿 withRouter로 받는 prop가 없는데 왜...
export default withRouter(windowSize<IProps>(ErrProtecter(Header)));
