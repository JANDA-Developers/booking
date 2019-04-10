import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import InputText from '../../atoms/forms/InputText';
import Modal from '../../atoms/modal/Modal';
import Button from '../../atoms/button/Button';
import { useInput } from '../../actions/hook';
import { ErrProtecter, toast } from '../../utils/utils';
import {
  GET_MY_PHON_NUMBER, PHONE_VERIFICATION, GET_USER_INFO, COMEPLETE_PHONE_VERIFICATION,
} from '../../queries';
import './PhoneVerification.scss';

function PhoneVerification({ history }) {
  const [popPhone, setPopPhone] = useState(false);
  const keyHook = useInput('');

  return (
    <div id="PhoneVerification" className="container container--centerlize">
      <div className="docs-section">
        <div className="flex-grid__col col--full-12 col--md-12">
          <h1>핸드폰 인증하기</h1>
          <Mutation
            mutation={PHONE_VERIFICATION}
            onCompleted={({ StartPhoneVerification: { ok, error } }) => {
              if (ok) {
                setPopPhone(true);
                toast('인증번호 발송');
              } else {
                console.error(error);
                toast.warn('인증번호 발송실패');
              }
            }}
          >
            {mutation => <Button onClick={mutation} thema="primary" mode="large" label="인증번호 발송" />}
          </Mutation>
        </div>
        {/* 모달 */}
        <Modal
          isOpen={popPhone}
          onRequestClose={() => setPopPhone(false)}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <h5>핸드폰 인증번호</h5>
          <InputText {...keyHook} label="인증번호" />
          <div className="ReactModal__EndSection">
            <Query fetchPolicy="no-cache" query={GET_MY_PHON_NUMBER}>
              {({ loading, error, data: { GetMyProfile: { user: { phoneNumber = {} } = {} } = {} } = {} }) => {
                if (error) {
                  toast.error('메세지 발송에 문제가 생겼습니다. 별도 문의 바랍니다.');
                  console.error(error);
                  return false;
                }
                return (
                  <Mutation
                    mutation={COMEPLETE_PHONE_VERIFICATION}
                    variables={{
                      key: keyHook.value,
                      phoneNumber,
                    }}
                    onCompleted={({ CompletePhoneVerification }) => {
                      if (CompletePhoneVerification.ok) {
                        toast.success('핸드폰 인증완료');
                        history.replace('./');
                      } else {
                        console.error(CompletePhoneVerification.error);
                        toast.warn('인증실패');
                      }
                    }}
                    onError={(verficationError) => {
                      toast.error('인증 절차에 문제가 생겼습니다. 별도 문의 바랍니다.');
                      console.error(verficationError);
                    }}
                    refetchQueries={[{ query: GET_USER_INFO }]}
                  >
                    {mutation => <Button mode="flat" preloader={loading} label="인증하기" onClick={mutation} />}
                  </Mutation>
                );
              }}
            </Query>
            <Button mode="flat" label="닫기" onClick={() => setPopPhone(false)} />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ErrProtecter(withRouter(PhoneVerification));
