import React from 'react';
import { Mutation } from 'react-apollo';
import { useInput, useModal, useImageUploader } from '../../../actions/hook';
import { UPDATE_MYPROFILE, GET_USER_INFO } from '../../../queries';
import { showError, onCompletedMessage } from '../../../utils/utils';
import MyPage from './MyPage';
import { IUser, IHouse, IDiv } from '../../../types/interface';

interface IProps {
  houses: IHouse[];
  userData: IUser;
  props: IDiv;
}

const MypageWrap: React.SFC<IProps> = ({ houses, userData, ...props }) => {
  const nameHook = useInput(userData.name, true);
  const phoneNumberHook = useInput(userData.phoneNumber, true);
  const emailHook = useInput(userData.email, true);
  const passwordHook = useInput('');
  const passWordModal = useModal(false);
  const houseModal = useModal(false);
  const profileCircleHook = useImageUploader(userData.profileImg);

  return (
    // Mutation : 프로필 업데이트
    <Mutation
      onError={showError}
      mutation={UPDATE_MYPROFILE}
      refetchQueries={[{ query: GET_USER_INFO }]}
      variables={{
        name: nameHook.value,
        phoneNumber: phoneNumberHook.value,
        email: emailHook.value,
        password: passwordHook.value,
        profileImg: profileCircleHook.fileUrl,
      }}
      onCompleted={({ UpdateMyProfile }: any) => {
        onCompletedMessage(UpdateMyProfile, '프로필 업데이트', '프로필 업데이트 실패');
      }}
    >
      {(profileMutation: any) => (
        <MyPage
          houses={houses}
          nameHook={nameHook}
          profileCircleHook={profileCircleHook}
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
