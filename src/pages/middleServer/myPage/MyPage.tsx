import React from "react";
import {toast} from "react-toastify";
import profileImg from "../../../img/profile/default_profile.jpg";
import Button from "../../../atoms/button/Button";
import InputText from "../../../atoms/forms/inputText/InputText";
import ProfileCircle from "../../../atoms/profileCircle/ProfileCircle";
import MyHouse from "./components/myHouse";
import MyHouseAdd from "./components/myHouseAdd";
import utils from "../../../utils/utils";
import Modal from "../../../atoms/modal/Modal";
import "./MyPage.scss";
import MyHouseModalWrap from "./components/myHouseModalWrap";
import Preloader from "../../../atoms/preloader/Preloader";
import {IuseImageUploader, LANG} from "../../../hooks/hook";
import {IContext} from "../../MiddleServerRouter";
import {IconSize} from "../../../atoms/icons/Icons";

interface IProps {
  context: IContext;
  profileCircleHook: IuseImageUploader;
  [foo: string]: any;
}

const Mypage: React.SFC<IProps> = ({
  nameHook,
  context,
  phoneNumberHook,
  passwordHook,
  emailHook,
  profileMutation,
  houseModal,
  passWordModal,
  loading,
  profileCircleHook
}) => {
  const {houses} = context;
  const profileStyle = {
    backgroundImage: `url(${profileImg})`
  };

  const checkUpdateMutation = (e: any) => {
    e.preventDefault();

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
    if (!passwordHook.isValid) {
      toast.warn(LANG("not_a_valid_password"));
      return false;
    }
    profileMutation();
    return null;
  };

  return (
    <div id="myPage" className="myPage container container--sm">
      <div className="docs-section">
        <div className="docs-section__box">
          <form>
            <h2>MyPage</h2>
            <div className="myPage__profileCircle">
              <ProfileCircle
                {...profileCircleHook}
                config
                size={IconSize.MEDIUM_LARGE}
                isBordered
                style={profileStyle}
              />
              <p>{LANG("F_have_house_count_n")}</p>
            </div>
            <div>
              <InputText
                {...nameHook}
                validation={utils.isName}
                label={LANG("name")}
              />
            </div>
            <div>
              <InputText
                hyphen
                {...phoneNumberHook}
                validation={utils.isPhone}
                label={LANG("phoneNumber")}
              />
            </div>
            <div>
              <InputText
                {...emailHook}
                validation={utils.isEmail}
                label={LANG("email")}
              />
            </div>
            <div>
              <Button
                onClick={passWordModal.openModal}
                thema="primary"
                mode="border"
                label={LANG("change_profile")}
              />
            </div>
          </form>
        </div>
        <h4>{LANG("created_house")}</h4>
        {/* 숙소 목록들 */}
        {<Preloader loading={loading} />}
        <div className="row myPage__myHouses">
          {houses
            ? houses.map(house => (
                <div
                  key={house._id}
                  className="myPage__myHouse col col--4 col--md-6"
                >
                  <MyHouse
                    id={house._id}
                    title={house.name}
                    houseModal={houseModal}
                    productId={house.product ? house.product._id : undefined}
                    productName={house.product ? house.product.name : undefined}
                    purchaseProduct={house.houseType}
                    dateCreated={house.createdAt.substr(0, 10)}
                    location={house.location && house.location.address}
                  />
                </div>
              ))
            : null}
          {/* 숙소추가 */}
          <div className="col col--4 col--md-6">
            <MyHouseAdd />
          </div>
        </div>
      </div>
      {/* Modal : 프로필 변경 */}
      <Modal {...passWordModal}>
        <h6>{LANG("created_house")}</h6>
        <div>
          <InputText
            {...passwordHook}
            type="password"
            validation={utils.isPassword}
            label={LANG("password")}
          />
        </div>
        <div className="JDmodal__endSection">
          <Button
            thema="primary"
            label={LANG("confirm")}
            onClick={(e: any) => {
              passWordModal.closeModal();
              checkUpdateMutation(e);
            }}
          />
        </div>
      </Modal>
      <MyHouseModalWrap MyHouseModalHook={houseModal} />
    </div>
  );
};

export default Mypage;
