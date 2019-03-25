import React, { Fragment, useEffect } from 'react';
import './Header.scss';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../atoms/button/Buttons';
import TooltipList from '../../atoms/tooltipList/TooltipList';
import ProfileCircle from '../../atoms/profileCircle/ProfileCircle';
import CircleIcon from '../../atoms/circleIcon/CircleIcon';
import SelectBox from '../../atoms/forms/SelectBox';
import Icon from '../../atoms/icons/Icons';
import { ErrProtecter } from '../../utils/utils';
import logo from '../../img/logo/logo--white.png'; // with import
import { useSelect } from '../../actions/hook';

const Header = ({
  isPhoneVerified,
  isLoggedIn,
  sideNavOpener,
  userInformation,
  lastSelectedHouse,
  logOutMutation,
  selectHouseMutation,
}) => {
  // 셀렉트박스가 읽을수 있도록 변환
  const formetedSelectedHouse = {
    value: lastSelectedHouse._id,
    label: lastSelectedHouse.name,
  };

  const selectedHouseHook = useSelect(formetedSelectedHouse);

  // 유저가 생선한 모든 하우스들을 select에 맞게 포맷
  let houseOptions = [];
  if (userInformation && userInformation.houses) {
    const { houses } = userInformation;
    houseOptions = houses.map(house => ({ value: house._id, label: house.name }));
  }

  const handleSelectHouse = (value) => {
    selectedHouseHook.onChange(value);
    selectHouseMutation({ variables: { selectedHouse: value } });
  };

  useEffect(() => {
    selectedHouseHook.onChange(formetedSelectedHouse);
  }, [formetedSelectedHouse]);

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
        <CircleIcon onClick={sideNavOpener} flat thema="white" darkWave>
          <Icon icon="menue" />
        </CircleIcon>
      </span>
      {isLoggedIn ? (
        <Fragment>
          <span data-tip data-delay-hide={0} data-for="listAboutUser" data-event="click" className="header__profile">
            <ProfileCircle isBordered whiteBorder small />
          </span>
          <SelectBox
            placeholder="숙소를 생성해주세요."
            options={houseOptions}
            {...selectedHouseHook}
            onChange={handleSelectHouse}
          />
          {isPhoneVerified || (
            <NavLink className="header__btns header__btns--mobile" to="/middleServer/phoneVerification">
              <Button label="인증하기" blink mode="flat" color="white" />
            </NavLink>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <NavLink className="header__btns header__btns--mobile" to="/middleServer/login">
            <Button label="로그인" mode="flat" color="white" />
          </NavLink>
          <NavLink className="header__btns header__btns--mobile" to="/middleServer/signUp">
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
        <CircleIcon flat thema="white" darkWave>
          <Icon icon="apps" />
        </CircleIcon>
      </span>
      {/* 사용자 메뉴 */}
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
            <li>
              <NavLink to="/middleServer/login">
                <Button label="로그인" mode="flat" color="white" />
              </NavLink>
            </li>
          )}
        </ul>
      </TooltipList>
    </div>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  verifiedPhone: PropTypes.bool,
  sideNavOpener: PropTypes.func,
  history: PropTypes.any.isRequired,
  userInformation: PropTypes.object,
  lastSelectedHouse: PropTypes.object,
};

Header.defaultProps = {
  sideNavOpener: () => {},
  verifiedPhone: false,
  userInformation: {},
  lastSelectedHouse: {},
};

export default ErrProtecter(withRouter(Header));
