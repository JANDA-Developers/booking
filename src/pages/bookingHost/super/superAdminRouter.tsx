import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { IContext } from "../BookingHostRouter";
import { Users, HostHouses } from "./pages";
import SuperAdminHeader from "./components/SuperAdminHeader";
interface Iprops {
  context: IContext;
}

const SuperAdminRouter: React.FC<Iprops> = ({ context }) => {
  return (
    <div>
      {/* <Route
        path="/superAdmin"
        render={() => <SuperAdminHeader context={context} />}
      /> */}
      {/* <Route
        path="/superAdmin/users"
        render={() => <Users context={context} />}
      /> */}
      <Route
        path="/superAdmin"
        render={() => <HostHouses context={context} />}
      />
    </div>
  );
};

export default SuperAdminRouter;
