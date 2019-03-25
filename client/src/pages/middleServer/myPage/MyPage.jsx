import React from 'react';
import PT from 'prop-types';
import profileImg from '../../../img/profile/default_profile.jpg';
import Button from '../../../atoms/button/Buttons';
import InputText from '../../../atoms/forms/InputText';
import ProfileCircle from '../../../atoms/profileCircle/ProfileCircle';
import MyHouse from './components/myHouse';
import MyHouseAdd from './components/myHouseAdd';
import utils, { toast } from '../../../utils/utils';
import Modal from '../../../atoms/modal/Modal';
import './MyPage.scss';
import MyHouseModal from './components/myHouseModal';

const profileStyle = {
  backgroundImage: `url(${profileImg})`,
};

const Mypage = ({
  houses,
  nameHook,
  phoneNumberHook,
  passwordHook,
  emailHook,
  setHouseModalId,
  profileMutation,
  houseModal,
  passWordModal,
  houseInformation,
}) => {
  const { loading, error, data } = houseInformation;
  if (loading) return false;
  if (error) {
    console.log(error);
    toast.warn(error);
  }
  let houseData = {};
  if (data && data.GetHouse) {
    if (data.GetHouse.ok) {
      houseData = data.GetHouse.house;
    }
  }

  const hanldeOnClickHouse = (id) => {
    setHouseModalId(id);
    houseModal.openModal();
  };

  const checkUpdateMutation = (e) => {
    e.preventDefault();

    if (!nameHook.isValid) {
      toast.warn('올바른 이름이 아닙니다.');
      return false;
    }
    if (!emailHook.isValid) {
      toast.warn('올바른 이메일이 아닙니다.');
      return false;
    }
    if (!phoneNumberHook.isValid) {
      toast.warn('올바른 핸드폰 번호가 아닙니다.');
      return false;
    }
    if (!passwordHook.isValid) {
      toast.warn('올바른 패스워드가 아닙니다.');
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
              <ProfileCircle isBordered style={profileStyle} />
              <p>{`숙소 ${houses.length}개 보유중`}</p>
            </div>
            <InputText {...nameHook} validation={utils.isName} label="성함" />
            <InputText {...phoneNumberHook} hyphen validation={utils.isPhone} label="핸드폰번호" />
            <InputText {...emailHook} validation={utils.isEmail} label="이메일" />
            <Button onClick={passWordModal.openModal} label="프로필 수정" />
          </form>
        </div>
        <h4>생성한 숙소</h4>
        {/* 숙소 목록들 */}
        <div className="row myPage__myHouses">
          {houses
            ? houses.map(house => (
              <div key={house._id} className="myPage__myHouse col col--4 col--md-6">
                <MyHouse
                  id={house._id}
                  title={house.name}
                  openMyHouse={hanldeOnClickHouse}
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
      <Modal center isOpen={passWordModal.isOpen}>
        <h6>프로필 변경</h6>
        <InputText {...passwordHook} validation={utils.isPassword} label="비밀번호" />
        <div className="ReactModal__EndSection">
          <Button
            mode="flat"
            label="확인"
            onClick={(e) => {
              passWordModal.closeModal();
              checkUpdateMutation(e);
            }}
          />
          <Button mode="flat" label="닫기" onClick={passWordModal.closeModal} />
        </div>
      </Modal>
      <MyHouseModal onRequestClose={houseModal.closeModal} houseData={houseData} isOpen={houseModal.isOpen} />
    </div>
  );
};

Mypage.propTypes = {
  userInformation: PT.object,
  houses: PT.array,
};

Mypage.defaultProps = {
  userInformation: {},
  houses: [],
};

export default Mypage;
