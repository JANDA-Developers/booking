import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideNav.scss';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import Icon from '../../atoms/icons/Icons';
import ProfileCircle from '../../atoms/profileCircle/ProfileCircle';
import profileImg from '../../img/profile/default_profile.jpg';

function SideNav({ isOpen, setIsOpen, userInformation }) {
  const classes = classNames({
    JDsideNav: true,
    'JDsideNav--open': isOpen,
  });
  const handleCurtainClick = () => {
    setIsOpen();
  };

  const profileStyle = {
    backgroundImage: `url(${profileImg})`,
  };

  return (
    <Fragment>
      <div className={classes}>
        <div className="JDsideNav__profill">
          <Link to="/middleServer/myPage">
            <div className="JDsideNav__circle">
              <ProfileCircle style={profileStyle} />
            </div>
          </Link>
          <span className="JDsideNav__name">{userInformation.name}</span>
        </div>
        <div className="JDsideNav__listContainer">
          <NavLink to="/" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">숙소생성</span>
          </NavLink>
          <NavLink to="/middleServer/products" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">서비스 상품</span>
          </NavLink>
        </div>
      </div>
      <div
        role="presentation"
        onClick={handleCurtainClick}
        className={`JDsideNav-curtain ${isOpen ? 'JDsideNav-curtain--open' : ''}`}
      />
    </Fragment>
  );
}

SideNav.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  userInformation: PropTypes.object,
};

SideNav.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  userInformation: {},
};

export default ErrProtecter(SideNav);
