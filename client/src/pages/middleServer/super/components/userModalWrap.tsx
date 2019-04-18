import React from 'react';
import { MyPage } from '../../../pages';
import JDmodal from '../../../../atoms/modal/Modal';
import { IUseModal } from '../../../../actions/hook';

interface IProps {
  modalHook: IUseModal;
}

const UserModalWrap: React.SFC<IProps> = ({ modalHook }) => (
  <Query>
    <MyPage />
  </Query>
);
export default UserModalWrap;
