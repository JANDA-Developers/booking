/* eslint-disable react/forbid-prop-types */
import React, {Fragment} from "react";
import {Route, Switch, Redirect, RouteComponentProps} from "react-router-dom";
import {graphql, compose} from "react-apollo";
import {Helmet} from "react-helmet";
import Header from "../components/headers/HeaderWrap";
import SideNav from "../components/sideNav/SideNav";
import NoMatch from "./noMatch/NoMatch";
import {IS_LOGGED_IN, SELECTED_HOUSE} from "../clientQueries";
import {GET_USER_INFO} from "../queries";
import {useToggle} from "../actions/hook";
import {isEmpty, mergeObject, removeNullOfObject} from "../utils/utils";
import Preloader from "../atoms/preloader/Preloader";
import {
  Products,
  MakeHouse,
  DashBoard,
  MyPage,
  SignUp,
  Login,
  Ready,
  AssigTimeline,
  SuperMain,
  SetPrice,
  Qna,
  PriceTimeline,
  Sms,
  ResvList,
  SmsHistory,
  Statistic,
  RoomConfig,
  ConfigWrap,
  HouseManualConfig
} from "./pages";
import {UserRole} from "../types/enum";
import {IHouse, IHouseConfigFull} from "../types/interface";
import $ from "jquery";
import {
  DEFAULT_HOUSE_CONFIG,
  DEFAULT_SMS_TEMPLATE,
  DEFAULT_USER
} from "../types/defaults";
import {
  getMyProfile_GetMyProfile_user,
  getMyProfile_GetMyProfile_user_houses_product
} from "../types/api";
import {setCookie} from "../utils/cookies";

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
    GetMyProfile: {user = DEFAULT_USER} = {},
    loading: loading2
  } = {},
  selectedHouse: {lastSelectedHouse: tempLastSelectedHouse, loading: loading3}
}) => {
  const isLoading: boolean = loading || loading2 || loading3;
  const houses: IHouse[] = user.houses || [];

  // 마지막으로 선택한 하우스
  const lastSelectedHouse = houses.find(
    house => house._id === tempLastSelectedHouse.value
  );

  // 마지막으로 선택한 하우스 또는 첫번째 하우스
  let selectedHouse = lastSelectedHouse || houses[0];

  // 최근에 선택된 숙소가 없다면 선택된 숙소는 첫번째 숙소입니다.
  if (!selectedHouse && !isEmpty(houses)) [selectedHouse] = houses;

  const applyedProduct = (selectedHouse && selectedHouse.product) || undefined;
  const {isPhoneVerified, userRole, profileImg} = user;

  // 디벨롭을 도와줌
  if (userRole === "DEVELOPER") setCookie("isDeveloper", "Y", 1);

  // houseConfig Null 제거
  // default를 관리해주어라
  let houseConfig = DEFAULT_HOUSE_CONFIG;
  if (selectedHouse) {
    removeNullOfObject(selectedHouse.houseConfig);
    houseConfig = mergeObject<IHouseConfigFull>(
      DEFAULT_HOUSE_CONFIG,
      selectedHouse.houseConfig
    );
    selectedHouse.houseConfig = houseConfig;
  }

  // TODO  전부 context로 벼환
  const context = {
    user,
    isLogIn,
    house: selectedHouse,
    houseConfig,
    applyedProduct,
    houses
  };
  const sharedComponentProps = {
    context
  };

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
        <title>
          JANDA | {selectedHouse ? `${selectedHouse.name}🏠` : "App"}{" "}
        </title>
      </Helmet>
      {/* 헤더 */}
      <Route
        render={props => {
          const propContext = Object.assign(context, props);
          // @ts-ignore
          return <Header context={propContext} />;
        }}
      />

      {/* 라우팅 시작 */}
      <Switch>
        {/* 인덱스 */}
        {["/", "/middleServer", "dashBoard"].map(path => (
          <Route
            key={path}
            exact
            path={path}
            render={props => {
              const contextWithRotuer = Object.assign(context, props);
              return isLogIn ? (
                <Route
                  exact
                  component={() => <DashBoard context={contextWithRotuer} />}
                />
              ) : (
                <Login />
              );
            }}
          />
        ))}
        {/* 마이 페이지 */}
        <Route
          exact
          path="/myPage"
          render={() =>
            isLogIn ? <MyPage {...sharedComponentProps} /> : <Login />
          }
        />
        {/* 숙소생성 */}
        <Route
          exact
          path="/makeHouse"
          component={isLogIn ? MakeHouse : Login}
        />
        {/* 숙소설정 */}
        <Route
          exact
          path="/config"
          render={props =>
            isLogIn ? <ConfigWrap {...sharedComponentProps} /> : <Login />
          }
        />
        {/* 상품선택 */}
        <Route
          exact
          path="/products"
          render={() =>
            isLogIn ? <Products {...sharedComponentProps} /> : <Login />
          }
        />
        {/* 회원가입 */}
        <Route exact path="/signUp" component={SignUp} />
        {/* SMS 히스토리 */}
        {selectedHouse && (
          <Route
            exact
            path="/smsHistory"
            render={() =>
              isLogIn ? (
                <SmsHistory smsInfoId={selectedHouse.smsInfo._id} />
              ) : (
                <Login />
              )
            }
          />
        )}
        {/* 로그인 */}
        <Route exact path="/login" component={isLogIn ? undefined : Login} />
        {/* 슈퍼관리자 */}
        <Route
          exact
          path="/superAdmin"
          render={() =>
            userRole === UserRole.ADMIN ? (
              <SuperMain context={context} />
            ) : (
              <NoMatch />
            )
          }
        />
        {/* 고객문의 */}
        <Route exact path="/qna" component={isLogIn ? Qna : Login} />
        {/* 대기 */}
        {/* 여기이후로 상품이 있어야 나타날수있게 바뀜 */}
        {isEmpty(applyedProduct) ? (
          <Route component={NoMatch} />
        ) : (
          <Route
            exact
            path="/ready"
            render={() => {
              return isLogIn ? <Ready context={context} /> : <Login />;
            }}
          />
        )}
        {/* /* ------------------------------ JANDA BOOKING ----------------------------- */}{" "}
        {/* 방배정 */}
        <Route
          exact
          path="/assigTimeline"
          render={props => {
            const propContext = Object.assign(context, props);
            return <AssigTimeline context={propContext} />;
          }}
        />
        {/* 하우스 메뉴얼 */}
        <Route
          exact
          path="/houseManualConfig"
          render={() => <HouseManualConfig {...sharedComponentProps} />}
        />
        {/* 자세한 가격설정 */}
        <Route
          exact
          path="/specificPrice"
          render={() =>
            isEmpty(selectedHouse) ? (
              <NoMatch />
            ) : (
              <PriceTimeline {...sharedComponentProps} />
            )
          }
        />
        {/* 통계 */}
        <Route
          exact
          path="/statistic"
          render={() =>
            isEmpty(selectedHouse) ? (
              <NoMatch />
            ) : (
              <Statistic {...sharedComponentProps} />
            )
          }
        />
        {/* 방생성 */}
        <Route
          exact
          path="/roomConfig/:withGuid?"
          render={prop =>
            isEmpty(selectedHouse) ? (
              <NoMatch />
            ) : (
              <RoomConfig {...prop} {...sharedComponentProps} />
            )
          }
        />
        {/* SMS */}
        <Route
          exact
          path="/sms"
          render={() =>
            isEmpty(selectedHouse) ? (
              <NoMatch />
            ) : (
              <Sms {...sharedComponentProps} />
            )
          }
        />
        {/* 가격설정 */}
        <Route
          exact
          path="/setPrice"
          render={() =>
            isEmpty(selectedHouse) ? (
              <NoMatch />
            ) : (
              <SetPrice {...sharedComponentProps} />
            )
          }
        />
        {/* 예약목록 */}
        <Route
          exact
          path="/resvList"
          render={() =>
            isEmpty(selectedHouse) ? (
              <NoMatch />
            ) : (
              <ResvList {...sharedComponentProps} />
            )
          }
        />
        <Route component={NoMatch} />
      </Switch>
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
