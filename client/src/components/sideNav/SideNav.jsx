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
        <div className="JDsideNav__profill JD">
          <div style={profileStyle} className="JDsideNav__circle JDwaves-effect" />
        </div>
        <div className="JDsideNav__listContainer">
          <NavLink to="/" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">Mnue1</span>
          </NavLink>
          <NavLink to="/" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">Mnue2</span>
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
};

SideNav.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
};

export default ErrProtecter(SideNav);
