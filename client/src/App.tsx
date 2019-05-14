/* eslint-disable no-shadow */
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// @ts-ignore
import Favicon from 'react-favicon';
import client from './apolloClient';
import DocumentRouter from './pages/DocumentRouter';
import OutPageRouter from './pages/OutPageRouter';
import NoMatch from './pages/NoMatch';
import MiddleServerRouter from './pages/MiddleServerRouter';
import JDtoast from './atoms/toast/Toast';
import './lib/wave/wave'; // 웨이브 이펙트
import './lib/wave/wave.scss';
import JDoutdatedBrowserRework from './utils/oldBrowser';

function App() {
  // const browser = browserDetect();
  // console.log(browser);

  JDoutdatedBrowserRework();

  return (
    <ApolloProvider client={client}>
      <Favicon url="https://res.cloudinary.com/stayjanda-com/image/upload/v1554092565/favicon.ico" />
      <Router>
        <Switch>
          {/* 상위 컴포넌트 영향에벋어날수 없다. */}
          <Route path="/documents" component={DocumentRouter} />
          <Route path="/outpage/:token" component={OutPageRouter} />
          {['/', '/middleServer'].map(path => (
            <Route key={`router${path}`} path={path} component={MiddleServerRouter} />
          ))}
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <JDtoast />
      {/* for old borwser */}
      <div id="outdated" />
    </ApolloProvider>
  );
}
export default App;
