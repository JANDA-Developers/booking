import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Card from '../../atoms/Card';
import InputText from '../../atoms/forms/InputText';
import Buttons from '../../atoms/Buttons';
import './Login.scss';
import { EMAIL_SIGN_IN, LOG_USER_IN } from '../../queries';
import { useInput } from '../../actions/hook';
import utils from '../../utils/utils';

function Login({ client, history }) {
  const emailHook = useInput('');
  const passwordHook = useInput('');

  return (
    <div id="loginPage" className="container">
      <div className="docs-section">
        <h1>Login</h1>
        <Card>
          {/* todo: this need better way */}
          {/* 로그인 뮤테이션 (로컬 ) */}
          <Mutation mutation={LOG_USER_IN}>
            {(logUserIn) => {
              const emailSignIn = (e) => {
                e.preventDefault();
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
                        history.push('/');
                      }
                    }
                    if (error) {
                      console.log(error);
                      if (error === 'Wrong Password') alert('잘못된 패스워드 입니다.');
                      else alert('해당 이메일을 찾을수 없습니다.');
                    }
                  });
              };
              return (
                <form onSubmit={emailSignIn}>
                  <InputText {...emailHook} validation={utils.isEmail} label="ID" />
                  <InputText
                    {...passwordHook}
                    validation={utils.isPassword}
                    type="password"
                    label="PW"
                  />
                  <Buttons type="submit" label="로그인" />
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
