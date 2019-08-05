/* eslint-disable react/forbid-prop-types */
import React, {Fragment} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
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
  Home,
  MakeHouse,
  DashBoard,
  MyPage,
  SignUp,
  Login,
  Ready,
  AssigTimeline,
  ModifyTimeline,
  SuperMain,
  SetPrice,
  Qna,
  PriceTimeline,
  Sms,
  ResvList,
  SmsHistory
} from "./pages";
import {UserRole} from "../types/enum";
import {IHouse, IHouseConfigFull} from "../types/interface";
import ConfigWrap from "./middleServer/config/ConfigWrap";
import $ from "jquery";
import {DEFAULT_HOUSE_CONFIG, DEFAULT_SMS_TEMPLATE} from "../types/defaults";

interface IProps {
  GetUserInfo: any;
  selectedHouse: any;
  IsLoggedIn: any;
}

const JDmiddleServer: React.FC<IProps> = ({
  IsLoggedIn: {
    auth: {isLoggedIn},
    loading
  },
  GetUserInfo: {GetMyProfile: {user = {}} = {}, loading: loading2} = {},
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

  return (
    <Fragment>
      <Preloader
        wrapClassName="middlerServerLoading"
        page
        loading={isLoading}
      />
      <Helmet>
        <title>JANDA | APP</title>
      </Helmet>
      {/* 헤더 */}
      <Route
        render={() => (
          // @ts-ignore
          <Header
            user={user}
            isPhoneVerified={isPhoneVerified}
            selectedHouse={selectedHouse}
            isLoggedIn={isLoggedIn}
            applyedProduct={applyedProduct}
            houses={houses}
            profileImg={profileImg}
            isLoading={isLoading}
          />
        )}
      />

      {/* 라우팅 시작 */}
      <Switch>
        {/* 인덱스 */}
        {["/", "/middleServer", "dashBoard"].map(path => (
          <Route key={path} exact path={path}>
            {/* 대쉬보드 */}
            {isLoggedIn ? (
              <Route
                exact
                component={() => (
                  <DashBoard house={selectedHouse} userData={user} />
                )}
              />
            ) : (
              <Login />
            )}
          </Route>
        ))}
        {/* 마이 페이지 */}
        <Route
          exact
          path="/myPage"
          render={() =>
            isLoggedIn ? <MyPage userData={user} houses={houses} /> : <Login />
          }
        />
        {/* 숙소생성 */}
        <Route
          exact
          path="/makeHouse"
          component={isLoggedIn ? MakeHouse : Login}
        />
        {/* 숙소설정 */}
        <Route
          exact
          path="/config"
          render={() =>
            isLoggedIn ? <ConfigWrap house={selectedHouse} /> : <Login />
          }
        />
        {/* 상품선택 */}
        <Route
          exact
          path="/products"
          render={() =>
            isLoggedIn ? (
              <Products
                isPhoneVerified={isPhoneVerified}
                selectedHouse={selectedHouse}
                currentProduct={applyedProduct}
              />
            ) : (
              <Login />
            )
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
              isLoggedIn ? (
                <SmsHistory smsInfoId={selectedHouse.smsInfo._id} />
              ) : (
                <Login />
              )
            }
          />
        )}
        {/* 로그인 */}
        <Route exact path="/login" component={isLoggedIn ? undefined : Login} />
        {/* 슈퍼관리자 */}
        <Route
          exact
          path="/superAdmin"
          component={userRole === UserRole.ADMIN ? SuperMain : NoMatch}
        />
        {/* 고객문의 */}
        <Route exact path="/qna" component={isLoggedIn ? Qna : Login} />
        {/* 대기 */}
        {/* 여기이후로 상품이 있어야 나타날수있게 바뀜 */}
        {isEmpty(applyedProduct) ? (
          <Route component={NoMatch} />
        ) : (
          <Route
            exact
            path="/ready"
            render={() =>
              isLoggedIn ? (
                <Ready
                  hostApp={selectedHouse && selectedHouse.appInfo}
                  currentProduct={applyedProduct}
                  selectedHouse={selectedHouse}
                  user={user}
                />
              ) : (
                <Login />
              )
            }
          />
        )}
        {/* /* ------------------------------ JANDA BOOKING ----------------------------- */}{" "}
        {/* 방배정 */}
        <Route
          exact
          path="/assigTimeline"
          render={() => (
            <AssigTimeline
              house={selectedHouse}
              houseId={selectedHouse && selectedHouse._id}
            />
          )}
        />
        {/* 자세한 가격설정 */}
        <Route
          exact
          path="/specificPrice"
          render={() =>
            isEmpty(selectedHouse) ? (
              <NoMatch />
            ) : (
              <PriceTimeline houseId={selectedHouse && selectedHouse._id} />
            )
          }
        />
        {/* 방생성 */}
        <Route
          exact
          path="/timelineConfig"
          render={() =>
            isEmpty(selectedHouse) ? (
              <NoMatch />
            ) : (
              <ModifyTimeline houseId={selectedHouse && selectedHouse._id} />
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
              <Sms houseId={selectedHouse && selectedHouse._id} />
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
              <SetPrice selectedHouse={selectedHouse} />
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
              <ResvList houseId={selectedHouse._id} />
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
        return !IsLoggedIn.auth.isLoggedIn;
      }
      return true;
    }
  }),
  graphql(SELECTED_HOUSE, {
    name: "selectedHouse"
  })
)(JDmiddleServer);
