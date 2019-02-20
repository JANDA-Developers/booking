import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideNav.scss';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import Icon from '../../atoms/icons/Icons';
import profileImg from '../../img/profile/default_profile.jpg';

function SideNav({ isOpen, setIsOpen }) {
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
          <div style={profileStyle} className="JDsideNav__circle" />
          <div />
        </div>
        <div className="JDsideNav__listContainer">
          <NavLink to="/" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">예약목록</span>
          </NavLink>
          <NavLink to="/" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">예약목록</span>
          </NavLink>
        </div>
      </div>
      <div
        role="presentation"
        onkeyPress
        onClick={handleCurtainClick}
        className={`JDsideNav-curtain ${isOpen ? 'JDsideNav-curtain--open' : ''}`}
      />
    </Fragment>
  );
}

SideNav.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

SideNav.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
};

export default ErrProtecter(SideNav);
