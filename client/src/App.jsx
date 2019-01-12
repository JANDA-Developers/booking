/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import DynamicImport from './utils/DynamicImport';
import client from './apolloClient';
import Header from './components/header';
import NoMatch from './pages/NoMatch';

const Test = props => (
  <DynamicImport load={() => import('./pages/Test')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const MyPage = props => (
  <DynamicImport load={() => import('./pages/MyPage')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const Home = props => (
  <DynamicImport load={() => import('./pages/Home')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const Login = props => (
  <DynamicImport load={() => import('./pages/Login')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const Post = props => (
  <DynamicImport load={() => import('./pages/Post')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const Search = props => (
  <DynamicImport load={() => import('./pages/Search')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

class App extends Component {
  state = {};

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <main>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/detail/:param" component={Home} />
              <Route path="/test/:username" component={Test} />
              <Route path="/post" component={Post} />
              <Route path="/login" component={Login} />
              <Route path="/mypage" component={MyPage} />
              <Route path="/search" component={Search} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </Router>
      </ApolloProvider>
    );
  }
}
export default App;
