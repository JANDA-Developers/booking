/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { ApolloProvider, graphql } from 'react-apollo';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import client from './apolloClient';
import DocumentRouter from './pages/DocumentRouter';
import NoMatch from './pages/NoMatch';
import middleServerRouter from './pages/middleServerRouter';
import { IS_LOGGED_IN } from './queries';
// Library
import './lib/wave'; // 웨이브 이펙트
import './lib/wave.scss'; // 웨이브 이펙트

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          <Switch>
            {/* todo: router 한번 공부해서 정리 ㄱㄱ */}
            <Route exact path="/" component={middleServerRouter} />
            <Route path="/MiddleServer" component={middleServerRouter} />
            <Route path="/documents" component={DocumentRouter} />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </Router>
    </ApolloProvider>
  );
}
export default App;
