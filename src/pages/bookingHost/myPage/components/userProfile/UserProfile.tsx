import React, { Fragment, useState } from "react";
import { IContext } from "../../../BookingHostRouter";
import Card from "../../../../../atoms/cards/Card";
// @ts-ignore
import omitDeep from "omit-deep";
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
import JDIcon from "../../../../../atoms/icons/Icons";
import { IMG_REPO } from "../../../../../types/const";
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
import CardHeader from "../../../../../atoms/cards/components/CardHeader";
import CardSection from "../../../../../atoms/cards/components/CardSection";
import JDbox from "../../../../../atoms/box/JDbox";
import Vtable, { ColumnCells } from "../../../../../atoms/vtable/Vtable";
import { WindowSize } from "../../../../../types/enum";
import ModalEndSection from "../../../../../atoms/modal/components/ModalEndSection";

interface Iprops {
  context: IContext;
  userInfo: getUserForSU_GetUserForSU_user;
}

const UserProfile: React.FC<Iprops> = ({ context, userInfo }) => {
  const { houses } = context;
  const userData = userInfo;
  const { phoneNumber, email, name, profileImg, bankAccountInfo } = userData;

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

  const [accountInfo, setAccountInfo] = useState(
    omitDeep(bankAccountInfo, ["__typename"]) || {
      bankName: "",
      accountNum: "",
      accountHolder: ""
    }
  );
  const nameHook = useInput(name);
  const phoneNumberHook = useInput(phoneNumber);
  const emailHook = useInput(email);

  const houseModal = useModal(false);
  const profileCircleHook = useImageUploader(profileImg, {
    resizeMaxWidth: 180,
    quality: 90
  });

  const handleCallBackConfirm = (password: string) => {
    if (nameHook.isValid === false) {
      toast.warn(LANG("not_a_valid_name"));
      return false;
    }
    if (emailHook.isValid === false) {
      toast.warn(LANG("not_a_valid_email"));
      return false;
    }
    if (phoneNumberHook.isValid === false) {
      toast.warn(LANG("not_a_valid_phoneNumber"));
      return false;
    }

    updateProfileMu({
      variables: {
        email: emailHook.value,
        name: nameHook.value,
        password: password,
        phoneNumber: phoneNumberHook.value,
        profileImg: profileCircleHook.file,
        bankAccountInfo: accountInfo
      }
    });
    return null;
  };
  1;
  const profileStyle = {
    backgroundImage: `url(${IMG_REPO}default/default_profile.jpg)`
  };
  const changePasswordModalHook = useModal();
  const passwordCheckModalHook = useModal();

  const isPhabletDwon = window.innerWidth < WindowSize.PHABLET;

  const porifleInputs = [
    [
      {
        label: LANG("name"),
        Component: () => (
          <InputText
            id="UserProfileNameInput"
            mb="no"
            {...nameHook}
            validation={isName}
          />
        )
      },
      {
        label: LANG("phoneNumber"),
        Component: () => (
          <InputText
            id="UserProfilePhoneNumberInput"
            mb="no"
            hyphen
            {...phoneNumberHook}
            validation={isPhone}
          />
        )
      }
    ],
    [
      {
        label: LANG("email"),
        Component: () => (
          <InputText
            id="UserEmailNumberInput"
            mb="no"
            {...emailHook}
            validation={isEmail}
          />
        )
      },
      {
        label: LANG("bank_name"),
        Component: () => (
          <InputText
            id="UserBankNameInput"
            mb="no"
            value={accountInfo.bankName}
            onChange={v => {
              setAccountInfo({ ...accountInfo, bankName: v });
            }}
          />
        )
      }
    ],
    [
      {
        label: LANG("account_number"),
        Component: () => (
          <InputText
            id="UserAccountNumberInput"
            mb="no"
            value={accountInfo.accountNum}
            onChange={v => {
              setAccountInfo({ ...accountInfo, accountNum: v });
            }}
          />
        )
      },
      {
        label: LANG("depositor"),
        Component: () => (
          <InputText
            id="UserDepositorInput"
            mb="no"
            value={accountInfo.accountHolder}
            onChange={v => {
              setAccountInfo({ ...accountInfo, accountHolder: v });
            }}
          />
        )
      }
    ]
  ];

  return (
    <Fragment>
      <Card mr="no">
        <CardHeader
          desc={LANG("mypage_profile_desc")}
          title={LANG("user_info")}
        />
        <CardSection>
          <div className="flex-grid">
            <div className="JDstandard-margin-bottom flex-grid__col col--full-12 col--wlg-12">
              <div className="flex-grid-grow">
                <div className="myPage__profileCircleWrap">
                  <ProfileCircle
                    {...profileCircleHook}
                    config
                    size={isPhabletDwon ? "largest" : "largest2"}
                    style={profileStyle}
                    className=" JDstandard-margin0"
                  />
                </div>
                <div className="formWrap flex-grid__col ">
                  <Vtable
                    cellColumn={isPhabletDwon}
                    mode={isPhabletDwon ? "unStyle" : undefined}
                    border={"none"}
                    mb="no"
                  >
                    <ColumnCells datas={porifleInputs} />
                  </Vtable>
                </div>
              </div>
            </div>
          </div>
          <ModalEndSection>
            <Button
              onClick={passwordCheckModalHook.openModal}
              thema="primary"
              mode="flat"
              label={LANG("change_profile")}
              id="ChangeProfileBtn"
            />
            <Button
              onClick={changePasswordModalHook.openModal}
              mode="border"
              id="ChangePsswordBtn"
              label={LANG("password_rewrite")}
            />
          </ModalEndSection>
        </CardSection>
        <CardHeader
          desc={LANG("mypage_houses_desc")}
          title={LANG("created_house")}
        />
        <CardSection>
          {/* 숙소 목록들 */}
          {<JDpreloader loading={loading} />}
          <div className="flex-grid myPage__myHouses">
            {houses &&
              houses.map((house, index) => {
                const commonClasses =
                  "myPage__myHouse flex-grid__col col--full-3 col--md-12";
                return (
                  <Fragment key={house._id}>
                    <div className={commonClasses}>
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
                    {houses.length === index + 1 && (
                      <div className={commonClasses}>
                        <Link to="/createHouse">
                          <JDbox
                            clickable
                            mode="border"
                            className="myHouseCard JDflex JDflex--vCenter JDflex--center"
                          >
                            <JDIcon size="huge" icon="addCircle" />
                          </JDbox>
                        </Link>
                      </div>
                    )}
                  </Fragment>
                );
              })}
            {/* 숙소추가 */}
          </div>
        </CardSection>
      </Card>
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
