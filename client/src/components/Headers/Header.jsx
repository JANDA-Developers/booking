import React, { Fragment } from 'react';
import './Header.scss';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import Button from '../../atoms/button/Buttons';
import ProfileCircle from '../../atoms/profileCircle/ProfileCircle';
import CircleIcon from '../../atoms/circleIcon/CircleIcon';
import SelectBox from '../../atoms/forms/SelectBox';
import Icon from '../../atoms/icons/Icons';
import ErrProtecter from '../../utils/ErrProtecter';
import logo from '../../img/logo/logo--white.png'; // with import
import { LOG_USER_OUT } from '../../queries';
import { useSelect } from '../../actions/hook';

const Header = ({
  verifiedPhone, isLoggedIn, sideNavOpener, history, userInformation,
}) => {

  const useSelect1 = useSelect(null);
  
  // dummy
  const SELECTDUMMYOPTION = [
    { value: 'MYGUESTHOUSE', label: 'MYGUESTHOUSE' },
  ];

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
                <span className="header__profile">
                  <ProfileCircle isBordered whiteBorder small></ProfileCircle>
                </span>
                <SelectBox options={SELECTDUMMYOPTION} {...useSelect1} />
                {/* <span className="header__link">
                  <Button onClick={mutation} label="로그아웃" mode="flat" color="white" />
                </span> */}
                <span className="header__apps">
                  <CircleIcon onClick={sideNavOpener} flat thema="white" darkWave>
                    <Icon icon="apps" />
                  </CircleIcon>
                </span>
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
