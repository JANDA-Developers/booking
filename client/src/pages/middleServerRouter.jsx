/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Header from '../components/headers/Header';
import SideNav from '../components/sideNav/SideNav';
import DynamicImport from '../utils/DynamicImport';
import NoMatch from './NoMatch';
import { IS_LOGGED_IN, GET_USER_INFO, SELECTED_HOUSE } from '../queries';
import { useToggle } from '../actions/hook';
import Preloader from '../atoms/preloader/Preloader';

function JDmiddleServer({
  IsLoggedIn: {
    auth: { isLoggedIn },
  },
  GetUserInfo: { GetMyProfile: { user } = {} } = {},
  lastSelectedHouse: { auth: { lastSelectedHouse } = {} } = {},
} = {}) {
  // 사이드바가 열렸는지 체크

  const houses = user && user.houses;

  const inLastSelectedHouse = {
    value: lastSelectedHouse.value,
    label: lastSelectedHouse.label,
  };

  console.log(inLastSelectedHouse);

  const verifiedPhone = user && user.verifiedPhone;

  const [SideNavIsOpen, setSideNavIsOpen] = useToggle(false);

  const Home = props => (
    <DynamicImport load={() => import('./middleServer/Home')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const MakeHouse = props => (
    <DynamicImport load={() => import('./middleServer/MakeHouse')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const Products = props => (
    <DynamicImport load={() => import('./middleServer/product/Products')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const PhoneVerification = props => (
    <DynamicImport load={() => import('./middleServer/PhoneVerification')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const MyPage = props => (
    <DynamicImport load={() => import('./middleServer/myPage/MyPage')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const SignUp = props => (
    <DynamicImport load={() => import('./middleServer/SignUp')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const Login = props => (
    <DynamicImport load={() => import('./middleServer/Login')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const Ready = props => (
    <DynamicImport load={() => import('./middleServer/Ready')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  return (
    <Fragment>
      {/* 헤더에 정보전달 */}
      <Route
        render={() => (
          <Header
            sideNavOpener={setSideNavIsOpen}
            userInformation={user}
            verifiedPhone={verifiedPhone}
            lastSelectedHouse={inLastSelectedHouse}
            isLoggedIn={isLoggedIn}
          />
        )}
      />
      {/* 사이드 네비게이션 */}
      <SideNav isOpen={SideNavIsOpen} userInformation={user} setIsOpen={setSideNavIsOpen} />
      <Switch>
        <Route exact path="/">
          <Home isLoggedIn={isLoggedIn} />
        </Route>
        <Route exact path="/middleServer">
          <Home isLoggedIn={isLoggedIn} />
        </Route>
        <Route
          exact
          path="/middleServer/myPage"
          children={isLoggedIn ? <MyPage userInformation={user} houses={houses} /> : Login}
        />
        <Route exact path="/middleServer/makeHouse" children={isLoggedIn ? MakeHouse : Login} />
        <Route
          exact
          path="/middleServer/products"
          children={isLoggedIn ? <Products selectedHouse={inLastSelectedHouse.value} /> : Login}
        />
        <Route exact path="/middleServer/phoneVerification" component={isLoggedIn ? PhoneVerification : undefined} />
        <Route exact path="/middleServer/signUp" component={isLoggedIn ? undefined : SignUp} />
        <Route exact path="/middleServer/login" component={isLoggedIn ? undefined : Login} />
        <Route exact path="/middleServer/ready" component={isLoggedIn ? Ready : Login} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  );
}

//  how to branch query
// https://stackoverflow.com/questions/48880071/use-result-for-first-query-in-second-query-with-apollo-client
export default compose(
  graphql(SELECTED_HOUSE, { name: 'lastSelectedHouse' }),
  graphql(IS_LOGGED_IN, { name: 'IsLoggedIn' }),
  graphql(GET_USER_INFO, {
    name: 'GetUserInfo',
    skip: ({ IsLoggedIn }) => {
      if (IsLoggedIn && IsLoggedIn.auth) {
        return !IsLoggedIn.auth.isLoggedIn;
      }
      return true;
    },
  }),
)(JDmiddleServer);
