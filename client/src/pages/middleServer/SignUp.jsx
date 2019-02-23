/* eslint-disable  */
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import InputText from '../../atoms/forms/InputText';
import Radio from '../../atoms/forms/Radio';
import Button from '../../atoms/Buttons';
import { EMAIL_SIGN_UP, LOG_USER_IN } from '../../queries';
import '../../atoms/Modal.scss';
import './SignUp.scss';
import utils from '../../utils/utils';
import { useInput, useRadio } from '../../actions/hook';

function SignUp({ history }) {
  const nameHoook = useInput('');
  const emailHook = useInput('');
  const phoneNumberHook = useInput('');
  const passwordHook = useInput('');
  const checkPasswordHook = useInput('');
  const [infoAgreement, setInfoAgreement] = useRadio();

  return (
    <div id="signUpPage" className="container">
      <div className="docs-section">
        {/* 인증모달 */}
        <Mutation mutation={LOG_USER_IN}>
          {logUserIn => (
            <Mutation
              mutation={EMAIL_SIGN_UP}
              variables={{
                firstName: nameHoook.value,
                lastName: nameHoook.value,
                email: emailHook.value,
                phoneNumber: phoneNumberHook.value,
                password: passwordHook.value,
              }}
              onCompleted={({ EmailSignUp: { ok, error, token } }) => {
                // 자동로그인
                if (ok) {
                  if (token) {
                    alert('회원가입완료');
                    logUserIn({
                      variables: {
                        token: token,
                      },
                    });
                    // 인증 화면으로 이동
                    history.push(`/middleServer/PhoneVerification`);
                  }
                }
                if (error) console.log(error);
              }}
            >
              {(mutation, data) => {
                const signUpSubmit = e => {
                  e.preventDefault();
                  if (!nameHoook.isValid) {
                    alert('올바른 이름이 아닙니다.');
                    return false;
                  }
                  if (!emailHook.isValid) {
                    alert('올바른 이메일이 아닙니다.');
                    return false;
                  }
                  if (!phoneNumberHook.isValid) {
                    alert('올바른 핸드폰 번호가 아닙니다.');
                    return false;
                  }
                  if (!passwordHook.isValid) {
                    alert('올바른 패스워드가 아닙니다.');
                    return false;
                  }
                  if (passwordHook.value !== checkPasswordHook.value) {
                    alert('패스워드 확인이 일치하지 않습니다.');
                    return false;
                  }
                  if (passwordHook.value !== checkPasswordHook.value) {
                    alert('패스워드 확인이 일치하지 않습니다.');
                    return false;
                  }
                  if (infoAgreement) {
                    alert('정보제공 동의를 해주세요.');
                    return false;
                  }
                  mutation();
                };
                return (
                  <form onSubmit={signUpSubmit}>
                    <h3>회원가입</h3>
                    <div className="flex-grid docs-section__box">
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...nameHoook} validation={utils.isName} label="성함" />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...passwordHook}
                          validation={utils.isPassword}
                          type="password"
                          label="비밀번호"
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...checkPasswordHook} type="password" label="비밀번호 확인" />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...phoneNumberHook}
                          validation={utils.isPhone}
                          label="전화번호"
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...emailHook} validation={utils.isEmail} label="이메일" />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
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
                          textarea
                          doubleHeight
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <Radio
                          onChange={setInfoAgreement}
                          label="동의"
                          checked
                          id="RD1--1"
                          groupName="Agree"
                        />
                        <Radio
                          onChange={setInfoAgreement}
                          label="동의안함"
                          id="RD1--2"
                          groupName="Agree"
                        />
                      </div>
                    </div>
                    <div>
                      <Button thema="primary" type="submit" label="가입완료" mode="large" />
                    </div>
                  </form>
                );
              }}
            </Mutation>
          )}
        </Mutation>
      </div>
    </div>
  );
}

export default SignUp;
