import {Mutation} from "react-apollo";
import React from "react";
import {toast} from "react-toastify";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Header from "./Header";
import {LOG_USER_OUT, SELECTED_HOUSE} from "../../clientQueries";
import {getOperationName} from "apollo-utilities";
import {IHouse, IDiv} from "../../types/interface";
import {getMyProfile_GetMyProfile_user} from "../../types/api";

type IProps = IDiv & {
  isPhoneVerified?: boolean;
  isLoggedIn?: boolean;
  isLoading: boolean;
  className?: string;
  sideNavOpener: any;
  applyedProduct?: any;
  selectedHouse: IHouse;
  houses: IHouse[];
  logOutMutation: any;
  profileImg: string;
  user: getMyProfile_GetMyProfile_user;
};

const HeaderWrap: React.FC<IProps & RouteComponentProps> = ({
  selectedHouse,
  houses,
  history,
  profileImg,
  ...props
}) => (
  <Mutation
    mutation={LOG_USER_OUT}
    onCompleted={() => {
      toast.success("로그아웃 완료");
      history.replace("./");
    }}
  >
    {(logOutMutation: any) => (
      <Header
        {...props}
        profileImg={profileImg}
        selectedHouse={selectedHouse}
        houses={houses}
        logOutMutation={logOutMutation}
      />
    )}
  </Mutation>
);

export default withRouter(HeaderWrap);
