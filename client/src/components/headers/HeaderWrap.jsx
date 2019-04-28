import { Mutation } from 'react-apollo';
import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import { LOG_USER_OUT } from '../../clientQueries';

const HeaderWrap = ({
  selectedHouse, houses, history, profileImg, ...props
}) => (
  <Mutation
    mutation={LOG_USER_OUT}
    onCompleted={() => {
      toast.success('로그아웃 완료');
      history.replace('./');
    }}
  >
    {logOutMutation => (
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
