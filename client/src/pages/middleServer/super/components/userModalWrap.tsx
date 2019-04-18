import React from 'react';
import { Query } from 'react-apollo';
import { MyPage } from '../../../pages';
import JDmodal from '../../../../atoms/modal/Modal';
import { IUseModal } from '../../../../actions/hook';
import { getUserForSU, getUserForSUVariables } from '../../../../types/api';
import { GET_USER_FOR_SU } from '../../../../queries';
import { showError } from '../../../../utils/utils';

interface IProps {
  modalHook: IUseModal;
}

class GetUserInfoQuery extends Query<getUserForSU, getUserForSUVariables> {}

const UserModalWrap: React.SFC<IProps> = ({ modalHook }) => (
  <GetUserInfoQuery query={GET_USER_FOR_SU} variables={{ userId: modalHook.info.userId }}>
    {({ loading, error, data: userData }) => {
      showError(error);
      return (
        <JDmodal {...modalHook}>
          <MyPage loading={loading} userData={userData} modalHook={modalHook} />
        </JDmodal>
      );
    }}
  </GetUserInfoQuery>
);
export default UserModalWrap;
