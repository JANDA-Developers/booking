/* eslint-disable react/forbid-prop-types */
import React, {Fragment, useEffect} from "react";
import {Route, Switch, RouteComponentProps} from "react-router-dom";
import {graphql, compose} from "react-apollo";
import {Helmet} from "react-helmet";
import Header from "../components/headers/HeaderWrap";
import NoMatch from "./noMatch/NoMatch";
import {IS_LOGGED_IN, SELECTED_HOUSE} from "../clientQueries";
import {GET_USER_INFO} from "../queries";
import {isEmpty} from "../utils/utils";
import Preloader from "../atoms/preloader/Preloader";
import {
  SelectProducts,
  CreateHouse,
  DashBoard,
  MyPage,
  SignUp,
  Login,
  Ready,
  AssigTimeline,
  SuperMain,
  SetPrice,
  Qna,
  DailyPrice,
  Sms,
  ResvList,
  SmsHistory,
  Statistic,
  RoomConfig,
  ConfigWrap,
  HMconfig
} from "./pages";
import {UserRole} from "../types/enum";
import {IHouse, IHouseConfigFull} from "../types/interface";
import {DEFAUT_USER} from "../types/defaults";
import {
  getMyProfile_GetMyProfile_user,
  getMyProfile_GetMyProfile_user_houses_product
} from "../types/api";
import {setCookie} from "../utils/cookies";
import greet from "../utils/greet";
import getCurrentHouse from "../utils/getLastSelectHouse";
import houseConfigSetting from "../utils/houseConfigSetting";
import alertMemo from "../utils/alertMemo";
import {useModal} from "../hooks/hook";
import MemoAlertModal from "../components/Memo/component/MemoAlertModal";
import JDoutdatedBrowserRework from "../utils/oldBrowser";

export interface IContext extends RouteComponentProps<any> {
  user: getMyProfile_GetMyProfile_user;
  isLogIn: boolean;
  house: IHouse;
  houseConfig: IHouseConfigFull;
  applyedProduct: getMyProfile_GetMyProfile_user_houses_product | undefined;
  houses: IHouse[];
}

interface IProps {
  GetUserInfo: any;
  selectedHouse: any;
  IsLoggedIn: any;
}

const JDmiddleServer: React.FC<IProps> = ({
  IsLoggedIn: {
    auth: {isLogIn},
    loading
  },
  GetUserInfo: {
    GetMyProfile: {user = DEFAUT_USER} = {},
    loading: loading2
  } = {},
  selectedHouse: {lastSelectedHouse, loading: loading3}
}) => {
  const isLoading: boolean = loading || loading2 || loading3;
  const houses: IHouse[] = user.houses || [];
  const currentHouse = getCurrentHouse(houses, lastSelectedHouse);
  const memoAlertModal = useModal(false);
  const applyedProduct = (currentHouse && currentHouse.product) || undefined;
  const {userRole} = user;
  const houseConfig = houseConfigSetting(currentHouse);

  // 지원하지 않는 브라우저로 부터 접속했는지 확인합니다.
  JDoutdatedBrowserRework();

  // 디벨롭을 도와줌
  if (userRole === "DEVELOPER") setCookie("isDeveloper", "Y", 1);

  // TODO  전부 context로 벼환
  const context = {
    user,
    isLogIn,
    house: currentHouse,
    houseConfig,
    applyedProduct,
    houses
  };

  useEffect(() => {
    if (currentHouse) {
      greet(context as any);
    }
    if (applyedProduct) {
      greet(context as any);
    }
  });

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
    <Fragment>
      <Helmet>
        <title>JANDA | {currentHouse ? `${currentHouse.name}` : "App"} </title>
      </Helmet>
      {/* 헤더 */}
      <Route
        render={props => {
          const propContext = Object.assign(context, props);
          return (
            <Fragment>
              <MemoAlertModal
                context={context as any}
                modalHook={memoAlertModal}
              />
              <Header {...(props as any)} context={propContext as any} />
            </Fragment>
          );
        }}
      />

      {/* 라우팅 시작 */}
      {/* 인덱스 */}
      <Route path="/">
        {routProps => {
          const contextWithRotuer = Object.assign(context, routProps);
          return isLogIn ? (
            <Fragment>
              <Switch>
                {["/", "/dashboard"].map(path => (
                  <Route
                    exact
                    key={path}
                    path={path}
                    render={() => <DashBoard context={contextWithRotuer} />}
                  />
                ))}
                {currentHouse && (
                  <Fragment>
                    {/* 마이 페이지 */}
                    <Route
                      exact
                      path="/myPage"
                      render={prop => <MyPage context={contextWithRotuer} />}
                    />
                    {/* 숙소생성 */}
                    <Route
                      exact
                      path="/createHouse"
                      render={(prop: any) => (
                        <CreateHouse context={contextWithRotuer} {...prop} />
                      )}
                    />
                    {/* 숙소설정 */}
                    <Route
                      exact
                      path="/config"
                      render={props => (
                        <ConfigWrap context={contextWithRotuer} />
                      )}
                    />
                    {/* 상품선택 */}
                    <Route
                      exact
                      path="/products"
                      render={prop => (
                        <SelectProducts context={contextWithRotuer} />
                      )}
                    />
                    {/* SMS 히스토리 */}
                    <Route
                      exact
                      path="/smsHistory"
                      render={props => (
                        <SmsHistory smsInfoId={currentHouse.smsInfo._id} />
                      )}
                    />
                    {/* 로그인 */}
                    <Route
                      exact
                      path="/login"
                      render={() => <Login context={contextWithRotuer} />}
                    />
                    {/* 슈퍼관리자 */}
                    <Route
                      exact
                      path="/superAdmin"
                      render={() =>
                        userRole === UserRole.ADMIN ||
                        userRole === UserRole.DEVELOPER ? (
                          <SuperMain context={contextWithRotuer} />
                        ) : (
                          <NoMatch />
                        )
                      }
                    />
                    {/* 고객문의 */}
                    <Route exact path="/qna" component={Qna} />
                    {/* 대기 */}
                    {/* 여기이후로 상품이 있어야 나타날수있게 바뀜 */}
                    {isEmpty(applyedProduct) ? (
                      <Route component={NoMatch} />
                    ) : (
                      <Route
                        exact
                        path="/ready"
                        render={() => <Ready context={context} />}
                      />
                    )}
                    {/* /* ------------------------------ JANDA BOOKING ----------------------------- */}{" "}
                    {/* 방배정 */}
                    <Route
                      exact
                      path="/assigTimeline"
                      render={props => (
                        <AssigTimeline context={contextWithRotuer} />
                      )}
                    />
                    {/* 하우스 메뉴얼 */}
                    <Route
                      exact
                      path="/HMconfig"
                      render={() => <HMconfig context={contextWithRotuer} />}
                    />
                    {/* 자세한 가격설정 */}
                    <Route
                      exact
                      path="/dailyPrice"
                      render={() => <DailyPrice context={contextWithRotuer} />}
                    />
                    {/* 통계 */}
                    <Route
                      exact
                      path="/statistic"
                      render={() => <Statistic context={contextWithRotuer} />}
                    />
                    {/* 방생성 */}
                    <Route
                      exact
                      path="/roomConfig/:withGuid?"
                      render={prop => (
                        <RoomConfig {...prop} context={contextWithRotuer} />
                      )}
                    />
                    {/* SMS */}
                    <Route
                      exact
                      path="/sms"
                      render={() => <Sms context={contextWithRotuer} />}
                    />
                    {/* 가격설정 */}
                    <Route
                      exact
                      path="/setPrice"
                      render={() => <SetPrice context={contextWithRotuer} />}
                    />
                    {/* 예약목록 */}
                    <Route
                      exact
                      path="/resvList"
                      render={() => <ResvList context={contextWithRotuer} />}
                    />
                  </Fragment>
                )}
                <Route component={NoMatch} />
              </Switch>
            </Fragment>
          ) : (
            <Switch>
              <Route exact path="/signUp" component={SignUp} />
              <Login context={contextWithRotuer} />
            </Switch>
          );
        }}
      </Route>
    </Fragment>
  );
};

export default compose(
  graphql(IS_LOGGED_IN, {name: "IsLoggedIn"}),
  graphql(GET_USER_INFO, {
    name: "GetUserInfo",
    skip: ({IsLoggedIn}: any) => {
      if (IsLoggedIn && IsLoggedIn.auth) {
        return !IsLoggedIn.auth.isLogIn;
      }
      return true;
    }
  }),
  graphql(SELECTED_HOUSE, {
    name: "selectedHouse"
  })
)(JDmiddleServer);
