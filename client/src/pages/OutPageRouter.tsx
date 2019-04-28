/* eslint-disable react/forbid-prop-types */
import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from '../components/headers/DocumentHeader';
import NoMatch from './NoMatch';
import { Reservation, ReservationInfo, ReservationCheck } from './outPages';

class DocumentRouter extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        {/* 예약페이지 */}
        <Switch>
          <Route exact path="/outpage/reservation" component={Reservation} />
          <Route exact path="/outpage/checkReservation" component={ReservationCheck} />
          <Route exact path="/outpage/infoReservation" component={ReservationInfo} />
          <Route component={NoMatch} />
        </Switch>
      </Fragment>
    );
  }
}

export default DocumentRouter;
