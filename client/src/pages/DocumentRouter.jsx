/* eslint-disable react/forbid-prop-types */
import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from '../components/headers/DocumentHeader';
import NoMatch from './NoMatch';
import {
  DocumentHome,
  ShowComponents,
  Grid,
  ColorPage,
  Margin,
  Brand,
} from './documentPages';

class DocumentRouter extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <Helmet>
          <title> Janda | Document </title>
        </Helmet>
        <Route path="/documents" component={Header} />
        <Switch>
          <Route exact path="/documents" component={DocumentHome} />
          <Route exact path="/documents/ShowComponents" component={ShowComponents} />
          <Route exact path="/documents/grid" component={Grid} />
          <Route exact path="/documents/color" component={ColorPage} />
          <Route exact path="/documents/margin" component={Margin} />
          <Route exact path="/documents/brand" component={Brand} />
          <Route path="/documents/" component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

export default DocumentRouter;
