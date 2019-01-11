import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Route } from 'react-router-dom';
import client from './apolloClient';
import Post from './pages/Post';
import Home from './pages/Home';
import Test from './pages/Test';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import Header from './components/header';

class App extends Component {
  state = {};

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <main>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/test/:username" component={Test} />
            <Route path="/post" component={Post} />
            <Route path="/login" component={Login} />
            <Route path="/Mypage" component={Mypage} />
          </main>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
