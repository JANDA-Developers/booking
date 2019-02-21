import React, { Fragment } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Button from '../../atoms/Buttons';
import Icon from '../../atoms/icons/Icons';
import CircleIcon from '../../atoms/CircleIcon';
import ErrProtecter from '../../utils/ErrProtecter';
import logo from '../../img/logo/logo--white.png'; // with import
import { LOG_USER_OUT } from '../../queries';

const Header = ({ verifiedPhone, isLoggin, sideNavOpener }) => (
  <div className="header">
    <span className="header__logoPlace JDwaves-effect JDwaves-effect-dark">
      <img className="header__logo" src={logo} alt="" />
    </span>
    <span className="header__menue">
      <CircleIcon onClick={sideNavOpener} flat thema="white" darkWave>
        <Icon icon="menue" />
      </CircleIcon>
    </span>

    {isLoggin ? (
      <Fragment>
        <Mutation mutation={LOG_USER_OUT} onCompleted={() => {}}>
          {mutation => (
            <span className="header__link">
              <Button onClick={mutation} label="로그아웃" mode="flat" color="white" />
            </span>
          )}
        </Mutation>
        <NavLink className="header__link" to="/middleServer/phoneVerification">
          <Button label="인증하기" blink mode="flat" color="white" />
        </NavLink>
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

Header.propTypes = {
  isLoggin: PropTypes.bool.isRequired,
  verifiedPhone: PropTypes.bool.isRequired,
  sideNavOpener: PropTypes.func,
};

Header.defaultProps = {
  sideNavOpener: () => {},
};

export default ErrProtecter(Header);
