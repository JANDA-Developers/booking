import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Mutation, Query } from 'react-apollo';
import InputText from '../../atoms/forms/InputText';
import '../../atoms/Modal.scss';
import Button from '../../atoms/Buttons';
import './PhoneVerification.scss';
import { useInput } from '../../actions/hook';
import { GET_MY_PHON_NUMBER, PHONE_VERIFICATION } from '../../queries';

function PhoneVerification() {
  const [popPhone, setPopPhone] = useState(false);
  const keyHook = useInput('');
  // eslint-disable-next-line no-unused-vars
  const [phoneVerfication, setPhoneVerfication] = useState(false);

  return (
    <div id="PhoneVerification" className="container">
      <div className="docs-section" />
      <div className="flex-grid__col col--full-12 col--md-12">
        <h1>핸드폰 인증하기</h1>
        <Mutation
          mutation={PHONE_VERIFICATION}
          onCompleted={({ StartPhoneVerification: { ok, error } }) => {
            if (ok) {
              setPopPhone(true);
            } else {
              console.log('StartPhoneVerification Error');
              console.error(error);
            }
          }}
        >
          {mutation => <Button onClick={mutation} thema="primary" mode="large" label="인증번호 발송" />}
        </Mutation>
      </div>
      {/* 모달 */}
      <ReactModal
        isOpen={popPhone}
        onRequestClose={() => setPopPhone(false)}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <h5>핸드폰 인증번호</h5>
        <InputText {...keyHook} label="인증번호" />
        <div className="ReactModal__EndSection">
          <Query query={GET_MY_PHON_NUMBER}>
            {({ loading, error, data: { GetMyProfile: { user: { phoneNumber = {} } = {} } = {} } }) => {
              if (error) {
                console.error(error);
                return false;
              }
              console.log(phoneNumber);
              return (
                <Mutation
                  mutation={PHONE_VERIFICATION}
                  variables={{
                    key: keyHook.value,
                    phoneNumber,
                  }}
                  onCompleted={() => {
                    setPhoneVerfication(true);
                  }}
                >
                  {mutation => <Button preloader={loading} label="인증하기" onClick={mutation} />}
                </Mutation>
              );
            }}
          </Query>
          <Button label="닫기" onClick={() => setPopPhone(false)} />
        </div>
      </ReactModal>
    </div>
  );
}

export default PhoneVerification;
