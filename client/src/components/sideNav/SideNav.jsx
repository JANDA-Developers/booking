import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideNav.scss';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import Icon from '../../atoms/icons/Icons';
import Button from '../../atoms/button/Buttons';
import ProfileCircle from '../../atoms/profileCircle/ProfileCircle';
import profileImg from '../../img/profile/default_profile.jpg';

function SideNav({
  isOpen, setIsOpen, userInformation, selectedProduct = {},
}) {
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
        {/* 프로필 */}
        <div className="JDsideNav__profill">
          <Link to="/middleServer/myPage">
            <div className="JDsideNav__circle">
              <ProfileCircle style={profileStyle} />
            </div>
          </Link>
          <span className="JDsideNav__name">{userInformation.name}</span>
        </div>
        {/* 리스트 컨테이 */}
        <div className="JDsideNav__listContainer">
          <NavLink to="/middleServer/makeHouse" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">숙소생성</span>
          </NavLink>
          <NavLink to="/middleServer/products" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">서비스 상품</span>
          </NavLink>
        </div>
        <div className="JDsideNav__productView">
          <div className="JDsideNav__billing-info">
            <div className="JDsideNav__billing-title">{selectedProduct.name || '적용된 상품이 없습니다.'}</div>
            <div className="JDsideNav__billing-detail">
              <span>무료</span>
              <span>/월</span>
            </div>
          </div>
          <div className="JDsideNav__upgrade-btn">
            <NavLink to="/middleServer/products">
              <Button label="업그레이드" mode="flat" />
            </NavLink>
          </div>
        </div>
      </div>
      {/* 블랙 커튼 */}
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
