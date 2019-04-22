/* eslint-disable react/forbid-prop-types */
import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from '../components/headers/DocumentHeader';
import NoMatch from './NoMatch';
import { Reservation } from './outPages';

class DocumentRouter extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        {/* 예약페이지 */}
        <Route exact path="/outpage/reservation" component={Reservation} />
      </Fragment>
    );
  }
}

export default DocumentRouter;
