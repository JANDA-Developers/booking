/* eslint-disable  */
import React, { useState } from "react";
import { toast } from "react-toastify";
import InputText from "../../../atoms/forms/inputText/InputText";
import Radio from "../../../atoms/forms/radio/Radio";
import Button from "../../../atoms/button/Button";
import { LOG_USER_IN } from "../../../apollo/clientQueries";
import client from "../../../apollo/apolloClient";
import { EMAIL_SIGN_UP, GET_USER_INFO } from "../../../apollo/queries";
import "./SignUp.scss";
import utils from "../../../utils/utils";
import { useInput, useRadio, LANG } from "../../../hooks/hook";
import privacyPolicy from "../../../docs/privacyPolicy";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { emailSignUp, emailSignUpVariables } from "../../../types/api";
import { useMutation } from "@apollo/react-hooks";
import SecurityLevelViewer, { TCheck } from "./SecurityLevelViewer";

interface Iprops {
  context: IContext;
}

const SignUp: React.FC<Iprops> = ({ context }) => {
  const { history } = context;
  const nameHook = useInput("");
  const emailHook = useInput("");
  const phoneNumberHook = useInput("");
  const passwordHook = useInput("");
  const checkPasswordHook = useInput("");
  const [passwordLevelViewer, setPasswordLevelViewer] = useState<TCheck>({
    enAndNumber: false,
    length: false,
    special: false,
    checkedCount: 0
  });
  const [infoAgreement, setInfoAgreement] = useRadio("N");

  // 생성 요청
  const [eamilSingInMu] = useMutation(LOG_USER_IN, {
    client,
    ignoreResults: true,
    refetchQueries: [{ query: GET_USER_INFO }],
    onCompleted: () => {
      history.replace(`/dashboard`);
    }
  });

  // 생성 요청
  const [emailSignUpMu, { loading: emailSignUpLoading }] = useMutation<
    emailSignUp,
    emailSignUpVariables
  >(EMAIL_SIGN_UP, {
    client,
    ignoreResults: true,
    variables: {
      param: {
        name: nameHook.value,
        email: emailHook.value,
        phoneNumber: phoneNumberHook.value,
        password: passwordHook.value
      }
    },
    onCompleted: ({ EmailSignUp: { ok, error, token } }: any) => {
      // 자동로그인
      if (ok && token) {
        toast.success(LANG("signup_complted"));
        eamilSingInMu({
          variables: {
            token: token
          }
        });
      }
      if (error) {
        toast.warn(error);
        console.error(error);
      }
    }
  });

  const validate = () => {
    if (!nameHook.isValid) {
      toast.warn(LANG("name_is_not_valid"));
      return false;
    }
    if (!emailHook.isValid) {
      toast.warn(LANG("not_a_valid_email"));
      return false;
    }
    if (passwordLevelViewer.checkedCount! < 2) {
      toast.warn(LANG("not_a_valid_password"));
      return false;
    }
    if (!phoneNumberHook.isValid) {
      toast.warn(LANG("not_a_valid_phoneNumber"));
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
    return true;
  };

  const signUpSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) emailSignUpMu();
  };

  return (
    <div id="signUpPage" className="signUp container container--sm">
      <div className="docs-section">
        {/* 인증모달 */}
        <form onSubmit={signUpSubmit}>
          <h3>{LANG("signUp")}</h3>
          <div className="flex-grid docs-section__box">
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText
                id="signupName"
                {...nameHook}
                validation={utils.isName}
                label={LANG("name")}
              />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <div>
                <InputText
                  mb="superTiny"
                  id="signupPassword"
                  {...passwordHook}
                  onChange={v => {
                    passwordHook.onChange(v);
                  }}
                  type="password"
                  label={LANG("password")}
                />
              </div>
              <SecurityLevelViewer
                setPasswordCondition={setPasswordLevelViewer}
                passwordCondition={passwordLevelViewer}
                password={passwordHook.value}
              />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText
                id="signupPasswordCheck"
                {...checkPasswordHook}
                type="password"
                label={LANG("check_password")}
              />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText
                id="signupPhoneNumber"
                {...phoneNumberHook}
                hyphen
                validation={utils.isPhone}
                label={LANG("phoneNumber")}
              />
            </div>
            <div className="flex-grid__col col--full-12 col--md-12">
              <InputText
                id="signupEamil"
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
                labelId="RD1"
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
              id="signupBtn"
              thema="primary"
              type="submit"
              label={LANG("signup_submit")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
