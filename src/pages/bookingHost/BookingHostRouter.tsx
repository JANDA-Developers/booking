/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useEffect, useState } from "react";
import { JDlang } from "../../langs/JDlang";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import { Helmet } from "react-helmet";
import Header from "../../components/headers/HeaderWrap";
import NoMatch from "../noMatch/NoMatch";
import { GET_USER_INFO } from "../../apollo/queries";
import Preloader from "../../atoms/preloader/Preloader";
import "./BookingHostRouter.scss";
import classnames from "classnames";
import {
  SelectProducts,
  DashBoard,
  MyPage,
  SignUp,
  Login,
  AssigTimeline,
  SuperMain,
  SetPrice,
  DailyPrice,
  SmsTemplateSetting,
  ResvList,
  SmsHistory,
  Statistic,
  RoomConfig,
  ConfigWrap,
  HMconfig,
  HouseConfig,
  HomepageRequest
} from "./pages";
import { UserRole, TLanguageShort } from "../../types/enum";
import { IHouse, IHouseConfigFull } from "../../types/interface";
import { DEFAULT_USER } from "../../types/defaults";
import {
  getMyProfile_GetMyProfile_user,
  getMyProfile_GetMyProfile_user_houses_product
} from "../../types/api";
import { setCookie } from "../../utils/cookies";
import getCurrentHouse from "../../utils/getLastSelectHouse";
import { useModal, useSideNav, LANG } from "../../hooks/hook";
import MemoAlertModal from "../../components/Memo/component/MemoAlertModal";
import JDoutdatedBrowserRework from "../../utils/oldBrowser";
import SideNav from "../../components/sideNav/SideNav";
import Expired from "../bookingHost/expire/Expired";
import { AddtionalConfigModal } from "../../components/else/AdditionalConfigModal";
import { greet, houseConfigSetting } from "./helper";
import SmsInfo from "./smsInfo/SmsInfo";
import CreateHouseWrap from "./createHouse/CreateHouseWrap";

interface JDRoute {
  Component: React.FC<any>;
  path?: string;
  condition?: boolean;
  exact?: boolean;
}

export interface IContext extends RouteComponentProps<any> {
  user: getMyProfile_GetMyProfile_user;
  isLogIn: boolean;
  house: IHouse;
  houseConfig: IHouseConfigFull;
  applyedProduct: getMyProfile_GetMyProfile_user_houses_product | undefined;
  houses: IHouse[];
  sideNavIsOpen: boolean;
  JDlang: (key: string) => any;
  langHook: {
    currentLang: TLanguageShort;
    changeLang: (lang: TLanguageShort) => void;
    JDlang: (key: string) => any;
  };
}

interface IProps {
  GetUserInfo: any;
  selectedHouse: any;
  IsLoggedIn: any;
  langHook: {
    currentLang: TLanguageShort;
    changeLang: (lang: TLanguageShort) => void;
    JDlang: (key: string) => any;
  };
}

const JDbookingHost: React.FC<IProps> = ({
  GetUserInfo: { GetMyProfile: { user = DEFAULT_USER } = {}, loading } = {},
  langHook
}) => {
  const isLogIn = user !== DEFAULT_USER;
  const isLoading: boolean = loading;
  const houses: IHouse[] = user.houses || [];
  const currentHouse = getCurrentHouse(houses);
  const memoAlertModal = useModal(false);
  const applyedProduct = currentHouse?.product;
  const { userRole } = user;
  // 추가적 설정 모달
  const additionalConfigModal = useModal(false);
  const { sideNavIsOpen, setSideNavIsOpen } = useSideNav();
  const houseConfig = houseConfigSetting(currentHouse);
  const isExpired = applyedProduct?.isExpired;
  const houseExists = currentHouse !== undefined;
  const superPermission =
    userRole === UserRole.ADMIN || userRole === UserRole.DEVELOPER;
  // 지원하지 않는 브라우저로 부터 접속했는지 확인합니다.
  // @ts-ignore
  window.isOldBorwesr && JDoutdatedBrowserRework();
  // 디벨롭
  if (userRole === "DEVELOPER") setCookie("isDeveloper", "Y", 1);

  // TODO  전부 context로 벼환
  const tempContext = {
    user,
    isLogIn,
    house: currentHouse,
    houseConfig,
    applyedProduct,
    houses,
    sideNavIsOpen,
    langHook
  };

  const bookingHostClassNames = classnames("bookingHost", undefined, {
    "bookingHost--sideOpen": sideNavIsOpen && houseExists
  });

  const routers: JDRoute[] = [
    {
      path: "/",
      Component: DashBoard,
      condition: houseExists
    },
    {
      path: "/dashboard",
      Component: DashBoard,
      condition: houseExists
    },
    {
      path: "/products",
      Component: SelectProducts,
      condition: houseExists
    },
    {
      path: "/myPage",
      Component: MyPage,
      condition: houseExists
    },
    {
      path: "/createHouse",
      Component: CreateHouseWrap,
      condition: houseExists
    },
    {
      path: "/houseConfig",
      Component: HouseConfig,
      condition: houseExists
    },
    {
      path: "/config",
      Component: ConfigWrap,
      condition: houseExists
    },
    {
      path: "/smsHistory",
      Component: SmsHistory,
      condition: houseExists
    },
    {
      path: "/smsInfo",
      Component: SmsInfo,
      condition: houseExists
    },
    {
      path: "/homepageRequest",
      Component: HomepageRequest,
      condition: houseExists
    },
    {
      path: "/signUp",
      Component: SignUp,
      condition: true
    },
    {
      path: "/login",
      Component: Login,
      condition: true
    },
    {
      path: undefined,
      Component: Expired,
      condition: isExpired
    },
    {
      path: "/superAdmin",
      Component: SuperMain,
      condition: superPermission,
      exact: false
    },
    {
      Component: AssigTimeline,
      path: "/assigTimeline",
      condition: houseExists
    },
    {
      Component: HMconfig,
      path: "/HMconfig",
      condition: houseExists
    },
    {
      Component: DailyPrice,
      path: "/dailyPrice",
      condition: houseExists
    },
    {
      Component: Statistic,
      path: "/statistic",
      condition: houseExists
    },
    {
      Component: RoomConfig,
      path: "/roomConfig",
      condition: houseExists
    },
    {
      Component: SmsTemplateSetting,
      path: "/smsTemplate",
      condition: houseExists
    },
    {
      Component: SetPrice,
      path: "/setPrice",
      condition: houseExists
    },
    {
      Component: ResvList,
      path: "/resvList",
      condition: houseExists
    },
    {
      Component: CreateHouseWrap,
      path: undefined,
      condition: isLogIn && !houseExists
    },
    {
      path: "/",
      Component: Login,
      condition: true
    },
    {
      Component: NoMatch,
      condition: true
    }
  ];

  const renderRoute = (propContext: IContext, loginRouter: JDRoute) => {
    const { Component, path, condition, exact = true } = loginRouter;

    if (condition) {
      return (
        <Route
          exact={exact}
          key={path || Component.name}
          path={path}
          render={prop => {
            return <Component context={propContext} />;
          }}
        />
      );
    }
  };

  useEffect(() => {
    // 인사
    if (currentHouse) {
      greet(tempContext as any);
    }

    if (
      currentHouse &&
      localStorage.getItem("popUpAdditionalConfigModal") === "Y"
    ) {
      // get local storage default setting and
      additionalConfigModal.openModal();
      localStorage.setItem("popUpAdditionalConfigModal", "N");
    }
  });

  if (isLoading) {
    return (
      <Preloader
        wrapClassName="middlerServerLoading"
        page
        loading={isLoading}
      />
    );
  }

  // 🍰 메인리턴
  return (
    <div className={bookingHostClassNames}>
      <Fragment>
        <Helmet>
          <title>JANDA | {currentHouse?.name || "App"}</title>
        </Helmet>
        {/* 헤더 */}
        <Route
          render={props => {
            const propContext = Object.assign(tempContext, props, JDlang);
            return (
              <Fragment>
                <AddtionalConfigModal
                  context={propContext as any}
                  modalHook={additionalConfigModal}
                />
                <MemoAlertModal
                  context={propContext as any}
                  modalHook={memoAlertModal}
                />
                <Header
                  setSideNavIsOpen={setSideNavIsOpen}
                  sideNavIsOpen={sideNavIsOpen}
                  {...(props as any)}
                  context={propContext as any}
                />
              </Fragment>
            );
          }}
        />
        {/* 헤더아래 */}
        <div className="bookingHost__layout">
          {/* 사이드 네비 */}
          <div className="bookingHost__side">
            {houseExists && (
              <Route
                render={props => {
                  const propContext = Object.assign(tempContext, props, JDlang);
                  return (
                    <SideNav
                      context={propContext as any}
                      isOpen={sideNavIsOpen}
                      setIsOpen={setSideNavIsOpen}
                    />
                  );
                }}
              />
            )}
          </div>
          {/* 페이지  */}
          <div className="bookingHost__page">
            <Route path="/">
              {props => {
                const propContext = Object.assign(tempContext, props);
                return (
                  <Fragment>
                    <Switch>
                      {routers.map(router =>
                        renderRoute(propContext as any, router)
                      )}
                    </Switch>
                  </Fragment>
                );
              }}
            </Route>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default compose(
  graphql(GET_USER_INFO, {
    name: "GetUserInfo",
    skip: () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        return false;
      }
      return true;
    }
  })
)(JDbookingHost);
