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
import {ErrProtecter} from "../../utils/utils";
import logo from "../../img/logo/logo--white.png"; // with import
import {useSelect, useModal, useToggle} from "../../actions/hook";
import SelectHouseWrap from "../selectHouse/SelectHouseWrap";
import {IHouse, IDiv} from "../../types/interface";
import JDsearchInput from "../../atoms/searchInput/SearchInput";
import GuestSearchInputWrap from "./components/guestSearchInputWrap";
import PhoneVerificationModalWrap from "../phoneVerificationModal/PhoneVerificationModalWrap";
import SideNav from "../sideNav/SideNav";

type ITempProps = IDiv & {
  isPhoneVerified?: boolean;
  isLoggedIn?: boolean;
  isLoading: boolean;
  className?: string;
  sideNavOpener: any;
  applyedProduct?: any;
  selectedHouse: IHouse;
  houses: IHouse[];
  logOutMutation: any;
  profileImg: string;
  user: any;
};

type IProps = RouteComponentProps<any> & ITempProps;

const Header: React.FC<IProps> = ({
  isPhoneVerified,
  isLoggedIn,
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

  const phoneVerificationModalHook = useModal(false);
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
      {selectedHouse && (<div className="header__center">
        <GuestSearchInputWrap houseId={selectedHouse._id} />
        </div>)}
      {isLoggedIn ? (
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
          {(user && isPhoneVerified) ||
            (!isLoading && (
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
                  color="white"
                />
              </span>
            ))}
        </div>
      ) : (
          <div className="header__right_pc_btns">
            <NavLink className="header__btns header__btns--mobileX" to="/login">
              <Button className="hader__btn" label="로그인" mode="flat" color="white" />
            </NavLink>
            <NavLink className="header__btns header__btns--mobileX" to="/signUp">
              <Button className="hader__btn" label="회원가입" mode="flat" color="white"/>
            </NavLink>
          </div>
      )}
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
      {/* 🌜 모바일 메뉴 */}
      <TooltipList id="listAboutUser">
        <ul>
          {isLoggedIn ? (
            <Fragment>
              <li>
                <Button
                  onClick={()=>{
                    logOutMutation();
                    ReactTooltip.hide();
                  }}
                  label="로그아웃"
                  mode="flat"
                  color="white"
                />
              </li>
              {isLoading !== true && !isPhoneVerified && (
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
                    color="white"
                  />
                </li>
              )}
              <li>
                <NavLink to="/myPage">
                  <Button label="MYpage" mode="flat" color="white" />
                </NavLink>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <NavLink to="/login">
                  <Button onClick={()=>{ReactTooltip.hide();}} label="로그인" mode="flat" color="white" />
                </NavLink>
              </li>
              <li>
                <NavLink className="header__btns" to="/signUp">
                  <Button onClick={()=>{ReactTooltip.hide()}} label="회원가입" mode="flat" color="white" />
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </TooltipList>
      {/* 사이드 네비 */}
      <SideNav
        isOpen={sideNavIsOpen}
        selectedHouse={selectedHouse}
        applyedProduct={applyedProduct}
        userInformation={user}
        setIsOpen={setSideNavIsOpen}
        houses={houses}
        profileImg={profileImg}
      />
    </div>
  );
};

//  👿 withRouter로 받는 prop가 없는데 왜...
export default withRouter(ErrProtecter(Header));
