import {Mutation} from "react-apollo";
import React from "react";
import {toast} from "react-toastify";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Header from "./Header";
import {LOG_USER_OUT, SELECTED_HOUSE} from "../../clientQueries";
import {getOperationName} from "apollo-utilities";
import {IHouse, IDiv} from "../../types/interface";
import {getMyProfile_GetMyProfile_user} from "../../types/api";
import {IContext} from "../../pages/MiddleServerRouter";

type IProps = IDiv & {
  context: IContext;
};

const HeaderWrap: React.FC<IProps & RouteComponentProps> = ({
  context,
  history
}) => (
  <Mutation
    mutation={LOG_USER_OUT}
    onCompleted={() => {
      toast.success("로그아웃 완료");
      history.replace("./");
    }}
  >
    {(logOutMutation: any) => (
      <Header context={context} logOutMutation={logOutMutation} />
    )}
  </Mutation>
);

export default withRouter(HeaderWrap);
