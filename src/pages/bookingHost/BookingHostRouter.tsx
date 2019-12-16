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
  const { isLogIn } = auth || {
    isLogIn: false
  };
  const isLoading: boolean = loading || loading2 || loading3;
  const houses: IHouse[] = user.houses || [];
  const currentHouse = getCurrentHouse(houses, lastSelectedHouse);
  const memoAlertModal = useModal(false);
  const applyedProduct = (currentHouse && currentHouse.product) || undefined;
  const { userRole } = user;
  // 추가적 설정 모달
  const additionalConfigModal = useModal(false);
  const { sideNavIsOpen, setSideNavIsOpen } = useSideNav();
  const houseConfig = houseConfigSetting(currentHouse);

  const callBackStartStepEnd = () => {
    additionalConfigModal.openModal();
  };

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

  useEffect(() => {
    // 예절인사
    if (currentHouse) {
      greet(tempContext as any);
    }
    //
    if (applyedProduct) {
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

  const bookingHostClassNames = classnames("bookingHost", undefined, {
    "bookingHost--sideOpen":
      sideNavIsOpen && currentHouse && currentHouse.completeDefaultSetting
  });

  // 🍰 메인리턴
  return (
    <div className={bookingHostClassNames}>
      <Fragment>
        <Helmet>
          <title>
            JANDA | {currentHouse ? `${currentHouse.name}` : "App"}{" "}
          </title>
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
            {currentHouse && currentHouse.completeDefaultSetting && (
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
          {/* 페이지 라우팅 시작 */}
          <div className="bookingHost__page">
            {/* 인덱스 페이지 */}
            <Route path="/">
              {props => {
                const propContext = Object.assign(tempContext, props);
                return isLogIn ? (
                  <Fragment>
                    <Switch>
                      {/* 여기부터는 생성된 하우스가 있어야 접근가능 */}
                      {currentHouse && currentHouse.completeDefaultSetting ? (
                        <Switch>
                          {/* 슈퍼관리자 */}
                          {/* 고객문의 */}
                          {/* <Route exact path="/qna" component={Qna} /> */}
                          <Route
                            exact
                            path="/superAdmin"
                            render={() => {
                              return userRole === UserRole.ADMIN ||
                                userRole === UserRole.DEVELOPER ? (
                                <SuperMain context={propContext} />
                              ) : (
                                <NoMatch context={propContext as any} />
                              );
                            }}
                          />
                          {/* 만료기간이 지났다면*/}
                          {applyedProduct!.daysLeftToExpire < 1 && (
                            <Route component={Expired} />
                          )}
                          {/* 대쉬보드 */}
                          <Route
                            exact
                            path="/dashboard"
                            render={prop => {
                              return <DashBoard context={propContext} />;
                            }}
                          />
                          {/* 대쉬보드 리다이렉트*/}
                          <Route
                            exact
                            path="/"
                            render={prop => {
                              location.href = insideRedirect("dashboard");
                              return <DashBoard context={propContext} />;
                            }}
                          />
                          {/* 상품선택 */}
                          <Route
                            exact
                            path="/products"
                            render={prop => {
                              return <SelectProducts context={propContext} />;
                            }}
                          />
                          {/* 마이 페이지 */}
                          <Route
                            exact
                            path="/myPage"
                            render={prop => {
                              return <MyPage context={propContext} />;
                            }}
                          />
                          {/* 숙소생성 */}
                          <Route
                            exact
                            path="/createHouse"
                            render={(prop: any) => {
                              return (
                                <CreateHouse context={propContext} {...prop} />
                              );
                            }}
                          />
                          {/* 숙소설정 */}
                          <Route
                            exact
                            path="/config"
                            render={props => {
                              return <ConfigWrap context={propContext} />;
                            }}
                          />
                          {/* SMS 히스토리 */}
                          <Route
                            exact
                            path="/smsHistory"
                            render={props => {
                              return (
                                <SmsHistory
                                  smsInfoId={currentHouse.smsInfo._id}
                                />
                              );
                            }}
                          />
                          {/* SMS 히스토리 */}
                          <Route
                            exact
                            path="/smsInfo"
                            render={props => {
                              return <SmsInfo context={propContext as any} />;
                            }}
                          />
                          {/* 로그인 */}
                          <Route
                            exact
                            path="/login"
                            render={() => {
                              return <Login context={propContext} />;
                            }}
                          />
                          {/* 여기이후로 상품이 있어야 접근가능 */}
                          {/* 적용된 상품이 없다면 */}
                          {isEmpty(applyedProduct) && (
                            <Route component={NoMatch} />
                          )}
                          {/* /* ------------------------------ JANDA BOOKING ----------------------------- */}{" "}
                          {/* 방배정 */}
                          <Route
                            exact
                            path="/assigTimeline"
                            render={props => {
                              return <AssigTimeline context={propContext} />;
                            }}
                          />
                          {/* 하우스 메뉴얼 */}
                          <Route
                            exact
                            path="/HMconfig"
                            render={() => {
                              return <HMconfig context={propContext} />;
                            }}
                          />
                          {/* 자세한 가격설정 */}
                          <Route
                            exact
                            path="/dailyPrice"
                            render={() => {
                              return <DailyPrice context={propContext} />;
                            }}
                          />
                          {/* 통계 */}
                          <Route
                            exact
                            path="/statistic"
                            render={() => {
                              return <Statistic context={propContext} />;
                            }}
                          />
                          {/* 방생성 */}
                          <Route
                            exact
                            path="/roomConfig/:withGuid?"
                            render={prop => {
                              return (
                                <RoomConfig {...prop} context={propContext} />
                              );
                            }}
                          />
                          {/* SMS */}
                          <Route
                            exact
                            path="/smsTemplate"
                            render={() => {
                              return (
                                <SmsTemplateSetting context={propContext} />
                              );
                            }}
                          />
                          {/* 가격설정 */}
                          <Route
                            exact
                            path="/setPrice"
                            render={() => {
                              return <SetPrice context={propContext} />;
                            }}
                          />
                          {/* 예약목록 */}
                          <Route
                            exact
                            path="/resvList"
                            render={() => {
                              return <ResvList context={propContext} />;
                            }}
                          />
                          <Route component={NoMatch} />
                        </Switch>
                      ) : (
                        <div className="bookingHost__starterBg">
                          <StarterModalWrap
                            key={s4()}
                            context={propContext as any}
                            callBackStartStepEnd={callBackStartStepEnd}
                          />
                        </div>
                      )}
                      <Route component={NoMatch} />
                    </Switch>
                  </Fragment>
                ) : (
                  // 로그인 안했을때만
                  <Switch>
                    <Route
                      exact
                      path="/signUp"
                      render={() => {
                        return <SignUp context={propContext} />;
                      }}
                    />
                    <Login context={propContext} />
                  </Switch>
                );
              }}
            </Route>
            {/* ↓ loayout page */}
          </div>
          {/* ↓ loayout Close */}
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
      if (IsLoggedIn && IsLoggedIn.auth) {
        return !IsLoggedIn.auth.isLogIn;
      }
      return true;
    }
  }),
  graphql(SELECTED_HOUSE, {
    name: "selectedHouse"
  })
)(JDbookingHost);
