import React from 'react';
import { Mutation } from 'react-apollo';
import profileImg from '../../../img/profile/default_profile.jpg';
import './MyPage.scss';
import { useInput } from '../../../actions/hook';
import Button from '../../../atoms/button/Buttons';
import InputText from '../../../atoms/forms/InputText';
import ProfileCircle from '../../../atoms/profileCircle/ProfileCircle';
import MyProduct from './components/myProduct';
import { UPDATE_MYPROFILE } from '../../../queries';
import MyProductAdd from './components/myProductAdd';
import utils, { toast } from '../../../utils/utils';

const profileStyle = {
  backgroundImage: `url(${profileImg})`,
};

const Mypage = ({ userInformation, houses = [] }) => {
  const nameHook = useInput(userInformation && userInformation.name, true);
  const phoneNumberHook = useInput(userInformation && userInformation.phoneNumber, true);
  const emailHook = useInput(userInformation && userInformation.email, true);

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
            <InputText {...phoneNumberHook} validation={utils.isPhone} label="핸드폰번호" />
            <InputText {...emailHook} validation={utils.isEmail} label="이메일" />
            <Mutation
              mutation={UPDATE_MYPROFILE}
              variables={{
                name: nameHook.value,
                phoneNumber: phoneNumberHook.value,
                email: emailHook.value,
              }}
              onError={(error) => {
                toast.warn('통신에러 발생 별도 문의바랍니다.');
                console.error(error);
              }}
              onCompleted={(result) => {
                console.log('result');
                console.log(result);
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
                  mutation();
                  return null;
                };
                return <Button onClick={checkUpdateMutation} label="프로필 수정" />;
              }}
            </Mutation>
          </form>
        </div>
        <h4>생성한 숙소</h4>
        <div className="row myPage__myProducts">
          {houses
            ? houses.map(house => (
              <div className="myPage__myProduct col col--4 col--md-6">
                <MyProduct
                  title={house.name}
                  productId={house.product ? house.product.name : '없음'}
                  purchaseProduct={house.houseType}
                  dateCreated={house.createdAt.substr(0, 10)}
                  location={house.location && house.location.address}
                  key={`${house.name}${house.dateCreated}`}
                />
              </div>
            ))
            : null}
          <div className="col col--4 col--md-6">
            <MyProductAdd />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
