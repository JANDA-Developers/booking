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
  isOpen, setIsOpen, userInformation, selectedProduct, selectedHouse,
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
          <span className="JDsideNav__name">{userInformation.name || '비회원'}</span>
          <span className="JDsideNav__houseName">{selectedHouse.name}</span>
        </div>
        {/* 리스트 컨테이너 */}
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
        {/* 하단 상품뷰 */}
        <div className="JDsideNav__productView">
          <div className="JDsideNav__billing-info">
            <div className="JDsideNav__billing-title">{selectedProduct.name || '적용안됨'}</div>
            <div className="JDsideNav__billing-detail">
              <span>{selectedProduct.price}</span>
              <span>{selectedProduct.name || '/ 월'}</span>
            </div>
          </div>
          <div className="JDsideNav__upgrade-btn">
            <NavLink to="/middleServer/products">
              <Button label="업그레이드" mode="flat" />
            </NavLink>
          </div>
        </div>
      </div>
      {/* 사이드 네비 외 가림막 */}
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
  selectedProduct: PropTypes.object,
};

SideNav.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  userInformation: {},
  selectedProduct: {},
};

export default ErrProtecter(SideNav);
