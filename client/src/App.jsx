/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import DynamicImport from './utils/DynamicImport';
import client from './apolloClient';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';
// Library
import './lib/wave'; // 웨이브 이펙트
import './lib/wave.scss'; // 웨이브 이펙트

const Margin = props => (
  <DynamicImport load={() => import('./pages/Margin')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const ColorPage = props => (
  <DynamicImport load={() => import('./pages/color/ColorPage')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

const ShowComponents = props => (
  <DynamicImport load={() => import('./pages/ShowComponents')}>
    {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
  </DynamicImport>
);

// const MyPage = props => (
//   <DynamicImport load={() => import('./pages/MyPage')}>
//     {DNcompoent => (DNcompoent === null ? <p>Loading</p> : <DNcompoent {...props} />)}
//   </DynamicImport>
// );

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
              <Route path="/margin" component={Margin} />
              <Route path="/post" component={Post} />
              <Route path="/login" component={Login} />
              <Route path="/color" component={ColorPage} />
              {/* <Route path="/mypage" component={MyPage} /> */}
              <Route path="/search" component={Search} />
              <Route path="/showComponents" component={ShowComponents} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </Router>
      </ApolloProvider>
    );
  }
}
export default App;
