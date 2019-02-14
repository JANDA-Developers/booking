/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';
import Header from '../components/Headers/Header';
import DynamicImport from '../utils/DynamicImport';
import NoMatch from './NoMatch';
import { IS_LOGGED_IN } from '../queries';

function JDmiddleServer() {
  const isLoggin = false;

  const Home = props => (
    <DynamicImport load={() => import('./middleServer/Home')}>
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
      <Route render={() => <Header isLoggin={isLoggin} />} />
      <Switch>
        <Route exact path="/" component={isLoggin ? Home : Login} />
        <Route exact path="/middleServer/myPage" component={isLoggin ? MyPage : Login} />
        <Route exact path="/middleServer/signUp" component={SignUp} />
        <Route exact path="/middleServer/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  );
}

export default graphql(IS_LOGGED_IN)(JDmiddleServer);
