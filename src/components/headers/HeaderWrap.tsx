import {Mutation} from "react-apollo";
import React, {useState} from "react";
import {toast} from "react-toastify";
import {RouteComponentProps} from "react-router-dom";
import Header from "./Header";
import {LOG_USER_OUT} from "../../apollo/clientQueries";
import {IDiv} from "../../types/interface";
import {IContext} from "../../pages/bookingHost/BookingHostRouter";
import {LANG} from "../../hooks/hook";

type IProps = IDiv & {
  context: IContext;
  setSideNavIsOpen: any;
  sideNavIsOpen: any;
};

const HeaderWrap: React.FC<IProps & RouteComponentProps> = ({
  context,
  history,
  sideNavIsOpen,
  setSideNavIsOpen
}) => {
  return (
    <Mutation
      mutation={LOG_USER_OUT}
      onCompleted={() => {
        toast.success(LANG("logOut_complete"));
        history.replace("./");
      }}
    >
      {(logOutMutation: any) => (
        <Header
          sideNavIsOpen={sideNavIsOpen}
          setSideNavIsOpen={setSideNavIsOpen}
          context={context}
          logOutMutation={logOutMutation}
        />
      )}
    </Mutation>
  );
};

export default HeaderWrap;
