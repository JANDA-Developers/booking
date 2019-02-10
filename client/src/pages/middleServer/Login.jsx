import React from 'react';
import Card from '../../atoms/Card';
import InputText from '../../atoms/forms/InputText';
import Buttons from '../../atoms/Buttons';
import './Login.scss';

const Login = () => (
  <div id="loginPage" className="container">
    <div className="docs-section">
      <h1>Login</h1>
      <Card>
        <InputText label="ID" />
        <InputText type="password" label="PW" />
        <Buttons label="로그인" />
      </Card>
    </div>
  </div>
);

export default Login;
