import React, { Fragment, useEffect } from 'react';
import './Header.scss';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import Button from '../../atoms/button/Buttons';
import TooltipList from '../../atoms/tooltipList/TooltipList';
import ProfileCircle from '../../atoms/profileCircle/ProfileCircle';
import CircleIcon from '../../atoms/circleIcon/CircleIcon';
import SelectBox from '../../atoms/forms/SelectBox';
import Icon from '../../atoms/icons/Icons';
import { ErrProtecter } from '../../utils/utils';
import logo from '../../img/logo/logo--white.png'; // with import
import { LOG_USER_OUT, SELECT_HOUSE } from '../../queries';
import { useSelect } from '../../actions/hook';

const Header = ({
  isPhoneVerified, isLoggedIn, sideNavOpener, history, userInformation, lastSelectedHouse,
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
          {/* Mutation: 로그아웃 */}
          <Mutation
            mutation={LOG_USER_OUT}
            onCompleted={() => {
              toast.success('로그아웃 완료');
              history.push('./');
            }}
            >
            {mutation => (
              <Fragment>
                {/* 프로필 서클 */}
                <span
                  data-tip
                  data-delay-hide={0}
                  data-for="listAboutUser"
                  data-event="click"
                  className="header__profile"
                >
                  <ProfileCircle isBordered whiteBorder small />
                </span>
                {/* 사용자 메뉴 */}
                <TooltipList id="listAboutUser">
                  <ul>
                    <li>
                      <Button onClick={mutation} label="로그아웃" mode="flat" color="white" />
                    </li>
                    <li>
                      <NavLink to="/middleServer/myPage">
                        <Button label="MYpage" mode="flat" color="white" />
                      </NavLink>
                    </li>
                  </ul>
                </TooltipList>
                {/* 숙소선택 뮤테이션 */}
                <Mutation
                  mutation={SELECT_HOUSE}
                  nError={(error) => {
                    console.error('error');
                    console.warn(error);
                  }}
                  onCompleted={({ selectHouse }) => {
                    if (selectHouse && selectHouse.ok) {
                      console.log(selectHouse);
                    }
                  }}
                >
                  {(selectHouseMutation) => {
                    const handleSelectHouse = (value) => {
                      selectedHouseHook.onChange(value);
                      selectHouseMutation({ variables: { selectedHouse: value } });
                    };
                    return (
                      <Fragment>
                        <SelectBox
                          placeholder="숙소를 생성해주세요."
                          options={houseOptions}
                          {...selectedHouseHook}
                          onChange={handleSelectHouse}
                        />
                        <span className="header__apps">
                          <CircleIcon onClick={sideNavOpener} flat thema="white" darkWave>
                            <Icon icon="apps" />
                          </CircleIcon>
                        </span>
                      </Fragment>
                    );
                  }}
                </Mutation>
              </Fragment>
            )}
          </Mutation>
          {isPhoneVerified || (
            <NavLink className="header__link" to="/middleServer/phoneVerification">
              <Button label="인증하기" blink mode="flat" color="white" />
            </NavLink>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <NavLink className="header__link" to="/middleServer/login">
            <Button label="로그인" mode="flat" color="white" />
          </NavLink>
          <NavLink className="header__link" to="/middleServer/signUp">
            <Button label="회원가입" mode="flat" color="white" />
          </NavLink>
        </Fragment>
      )}
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
