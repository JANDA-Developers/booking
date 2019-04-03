import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Card from '../../atoms/cards/Card';
import InputText from '../../atoms/forms/InputText';
import Buttons from '../../atoms/button/Buttons';
import './Login.scss';
import { LOG_USER_IN } from '../../clientQueries';
import { EMAIL_SIGN_IN, GET_USER_INFO } from '../../queries';
import { useInput } from '../../actions/hook';
import utils, { toast } from '../../utils/utils';

function Login({ client, history }) {
  const emailHook = useInput('');
  const passwordHook = useInput('');

  return (
    <div id="loginPage" className="container container--centerlize">
      <div>
        <h1>Login</h1>
        <Card>
          {/* todo: this need better way */}
          {/* 로그인 뮤테이션 (로컬 ) */}
          <Mutation
            mutation={LOG_USER_IN}
            onError={(err) => {
              toast.warn('로그엔 Error');
              console.error(err);
            }}
            refetchQueries={[{ query: GET_USER_INFO }]}
          >
            {(logUserIn) => {
              const emailSignIn = (e) => {
                e.preventDefault();
                if (!emailHook.isValid) {
                  toast.warn('아이디는 이메일 이여야합니다.');
                  return;
                }
                if (!passwordHook.isValid) {
                  toast.warn('잘못된 패스워드입니다.');
                  return;
                }
                client
                  .query({
                    query: EMAIL_SIGN_IN,
                    variables: {
                      email: emailHook.value,
                      password: passwordHook.value,
                    },
                  })
                  .then(({ data: { EmailSignIn: { ok, token, error } } }) => {
                    if (ok) {
                      if (token) {
                        logUserIn({
                          variables: {
                            token,
                          },
                        });
                        toast.success('로그인 완료');
                        history.replace('/');
                      }
                    }
                    if (error) {
                      console.error(error);
                      if (error === 'Wrong Password') toast.warn('패스워드가 일치하지 않습니다.');
                      else toast.warn('해당 이메일을 찾을수 없습니다.');
                    }
                  });
              };
              return (
                <form onSubmit={emailSignIn}>
                  <InputText {...emailHook} validation={utils.isEmail} label="Email" />
                  <InputText {...passwordHook} validation={utils.isPassword} type="password" label="Password" />
                  <Buttons type="submit" thema="primary" label="로그인" />
                </form>
              );
            }}
          </Mutation>
        </Card>
      </div>
    </div>
  );
}

Login.propTypes = {
  client: PropTypes.object.isRequired,
};
export default withRouter(withApollo(Login));
