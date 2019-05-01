/* eslint-disable react/forbid-prop-types */
import React, { Fragment, Component } from 'react';
import {
  Route, Switch, withRouter, RouteComponentProps,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from '../components/headers/DocumentHeader';
import NoMatch from './NoMatch';
import { Reservation, ReservationInfo, ReservationCheck } from './outPages';

interface IProps extends RouteComponentProps {}

const DocumentRouter: React.SFC<IProps> = ({ match, location }) => {
  console.log(location);
  // TODO location.search 안에 변수 있음 거기서 token 뽑아서 서버에 요청
  return (
    <Fragment>
      {/* 예약페이지 */}
      <Switch>
        <Route exact path="/outpage/reservation" component={Reservation} />
        <Route exact path="/outpage/checkReservation(/:name)(/:password)(/:phoneNumber)" component={ReservationCheck} />
        <Route exact path="/outpage/infoReservation" component={ReservationInfo} />
        <Route component={NoMatch} />
      </Switch>
    </Fragment>
  );
};

export default withRouter(DocumentRouter);
