/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import Header from '../components/Headers/Header';
import SideNav from '../components/sideNav/SideNav';
import DynamicImport from '../utils/DynamicImport';
import NoMatch from './NoMatch';
import { IS_LOGGED_IN, GET_USER_INFO } from '../queries';
import { useToggle } from '../actions/hook';
import Preloader from '../atoms/Preloader';

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
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const MakeHouse = props => (
    <DynamicImport load={() => import('./middleServer/MakeHouse')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const PhoneVerification = props => (
    <DynamicImport load={() => import('./middleServer/PhoneVerification')}>
      {DNcompoent => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
    </DynamicImport>
  );

  const MyPage = props => (
    <DynamicImport load={() => import('./middleServer/Mypage')}>
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

  return (
    <Fragment>
      {/* 헤더에 정보전달 */}
      <Route
        render={() => <Header sideNavOpener={setSideNavIsOpen} verifiedPhone={verifiedPhone} isLoggin={isLoggedIn} />}
      />
      {/* 사이드 네비게이션 */}
      <SideNav isOpen={SideNavIsOpen} setIsOpen={setSideNavIsOpen} />
      {isLoggedIn ? (
        // 로그인후 라운터
        <Switch>
          <Route exact path="/">
            <Home isLoggin={isLoggedIn} />
          </Route>
          <Route exact path="/middleServer" component={Home} />
          <Route exact path="/middleServer/myPage" component={MyPage} />
          <Route exact path="/middleServer/makeHouse" children={MakeHouse} />
          <Route exact path="/middleServer/phoneVerification" component={PhoneVerification} />
        </Switch>
      ) : (
        // 로그인전 라운터
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/middleServer" component={Home} />
          <Route exact path="/middleServer/signUp" component={SignUp} />
          <Route exact path="/middleServer/login" component={Login} />
          <Route component={NoMatch} />
        </Switch>
      )}
    </Fragment>
  );
}

export default compose(
  graphql(IS_LOGGED_IN, { name: 'IsLoggedIn' }),
  graphql(GET_USER_INFO, { name: 'GetUserInfo' }),
)(JDmiddleServer);
