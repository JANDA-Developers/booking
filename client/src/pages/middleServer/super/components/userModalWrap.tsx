import React from 'react';
import { Query } from 'react-apollo';
import { MyPage } from '../../../pages';
import JDmodal from '../../../../atoms/modal/Modal';
import { IUseModal } from '../../../../actions/hook';
import { getUserForSU, getUserForSUVariables } from '../../../../types/api';
import { GET_USER_FOR_SU } from '../../../../queries';
import { showError, QueryDataFormater } from '../../../../utils/utils';
import Preloader from '../../../../atoms/preloader/Preloader';

interface IProps {
  modalHook: IUseModal;
}

class GetUserInfoQuery extends Query<getUserForSU, getUserForSUVariables> {}

const UserModalWrap: React.SFC<IProps> = ({ modalHook }) => (
  <GetUserInfoQuery query={GET_USER_FOR_SU} variables={{ userId: modalHook.info.userId }}>
    {({ loading, error, data: userData }) => {
      showError(error);
      const user = QueryDataFormater(userData, 'GetUserForSU', 'user', undefined);

      return (
        <JDmodal {...modalHook}>
          {!loading ? (
            <MyPage loading={loading} houses={user ? user.houses : []} userData={user || {}} modalHook={modalHook} />
          ) : (
            <Preloader />
          )}
        </JDmodal>
      );
    }}
  </GetUserInfoQuery>
);
export default UserModalWrap;
