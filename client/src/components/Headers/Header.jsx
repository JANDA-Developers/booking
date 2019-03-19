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
import ErrProtecter from '../../utils/ErrProtecter';
import logo from '../../img/logo/logo--white.png'; // with import
import { LOG_USER_OUT, SELECT_HOUSE } from '../../queries';
import { useSelect } from '../../actions/hook';

const Header = ({
  verifiedPhone, isLoggedIn, sideNavOpener, history, userInformation, lastSelectedHouse,
}) => {
  let houseOptions = ['생성된 숙소 없음'];

  if (userInformation && userInformation.houses) {
    const { houses } = userInformation;
    houseOptions = houses.map(house => ({ value: house._id, label: house.name }));
  }

  console.log(houseOptions);

  const houseHook = useSelect(lastSelectedHouse);

  useEffect(() => {
    houseHook.onChange(lastSelectedHouse);
  }, [lastSelectedHouse]);
  // dummy

  return (
    <div className="header">
      <NavLink to="/">
        <span className="header__logoPlace">
          <img className="header__logo" src={logo} alt="" />
        </span>
      </NavLink>
      <span className="header__menue">
        <CircleIcon onClick={sideNavOpener} flat thema="white" darkWave>
          <Icon icon="menue" />
        </CircleIcon>
      </span>
      {isLoggedIn ? (
        <Fragment>
          <Mutation
            mutation={LOG_USER_OUT}
            onCompleted={() => {
              toast.success('로그아웃 완료');
              history.push('./');
            }}
          >
            {mutation => (
              <Fragment>
                <span
                  data-tip
                  data-delay-hide={0}
                  data-for="listAboutUser"
                  data-event="click"
                  className="header__profile"
                >
                  <ProfileCircle isBordered whiteBorder small />
                </span>

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
                    console.error(error);
                  }}
                  onCompleted={({ selectHouse }) => {
                    if (selectHouse && selectHouse.ok) {
                      console.log(selectHouse);
                    }
                  }}
                >
                  {(selectHouseMutation) => {
                    const handleSelectHouse = (value) => {
                      houseHook.onChange(value);
                      selectHouseMutation({ variables: { selectedHouse: value } });
                    };
                    return (
                      <Fragment>
                        <SelectBox
                          placeholder="숙소를 선택해주세요."
                          options={houseOptions}
                          {...houseHook}
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
          {verifiedPhone || (
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
};

Header.defaultProps = {
  sideNavOpener: () => {},
  verifiedPhone: false,
};

export default ErrProtecter(withRouter(Header));
