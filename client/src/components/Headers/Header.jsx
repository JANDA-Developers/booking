import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import Button from '../../atoms/Buttons';
import Icon from '../../atoms/icons/Icons';
import CircleIcon from '../../atoms/CircleIcon';
import ErrProtecter from '../../utils/ErrProtecter';
import logo from '../../img/logo/logo--white.png'; // with import

const Header = ({ isLoggin }) => (
  <div className="header">
    <span className="header__logoPlace JDwaves-effect JDwaves-effect-dark">
      <img className="header__logo" src={logo} alt="" />
    </span>
    <span className="header__menue">
      <CircleIcon flat thema="white" darkWave>
        <Icon icon="menue" />
      </CircleIcon>
    </span>
    {!isLoggin ? (
      <NavLink className="header__link" to="/middleServer/login">
        <Button label="로그인" mode="flat" color="white" />
      </NavLink>
    ) : (
      <NavLink className="header__link" to="/middleServer/login">
        <Button label="로그아웃" mode="flat" color="white" />
      </NavLink>
    )}
    <NavLink className="header__link" to="/middleServer/signUp">
      <Button label="회원가입" mode="flat" color="white" />
    </NavLink>
  </div>
);

export default ErrProtecter(Header);
