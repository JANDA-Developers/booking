import { Mutation } from 'react-apollo';
import React from 'react';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import { LOG_USER_OUT, SELECT_HOUSE } from '../../clientQueries';

const HeaderWrap = ({ history, ...props }) => (
  <Mutation
    mutation={LOG_USER_OUT}
    onCompleted={() => {
      toast.success('로그아웃 완료');
      history.replace('./');
    }}
  >
    {logOutMutation => (
      <Mutation
        mutation={SELECT_HOUSE}
        nError={(error) => {
          console.error('error');
          console.warn(error);
        }}
        onCompleted={({ selectHouse }) => {
          if (selectHouse && selectHouse.ok) {
            console.toast('숙소변경');
          }
        }}
      >
        {selectHouseMutation => (
          <Header {...props} logOutMutation={logOutMutation} selectHouseMutation={selectHouseMutation} />
        )}
      </Mutation>
    )}
  </Mutation>
);

export default withRouter(HeaderWrap);
