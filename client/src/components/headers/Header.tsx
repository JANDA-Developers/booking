import React, {Fragment, useEffect} from "react";
import "./Header.scss";
import {NavLink, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {StaticContext, RouteComponentProps} from "react-router";
import Button from "../../atoms/button/Button";
import TooltipList, {ReactTooltip} from "../../atoms/tooltipList/TooltipList";
import ProfileCircle from "../../atoms/profileCircle/ProfileCircle";
import CircleIcon from "../../atoms/circleIcon/CircleIcon";
import SelectBox from "../../atoms/forms/selectBox/SelectBox";
import Icon, {IconSize} from "../../atoms/icons/Icons";
import {ErrProtecter, insideRedirect} from "../../utils/utils";
import logo from "../../img/logo/logo--white.png"; // with import
import {useSelect, useModal, useToggle} from "../../actions/hook";
import SelectHouseWrap from "../selectHouse/SelectHouseWrap";
import {IHouse, IDiv} from "../../types/interface";
import JDsearchInput from "../../atoms/searchInput/SearchInput";
import GuestSearchInputWrap from "./components/guestSearchInputWrap";
import PhoneVerificationModalWrap from "../phoneVerificationModal/PhoneVerificationModalWrap";
import SideNav from "../sideNav/SideNav";
import {
  getMyProfile_GetMyProfile,
  getMyProfile_GetMyProfile_user
} from "../../types/api";
import {UserRole} from "../../types/enum";

type ITempProps = IDiv & {
  isPhoneVerified?: boolean;
  isLoggedIn?: boolean;
  isSuperAdmin?: boolean;
  isLoading: boolean;
  className?: string;
  sideNavOpener: any;
  applyedProduct?: any;
  selectedHouse: IHouse;
  houses: IHouse[];
  logOutMutation: any;
  profileImg: string;
  user: getMyProfile_GetMyProfile_user | undefined;
};

type IProps = RouteComponentProps<any> & ITempProps;

const Header: React.FC<IProps> = ({
  isPhoneVerified,
  isLoggedIn,
  isSuperAdmin,
  applyedProduct,
  selectedHouse,
  houses,
  user,
  logOutMutation,
  profileImg,
  isLoading
}) => {
  const [sideNavIsOpen, setSideNavIsOpen] = useToggle(false);

  useEffect(() => {
    ReactTooltip.hide();
    ReactTooltip.rebuild();
  });

  // 로그인 안된 피씨 헤더 메뉴
  const UnLoginPcHeaderBtn = () => (
    <div className="header__right_pc_btns">
      <NavLink
        className="header__btns header__btns--transparent header__btns--mobileX"
        to="/login"
      >
        <Button className="hader__btn" label="로그인" mode="flat" />
      </NavLink>
      <NavLink
        className="header__btns header__btns--transparent header__btns--mobileX"
        to="/signUp"
      >
        <Button className="hader__btn" label="회원가입" mode="flat" />
      </NavLink>
    </div>
  );
  // 로그인 피씨 헤더 메뉴
  const LoginPcHeaderBtn = () => (
    <div className="header__right">
      <span
        data-tip
        data-delay-hide={0}
        data-for="listAboutUser"
        data-event="click"
        className="header__profile"
      >
        <ProfileCircle
          profileImg={profileImg}
          isBordered
          whiteBorder
          size="tiny"
        />
      </span>
      <SelectHouseWrap
        className="header__selectHouse"
        selectedHouse={selectedHouse}
        houses={houses}
      />
      {user && !isPhoneVerified && !isLoading && (
        <span className="header__btns header__btns--mobileX">
          <Button
            onClick={() => {
              phoneVerificationModalHook.openModal({
                phoneNumber: user.phoneNumber
              });
            }}
            label="인증하기"
            blink
            mode="flat"
          />
        </span>
      )}
    </div>
  );
  // 헤더우측 상단 로그인 안된 메뉴
  const UnLoginIconMenu = () => (
    <Fragment>
      <li>
        <NavLink to="/login">
          <Button
            onClick={() => {
              ReactTooltip.hide();
            }}
            label="로그인"
            mode="flat"
          />
        </NavLink>
      </li>
      <li>
        <NavLink className="header__btns" to="/signUp">
          <Button
            onClick={() => {
              ReactTooltip.hide();
            }}
            label="회원가입"
            mode="flat"
          />
        </NavLink>
      </li>
    </Fragment>
  );

  // 헤더우측 상단 로그인 메뉴
  const LoginIconMenu = () => (
    <Fragment>
      <li>
        <Button
          onClick={() => {
            logOutMutation();
            ReactTooltip.hide();
          }}
          label="로그아웃"
          mode="flat"
        />
      </li>
      {user && user.userRole === UserRole.ADMIN && (
        <li>
          <Button
            className="hader__btn"
            label="관리자 화면"
            redirect={insideRedirect(`superAdmin`)}
            mode="flat"
            thema="point"
          />
        </li>
      )}
      {user && !isLoading && !isPhoneVerified && (
        <li>
          <Button
            onClick={() => {
              phoneVerificationModalHook.openModal({
                phoneNumber: user.phoneNumber
              });
              ReactTooltip.hide();
            }}
            id="HeaderPhoneVerificationBtn"
            blink
            label="인증하기"
            mode="flat"
          />
        </li>
      )}
      <li>
        <NavLink to="/myPage">
          <Button label="MYpage" mode="flat" />
        </NavLink>
      </li>
    </Fragment>
  );

  const phoneVerificationModalHook = useModal(false);

  // 🍰 메인리턴
  return (
    <div className="header">
      {/* 로고 */}
      <div className="header__left">
        <NavLink to="/">
          <span className="header__logoPlace">
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
      {/* 게스트 서치용 */}
      {selectedHouse && (
        <div className="header__center">
          <GuestSearchInputWrap houseId={selectedHouse._id} />
        </div>
      )}
      {isLoggedIn ? <LoginPcHeaderBtn /> : <UnLoginPcHeaderBtn />}
      {/* 앱 서클 */}
      <span
        data-tip
        data-delay-hide={0}
        data-for="listAboutUser"
        data-event="click"
        className="header__apps"
        data-place="bottom"
        data-offset="{'top': -5, 'left': 25}"
      >
        <Icon
          className="header__mobileMenu"
          size={IconSize.MEDIUM}
          icon="apps"
        />
      </span>

      <PhoneVerificationModalWrap
        phoneNumber={user ? user.phoneNumber : ""}
        modalHook={phoneVerificationModalHook}
      />
      {/* 🌜 아이콘 메뉴 */}
      <TooltipList id="listAboutUser">
        <ul>{isLoggedIn ? <LoginIconMenu /> : <UnLoginIconMenu />}</ul>
      </TooltipList>
      {/* 사이드 네비 */}
      <SideNav
        isOpen={sideNavIsOpen}
        selectedHouse={selectedHouse}
        applyedProduct={applyedProduct}
        userInformation={user as any}
        setIsOpen={setSideNavIsOpen}
        houses={houses}
        profileImg={profileImg}
      />
    </div>
  );
};

//  👿 withRouter로 받는 prop가 없는데 왜...
export default withRouter(ErrProtecter(Header));
