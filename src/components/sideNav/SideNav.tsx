import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import "./SideNav.scss";
import ErrProtecter from "../../utils/errProtect";
import Icon, { IIcons, IconSize } from "../../atoms/icons/Icons";
import Button from "../../atoms/button/Button";
import JDmenu, { JDmenuItem, JDsubMenu } from "../../atoms/menu/Menu";
import ProfileCircle from "../../atoms/profileCircle/ProfileCircle";
import SelectHouseWrap from "../selectHouse/SelectHouseWrap";
import { s4, instanceOfA } from "../../utils/utils";
import { IContext } from "../../pages/bookingServer/MiddleServerRouter";
import { HouseStatus } from "../../types/enum";
import { inOr } from "../../utils/C";
import Help from "../../atoms/Help/Help";
import JDlist from "../../atoms/list/List";
import { to4YMMDD } from "../../utils/setMidNight";
import { LANG } from "../../hooks/hook";
import JDsideNav from "../../atoms/sideNav/JDsideNav";

interface IProps {
  isOpen: boolean;
  setIsOpen: any;
  context: IContext;
}

// 네비 메뉴 그룹
interface IMenusItem {
  to: string;
  label: string;
  icon: IIcons;
  disabled: boolean;
}

// 네비 메뉴 2차 그룹
interface IMenusGroup {
  disabled: boolean;
  groupTitle: string;
  contents: IMenusItem[];
}

const SideNav: React.FC<IProps> = ({ isOpen, setIsOpen, context }) => {
  const { applyedProduct, house, user } = context;

  const status = house && house.status;
  const disabledFlag = status !== HouseStatus.ENABLE;

  const menues: (IMenusItem | IMenusGroup)[] = [
    {
      to: "/dashboard",
      icon: "apps",
      label: LANG("home"),
      disabled: false
    },
    {
      to: "/assigTimeline",
      disabled: disabledFlag,
      icon: "calendar",
      label: LANG("allocation_calendar")
    },
    {
      to: "/statistic",
      icon: "graphPie",
      label: LANG("statistics"),
      disabled: disabledFlag
    },
    {
      to: "/resvList",
      disabled: disabledFlag,
      icon: "list",
      label: LANG("bookingList")
    },
    {
      groupTitle: LANG("config"),
      disabled: disabledFlag,
      contents: [
        {
          to: "/roomConfig",
          icon: "roomChange",
          label: LANG("room_config"),
          disabled: disabledFlag
        },
        {
          to: "/setPrice",
          icon: "money",
          label: LANG("price_setting"),
          disabled: disabledFlag
        },
        {
          to: "/sms",
          icon: "sms",
          label: LANG("sms_setting"),
          disabled: disabledFlag
        },
        {
          to: "/HMconfig",
          disabled: disabledFlag,
          icon: "list",
          label: LANG("HM")
        },
        {
          to: "/config",
          icon: "config",
          label: LANG("preferences"),
          disabled: disabledFlag
        }
      ]
    },
    {
      to: "/qna",
      icon: "book",
      label: LANG("customer_inquiry"),
      disabled: false
    }
  ];

  // 인터페이스만 존재 내용없음
  const handleClickNavLInk = (
    e: React.MouseEvent<HTMLElement>,
    disabled: boolean
  ) => {
    if (disabled) e.preventDefault();
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

  // disabled인 것들을 아래로 내려보냄
  const sortedMenus = menues.sort((menu, menu2) => {
    return menu.disabled === menu2.disabled ? 0 : menu.disabled ? 1 : -1;
  });

  return (
    <JDsideNav isOpen={isOpen} setIsOpen={setIsOpen}>
      {/* 프로필 */}
      <div className="JDsideNav__profill">
        <Link to="/myPage">
          <div className="JDsideNav__circle">
            <ProfileCircle
              size={IconSize.MEDIUM_LARGE}
              isBordered
              file={user.profileImg}
            />
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
            <span className="JDstandard-small-space">
              {inOr(applyedProduct, "name", LANG("unapplied"))}
            </span>
            {applyedProduct && (
              <Help
                icon="info"
                tooltip={
                  <JDlist
                    className="JDmargin-bottom0"
                    contents={[
                      `${LANG("expire_date")}: ${to4YMMDD(
                        applyedProduct.expireDate
                      )}`,
                      `${LANG("price")}: ${applyedProduct.price || 0} /${LANG(
                        "month"
                      )}`
                    ]}
                  />
                }
              />
            )}
          </div>
          <div className="JDsideNav__billing-detail">
            <span>
              {applyedProduct &&
                `${applyedProduct.daysLeftToExpire}${LANG("date")} ${LANG(
                  "available"
                )}`}
            </span>
          </div>
        </div>
        <div className="JDsideNav__upgradeBtn">
          <NavLink to="/products">
            <Button label={LANG("choose_product")} mode="border" />
          </NavLink>
        </div>
      </div>
    </JDsideNav>
  );
};

export default ErrProtecter(SideNav);
