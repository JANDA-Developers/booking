import React from 'react';
import { Redirect } from 'react-router-dom';

const logged = false;

const Mypage = () => (
  <h2>
    {!logged && <Redirect to="/Login" />}
    {'Mypage'}
  </h2>
);

export default Mypage;
