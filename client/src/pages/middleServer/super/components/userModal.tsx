import React from 'react';
import { MyPage } from '../../../pages';
import JDmodal from '../../../../atoms/modal/Modal';
import { IUseModal } from '../../../../actions/hook';

interface IProps {
  modalHook: IUseModal;
}

const UserModal: React.SFC<IProps> = ({ modalHook }) => (
  <JDmodal {...modalHook}>
    <MyPage />
  </JDmodal>
);
export default UserModal;
