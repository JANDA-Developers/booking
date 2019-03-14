import React from 'react';
import profileImg from '../../../img/profile/default_profile.jpg';
import './MyPage.scss';
import { useInput } from '../../../actions/hook';
import Button from '../../../atoms/button/Buttons';
import InputText from '../../../atoms/forms/InputText';
import ProfileCircle from '../../../atoms/profileCircle/ProfileCircle';
import MyProduct from './components/myProduct';
import MyProductAdd from './components/myProductAdd';

const profileStyle = {
  backgroundImage: `url(${profileImg})`,
};

const Mypage = ({ userInformation }) => {
  const nameHook = useInput(userInformation && userInformation.name);
  const phoneNumberHook = useInput(userInformation && userInformation.phoneNumber);
  const emailHook = useInput(userInformation && userInformation.email);
  const houses = userInformation && userInformation.houses;

  return (
    <div id="myPage" className="myPage container container--sm">
      <div className="docs-section">
        <div className="docs-section__box">
          <h2>MyPage</h2>
          {/* 아래같이 중첩 컴포넌트가 여러군데 쓰이고 같이 변경되어야 할시점이 생긴다면 공통 컴포넌트로 이동해야한다. */}
          <div className="myPage__profileCircle">
            <ProfileCircle isBordered style={profileStyle} />
            <p>숙소 N개 보유중</p>
          </div>
          <InputText {...nameHook} label="성함" />
          <InputText {...phoneNumberHook} label="핸드폰번호" />
          <InputText {...emailHook} label="이메일" />
          <Button label="프로필 수정" />
        </div>
        <h4>생성한 숙소</h4>
        <div className="row myPage__myProducts">
          {houses
            ? houses.map(house => (
              <div className="myPage__myProduct col col--4 col--md-6">
                <MyProduct
                  title={house.name}
                  productId="123"
                  purchaseProduct={house.houseType}
                  dateCreated={house.createdAt}
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
