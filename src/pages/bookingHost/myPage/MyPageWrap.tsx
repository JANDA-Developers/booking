import React from "react";
import { Mutation } from "react-apollo";
import {
  useInput,
  useModal,
  useImageUploader,
  LANG
} from "../../../hooks/hook";
import { UPDATE_MYPROFILE, GET_USER_INFO } from "../../../apollo/queries";
import { showError, onCompletedMessage } from "../../../utils/utils";
import MyPage from "./MyPage";
import { IUser, IHouse, IDiv } from "../../../types/interface";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { getUserForSU_GetUserForSU_user } from "../../../types/api";

interface IProps {
  context: IContext;
  props?: IDiv;
  propUserData?: getUserForSU_GetUserForSU_user;
}

const MypageWrap: React.FC<IProps> = ({ context, propUserData, ...props }) => {
  let userData = propUserData;
  if (!userData) userData = context.user;
  if (!userData) return <div />;
  const nameHook = useInput(userData.name, true);
  const phoneNumberHook = useInput(userData.phoneNumber, true);
  const emailHook = useInput(userData.email, true);
  const passwordHook = useInput("");
  const passWordModal = useModal(false);
  const houseModal = useModal(false);
  const profileCircleHook = useImageUploader(userData.profileImg, {
    resizeMaxWidth: 180,
    quality: 90
  });

  return (
    // Mutation : 프로필 업데이트
    <Mutation
      mutation={UPDATE_MYPROFILE}
      refetchQueries={[{ query: GET_USER_INFO }]}
      variables={{
        name: nameHook.value,
        phoneNumber: phoneNumberHook.value,
        email: emailHook.value,
        password: passwordHook.value,
        profileImg: profileCircleHook.file
      }}
      onCompleted={({ UpdateMyProfile }: any) => {
        onCompletedMessage(
          UpdateMyProfile,
          LANG("update_profile"),
          LANG("update_profile_fail")
        );
      }}
    >
      {(profileMutation: any) => (
        <MyPage
          context={context}
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
