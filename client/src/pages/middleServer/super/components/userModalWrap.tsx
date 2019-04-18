import React from 'react';
import { MyPage } from '../../../pages';
import JDmodal from '../../../../atoms/modal/Modal';
import { IUseModal } from '../../../../actions/hook';

interface IProps {
  modalHook: IUseModal;
}

const UserModalWrap: React.SFC<IProps> = ({ modalHook }) => (
  <Query query={}>
    <MyPage modalHook={modalHook} />
  </Query>
);
export default UserModalWrap;
