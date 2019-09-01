import React, {Fragment} from "react";
import {NavLink, Link} from "react-router-dom";
import PropTypes, {string} from "prop-types";
import "./SideNav.scss";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import Icon, {IIcons} from "../../atoms/icons/Icons";
import Button from "../../atoms/button/Button";
import JDmenu, {JDmenuItem, JDsubMenu} from "../../atoms/menu/Menu";
import ProfileCircle from "../../atoms/profileCircle/ProfileCircle";
import SelectHouseWrap from "../selectHouse/SelectHouseWrap";
import {IUser, IProduct, IHouse} from "../../types/interface";
import {isEmpty, s4, instanceOfA, isTestProduct} from "../../utils/utils";
import {HouseStatus} from "../../types/enum";
import {Product} from "../../types/enum";
import {getMyProfile_GetMyProfile_user} from "../../types/api";
import {IContext} from "../../pages/MiddleServerRouter";

interface IProps {
  isOpen: boolean;
  setIsOpen: any;
  context: IContext;
}

const SideNav: React.FC<IProps> = ({isOpen, setIsOpen, context}) => {
  const {applyedProduct, houses, house, user} = context;

  const classes = classNames({
    JDsideNav: true,
    "JDsideNav--open": isOpen
  });

  const handleCurtainClick = () => {
    setIsOpen(false);
  };

  const isHouseMaked = !isEmpty(house);
  const isHaveProduct = house && house.product ? true : false;
  const isRoomTypeMaked = isHouseMaked && !isEmpty(house!.roomTypes);
  const status = house && house.status;

  const disabledFlag = status !== HouseStatus.ENABLE;

  interface IMenusItem {
    to: string;
    label: string;
    icon: IIcons;
    disabled: boolean;
  }

  interface IMenusGroup {
    disabled: boolean;
    groupTitle: string;
    contents: IMenusItem[];
  }
  const menues: (IMenusItem | IMenusGroup)[] = [
    {
      to: "/middleServer",
      icon: "apps",
      label: "홈",
      disabled: false
    },
    {
      to: "/assigTimeline",
      disabled: disabledFlag,
      icon: "calendar",
      label: "배정달력"
    },
    {
      to: "/statistic",
      icon: "graphPie",
      label: "통계",
      disabled: disabledFlag
    },
    {
      to: "/resvList",
      disabled: disabledFlag,
      icon: "list",
      label: "예약목록"
    },
    {
      groupTitle: "설정",
      disabled: disabledFlag,
      contents: [
        {
          to: "/roomConfig",
          icon: "roomChange",
          label: "방 설정",
          disabled: disabledFlag
        },
        {
          to: "/setPrice",
          icon: "money",
          label: "가격설정",
          disabled: disabledFlag
        },
        {
          to: "/sms",
          icon: "sms",
          label: "SMS설정",
          disabled: disabledFlag
        },
        {
          to: "/config",
          icon: "config",
          label: "환경설정",
          disabled: disabledFlag
        }
      ]
    },
    {
      to: "/qna",
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
    else {
      handleCurtainClick();
    }
  };

  const renderLink = (menu: IMenusItem) => {
    return (
      <NavLink
        key={`JDsideMenu${menu.label}`}
        to={menu.to || "a"}
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
    );
  };

  const sortedMenus = menues.sort((menu, menu2) => {
    return menu.disabled === menu2.disabled ? 0 : menu.disabled ? 1 : -1;
  });

  return (
    <Fragment>
      <div className={classes}>
        {/* 프로필 */}
        <div className="JDsideNav__profill">
          <Link to="/myPage">
            <div className="JDsideNav__circle">
              <ProfileCircle isBordered profileImg={user.profileImg} />
            </div>
          </Link>
          <span className="JDsideNav__name">{user.name || "비회원"}</span>
          <SelectHouseWrap context={context} />
        </div>
        {/* 리스트 컨테이너 */}
        <div className="JDsideNav__listContainer">
          <JDmenu customMode="sideNav" mode="inline">
            {sortedMenus.map(menu =>
              instanceOfA<IMenusGroup>(menu, "contents") ? (
                <JDsubMenu key={s4()} title={menu.groupTitle}>
                  <JDmenuItem>
                    {menu.contents.map(content => renderLink(content))}
                  </JDmenuItem>
                </JDsubMenu>
              ) : (
                <JDmenuItem key={s4()}>{renderLink(menu)}</JDmenuItem>
              )
            )}
          </JDmenu>
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
            <NavLink to="/products">
              <Button label="업그레이드" mode="border" />
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
