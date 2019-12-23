import React from "react";
import { Route, Switch } from "react-router";
import { IContext } from "../BookingHostRouter";
interface Iprops {
  context: IContext;
}

const SuperAdminRouter: React.FC<Iprops> = ({ context }) => {
  return (
    <Route path="/superAdmin">
      <Switch>
        <Route path="/superAdmin/users" />
        <Route path="/superAdmin/houses" />
      </Switch>
    </Route>
  );
};

export default SuperAdminRouter;
