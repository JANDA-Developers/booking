/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Header from '../components/Headers/Header';
import SideNav from '../components/sideNav/SideNav';
import DynamicImport from '../utils/DynamicImport';
import NoMatch from './NoMatch';
import { IS_LOGGED_IN, GET_USER_INFO } from '../queries';
import { useToggle } from '../actions/hook';

function JDmiddleServer({
  IsLoggedIn: {
    auth: { isLoggedIn },
  },
  GetUserInfo: { GetMyProfile: { user: { verifiedPhone = false } = {} } = {} } = {},
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
      <Route
        render={() => (
          <Header
            sideNavOpener={setSideNavIsOpen}
            verifiedPhone={verifiedPhone}
            isLoggin={isLoggedIn}
          />
        )}
      />
      <SideNav isOpen={SideNavIsOpen} setIsOpen={setSideNavIsOpen} />
      <Switch>
        {isLoggedIn ? (
          <Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/middleServer/myPage" component={isLoggedIn ? MyPage : Login} />
            <Route
              exact
              path="/middleServer/phoneVerification"
              component={isLoggedIn ? PhoneVerification : Login}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Redirect />
            <Route exact path="/middleServer/signUp" component={SignUp} />
            <Route exact path="/middleServer/login" component={Login} />
            <Route component={NoMatch} />
          </Fragment>
        )}
      </Switch>
    </Fragment>
  );
}

export default compose(
  graphql(IS_LOGGED_IN, { name: 'IsLoggedIn' }),
  graphql(GET_USER_INFO, { name: 'GetUserInfo' }),
)(JDmiddleServer);
