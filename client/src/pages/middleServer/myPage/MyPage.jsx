import React, { useState } from 'react';
import PT from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import { UPDATE_MYPROFILE, GET_USER_INFO, GET_HOUSE } from '../../../queries';
import profileImg from '../../../img/profile/default_profile.jpg';
import { useInput, useModal } from '../../../actions/hook';
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

const Mypage = ({ userInformation, houses }) => {
  const nameHook = useInput(userInformation.name, true);
  const phoneNumberHook = useInput(userInformation.phoneNumber, true);
  const emailHook = useInput(userInformation.email, true);
  const passwordHook = useInput('');
  const [pwPOP, openPOPpw, closePOPpw] = useModal(false);
  const [houseModal, openHouseModal, closeHouseModal] = useModal(false);
  const [houseModalId, setHouseModalId] = useState(null);

  const hanldeOnClickHouse = (id) => {
    setHouseModalId(id);
    openHouseModal();
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
            <Button onClick={() => openPOPpw()} label="프로필 수정" />
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
          <div className="col col--4 col--md-6">
            <MyHouseAdd />
          </div>
        </div>
      </div>
      {/* Modal : 프로필 변경 */}
      <Modal center isOpen={pwPOP}>
        <h6>프로필 변경</h6>
        <InputText {...passwordHook} validation={utils.isPassword} label="비밀번호" />
        {/* Mutation : 프로필 업데이트 */}
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
          {(mutation) => {
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
              mutation();
              return null;
            };
            return (
              <div className="ReactModal__EndSection">
                <Button
                  mode="flat"
                  label="확인"
                  onClick={(e) => {
                    closePOPpw(false);
                    checkUpdateMutation(e);
                  }}
                />
                <Button mode="flat" label="닫기" onClick={closePOPpw} />
              </div>
            );
          }}
        </Mutation>
      </Modal>
      {/* 하우스 모달 */}
      <Query fetchPolicy="no-cahce" query={GET_HOUSE} skip={!houseModalId} variables={{ houseId: houseModalId }}>
        {({ loading, error, data }) => {
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
          return <MyHouseModal onRequestClose={closeHouseModal} houseData={houseData} isOpen={houseModal} />;
        }}
      </Query>
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
