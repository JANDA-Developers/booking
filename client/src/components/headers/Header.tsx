import React, { Fragment, useEffect } from 'react';
import './Header.scss';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StaticContext, RouteComponentProps } from 'react-router';
import Button from '../../atoms/button/Button';
import TooltipList, { ReactTooltip } from '../../atoms/tooltipList/TooltipList';
import ProfileCircle from '../../atoms/profileCircle/ProfileCircle';
import CircleIcon from '../../atoms/circleIcon/CircleIcon';
import SelectBox from '../../atoms/forms/selectBox/SelectBox';
import Icon from '../../atoms/icons/Icons';
import { ErrProtecter } from '../../utils/utils';
import logo from '../../img/logo/logo--white.png'; // with import
import { useSelect } from '../../actions/hook';
import SelectHouseWrap from '../selectHouse/SelectHouseWrap';
import { IHouse, IDiv } from '../../types/interface';

type ITempProps = IDiv & {
  isPhoneVerified?: boolean;
  isLoggedIn?: boolean;
  className?: string;
  sideNavOpener: any;
  selectedHouse: IHouse;
  houses: IHouse[];
  logOutMutation: any;
  profileImg: string;
};

type IProps = RouteComponentProps<any> & ITempProps;

const Header: React.FC<IProps> = ({
  isPhoneVerified,
  isLoggedIn,
  sideNavOpener,
  selectedHouse,
  houses,
  logOutMutation,
  profileImg,
}) => {
  // 셀렉트박스가 읽을수 있도록 변환
  useEffect(() => {
    ReactTooltip.rebuild();
  });
  return (
    <div className="header">
      {/* 로고 */}
      <NavLink to="/">
        <span className="header__logoPlace">
          <img className="header__logo" src={logo} alt="" />
        </span>
      </NavLink>
      {/* 메뉴버튼 */}
      <span className="header__menue">
        <CircleIcon onClick={sideNavOpener} thema="white" darkWave>
          <Icon icon="menue" />
        </CircleIcon>
      </span>
      {isLoggedIn ? (
        <Fragment>
          <span data-tip data-delay-hide={0} data-for="listAboutUser" data-event="click" className="header__profile">
            <ProfileCircle profileImg={profileImg} isBordered whiteBorder size="tiny" />
          </span>
          <SelectHouseWrap selectedHouse={selectedHouse} houses={houses} />
          {isPhoneVerified || (
            <NavLink className="header__btns header__btns--mobileX" to="/middleServer/phoneVerification">
              <Button label="인증하기" blink mode="flat" color="white" />
            </NavLink>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <NavLink className="header__btns header__btns--mobileX" to="/middleServer/login">
            <Button label="로그인" mode="flat" color="white" />
          </NavLink>
          <NavLink className="header__btns header__btns--mobileX" to="/middleServer/signUp">
            <Button label="회원가입" mode="flat" color="white" />
          </NavLink>
        </Fragment>
      )}
      {/* 앱 서클 */}
      <span
        data-tip
        data-delay-hide={0}
        data-for="listAboutUser"
        data-event="click"
        className="header__apps"
        data-place="bottom"
        data-offset="{'top': 10, 'left': 40}"
      >
        <CircleIcon thema="white" darkWave>
          <Icon icon="apps" />
        </CircleIcon>
      </span>
      {/* 🌜 모바일 메뉴 */}
      <TooltipList id="listAboutUser">
        <ul>
          {isLoggedIn ? (
            <Fragment>
              <li>
                <Button onClick={logOutMutation} label="로그아웃" mode="flat" color="white" />
              </li>
              <li>
                <NavLink to="/middleServer/myPage">
                  <Button label="MYpage" mode="flat" color="white" />
                </NavLink>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <NavLink to="/middleServer/login">
                  <Button label="로그인" mode="flat" color="white" />
                </NavLink>
              </li>
              <li>
                <NavLink className="header__btns" to="/middleServer/signUp">
                  <Button label="회원가입" mode="flat" color="white" />
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </TooltipList>
    </div>
  );
};

//  👿 withRouter로 받는 prop가 없는데 왜...
export default withRouter(ErrProtecter(Header));
