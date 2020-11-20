import React, { Fragment, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./SideNav.scss";
import $ from "jquery";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import Button from "../../atoms/button/Button";
import JDmenu, { JDmenuItem, JDsubMenu } from "../../atoms/menu/Menu";
import ProfileCircle from "../../atoms/profileCircle/ProfileCircle";
import SelectHouseWrap from "../selectHouse/SelectHouseWrap";
import { instanceOfA } from "../../utils/utils";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { HouseStatus } from "../../types/enum";
import { inOr } from "../../utils/C";
import Help from "../../atoms/Help/Help";
import JDlist from "../../atoms/list/List";
import { to4YMMDD } from "../../utils/setMidNight";
import { LANG, useModal } from "../../hooks/hook";
import { IIcons } from "../../atoms/icons/declation";
import JDmenuTitle from "../../atoms/menu/components/MenuTitle";
import JDmenuLinker, {
  IMenusItem
} from "../../atoms/menu/components/MenuLiLinker";
import isMobile from "is-mobile";
import ProductModalWrap from "../productModal/ProductModalWrap";
import { VersionChanger } from "../version/VersionChanger";
import { version } from "../../../package.json";

interface IProps {
  context: IContext;
}

// 네비 메뉴 2차 그룹
interface IMenusGroup {
  icon?: IIcons;
  key: string;
  disabled: boolean;
  groupTitle: string;
  contents: IMenusItem[];
}

export let SIDE_IS_OPEN = false;

export const sideNavToggler = () => {
  const target = $(".JDsideNav");
  target.toggleClass("JDsideNav--open");
  target.find(".JDsideNav-curtain").toggleClass("JDsideNav-curtain--open");
  $(".bookingHost").toggleClass("bookingHost--sideOpen");
  $("#sideNavControlIconOpend").toggle();
  $("#sideNavControlIconClosed").toggle();
  SIDE_IS_OPEN = !SIDE_IS_OPEN;
};

const SideNav: React.FC<IProps> = ({ context }) => {
  const { applyedProduct, house, user } = context;
  const [openMenu, setOpenMenu] = useState<string[]>([]);
  const produtSelectModalHook = useModal(false);

  const classes = classNames({
    JDsideNav: true
  });

  const handleCurtainClick = () => {
    sideNavToggler();
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
      icon: "config",
      groupTitle: LANG("config"),
      disabled: disabledFlag,
      contents: [
        {
          key: "houseConfig",
          to: "/houseConfig",
          icon: "house",
          label: LANG("house_config"),
          disabled: disabledFlag
        },
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
      // sms설정
      key: "sms_setting",
      groupTitle: LANG("sms_service"),
      disabled: disabledFlag,
      icon: "sms",
      contents: [
        {
          // 템플리설정
          key: "smsTemplate",
          to: "/smsTemplate",
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
    // MY PAGE
    {
      key: "mypage",
      label: LANG("mypage"),
      disabled: disabledFlag,
      icon: "person",
      to: "/myPage"
    }
  ];

  // disabled인 것들을 아래로 내려보냄
  const sortedMenus = menues.sort((menu, menu2) => {
    return menu.disabled === menu2.disabled ? 0 : menu.disabled ? 1 : -1;
  });

  return (
    <Fragment>
    </Fragment>
  );
};

export default ErrProtecter(SideNav);
