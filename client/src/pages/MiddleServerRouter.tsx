/* eslint-disable react/forbid-prop-types */
import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {graphql, compose} from "react-apollo";
import {Helmet} from "react-helmet";
import Header from "../components/headers/HeaderWrap";
import SideNav from "../components/sideNav/SideNav";
import NoMatch from "./NoMatch";
import {IS_LOGGED_IN, SELECTED_HOUSE} from "../clientQueries";
import {GET_USER_INFO} from "../queries";
import {useToggle} from "../actions/hook";
import {isEmpty} from "../utils/utils";
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
  ResvList
} from "./pages";
import {UserRole} from "../types/enum";
import {IHouse} from "../types/interface";
import ConfigWrap from "./middleServer/config/ConfigWrap";

//👿 [https://reactjs-kr.firebaseapp.com/docs/context.html] 사용 비권장
// const JDcontext = React.createContext({houseId: "", ()=>{}});

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
  selectedHouse: {
    auth: {lastSelectedHouse = {}} = {},
    loading: loading3 = false
  } = {}
}) => {
  const [sideNavIsOpen, setSideNavIsOpen] = useToggle(false);
  const isloading: boolean = loading || loading2 || loading3;
  const houses: IHouse[] = user.houses || [];

  console.log("lastSelectedHouse");
  console.log(lastSelectedHouse);
  console.log(lastSelectedHouse);
  let selectedHouse = houses.find(
    house => house._id === lastSelectedHouse.value
  );

  // 최근에 선택된 숙소가 없다면 선택된 숙소는 첫번째 숙소입니다.
  if (!selectedHouse && !isEmpty(houses)) [selectedHouse] = houses;

  const applyedProduct = (selectedHouse && selectedHouse.product) || undefined;
  const {isPhoneVerified, userRole, profileImg} = user;

  //❓ houseId 같은건 Context로 전달하는게 옳을것인가? https://reactjs.org/docs/context.html
  return isloading ? (
    <Preloader page />
  ) : (
    <Fragment>
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
            sideNavOpener={setSideNavIsOpen}
            houses={houses}
            profileImg={profileImg}
          />
        )}
      />
      {/* 사이드 네비 */}
      <SideNav
        isOpen={sideNavIsOpen}
        selectedHouse={selectedHouse}
        applyedProduct={applyedProduct}
        userInformation={user}
        setIsOpen={setSideNavIsOpen}
        houses={houses}
        profileImg={profileImg}
      />
      {/* 라우팅 시작 */}
      <Switch>
        {/* 인덱스 */}
        {["/", "/middleServer"].map(path => (
          <Route key={path} exact path={path}>
            <Home
              selectedHouse={selectedHouse}
              houses={houses}
              applyedProduct={applyedProduct}
              isLoggedIn={isLoggedIn}
              isPhoneVerified={isPhoneVerified}
            />
          </Route>
        ))}
        {/* 마이 페이지 */}
        <Route
          exact
          path="/middleServer/myPage"
          render={() =>
            isLoggedIn ? <MyPage userData={user} houses={houses} /> : <Login />
          }
        />
        {/* 숙소생성 */}
        <Route
          exact
          path="/middleServer/makeHouse"
          component={isLoggedIn ? MakeHouse : Login}
        />
        {/* 숙소설정 */}
        <Route
          exact
          path="/middleServer/config"
          component={isLoggedIn ? ConfigWrap : Login}
        />
        {/* 대쉬보드 */}
        <Route
          exact
          path="/middleServer/dashBoard"
          component={() => <DashBoard userData={user} />}
        />
        {/* 상품선택 */}
        <Route
          exact
          path="/middleServer/products"
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
        <Route
          exact
          path="/middleServer/signUp"
          component={isLoggedIn ? undefined : SignUp}
        />
        {/* 회원가입 */}
        <Route
          exact
          path="/middleServer/login"
          component={isLoggedIn ? undefined : Login}
        />
        {/* 슈퍼관리자 */}
        <Route
          exact
          path="/middleServer/superAdmin"
          component={userRole === UserRole.ADMIN ? SuperMain : NoMatch}
        />
        {/* 고객문의 */}
        <Route
          exact
          path="/middleServer/qna"
          component={isLoggedIn ? Qna : Login}
        />
        {/* 대기 */}
        {/* 여기이후로 상품이 있어야 나타날수있게 바뀜 */}
        {isEmpty(applyedProduct) ? (
          <Route component={NoMatch} />
        ) : (
          <Route
            exact
            path="/middleServer/ready"
            render={() =>
              isLoggedIn ? (
                <Ready
                  hostApp={selectedHouse && selectedHouse.hostApplication}
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
          path="/middleServer/assigTimeline"
          render={() => (
            <AssigTimeline houseId={selectedHouse && selectedHouse._id} />
          )}
        />
        {/* 자세한 가격설정 */}
        <Route
          exact
          path="/middleServer/specificPrice"
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
          path="/middleServer/timelineConfig"
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
          path="/middleServer/sms"
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
          path="/middleServer/setPrice"
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
          path="/middleServer/resvList"
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

//  how to branch query
// https://stackoverflow.com/questions/48880071/use-result-for-first-query-in-second-query-with-apollo-client
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
  graphql(SELECTED_HOUSE, {name: "selectedHouse"})
)(JDmiddleServer);
