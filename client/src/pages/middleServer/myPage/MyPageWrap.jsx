import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { useInput, useModal2 } from '../../../actions/hook';
import { UPDATE_MYPROFILE, GET_USER_INFO, GET_HOUSE } from '../../../queries';
import { toast } from '../../../utils/utils';
import MyPage from './MyPage';

const MypageWrap = ({ houses, userInformation, ...props }) => {
  const nameHook = useInput(userInformation.name, true);
  const phoneNumberHook = useInput(userInformation.phoneNumber, true);
  const emailHook = useInput(userInformation.email, true);
  const passwordHook = useInput('');
  const passWordModal = useModal2(false);
  const houseModal = useModal2(false);
  const [houseModalId, setHouseModalId] = useState(null);

  return (
    // Mutation : 프로필 업데이트
    <Mutation
      refetchQueries={[{ query: GET_USER_INFO }]}
      mutation={UPDATE_MYPROFILE}
      variables={{
        name: nameHook.value,
        phoneNumber: phoneNumberHook.value,
        email: emailHook.value,
        password: passwordHook.value,
      }}
      onError={(error) => {
        toast.warn('통신에러 발생 별도 문의바랍니다.');
        console.error(error);
      }}
      onCompleted={({ UpdateMyProfile }) => {
        if (UpdateMyProfile.ok) toast.success('변경완료');
        else toast.warn(UpdateMyProfile.error);
        return false;
      }}
    >
      {profileMutation => (
        //   Query : 숙소정보 불러오기
        <Query fetchPolicy="no-cahce" query={GET_HOUSE} skip={!houseModalId} variables={{ houseId: houseModalId }}>
          {houseInformation => (
            <MyPage
              houses={houses || undefined}
              nameHook={nameHook}
              phoneNumberHook={phoneNumberHook}
              passwordHook={passwordHook}
              emailHook={emailHook}
              setHouseModalId={setHouseModalId}
              passWordModal={passWordModal}
              houseModal={houseModal}
              houseInformation={houseInformation}
              profileMutation={profileMutation}
              {...props}
            />
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default MypageWrap;
