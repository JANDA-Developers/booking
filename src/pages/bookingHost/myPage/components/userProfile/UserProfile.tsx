import React, { Fragment, useState } from "react";
import { IContext } from "../../../BookingHostRouter";
import Card from "../../../../../atoms/cards/Card";
import {
  useInput,
  useModal,
  useImageUploader,
  LANG
} from "../../../../../hooks/hook";
import Button from "../../../../../atoms/button/Button";
import ProfileCircle from "../../../../../atoms/profileCircle/ProfileCircle";
import { toast } from "react-toastify";
import {
  updateMyProfileVariables,
  updateMyProfile,
  getUserForSU_GetUserForSU_user
} from "../../../../../types/api";
import InputText from "../../../../../atoms/forms/inputText/InputText";
import {
  isName,
  isEmail,
  isPhone
} from "../../../../../utils/inputValidations";
import { IMG_REPO } from "../../../../../types/enum";
import MyHouse from "../myHouse/MyHouse";
import ChangePasswordModalWrap from "../../../../../components/changePasswordModal/ChangePasswordModalWrap";
import MyHouseModalWrap from "../myHouseModal/MyHouseModalWrap";
import PasswordCheckModal from "../passwordCheckModal/PasswordCheckModal";
import JDpreloader from "../../../../../atoms/preloader/Preloader";
import { onCompletedMessage } from "../../../../../utils/utils";
import { UPDATE_MYPROFILE, GET_USER_INFO } from "../../../../../apollo/queries";
import client from "../../../../../apollo/apolloClient";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

interface Iprops {
  context: IContext;
  userInfo: getUserForSU_GetUserForSU_user;
}

const UserProfile: React.FC<Iprops> = ({ context, userInfo }) => {
  const { houses } = context;
  const userData = userInfo;
  const { phoneNumber, email, name, profileImg } = userData;

  const [updateProfileMu, { loading }] = useMutation<
    updateMyProfile,
    updateMyProfileVariables
  >(UPDATE_MYPROFILE, {
    refetchQueries: [{ query: GET_USER_INFO }],
    onCompleted: ({ UpdateMyProfile }: any) => {
      onCompletedMessage(
        UpdateMyProfile,
        LANG("update_profile"),
        LANG("update_profile_fail")
      );
    },
    client
  });

  const nameHook = useInput(name);
  const phoneNumberHook = useInput(phoneNumber);
  const emailHook = useInput(email);

  const houseModal = useModal(false);
  const profileCircleHook = useImageUploader(profileImg, {
    resizeMaxWidth: 180,
    quality: 90
  });

  const handleCallBackConfirm = (password: string) => {
    if (!nameHook.isValid) {
      toast.warn(LANG("not_a_valid_name"));
      return false;
    }
    if (!emailHook.isValid) {
      toast.warn(LANG("not_a_valid_email"));
      return false;
    }
    if (!phoneNumberHook.isValid) {
      toast.warn(LANG("not_a_valid_phoneNumber"));
      return false;
    }

    updateProfileMu({
      variables: {
        email: emailHook.value,
        name: nameHook.value,
        password: password,
        phoneNumber: phoneNumberHook.value,
        profileImg: profileCircleHook.file
      }
    });
    return null;
  };

  const profileStyle = {
    backgroundImage: `url(${IMG_REPO}profile/default_profile.jpg)`
  };
  const changePasswordModalHook = useModal();
  const passwordCheckModalHook = useModal();

  return (
    <Fragment>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 col--md-12">
          <Card>
            <div className="JDstandard-margin-bottom">
              <ProfileCircle
                {...profileCircleHook}
                config
                size={"huge"}
                style={profileStyle}
                className="JDstandard-space0"
              />
              <div>{LANG("F_have_house_count_n")(houses.length)}</div>
            </div>
            <div>
              <InputText
                {...nameHook}
                validation={isName}
                label={LANG("name")}
              />
            </div>
            <div>
              <InputText
                hyphen
                {...phoneNumberHook}
                validation={isPhone}
                label={LANG("phoneNumber")}
              />
            </div>
            <div>
              <InputText
                {...emailHook}
                validation={isEmail}
                label={LANG("email")}
              />
            </div>
            <div className="JDmodal__endSection">
              <Button
                onClick={passwordCheckModalHook.openModal}
                thema="primary"
                mode="flat"
                label={LANG("change_profile")}
              />
              <Button
                onClick={changePasswordModalHook.openModal}
                mode="border"
                label={LANG("password_rewrite")}
              />
            </div>
          </Card>
        </div>
        <div className="flex-grid__col col--full-6 col--md-12">
          <Card>
            <h4>{LANG("created_house")}</h4>
            {/* 숙소 목록들 */}
            {<JDpreloader loading={loading} />}
            <div className="flex-grid myPage__myHouses">
              {houses
                ? houses.map(house => (
                    <div
                      key={house._id}
                      className="myPage__myHouse flex-grid__col col--full-6"
                    >
                      <MyHouse
                        id={house._id}
                        title={house.name}
                        houseModal={houseModal}
                        productId={
                          house.product ? house.product._id : undefined
                        }
                        productName={
                          house.product ? house.product.name : undefined
                        }
                        purchaseProduct={house.houseType}
                        dateCreated={house.createdAt.substr(0, 10)}
                        location={house.location && house.location.address}
                      />
                    </div>
                  ))
                : null}
              {/* 숙소추가 */}
            </div>
            <div>
              <Link to="/createHouse">
                <Button
                  mode="border"
                  icon="arrowTo"
                  label={LANG("create_house")}
                />
              </Link>
            </div>
          </Card>
        </div>
      </div>
      {/* Modal : 프로필 변경 */}
      <ChangePasswordModalWrap modalHook={changePasswordModalHook} />
      <MyHouseModalWrap context={context} MyHouseModalHook={houseModal} />
      <PasswordCheckModal
        modalHook={passwordCheckModalHook}
        handleCallBackConfirm={handleCallBackConfirm}
      />
    </Fragment>
  );
};

export default UserProfile;
