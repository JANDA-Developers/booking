import React from "react";
import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Card from "../../../atoms/cards/Card";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import "./Login.scss";
import { LOG_USER_IN } from "../../../apollo/clientQueries";
import { EMAIL_SIGN_IN, GET_USER_INFO } from "../../../apollo/queries";
import { useInput, LANG, useModal } from "../../../hooks/hook";
import utils from "../../../utils/utils";
import { IContext } from "../../bookingHost/BookingHostRouter";
import client from "../../../apollo/apolloClient";
import PreloaderModal from "../../../atoms/preloaderModal/PreloaderModal";
import TextButton from "../../../atoms/textButton/TextButton";
import RessetPasswordWrap from "../../../components/phoneVerificationModal/RessetPasswordModalWrap";
import FindEmailModalWrap from "../../../components/findEmailModal/FindEmailModalWrap";

interface Iprops {
  context: IContext;
}

const Login: React.FC<Iprops> = ({ context }) => {
  const { history } = context;
  const lastLoginEmail = localStorage.getItem("lastLogin") || "";
  const emailHook = useInput(lastLoginEmail, true);
  const passwordHook = useInput("");
  const ressetPasswordModalHook = useModal(false);
  const findPasswordModalHook = useModal(false);

  return (
    <div id="loginPage" className="container container--centerlize">
      <div>
        <h1>Login</h1>
        <Card>
          {/* 로그인 뮤테이션 (로컬 ) */}
          <Mutation
            mutation={LOG_USER_IN}
            refetchQueries={[{ query: GET_USER_INFO }]}
          >
            {(logUserIn: any, { loading: loginMuLoading }: any) => {
              const emailSignIn = (e: any) => {
                if (loginMuLoading) return;

                e.preventDefault();
                if (!emailHook.isValid) {
                  toast.warn(LANG("username_must_be_email"));
                  return;
                }
                if (!passwordHook.isValid) {
                  toast.warn(LANG("invalid_password"));
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
                  .then(
                    ({
                      data: {
                        EmailSignIn: { ok, token, error }
                      }
                    }) => {
                      if (ok) {
                        if (token) {
                          logUserIn({
                            variables: {
                              token
                            }
                          });
                          localStorage.setItem("lastLogin", emailHook.value);
                          // toast.success(LANG("login_complete"));
                          history.replace("/dashboard");
                        }
                      }
                      if (error) {
                        if (error === "Wrong Password")
                          toast.warn(LANG("passwords_do_not_match"));
                        else toast.warn(LANG("cant_find_this_email"));
                      }
                    }
                  );
              };

              return (
                <form onSubmit={emailSignIn}>
                  <PreloaderModal loading={loginMuLoading} />
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
                  <div>
                    
                    <div>
                      <Button
                        type="submit"
                        thema="primary"
                        label={LANG("login")}
                      />
                      <Link to="/signUp">
                        <Button thema="primary" label={LANG("signUp")} />
                      </Link>
                    </div>
                  </div>
                </form>
              );
            }}
          </Mutation>
        </Card>

         <div>
          <TextButton
            onClick={() => {
              findPasswordModalHook.openModal();
            }}
            size="small"
          >
            {LANG("find_email")}
          </TextButton>
          <TextButton
            onClick={() => {
              ressetPasswordModalHook.openModal();
            }}
            size="small"
          >
            {LANG("password_resset")}
          </TextButton>
        </div>
      </div>
      <FindEmailModalWrap
        context={context}
        modalHook={findPasswordModalHook}
      />
      <RessetPasswordWrap
        context={context}
        modalHook={ressetPasswordModalHook}
      />
    </div>
  );
};

export default Login;
