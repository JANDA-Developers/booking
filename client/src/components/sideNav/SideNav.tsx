import React, {Fragment} from "react";
import {NavLink, Link} from "react-router-dom";
import PropTypes, {string} from "prop-types";
import "./SideNav.scss";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import Icon, {IIcons} from "../../atoms/icons/Icons";
import Button from "../../atoms/button/Button";
import ProfileCircle from "../../atoms/profileCircle/ProfileCircle";
import SelectHouseWrap from "../selectHouse/SelectHouseWrap";
import {IUser, IProduct, IHouse} from "../../types/interface";
import {isEmpty} from "../../utils/utils";

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
  houses
}) => {
  const classes = classNames({
    JDsideNav: true,
    "JDsideNav--open": isOpen
  });

  const handleCurtainClick = () => {
    setIsOpen();
  };

  const isHouseMaked = !isEmpty(selectedHouse);
  const isHaveProduct = selectedHouse && selectedHouse.product ? true : false;
  const isRoomTypeMaked = isHouseMaked && !isEmpty(selectedHouse!.roomTypes);

  interface IMenuesItem {
    to: string;
    label: string;
    icon: IIcons;
    disabled: boolean;
  }
  const menues: IMenuesItem[] = [
    {
      to: "/middleServer/assigTimeline",
      disabled: !isRoomTypeMaked,
      icon: "calendar",
      label: "배정달력"
    },
    {
      to: "/middleServer/resvList",
      disabled: !isHaveProduct,
      icon: "list",
      label: "예약목록"
    },
    {
      to: "/middleServer/setPrice",
      icon: "money",
      label: "가격설정",
      disabled: !isRoomTypeMaked
    },
    {
      to: "/middleServer/sms",
      icon: "sms",
      label: "SMS설정",
      disabled: !isRoomTypeMaked
    },
    {
      to: "/middleServer/timelineConfig",
      icon: "roomChange",
      label: "방구조변경",
      disabled: !isHaveProduct
    },
    {
      to: "/middleServer/makeHouse",
      icon: "config",
      label: "환경설정",
      disabled: !isHaveProduct
    },
    {
      to: "/middleServer/makeHouse",
      icon: "house",
      label: "숙소생성",
      disabled: false
    },
    {
      to: "/middleServer/products",
      icon: "gift",
      label: "서비스상품",
      disabled: false
    },
    {
      to: "/middleServer/qna",
      icon: "question",
      label: "고객문의",
      disabled: false
    }
  ];

  const handleClickNavLInk = (
    e: React.MouseEvent<HTMLElement>,
    disabled: boolean
  ) => {
    if (disabled) e.preventDefault();
  };

  const sortedMenues = menues.sort((menu, menu2) => {
    return menu.disabled === menu2.disabled ? 0 : menu.disabled ? 1 : -1;
  });

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
          <span className="JDsideNav__name">
            {userInformation.name || "비회원"}
          </span>
          <SelectHouseWrap selectedHouse={selectedHouse} houses={houses} />
        </div>
        {/* 리스트 컨테이너 */}
        <div className="JDsideNav__listContainer">
          {sortedMenues.map((menu, index) => (
            <NavLink
              // 👿 Id로 쓸만한거없나
              key={menu.to + index}
              to={menu.to}
              onClick={e => {
                handleClickNavLInk(e, menu.disabled);
              }}
              className={`JDsideNav__navLink ${
                menu.disabled ? "JDsideNav__navLink--disabled" : ""
              }`}
            >
              <Icon icon={menu.icon} />
              <span className="JDsideNav__title">{menu.label}</span>
            </NavLink>
          ))}
        </div>
        {/* 하단 상품뷰 */}
        <div className="JDsideNav__productView">
          <div className="JDsideNav__billing-info">
            <div className="JDsideNav__billing-title">
              {applyedProduct ? applyedProduct.name : "적용안됨"}
            </div>
            <div className="JDsideNav__billing-detail">
              <span>price</span>
              <span>{applyedProduct ? applyedProduct.name : "/ 월"}</span>
            </div>
          </div>
          <div className="JDsideNav__upgradeBtn">
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
        className={`JDsideNav-curtain ${
          isOpen ? "JDsideNav-curtain--open" : ""
        }`}
      />
    </Fragment>
  );
};

export default ErrProtecter(SideNav);
