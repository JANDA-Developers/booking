/* eslint-disable  */
import React, {useState} from "react";
import {Mutation} from "react-apollo";
import {toast} from "react-toastify";
import InputText from "../../../atoms/forms/inputText/InputText";
import Radio from "../../../atoms/forms/radio/Radio";
import Button from "../../../atoms/button/Button";
import {LOG_USER_IN, IS_LOGGED_IN} from "../../../clientQueries";
import {EMAIL_SIGN_UP, GET_USER_INFO} from "../../../queries";
import "./SignUp.scss";
import utils from "../../../utils/utils";
import {useInput, useRadio, LANG} from "../../../hooks/hook";
import privacyPolicy from "../../../docs/privacyPolicy";
import {IContext} from "../../MiddleServerRouter";
import uri from "../../../uri";
import {
  isHaveNumber,
  isLengthIn,
  isHaveScharacter
} from "../../../utils/inputValidations";

interface Iprops {
  context: IContext;
}

const SignUp: React.FC<Iprops> = ({context}) => {
  const {history} = context;
  const nameHook = useInput("");
  const emailHook = useInput("");
  const phoneNumberHook = useInput("");
  const passwordHook = useInput("");
  const checkPasswordHook = useInput("");
  const [infoAgreement, setInfoAgreement] = useRadio("N");
  const [passwordCondition, setPasswordCondition] = useState({
    special: false,
    length: false,
    enAndNumber: false
  });

  return (
    <div id="signUpPage" className="signUp container container--sm">
      <div className="docs-section">
        {/* 인증모달 */}
        <Mutation
          mutation={LOG_USER_IN}
          refetchQueries={[{query: IS_LOGGED_IN}, {query: GET_USER_INFO}]}
          onCompleted={() => {
            history.replace(`/dashboard`);
          }}
        >
          {(logUserIn: any) => (
            <Mutation
              mutation={EMAIL_SIGN_UP}
              variables={{
                name: nameHook.value,
                email: emailHook.value,
                phoneNumber: phoneNumberHook.value,
                password: passwordHook.value
              }}
              onCompleted={({EmailSignUp: {ok, error, token}}: any) => {
                // 자동로그인
                if (ok) {
                  if (token) {
                    toast.success(LANG("signup_complted"));
                    logUserIn({
                      variables: {
                        token: token
                      }
                    });
                  }
                }
                if (error) {
                  toast.warn(error);
                  console.error(error);
                }
              }}
            >
              {(mutation: any, data: any) => {
                const signUpSubmit = (e: any) => {
                  e.preventDefault();
                  if (!nameHook.isValid) {
                    toast.warn(LANG("name_is_not_valid"));
                    return false;
                  }
                  if (!emailHook.isValid) {
                    toast.warn(LANG("not_a_valid_email"));
                    return false;
                  }
                  if (!phoneNumberHook.isValid) {
                    toast.warn(LANG("not_a_valid_phoneNumber"));
                    return false;
                  }
                  if (!passwordHook.isValid) {
                    toast.warn(LANG("not_a_valid_password"));
                    return false;
                  }
                  if (passwordHook.value !== checkPasswordHook.value) {
                    toast.warn(LANG("not_a_valid_password"));
                    return false;
                  }
                  if (passwordHook.value !== checkPasswordHook.value) {
                    toast.warn(LANG("password_is_not_matched"));
                    return false;
                  }
                  if (infoAgreement === "N") {
                    toast.warn(LANG("please_aree_to_info_offer"));
                    return false;
                  }
                  mutation();
                };
                return (
                  <form onSubmit={signUpSubmit}>
                    <h3>{LANG("signUp")}</h3>
                    <div className="flex-grid docs-section__box">
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...nameHook}
                          validation={utils.isName}
                          label={LANG("name")}
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...passwordHook}
                          onChange={v => {
                            setPasswordCondition({
                              enAndNumber: isHaveNumber(v),
                              length: isLengthIn(v, 15, 7),
                              special: isHaveScharacter(v)
                            });
                            passwordHook.onChange(v);
                          }}
                          validation={utils.isPassword}
                          type="password"
                          label={LANG("password")}
                        />
                      </div>
                      <p className="JDsmall-text">
                        {LANG("password_condition")(
                          passwordCondition.special,
                          passwordCondition.length,
                          passwordCondition.enAndNumber
                        )}
                      </p>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...checkPasswordHook}
                          type="password"
                          label={LANG("check_password")}
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...phoneNumberHook}
                          hyphen
                          validation={utils.isPhone}
                          label={LANG("phoneNumber")}
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          {...emailHook}
                          validation={utils.isEmail}
                          label={LANG("eamil")}
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <InputText
                          className="signUp__privacyPolicy"
                          value={privacyPolicy}
                          label={LANG("agree_to_privacy_policy")}
                          readOnly
                          scroll
                          textarea
                          doubleHeight
                        />
                      </div>
                      <div className="flex-grid__col col--full-12 col--md-12">
                        <Radio
                          value="Y"
                          selectedValue={infoAgreement}
                          onChange={setInfoAgreement}
                          label={LANG("agree")}
                          checked
                          id="RD1--1"
                          groupName="Agree"
                        />
                        <Radio
                          value="N"
                          selectedValue={infoAgreement}
                          onChange={setInfoAgreement}
                          label={LANG("not_agree")}
                          id="RD1--2"
                          groupName="Agree"
                        />
                      </div>
                    </div>
                    <div>
                      <Button
                        thema="primary"
                        type="submit"
                        label={LANG("singUp_submit")}
                      />
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
};

export default SignUp;
