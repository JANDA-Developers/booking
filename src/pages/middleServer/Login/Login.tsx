import React from "react";
import {Mutation, withApollo} from "react-apollo";
import {toast} from "react-toastify";
import {withRouter, Link, RouteComponentProps} from "react-router-dom";
import Card from "../../../atoms/cards/Card";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import "./Login.scss";
import {LOG_USER_IN} from "../../../clientQueries";
import {EMAIL_SIGN_IN, GET_USER_INFO} from "../../../queries";
import {useInput} from "../../../hooks/hook";
import utils, {showError} from "../../../utils/utils";
import {ApolloClient} from "apollo-boost";
import {IContext} from "../../MiddleServerRouter";
import client from "../../../apolloClient";

interface Iprops {
  context: IContext;
}

const Login: React.FC<Iprops> = ({context}) => {
  const {history} = context;
  const lastLoginEmail = localStorage.getItem("lastLogin") || "";
  const emailHook = useInput(lastLoginEmail);
  const passwordHook = useInput("");

  return (
    <div id="loginPage" className="container container--centerlize">
      <div>
        <h1>Login</h1>
        <Card>
          {/* todo: this need better way */}
          {/* 로그인 뮤테이션 (로컬 ) */}
          <Mutation
            mutation={LOG_USER_IN}
            refetchQueries={[{query: GET_USER_INFO}]}
          >
            {(logUserIn: any) => {
              const emailSignIn = (e: any) => {
                e.preventDefault();
                if (!emailHook.isValid) {
                  toast.warn("아이디는 이메일 이여야합니다.");
                  return;
                }
                if (!passwordHook.isValid) {
                  toast.warn("잘못된 패스워드입니다.");
                  return;
                }
                client
                  .query({
                    query: EMAIL_SIGN_IN,
                    variables: {
                      email: emailHook.value,
                      password: passwordHook.value
                    }
                  })
                  .then(({data: {EmailSignIn: {ok, token, error}}}) => {
                    if (ok) {
                      if (token) {
                        logUserIn({
                          variables: {
                            token
                          }
                        });
                        localStorage.setItem("lastLogin", emailHook.value);
                        toast.success("로그인 완료");
                        history.replace("/");
                      }
                    }
                    if (error) {
                      console.error(error);
                      if (error === "Wrong Password")
                        toast.warn("패스워드가 일치하지 않습니다.");
                      else toast.warn("해당 이메일을 찾을수 없습니다.");
                    }
                  });
              };
              return (
                <form onSubmit={emailSignIn}>
                  <div>
                    <InputText
                      {...emailHook}
                      validation={utils.isEmail}
                      label="Email"
                    />
                  </div>
                  <div>
                    <InputText
                      {...passwordHook}
                      validation={utils.isPassword}
                      type="password"
                      label="Password"
                    />
                  </div>
                  <Button type="submit" thema="primary" label="로그인" />
                  <Link to="/signUp">
                    <Button thema="primary" label="회원가입" />
                  </Link>
                </form>
              );
            }}
          </Mutation>
        </Card>
      </div>
    </div>
  );
};

export default Login;
