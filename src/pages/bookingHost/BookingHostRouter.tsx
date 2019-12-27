/* eslint-disable react/forbid-prop-types */
import React, { Fragment, useEffect } from "react";
import { JDlang } from "../../langs/JDlang";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import { Helmet } from "react-helmet";
import Header from "../../components/headers/HeaderWrap";
import NoMatch from "../noMatch/NoMatch";
import { IS_LOGGED_IN, SELECTED_HOUSE } from "../../apollo/clientQueries";
import { GET_USER_INFO } from "../../apollo/queries";
import { isEmpty, s4, insideRedirect } from "../../utils/utils";
import Preloader from "../../atoms/preloader/Preloader";
import "./BookingHostRouter.scss";
import classnames from "classnames";
import {
  SelectProducts,
  CreateHouse,
  DashBoard,
  MyPage,
  SignUp,
  Login,
  AssigTimeline,
  SuperMain,
  SetPrice,
  Qna,
  DailyPrice,
  SmsTemplateSetting,
  ResvList,
  SmsHistory,
  Statistic,
  RoomConfig,
  ConfigWrap,
  HMconfig
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
import { useModal, useSideNav } from "../../hooks/hook";
import MemoAlertModal from "../../components/Memo/component/MemoAlertModal";
import JDoutdatedBrowserRework from "../../utils/oldBrowser";
import SideNav from "../../components/sideNav/SideNav";
import Expired from "../bookingHost/expire/Expired";
import StarterModalWrap from "../bookingHost/starterModal/StarterModalWrap";
import { AddtionalConfigModal } from "../../components/else/AdditionalConfigModal";
import { onError } from "apollo-link-error";
import { greet, houseConfigSetting } from "./helper";
import SmsInfo from "./smsInfo/SmsInfo";
import { Condition } from "../../components/pageBody/PageBody";

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
  IsLoggedIn: { auth, loading },
  GetUserInfo: {
    GetMyProfile: { user = DEFAULT_USER } = {},
    loading: loading2
  } = {},
  selectedHouse: { lastSelectedHouse, loading: loading3 },
  langHook
}) => {
  const isLogIn = auth?.isLogIn || false;
  const isLoading: boolean = loading || loading2 || loading3;
  const houses: IHouse[] = user.houses || [];
  const currentHouse = getCurrentHouse(houses, lastSelectedHouse);
  const memoAlertModal = useModal(false);
  const applyedProduct = currentHouse?.product;
  const { userRole } = user;
  // 추가적 설정 모달
  const additionalConfigModal = useModal(false);
  const { sideNavIsOpen, setSideNavIsOpen } = useSideNav();
  const houseConfig = houseConfigSetting(currentHouse);
  const doneBasicSetting = currentHouse?.completeDefaultSetting;
  const isExpired = applyedProduct?.isExpired;
  const superPermission =
    userRole === UserRole.ADMIN || userRole === UserRole.DEVELOPER;
  // 지원하지 않는 브라우저로 부터 접속했는지 확인합니다.
  JDoutdatedBrowserRework();
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
    "bookingHost--sideOpen": sideNavIsOpen && doneBasicSetting
  });

  const routers: JDRoute[] = [
    {
      Component: Login,
      condition: !isLogIn
    },
    {
      path: "/",
      Component: DashBoard,
      condition: doneBasicSetting
    },
    {
      path: "/dashboard",
      Component: DashBoard,
      condition: doneBasicSetting
    },
    {
      path: "/products",
      Component: SelectProducts,
      condition: doneBasicSetting
    },
    {
      path: "/myPage",
      Component: MyPage,
      condition: doneBasicSetting
    },
    {
      path: "/createHouse",
      Component: CreateHouse,
      condition: doneBasicSetting
    },
    {
      path: "/config",
      Component: ConfigWrap,
      condition: doneBasicSetting
    },
    {
      path: "/smsHistory",
      Component: SmsHistory,
      condition: doneBasicSetting
    },
    {
      path: "/smsInfo",
      Component: SmsInfo,
      condition: doneBasicSetting
    },
    {
      path: "/login",
      Component: Login,
      condition: true
    },
    {
      path: "/signUp",
      Component: SignUp,
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
      condition: doneBasicSetting
    },
    {
      Component: HMconfig,
      path: "/HMconfig",
      condition: doneBasicSetting
    },
    {
      Component: DailyPrice,
      path: "/dailyPrice",
      condition: doneBasicSetting
    },
    {
      Component: Statistic,
      path: "/statistic",
      condition: doneBasicSetting
    },
    {
      Component: RoomConfig,
      path: "/roomConfig",
      condition: doneBasicSetting
    },
    {
      Component: SmsTemplateSetting,
      path: "/smsTemplate",
      condition: doneBasicSetting
    },
    {
      Component: SetPrice,
      path: "/setPrice",
      condition: doneBasicSetting
    },
    {
      Component: ResvList,
      path: "/resvList",
      condition: doneBasicSetting
    },
    {
      Component: StarterModalWrap,
      path: undefined,
      condition: isLogIn && !doneBasicSetting
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
  });

  // 로딩처리
  if (isLoading)
    return (
      <Preloader
        wrapClassName="middlerServerLoading"
        page
        loading={isLoading}
      />
    );

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
            {doneBasicSetting && (
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
  graphql(IS_LOGGED_IN, { name: "IsLoggedIn" }),
  graphql(GET_USER_INFO, {
    name: "GetUserInfo",
    skip: ({ IsLoggedIn }: any) => {
      if (IsLoggedIn?.auth) {
        return !IsLoggedIn.auth.isLogIn;
      }
      return true;
    }
  }),
  graphql(SELECTED_HOUSE, {
    name: "selectedHouse"
  })
)(JDbookingHost);
