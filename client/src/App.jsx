/* eslint-disable no-shadow */
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Favicon from 'react-favicon';
import client from './apolloClient';
import DocumentRouter from './pages/DocumentRouter';
import NoMatch from './pages/NoMatch';
import middleServerRouter from './pages/middleServerRouter';
import JDtoast from './atoms/toast/Toast';
// Library
import './lib/wave/wave'; // 웨이브 이펙트
import './lib/wave/wave.scss';


function App() {
  return (
    <ApolloProvider client={client}>
      <Favicon url="https://res.cloudinary.com/stayjanda-com/image/upload/v1554092565/favicon.ico" />
      <Router>
        <main>
          <Switch>
            {/* 상위 컴포넌트 영향에벋어날수 없다. */}
            <Route exact path="/" component={middleServerRouter} />
            <Route path="/MiddleServer" component={middleServerRouter} />
            <Route path="/documents" component={DocumentRouter} />
            <Route component={NoMatch} />
          </Switch>
        </main>
      </Router>
      <JDtoast />
    </ApolloProvider>
  );
}
export default App;
