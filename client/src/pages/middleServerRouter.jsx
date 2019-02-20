/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Header from '../components/Headers/Header';
import SideNav from '../components/sideNav/SideNav';
import DynamicImport from '../utils/DynamicImport';
import NoMatch from './NoMatch';
import { IS_LOGGED_IN } from '../queries';
import { useToggle } from '../actions/hook';

function JDmiddleServer({
  data: {
    auth: { isLoggedIn },
  },
}) {
  // 사이드바가 열렸는지 체크
  const [SideNavIsOpen, setSideNavIsOpen] = useToggle(false);

  const Home = props => (
    <DynamicImport load={() => import('./middleServer/Home')}>
      {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const PhoneVerification = props => (
    <DynamicImport load={() => import('./middleServer/PhoneVerification')}>
      {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const MyPage = props => (
    <DynamicImport load={() => import('./middleServer/Mypage')}>
      {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const SignUp = props => (
    <DynamicImport load={() => import('./middleServer/SignUp')}>
      {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const Login = props => (
    <DynamicImport load={() => import('./middleServer/Login')}>
      {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  return (
    <Fragment>
      <Route render={() => <Header sideNavOpener={setSideNavIsOpen} isLoggin={isLoggedIn} />} />
      <SideNav isOpen={SideNavIsOpen} setIsOpen={setSideNavIsOpen} />
      <Switch>
        {/* 토큰필요 */}
        <Route exact path="/" component={isLoggedIn ? Home : Login} />
        <Route exact path="/middleServer/myPage" component={isLoggedIn ? MyPage : Login} />
        <Route
          exact
          path="/middleServer/phoneVerification/:phoneNumber"
          component={isLoggedIn ? PhoneVerification : Login}
        />

        {/* 토큰필요 없음 */}
        <Route exact path="/middleServer/signUp" component={SignUp} />
        <Route exact path="/middleServer/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  );
}

export default graphql(IS_LOGGED_IN)(JDmiddleServer);
