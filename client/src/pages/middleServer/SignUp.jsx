/* eslint-disable  */
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import InputText from '../../atoms/forms/InputText';
import Textarea from '../../atoms/forms/Textarea';
import Radio from '../../atoms/forms/Radio';
import Button from '../../atoms/Buttons';
import './SignUp.scss';
import { PHONE_VERIFICATION } from '../../queries';
import '../../atoms/Modal.scss';
import utils from '../../utils/utils';

// function useInput(defaultValue) {
//   const [value,setValue] = useState(defaultValue);
//   const [validate,setValidate] = useState(utils.NEUTRAL);

// }

function SignUp() {
  const [phoneNumber, changePhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [popPhone, setPopPhone] = useState(false);
  const [popEmail, setPopEmail] = useState(false);
  const [phoneVerfication, setPhoneVerfication] = useState(false);
  const [emailVerfication, setEmailVerfication] = useState(false);
  const [key, setKey] = useState(false);
  const [infoAgreement, setKeyAgreement] = useState(false);
  const [Name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handlePopVerification = e => {
    e.stopPropagation();
    setPopPhone(!popPhone);
  };

  const checkVerification = () => {
    const isAllChecked = phoneVerfication && emailVerfication && infoAgreement;
  };

  return (
    <div id="signUpPage" className="container">
      <div className="docs-section">
        {/* 인증모달 */}
        <form onSubmit={checkVerification}>
          <ReactModal
            isOpen={popPhone}
            onRequestClose={handlePopVerification}
            className="Modal"
            overlayClassName="Overlay"
          >
            <p>핸드폰 인증번호</p>
            <InputText onChange={setKey} label="인증번호" />
            <div className="ReactModal__EndSection">
              <Mutation
                mutation={PHONE_VERIFICATION}
                variables={{
                  phoneNumber,
                  key,
                }}
                onCompleted={() => {
                  setPhoneVerfication(true);
                }}
              >
                {mutation => <Button label="인증하기" onClick={mutation} />}
              </Mutation>
              <Button label="Close Modal" onClick={handlePopVerification} />
            </div>
          </ReactModal>

          <h3>회원가입</h3>
          <div className="flex-grid docs-section__box">
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText validation={utils.isName} label="성함" />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText validation={utils.isPassword} type="password" label="비밀번호" />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText type="password" label="비밀번호 확인" />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText validation={utils.isPhone} onChange={changePhoneNumber} label="핸드폰" />
              <Mutation
                mutation={PHONE_VERIFICATION}
                variables={{
                  phoneNumber,
                }}
                onCompleted={() => {
                  setPopPhone(true);
                }}
              >
                {mutation => <Button onClick={mutation} mode="small" label="인증하기" />}
              </Mutation>
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText validation={utils.isEmail} onChange={setEmail} label="이메일" />
              <Mutation
                mutation={PHONE_VERIFICATION}
                variables={{
                  email,
                }}
                onCompleted={() => {
                  setPopEmail(true);
                }}
              >
                {mutation => <Button onClick={mutation} mode="small" label="인증하기" />}
              </Mutation>
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <Textarea
                value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempora, corrupti, iure magnam pariatur vero atque esse ipsum delectus, suscipit amet! Modi commodi libero maxime dignissimos dolor aspernatur similique consectetur.
            Inventore ab nisi assumenda ullam excepturi! Quidem veritatis tempore minima dolores rem cum nesciunt, corporis praesentium facere nihil laudantium neque tenetur fugit labore facilis minus adipisci cumque incidunt mollitia in?
            Quibusdam inventore quas similique maxime a magnam, repellat ducimus officiis beatae! Voluptas amet id aliquam quidem necessitatibus harum delectus consequatur exercitationem, totam error temporibus illum, veritatis nulla beatae iusto at!
            Quo vero ratione suscipit cumque ex tenetur repellat dolorum ipsam maxime, tempora similique magni beatae aperiam fuga veniam debitis possimus a nisi tempore amet? Omnis debitis nostrum inventore animi quisquam.
            Ratione consequuntur enim optio corrupti non, cum officia ab maxime facere cupiditate odit laborum quas consequatur quasi inventore velit. Temporibus sed non eligendi inventore cupiditate quibusdam tempore officia velit! Veniam.
            Necessitatibus natus veniam provident sequi reprehenderit voluptate corporis, quas aliquam. Inventore consequuntur quos a cum voluptate placeat vel fugit quas! In eos excepturi tenetur. Ipsam esse distinctio quae exercitationem expedita.
            Cum blanditiis, numquam deleniti illum beatae quidem qui voluptatibus officiis eligendi nam nobis maxime accusamus modi odio porro tenetur laborum ex quae eveniet et exercitationem ut debitis quam? Modi, nostrum.
            Nihil harum repellat dolore dolor omnis tempora ullam, qui laborum facere voluptatem quo reiciendis distinctio ad odit. Provident nulla magni eum dolor mollitia ea, deleniti quibusdam, adipisci expedita temporibus minima?
            Sequi, sunt? Magni, harum quae! Totam laborum modi excepturi ducimus, officia maiores distinctio ipsum harum nobis? Accusamus dolores iste odit magnam magni, quod sapiente molestiae ipsum! Perferendis sapiente porro consectetur!
            Laboriosam in praesentium quis ipsum modi rem odit inventore incidunt dolor saepe? Maxime, mollitia. Ipsam culpa at itaque cupiditate amet. Quae distinctio aspernatur odit sit amet praesentium delectus obcaecati cum!"
                label="개인정보 이용동의"
                readOnly
                scroll
              />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <Radio label="동의" checked id="RD1--1" groupName="Agree" />
              <Radio label="동의안함" id="RD1--2" groupName="Agree" />
            </div>
          </div>
          <div>
            <Button onSubmit={checkVerification} label="가입완료" mode="large" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
