/* eslint-disable  */
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import InputText from '../../../atoms/forms/inputText/InputText';
import Radio from '../../../atoms/forms/radio/Radio';
import Button from '../../../atoms/button/Button';
import { LOG_USER_IN, IS_LOGGED_IN } from '../../../clientQueries';
import { EMAIL_SIGN_UP, GET_USER_INFO } from '../../../queries';
import './SignUp.scss';
import utils from '../../../utils/utils';
import { useInput, useRadio } from '../../../actions/hook';
import privacyPolicy from '../../../docs/privacyPolicy';

function SignUp({ history }) {
  const nameHook = useInput('');
  const emailHook = useInput('');
  const phoneNumberHook = useInput('');
  const passwordHook = useInput('');
  const checkPasswordHook = useInput('');
  const [infoAgreement, setInfoAgreement] = useRadio();

  return (
    <div id="signUpPage" className="container container--sm">
      <div className="docs-section">
        {/* 인증모달 */}
        <Mutation
          mutation={LOG_USER_IN}
          refetchQueries={[{ query: IS_LOGGED_IN }, { query: GET_USER_INFO }]}
          onCompleted={() => {
            history.replace(`/middleServer/PhoneVerification`);
          }}
        >
          {logUserIn => (
            <Mutation
              mutation={EMAIL_SIGN_UP}
              variables={{
                name: nameHook.value,
                email: emailHook.value,
                phoneNumber: phoneNumberHook.value,
                password: passwordHook.value,
              }}
              onError={error => {
                toast.warn('통신에러 발생 잠시후 다시 시도해주세요.');
              }}
              onCompleted={({ EmailSignUp: { ok, error, token } }) => {
                // 자동로그인
                if (ok) {
                  if (token) {
                    toast.success('회원가입완료');
                    logUserIn({
                      variables: {
                        token: token,
                      },
                    });
                  }
                }
                if (error) {
                  toast.warn(error);
                  console.error(error);
                }
              }}
            >
              {(mutation, data) => {
                const signUpSubmit = e => {
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
                  if (passwordHook.value !== checkPasswordHook.value) {
                    toast.warn('패스워드 확인이 일치하지 않습니다.');
                    return false;
                  }
                  if (passwordHook.value !== checkPasswordHook.value) {
                    toast.warn('패스워드 확인이 일치하지 않습니다.');
                    return false;
                  }
                  if (infoAgreement) {
                    toast.warn('정보제공 동의를 해주세요.');
                    return false;
                  }
                  mutation();
                };
                return (
                  <form onSubmit={signUpSubmit}>
                    <h3>회원가입</h3>
                    <div className="flex-grid docs-section__box">
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...nameHook} validation={utils.isName} label="성함" />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...passwordHook} validation={utils.isPassword} type="password" label="비밀번호" />
                        <p className="JDsmall-text">* 특수문자 1개이상, 7~15자리 영문 숫자 조합</p>
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...checkPasswordHook} type="password" label="비밀번호 확인" />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...phoneNumberHook} hyphen validation={utils.isPhone} label="전화번호" />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText {...emailHook} validation={utils.isEmail} label="이메일" />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          value={privacyPolicy}
                          label="개인정보 이용동의"
                          readOnly
                          scroll
                          textarea
                          doubleHeight
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <Radio onChange={setInfoAgreement} label="동의" checked id="RD1--1" groupName="Agree" />
                        <Radio onChange={setInfoAgreement} label="동의안함" id="RD1--2" groupName="Agree" />
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
