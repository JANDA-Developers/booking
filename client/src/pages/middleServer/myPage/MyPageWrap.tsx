import React from 'react';
import { Mutation } from 'react-apollo';
import { useInput, useModal2 } from '../../../actions/hook';
import { UPDATE_MYPROFILE, GET_USER_INFO } from '../../../queries';
import { onError, onCompletedMessage } from '../../../utils/utils';
import MyPage from './MyPage';
import IHouses, { IUser } from '../../../types/interface';

interface IProps {
  houses: IHouses[];
  userData: IUser;
  props: React.HTMLAttributes<HTMLDivElement>;
}

const MypageWrap: React.SFC<IProps> = ({ houses, userData, ...props }) => {
  const nameHook = useInput(userData.name, true);
  const phoneNumberHook = useInput(userData.phoneNumber, true);
  const emailHook = useInput(userData.email, true);
  const passwordHook = useInput('');
  const passWordModal = useModal2(false);
  const houseModal = useModal2(false);

  return (
    // Mutation : 프로필 업데이트
    <Mutation
      onError={onError}
      mutation={UPDATE_MYPROFILE}
      refetchQueries={[{ query: GET_USER_INFO }]}
      variables={{
        name: nameHook.value,
        phoneNumber: phoneNumberHook.value,
        email: emailHook.value,
        password: passwordHook.value,
      }}
      onCompleted={({ UpdateMyProfile }) => {
        onCompletedMessage(UpdateMyProfile, '프로필 업데이트', '프로필 업데이트 실패');
      }}
    >
      {profileMutation => (
        <MyPage
          houses={houses}
          nameHook={nameHook}
          phoneNumberHook={phoneNumberHook}
          passwordHook={passwordHook}
          emailHook={emailHook}
          passWordModal={passWordModal}
          houseModal={houseModal}
          profileMutation={profileMutation}
          {...props}
        />
      )}
    </Mutation>
  );
};

export default MypageWrap;
