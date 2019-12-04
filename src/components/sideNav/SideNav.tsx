import React, { Fragment, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./SideNav.scss";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import Icon, { IIcons } from "../../atoms/icons/Icons";
import Button from "../../atoms/button/Button";
import JDmenu, { JDmenuItem, JDsubMenu } from "../../atoms/menu/Menu";
import ProfileCircle from "../../atoms/profileCircle/ProfileCircle";
import SelectHouseWrap from "../selectHouse/SelectHouseWrap";
import { s4, instanceOfA } from "../../utils/utils";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { HouseStatus } from "../../types/enum";
import { inOr } from "../../utils/C";
import Help from "../../atoms/Help/Help";
import JDlist from "../../atoms/list/List";
import { to4YMMDD } from "../../utils/setMidNight";
import { LANG } from "../../hooks/hook";

interface IProps {
  isOpen: boolean;
  setIsOpen: any;
  context: IContext;
}

// 네비 메뉴 그룹
interface IMenusItem {
  key: string;
  to: string;
  label: string;
  icon: IIcons;
  disabled: boolean;
}

// 네비 메뉴 2차 그룹
interface IMenusGroup {
  key: string;
  disabled: boolean;
  groupTitle: string;
  contents: IMenusItem[];
}

const SideNav: React.FC<IProps> = ({ isOpen, setIsOpen, context }) => {
  const { applyedProduct, house, user } = context;

  const [openMenu, setOpenMenu] = useState<string[]>([]);

  console.log("openMenu");
  console.log(openMenu);

  const classes = classNames({
    JDsideNav: true,
    "JDsideNav--open": isOpen
  });

  const handleCurtainClick = () => {
    setIsOpen(false);
  };

  const status = house && house.status;
  const disabledFlag = status !== HouseStatus.ENABLE;

  const menues: (IMenusItem | IMenusGroup)[] = [
    {
      to: "/dashboard",
      key: "dashboard",
      icon: "apps",
      label: LANG("home"),
      disabled: false
    },
    {
      to: "/assigTimeline",
      key: "assigTimeline",
      disabled: disabledFlag,
      icon: "calendar",
      label: LANG("allocation_calendar")
    },
    {
      to: "/statistic",
      key: "statistic",
      icon: "graphPie",
      label: LANG("statistics"),
      disabled: disabledFlag
    },
    {
      to: "/resvList",
      key: "resvList",
      disabled: disabledFlag,
      icon: "list",
      label: LANG("bookingList")
    },
    {
      key: "config",
      groupTitle: LANG("config"),
      disabled: disabledFlag,
      contents: [
        {
          key: "roomConfig",
          to: "/roomConfig",
          icon: "roomChange",
          label: LANG("room_config"),
          disabled: disabledFlag
        },
        {
          key: "setPrice",
          to: "/setPrice",
          icon: "money",
          label: LANG("price_setting"),
          disabled: disabledFlag
        },
        {
          key: "HMconfig",
          to: "/HMconfig",
          disabled: disabledFlag,
          icon: "list",
          label: LANG("HM")
        },
        {
          key: "config",
          to: "/config",
          icon: "config",
          label: LANG("preferences"),
          disabled: disabledFlag
        }
      ]
    },
    {
      key: "sms_setting",
      groupTitle: LANG("sms_setting"),
      disabled: disabledFlag,
      contents: [
        {
          key: "smsTemplateSetting",
          to: "/smsTemplateSetting",
          icon: "sms",
          label: LANG("template_setting"),
          disabled: disabledFlag
        },
        {
          key: "sms_usage",
          to: "/smsInfo",
          icon: "info",
          label: LANG("sms_usage"),
          disabled: disabledFlag
        },
        {
          key: "smsHistory",
          to: "/smsHistory",
          icon: "sms",
          label: LANG("sms_history"),
          disabled: disabledFlag
        }
      ]
    },
    // 고객문의
    {
      key: "customer_inquiry",
      groupTitle: LANG("customer_inquiry"),
      disabled: disabledFlag,
      contents: [
        {
          key: "solution_usage_guide",
          to: "/solution_usage_guide",
          icon: "book",
          label: LANG("solution_usage_guide"),
          disabled: disabledFlag
        }
      ]
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
    <Fragment>
      <div className={classes}>
        <div className="JDsideNav__inner">
          {/* 프로필 */}
          <div className="JDsideNav__profill">
            <Link to="/myPage">
              <div className="JDsideNav__circle">
                <ProfileCircle size={"large"} file={user.profileImg} />
              </div>
            </Link>
            <span className="JDsideNav__name">{user.name || "비회원"}</span>
            <SelectHouseWrap context={context} />
          </div>
          {/* 리스트 컨테이너 */}
          <div className="JDsideNav__listContainer">
            <JDmenu
              onOpenChange={(openKeys: string[]) => {
                setOpenMenu(openKeys);
              }}
              openKeys={[...openMenu]}
              customMode="sideNav"
              mode="inline"
            >
              {sortedMenus.map(menu =>
                instanceOfA<IMenusGroup>(menu, "contents") ? (
                  <JDsubMenu key={menu.key} title={menu.groupTitle}>
                    <JDmenuItem title={menu.groupTitle} key={menu.key}>
                      {menu.contents.map(content => renderLink(content))}
                    </JDmenuItem>
                  </JDsubMenu>
                ) : (
                  <JDmenuItem key={menu.key}>{renderLink(menu)}</JDmenuItem>
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
                          `${LANG("price")}: ${applyedProduct.price ||
                            0} /${LANG("month")}`
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
        </div>
        {/* 사이드 네비 외 가림막 */}
        <div
          role="presentation"
          onClick={handleCurtainClick}
          className={`JDsideNav-curtain ${
            isOpen ? "JDsideNav-curtain--open" : ""
          }`}
        />
      </div>
    </Fragment>
  );
};

export default ErrProtecter(SideNav);
