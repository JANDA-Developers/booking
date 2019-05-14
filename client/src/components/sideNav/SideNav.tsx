import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SideNav.scss';
import classNames from 'classnames';
import ErrProtecter from '../../utils/errProtect';
import Icon from '../../atoms/icons/Icons';
import Button from '../../atoms/button/Button';
import ProfileCircle from '../../atoms/profileCircle/ProfileCircle';
import SelectHouseWrap from '../selectHouse/SelectHouseWrap';
import { IUser, IProduct, IHouse } from '../../types/interface';

interface IProps {
  isOpen: boolean;
  setIsOpen: any;
  userInformation: IUser;
  applyedProduct?: IProduct;
  selectedHouse?: IHouse;
  profileImg: string;
  houses: IHouse[];
}

const SideNav: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  profileImg,
  userInformation,
  applyedProduct,
  selectedHouse,
  houses,
}) => {
  const classes = classNames({
    JDsideNav: true,
    'JDsideNav--open': isOpen,
  });

  const handleCurtainClick = () => {
    setIsOpen();
  };

  return (
    <Fragment>
      <div className={classes}>
        {/* 프로필 */}
        <div className="JDsideNav__profill">
          <Link to="/middleServer/myPage">
            <div className="JDsideNav__circle">
              <ProfileCircle profileImg={profileImg} />
            </div>
          </Link>
          <span className="JDsideNav__name">{userInformation.name || '비회원'}</span>
          <SelectHouseWrap selectedHouse={selectedHouse} houses={houses} />
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
          <NavLink to="/middleServer/qna" className="JDsideNav__navLink">
            <Icon icon="list" />
            <span className="JDsideNav__title">고객문의</span>
          </NavLink>
        </div>
        {/* 하단 상품뷰 */}
        <div className="JDsideNav__productView">
          <div className="JDsideNav__billing-info">
            <div className="JDsideNav__billing-title">{applyedProduct ? applyedProduct.name : '적용안됨'}</div>
            <div className="JDsideNav__billing-detail">
              <span>price</span>
              <span>{applyedProduct ? applyedProduct.name : '/ 월'}</span>
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
};

export default ErrProtecter(SideNav);
