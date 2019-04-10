/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import PT from 'prop-types';
import { Helmet } from 'react-helmet';
import Header from '../components/headers/HeaderWrap';
import SideNav from '../components/sideNav/SideNav';
import NoMatch from './NoMatch';
import { IS_LOGGED_IN, SELECTED_HOUSE } from '../clientQueries';
import { GET_USER_INFO } from '../queries';
import { useToggle } from '../actions/hook';
import { isEmpty } from '../utils/utils';
import Preloader from '../atoms/preloader/Preloader';
import {
  Products,
  Home,
  MakeHouse,
  PhoneVerification,
  MyPage,
  SignUp,
  Login,
  Ready,
  AssigTimeline,
  ModifyTimeline,
  SuperMain,
} from './pages';
import { UserRole } from '../types/apiEnum';

// TODO: protoTypes에 정의 옮기자
// lastSelectedHouse : 마지막으로 선택된 하우스 객체 정보값 파라미터에서만 사용합니다.
function JDmiddleServer({
  IsLoggedIn: {
    auth: { isLoggedIn },
    loading,
  },
  GetUserInfo: { GetMyProfile: { user = {} } = {}, loading: loading2 },
  selectedHouse: { auth: { lastSelectedHouse = {} } = {}, loading: loading3 = false } = {},
}: any) {
  //  유저 유저
  const [SideNavIsOpen, setSideNavIsOpen] = useToggle(false);
  const isloading = loading || loading2 || loading3;
  const houses = user.houses || [];
  let selectedHouse = houses.filter((house: { _id: any }): any => house._id === lastSelectedHouse.value)[0] || {};

  // 최근에 선택된 숙소가 없다면 선택된 숙소는 첫번째 숙소입니다.
  if (isEmpty(selectedHouse) && !isEmpty(houses)) [selectedHouse] = houses;

  const selectedProduct = selectedHouse.product || {};
  const { isPhoneVerified, userRole } = user;

  console.log(userRole);
  console.log(userRole);
  console.log(userRole);

  return isloading ? (
    <Preloader page />
  ) : (
    <Fragment>
      <Helmet>
        <title>JANDA | APP</title>
      </Helmet>
      {/* 헤더에 정보전달 */}
      <Route
        render={() => (
          // @ts-ignore
          <Header
            userInformation={user}
            isPhoneVerified={isPhoneVerified}
            lastSelectedHouse={selectedHouse}
            isLoggedIn={isLoggedIn}
            sideNavOpener={setSideNavIsOpen}
          />
        )}
      />
      {/* 사이드 네비게이션 */}
      <SideNav
        isOpen={SideNavIsOpen}
        selectedHouse={selectedHouse}
        selectedProduct={selectedProduct}
        userInformation={user}
        setIsOpen={setSideNavIsOpen}
      />
      <Switch>
        {/* TODO : 인덱스 1 , 2 통합방법 찾기 */}
        {/* 인덱스 */}
        <Route exact path="/">
          <Home
            selectedHouse={selectedHouse}
            houses={houses}
            selectedProduct={selectedProduct}
            isLoggedIn={isLoggedIn}
            isPhoneVerified={isPhoneVerified}
          />
        </Route>

        {/* 타임라인 */}
        <Route exact path="/middleServer/timeline" render={AssigTimeline} />
        <Route
          exact
          path="/middleServer/timelineConfig"
          render={() => (isEmpty(selectedHouse) ? <NoMatch /> : <ModifyTimeline selectedHouse={selectedHouse} />)}
        />
        {/* 인덱스2 */}
        <Route exact path="/middleServer">
          <Home
            selectedHouse={selectedHouse}
            houses={houses}
            selectedProduct={selectedProduct}
            isLoggedIn={isLoggedIn}
            isPhoneVerified={isPhoneVerified}
          />
        </Route>
        {/* 마이 페이지 */}
        <Route
          exact
          path="/middleServer/myPage"
          render={() => (isLoggedIn ? <MyPage userInformation={user} houses={houses} /> : <Login />)}
        />
        {/* 숙소생성 */}
        <Route exact path="/middleServer/makeHouse" component={isLoggedIn ? MakeHouse : Login} />
        {/* 상품선택 */}
        <Route
          exact
          path="/middleServer/products"
          render={() => (isLoggedIn ? (
            <Products
              isPhoneVerified={isPhoneVerified}
              selectedHouse={selectedHouse}
              currentProduct={selectedProduct}
            />
          ) : (
            <Login />
          ))
          }
        />
        {/* 인증 */}
        <Route exact path="/middleServer/phoneVerification" component={isLoggedIn ? PhoneVerification : undefined} />
        {/* 회원가입 */}
        <Route exact path="/middleServer/signUp" component={isLoggedIn ? undefined : SignUp} />
        {/* 회원가입 */}
        <Route exact path="/middleServer/login" component={isLoggedIn ? undefined : Login} />
        {/* 슈퍼관리자 */}
        <Route exact path="/middleServer/superAdmin" component={userRole === UserRole.ADMIN ? SuperMain : NoMatch} />

        {/* 대기 */}
        {isEmpty(selectedProduct) ? (
          <Route component={NoMatch} />
        ) : (
          <Route
            exact
            path="/middleServer/ready"
            render={() => (isLoggedIn ? <Ready currentProduct={selectedProduct} selectedHouse={selectedHouse} /> : <Login />)
            }
          />
        )}

        {/* 404 */}
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  );
}

JDmiddleServer.propTypes = {
  IsLoggedIn: PT.object,
  GetUserInfo: PT.object,
  selectedHouse: PT.object,
};

JDmiddleServer.defaultProps = {
  IsLoggedIn: {},
  GetUserInfo: {},
  selectedHouse: {},
};

//  how to branch query
// https://stackoverflow.com/questions/48880071/use-result-for-first-query-in-second-query-with-apollo-client
export default compose(
  graphql(IS_LOGGED_IN, { name: 'IsLoggedIn' }),
  graphql(GET_USER_INFO, {
    name: 'GetUserInfo',
    skip: ({ IsLoggedIn }: any) => {
      if (IsLoggedIn && IsLoggedIn.auth) {
        return !IsLoggedIn.auth.isLoggedIn;
      }
      return true;
    },
  }),
  graphql(SELECTED_HOUSE, { name: 'selectedHouse' }),
)(JDmiddleServer);
